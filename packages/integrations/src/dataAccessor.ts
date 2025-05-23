import { RelewiseClient, RelewiseClientOptions, ProductUpdate, RelewiseRequestOptions, TrackProductUpdateRequest, ProductAdministrativeAction, TrackProductAdministrativeActionRequest, Trackable, SearchResponseCollection, BatchedTrackingRequest, ProductCategoryUpdate, TrackProductCategoryUpdateRequest, TrackProductCategoryAdministrativeActionRequest, ProductCategoryAdministrativeAction, ContentCategoryAdministrativeAction, ContentCategoryUpdate, TrackContentCategoryAdministrativeActionRequest, TrackContentCategoryUpdateRequest, ContentUpdate, TrackContentUpdateRequest, ContentAdministrativeAction, TrackContentAdministrativeActionRequest, BrandUpdate, BrandAdministrativeAction, TrackBrandAdministrativeActionRequest, TrackBrandUpdateRequest, CompanyUpdate, TrackCompanyUpdateRequest, CompanyAdministrativeAction, TrackCompanyAdministrativeActionRequest, UserQuery, UserDetailsCollectionResponse } from '@relewise/client';

export class DataAccessor extends RelewiseClient {

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async queryUser(request: UserQuery, options?: RelewiseRequestOptions): Promise<UserDetailsCollectionResponse | undefined> {
        return this.request<UserQuery, UserDetailsCollectionResponse>('UserQuery', request, options);
    }
}