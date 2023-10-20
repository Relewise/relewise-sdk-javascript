import fetch from 'cross-fetch';
import version from './version';

export interface RelewiseClientOptions {
    serverUrl?: string;
}

export interface RelewiseRequestOptions {
    /**
     * Enables cancellation support for this specific request with this specific key.
     * If multiple requests are made before a response is received, the previous requests
     * with this key will be cancelled.
     *
     * @param {cancellationKey} the unique key that will enable cancellation support for this specific request.
     */
    cancellationKey?: string
}

export class ProblemDetailsError extends Error {
    private _details?: HttpProblemDetails;

    public get details(): HttpProblemDetails | undefined {
        return this._details;
    }

    constructor(message: string, details?: HttpProblemDetails) {
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
    private requestDictionary: { [key: string]: AbortController | null } = {};
    
    private ensureAbortSignal(key: string): AbortSignal {
        let abortController = this.requestDictionary[key];
        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();
        this.requestDictionary[key] = abortController;
        return abortController.signal;
    }

    private clearAbortSignal(key: string) {
        this.requestDictionary[key] = null;
        delete this.requestDictionary[key];
    }

    private readonly _serverUrl: string = 'https://api.relewise.com';
    private readonly _urlPath: string = 'v1';
    private readonly _apiKeyHeader: string;

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');
        if (!apiKey) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');

        this._apiKeyHeader = `APIKey ${this.apiKey}`;

        if (options?.serverUrl) {
            this._serverUrl = options.serverUrl;
        }
    }

    public get serverUrl(): string {
        return this._serverUrl;
    }

    protected async request<TRequest, TResponse>(name: string, data: TRequest, options?: RelewiseRequestOptions): Promise<TResponse | undefined> {
        const requestUrl = this.createRequestUrl(this._serverUrl, this.datasetId, this._urlPath, name);

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                Authorization: this._apiKeyHeader,
                'Content-Type': 'application/json',
                'X-Relewise-Version': version.tag,
            },
            body: JSON.stringify(data),
            signal: options?.cancellationKey ? this.ensureAbortSignal(options.cancellationKey) : undefined,
        });

        if (!response.ok) {
            let responseMessage = null;
            try { 
                responseMessage = await response.json();
            } catch (_) { 
                console.log(responseMessage)
            } finally {
                if (options?.cancellationKey) {
                    this.clearAbortSignal(options.cancellationKey);
                }
            }

            throw new ProblemDetailsError('Error when calling the Relewise API. Read more in the details property if there is error response or look in the network tab.', responseMessage);
        }

        try {
            const responseMessage = await response.json();

            return responseMessage as TResponse;
        } catch (err) {
            return undefined;
        } finally {
            if (options?.cancellationKey) {
                this.clearAbortSignal(options.cancellationKey);
            }
        }
    }

    private createRequestUrl(baseUrl: string, ...segments: string[]) {
        const joinedSegments = segments.join('/');
        return baseUrl.endsWith('/')
            ? baseUrl.concat(joinedSegments)
            : baseUrl.concat('/', joinedSegments);
    }
}