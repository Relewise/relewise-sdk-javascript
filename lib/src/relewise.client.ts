const fetch = require('node-fetch');

export interface RelewiseClientOptions {
    serverUrl?: string;
}

export abstract class RelewiseClient {
    private readonly _baseProductionServerUrl: string = "https://api.relewise.com";
    private readonly _urlPath: string = "v1";

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');
        if (!apiKey) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');

        if (options?.serverUrl) {
            this.serverUrl = options.serverUrl;
        }
    }

    public serverUrl: string = this._baseProductionServerUrl;

    protected async request<TRequest, TResponse>(name: string, data: TRequest): Promise<TResponse | undefined> {
        const apiKeyHeader = `APIKey ${this.apiKey}`;
        const requestUrl = this.createRequestUrl(this.serverUrl, this.datasetId, this._urlPath, name);

        const options = {
            method: 'POST',
            headers: {
                Authorization: apiKeyHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(requestUrl, options)
        try {
            return await response.json() as TResponse;
        } catch(err) {
            return undefined;
        }
    }

    private createRequestUrl(baseUrl: string, ...segments: string[]) {
        const joinedSegments = segments.join("/");
        return baseUrl.endsWith("/")
            ? baseUrl.concat(joinedSegments)
            : baseUrl.concat("/", joinedSegments);
    }
}