import fetch from 'cross-fetch';
import version from './version';

export interface RelewiseClientOptions {
    serverUrl?: string;
    useCancellation?: boolean;
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
    private requestDictionary: { [requestUrl: string]: AbortController | null } = {};
    
    private ensureAbortSignal(requestUrl: string): AbortSignal {
        let abortController = this.requestDictionary[requestUrl];
        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();
        this.requestDictionary[requestUrl] = abortController;

        return abortController.signal;
    }

    private clearAbortSignal(requestUrl: string) {
        this.requestDictionary[requestUrl] = null;
        delete this.requestDictionary[requestUrl];
    }

    private readonly _serverUrl: string = 'https://api.relewise.com';
    private readonly _urlPath: string = 'v1';
    private readonly apiKeyHeader = `APIKey ${this.apiKey}`;
    private readonly useCancellation: boolean = false;

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');
        if (!apiKey) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');

        if (options?.serverUrl) {
            this._serverUrl = options.serverUrl;
        }

        this.useCancellation = options?.useCancellation ?? false;
    }

    public get serverUrl(): string {
        return this._serverUrl;
    }

    protected async request<TRequest, TResponse>(name: string, data: TRequest): Promise<TResponse | undefined> {
        const requestUrl = this.createRequestUrl(this._serverUrl, this.datasetId, this._urlPath, name);

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                Authorization: this.apiKeyHeader,
                'Content-Type': 'application/json',
                'X-Relewise-Version': version.tag,
            },
            body: JSON.stringify(data),
            ...(this.useCancellation && { signal: this.ensureAbortSignal(requestUrl) }),
        });

        if (!response.ok) {
            let responseMessage = null;
            try { 
                responseMessage = await response.json();
            } catch (_) { 
                console.log(responseMessage)
            } finally {
                if (this.useCancellation) {
                    this.clearAbortSignal(requestUrl);
                }
            }

            throw new ProblemDetailsError('Error when calling the Relewise API. Read more in the details property if there is error response or look in the network tab.', responseMessage);
        }

        try {
            const responseMessage = await response.json();

            return responseMessage as TResponse;
        } catch (err) {
            return undefined;
        }
    }

    private createRequestUrl(baseUrl: string, ...segments: string[]) {
        const joinedSegments = segments.join('/');
        return baseUrl.endsWith('/')
            ? baseUrl.concat(joinedSegments)
            : baseUrl.concat('/', joinedSegments);
    }
}