import { RelewiseClient, RelewiseClientOptions, RelewiseRequestOptions, UserQuery, UserDetailsCollectionResponse } from '@relewise/client';

export class DataAccessor extends RelewiseClient {

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async queryUsers(request: UserQuery, options?: RelewiseRequestOptions): Promise<UserDetailsCollectionResponse | undefined> {
        return this.request<UserQuery, UserDetailsCollectionResponse>('UserQuery', request, options);
    }
}