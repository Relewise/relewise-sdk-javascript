export interface OAuthClientCredentials {
    type: 'oauth';
    clientId: string;
    clientSecret: string;
}

export interface OAuthToken {
    accessToken: string;
    expiresAt: Date;
}

interface CachedOAuthToken extends OAuthToken {
    endpoint: string;
    renewAt: number;
}

interface OAuthTokenAcquisition {
    promise: Promise<CachedOAuthToken>;
    abortController: AbortController;
    waiters: number;
    settled: boolean;
}

interface OAuthTokenResponse {
    access_token?: unknown;
    token_type?: unknown;
    expires_in?: unknown;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const emptyUuid = '00000000-0000-0000-0000-000000000000';

function isValidTokenEndpoint(endpoint: string): boolean {
    if (endpoint !== endpoint.trim()) return false;

    try {
        const url = new URL(endpoint);
        return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash;
    } catch {
        return false;
    }
}

/** Acquires and caches OAuth client-credentials tokens. Reuse the provider to share cached tokens. */
export class OAuthTokenProvider {
    private cachedToken?: CachedOAuthToken;
    private tokenAcquisition?: OAuthTokenAcquisition;

    constructor(
        private readonly clientId: string,
        private readonly clientSecret: string,
        private readonly fetcher: typeof fetch = globalThis.fetch,
    ) {
        if (!uuidPattern.test(clientId) || clientId.toLowerCase() === emptyUuid) throw new Error('Client id must be a valid non-empty UUID.');
        if (!clientSecret.trim()) throw new Error('Client secret cannot be null or empty.');
    }

    /** Returns a cached token or acquires a new one when renewal is needed. */
    public async getToken(endpoint: string, rejectedToken?: string, abortSignal?: AbortSignal): Promise<OAuthToken> {
        if (!isValidTokenEndpoint(endpoint)) throw new Error('OAuth token endpoint must be a valid HTTPS URL without credentials, query, or fragment.');

        if (this.canReuseToken(endpoint, rejectedToken)) {
            return this.cachedToken!;
        }

        const acquisition = this.tokenAcquisition ?? this.startAcquisition(endpoint);
        await this.waitForAcquisition(acquisition, abortSignal);

        // Recheck after waiting. Another caller may have replaced the rejected token,
        // or the completed acquisition may have been for another endpoint.
        return this.getToken(endpoint, rejectedToken, abortSignal);
    }

    private canReuseToken(endpoint: string, rejectedToken?: string): boolean {
        return this.cachedToken !== undefined && this.cachedToken.endpoint === endpoint && this.cachedToken.accessToken !== rejectedToken && Date.now() < this.cachedToken.renewAt;
    }

    private startAcquisition(endpoint: string): OAuthTokenAcquisition {
        const abortController = new AbortController();
        const acquisition: OAuthTokenAcquisition = {
            promise: this.acquireToken(endpoint, abortController.signal),
            abortController,
            waiters: 0,
            settled: false,
        };
        this.tokenAcquisition = acquisition;
        acquisition.promise.then(
            (token) => this.completeAcquisition(acquisition, token),
            () => this.completeAcquisition(acquisition),
        );
        return acquisition;
    }

    private async acquireToken(endpoint: string, abortSignal: AbortSignal): Promise<CachedOAuthToken> {
        // A failed acquisition must not leave a previously rejected or expired token reusable.
        this.cachedToken = undefined;
        const requestedAt = Date.now();
        const response = await this.fetcher(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${this.encodeCredentials()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
            signal: abortSignal,
        });

        if (!response.ok) {
            throw new Error(`OAuth token acquisition failed with status ${response.status}.`);
        }

        let value: OAuthTokenResponse;
        try {
            value = (await response.json()) as OAuthTokenResponse;
        } catch {
            if (abortSignal.aborted) {
                throw abortSignal.reason ?? new DOMException('The operation was aborted.', 'AbortError');
            }
            throw new Error('The OAuth endpoint returned an invalid token response.');
        }
        if (
            typeof value.access_token !== 'string'
            || value.access_token.length === 0
            || /[\x00-\x20\x7f]/.test(value.access_token)
            || typeof value.expires_in !== 'number'
            || !Number.isInteger(value.expires_in)
            || value.expires_in <= 0
            || typeof value.token_type !== 'string'
            || value.token_type.toLowerCase() !== 'bearer'
        ) {
            throw new Error('The OAuth endpoint returned an invalid token response.');
        }

        const expiresAt = requestedAt + value.expires_in * 1_000;
        const renewBeforeExpirySeconds = Math.min(10, Math.floor(value.expires_in / 10));
        const token: CachedOAuthToken = {
            endpoint,
            accessToken: value.access_token,
            expiresAt: new Date(expiresAt),
            renewAt: expiresAt - renewBeforeExpirySeconds * 1_000,
        };

        return token;
    }

    private encodeCredentials(): string {
        const formEncode = (value: string) => new URLSearchParams({ value }).toString().slice('value='.length);
        return btoa(`${formEncode(this.clientId)}:${formEncode(this.clientSecret)}`);
    }

    private completeAcquisition(acquisition: OAuthTokenAcquisition, token?: CachedOAuthToken): void {
        acquisition.settled = true;
        if (this.tokenAcquisition === acquisition) {
            if (token) this.cachedToken = token;
            this.tokenAcquisition = undefined;
        }
    }

    private async waitForAcquisition(acquisition: OAuthTokenAcquisition, abortSignal?: AbortSignal): Promise<void> {
        acquisition.waiters++;

        try {
            if (!abortSignal) {
                await acquisition.promise;
                return;
            }

            if (abortSignal.aborted) {
                throw abortSignal.reason ?? new DOMException('The operation was aborted.', 'AbortError');
            }

            await new Promise<void>((resolve, reject) => {
                const aborted = () => reject(abortSignal.reason ?? new DOMException('The operation was aborted.', 'AbortError'));
                abortSignal.addEventListener('abort', aborted, { once: true });
                acquisition.promise.then(
                    () => {
                        abortSignal.removeEventListener('abort', aborted);
                        resolve();
                    },
                    (error) => {
                        abortSignal.removeEventListener('abort', aborted);
                        reject(error);
                    },
                );
            });
        } finally {
            acquisition.waiters--;
            if (acquisition.waiters === 0 && !acquisition.settled && this.tokenAcquisition === acquisition) {
                this.tokenAcquisition = undefined;
                acquisition.abortController.abort();
            }
        }
    }
}
