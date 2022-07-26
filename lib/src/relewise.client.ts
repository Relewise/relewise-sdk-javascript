import axios, { AxiosResponse, AxiosError } from "axios";

if (process.env.NODE_ENV?.trim() === 'development') {
    const https = require('https');
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    // eslint-disable-next-line no-console
    console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)
}

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

        try {
            const response: AxiosResponse<TResponse> = await axios.post<TResponse>(requestUrl, data, {
                withCredentials: false,
                method: 'POST',
                headers: {
                    Authorization: apiKeyHeader,
                    'Content-Type': 'application/json',
                },
            })
            
            return response.data;
        } catch (e: any) {
            this.handleError(e);
        }
    }

    private handleError<TResponse>(e: AxiosError<TResponse>) {
        console.error(e.code, e?.response?.data)
    }

    private createRequestUrl(baseUrl: string, ...segments: string[]) {
        const joinedSegments = segments.join("/");
        return baseUrl.endsWith("/")
            ? baseUrl.concat(joinedSegments)
            : baseUrl.concat("/", joinedSegments);
    }
}