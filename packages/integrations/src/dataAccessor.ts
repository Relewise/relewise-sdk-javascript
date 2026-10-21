import { RelewiseClient, RelewiseClientOptions, RelewiseOAuthClientOptions, OAuthClientCredentials, RelewiseRequestOptions, UserQuery, UserDetailsCollectionResponse } from '@relewise/client';

export class DataAccessor extends RelewiseClient {

    constructor(datasetId: string, apiKey: string, options?: RelewiseClientOptions);
    constructor(datasetId: string, credentials: OAuthClientCredentials, options: RelewiseOAuthClientOptions);
    constructor(datasetId: string, credentials: string | OAuthClientCredentials, options?: RelewiseClientOptions) {
        super(datasetId, credentials as string, options);
    }

    public async queryUsers(request: UserQuery, options?: RelewiseRequestOptions): Promise<UserDetailsCollectionResponse | undefined> {
        return this.request<UserQuery, UserDetailsCollectionResponse>('UserQuery', request, options);
    }
}
