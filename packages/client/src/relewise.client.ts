import version from './version';

export interface RelewiseClientOptions {
    serverUrl?: string;
    cache?: RequestCache;
}

export interface RelewiseRequestOptions {
    abortSignal?: AbortSignal;
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

export abstract class RelewiseClient {
    private readonly _serverUrl: string = 'https://api.relewise.com';
    private readonly _urlPath: string = 'v1';
    private readonly _apiKeyHeader: string;
    private readonly cache: RequestCache = 'no-cache';

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');
        if (!apiKey) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');

        this._apiKeyHeader = `APIKey ${this.apiKey}`;

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

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Authorization: this._apiKeyHeader,
                    'Content-Type': 'application/json',
                    'X-Relewise-Version': version.tag,
                },
                body: JSON.stringify(data),
                signal: options?.abortSignal,
                cache: this.cache,
            });

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
                possibleCause = 'Unauthorized: Your API Key might be missing, expired, or incorrect.';
            }
            else if (message.includes('403') || message.includes('forbidden')) {
                possibleCause = 'Forbidden: Your API Key might not have access to this dataset.';
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
            "- Check your API Key is correct and active\n" +
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