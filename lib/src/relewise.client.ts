import axios, { AxiosResponse, AxiosError } from "axios";

export abstract class RelewiseClient {
    private _baseProductionServerUrl: string = "https://api.relewise.com";
    private _urlPath: string = "v1";

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, serverUrl?: string) {
        if (!datasetId) throw new Error('Dataset id cannot be null or empty. Please contact Relewise if you don\'t have an account already or would like a free demo license');
        if (!apiKey) throw new Error('API Key secret cannot be null or empty. Please contact Relewise support if you don\'t know the apiKeySecret for your datasetId.');

        if (serverUrl) {
            this.serverUrl = serverUrl;
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