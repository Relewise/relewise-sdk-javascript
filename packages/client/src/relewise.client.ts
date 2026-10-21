import version from './version';
import { isInvalidTokenResponse } from './oauthChallenge';
import { OAuthClientCredentials, OAuthTokenProvider } from './oauthTokenProvider';

export interface RelewiseClientOptions {
    serverUrl?: string;
    cache?: RequestCache;
}

export interface RelewiseOAuthClientOptions extends RelewiseClientOptions {
    serverUrl: string;
}

export type RelewiseCredentials = string | OAuthClientCredentials;

export interface RelewiseRequestOptions {
    /** Cancels the request when the provided abort signal is triggered. */
    abortSignal?: AbortSignal;
    /** Allows the request to outlive the page, such as when tracking events during page unload or navigation. */
    keepalive?: boolean;
}

export class ProblemDetailsError extends Error {
    private _details?: HttpProblemDetails | null;

    public get details(): HttpProblemDetails | undefined | null {
        return this._details;
    }

    constructor(message: string, details?: HttpProblemDetails | null) {
        super(message);
        this._details = details;
    }
}

export interface HttpProblemDetails {
    type: string;
    title: string;
    status: number;
    traceId: string;
    detail?: string;
    errors?: Record<string, string>;
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const emptyUuid = '00000000-0000-0000-0000-000000000000';

function isValidOAuthServerUrl(serverUrl: string): boolean {
    if (serverUrl !== serverUrl.trim()) return false;

    try {
        const url = new URL(serverUrl);
        return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash;
    } catch {
        return false;
    }
}

export abstract class RelewiseClient {
    protected readonly datasetId: string;
    protected readonly apiKey: string;
    private readonly _serverUrl: string = 'https://api.relewise.com';
    private readonly _urlPath: string = 'v1';
    private readonly _apiKeyHeader?: string;
    private readonly _oauthTokenProvider?: OAuthTokenProvider;
    private readonly cache: RequestCache = 'no-cache';

    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    constructor(datasetId: string, credentials: OAuthClientCredentials, options: RelewiseOAuthClientOptions);
    constructor(datasetId: string, credentials: RelewiseCredentials, options?: RelewiseClientOptions) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');

        this.datasetId = datasetId;
        this.apiKey = typeof credentials === 'string' ? credentials : '';

        if (typeof credentials === 'string') {
            if (!credentials) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');
            this._apiKeyHeader = `APIKey ${credentials}`;
        }
        else {
            if (credentials.type !== 'oauth') throw new Error('Unsupported authentication type.');
            if (!uuidPattern.test(datasetId) || datasetId.toLowerCase() === emptyUuid) throw new Error('Dataset id must be a valid non-empty UUID when using OAuth.');
            if (!options?.serverUrl || !isValidOAuthServerUrl(options.serverUrl)) throw new Error('Server URL must be a valid HTTPS URL without credentials, query, or fragment when using OAuth.');
            this._oauthTokenProvider = new OAuthTokenProvider(credentials.clientId, credentials.clientSecret);
        }

        if (options?.serverUrl) {
            this._serverUrl = options.serverUrl;
        }
        if (options?.cache) {
            this.cache = options.cache;
        }
    }

    public get serverUrl(): string {
        return this._serverUrl;
    }

    protected async request<TRequest, TResponse>(name: string, data: TRequest, options?: RelewiseRequestOptions): Promise<TResponse | undefined> {
        const requestUrl = this.createRequestUrl(this._serverUrl, this.datasetId, this._urlPath, name);
        const body = JSON.stringify(data);

        try {
            const send = (authorization: string) => globalThis.fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Authorization: authorization,
                    'Content-Type': 'application/json',
                    'X-Relewise-Version': version.tag,
                },
                body,
                signal: options?.abortSignal,
                keepalive: options?.keepalive,
                cache: this.cache,
            });

            let response: Response;
            if (this._oauthTokenProvider) {
                const tokenEndpoint = this.createRequestUrl(this._serverUrl, this.datasetId, 'oauth/token');
                let token = await this._oauthTokenProvider.getToken(tokenEndpoint, undefined, options?.abortSignal);
                response = await send(`Bearer ${token.accessToken}`);

                if (isInvalidTokenResponse(response)) {
                    token = await this._oauthTokenProvider.getToken(tokenEndpoint, token.accessToken, options?.abortSignal);
                    response = await send(`Bearer ${token.accessToken}`);
                }
            }
            else {
                response = await send(this._apiKeyHeader!);
            }

            if (!response.ok) {
                let responseMessage: HttpProblemDetails | null = null;

                try {
                    responseMessage = await response.json();
                } catch (_) {
                }

                const details = responseMessage?.detail ? `Details: ${responseMessage.detail}\n` : '';

                throw new ProblemDetailsError(`Error when calling the Relewise API.\n\nTitle: ${response.statusText}\nStatus: ${response.status}\n${details}\nRead more in the details property if there is error response or look in the network tab.`, responseMessage);
            }

            return await this.parseJson<TResponse>(response);

        } catch (err) {
            this.handleRequestError(err);
        }
    }

    private createRequestUrl(baseUrl: string, ...segments: string[]) {
        const joinedSegments = segments.join('/');
        return baseUrl.endsWith('/')
            ? baseUrl.concat(joinedSegments)
            : baseUrl.concat('/', joinedSegments);
    }

    private handleRequestError(err: unknown): never {
        if (err instanceof ProblemDetailsError) throw err;
        if (err instanceof DOMException) throw err;

        let extraInfo = '';
        let possibleCause: string | null = null;

        if (err instanceof Error) {
            extraInfo += `\nOriginal error: ${err.name} - ${err.message}`;
            if ((err as any).code) {
                extraInfo += `\nCode: ${(err as any).code}`;
            }

            const message = err.message.toLowerCase();

            if (message.includes('failed to fetch')) {
                possibleCause = 'Failed to connect to API. Possible network outage, incorrect server URL, or CORS/preflight issue.';
            }
            else if (message.includes('401') || message.includes('unauthorized')) {
                possibleCause = 'Unauthorized: Your credentials might be missing, expired, or incorrect.';
            }
            else if (message.includes('403') || message.includes('forbidden')) {
                possibleCause = 'Forbidden: Your credentials might not have access to this dataset.';
            }
            else if (message.includes('404') || message.includes('not found')) {
                possibleCause = 'Not Found: The Dataset ID or endpoint may be incorrect.';
            }
        }
        else {
            extraInfo += `\nNon-Error thrown: ${JSON.stringify(err)}`;
        }

        const errorMessage =
            "Network error or preflight request failed.\n" +
            (possibleCause ? `Possible cause: ${possibleCause}\n` : "") +
            "Troubleshooting steps:\n" +
            "- Check your credentials are correct and active\n" +
            "- Verify the Dataset ID exists and is correctly spelled\n" +
            "- Ensure the server URL is reachable from your network\n" +
            "- Check browser console/network tab for blocked requests or CORS issues" +
            extraInfo;

        console.error(errorMessage);
        throw new Error(errorMessage);
    }


    private async parseJson<T>(response: Response): Promise<T | undefined> {
        try {
            return await response.json();
        } catch {
            return undefined;
        }
    }
}
