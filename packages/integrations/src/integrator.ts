import { RelewiseClient, RelewiseClientOptions, ProductUpdate, RelewiseRequestOptions, TrackProductUpdateRequest, ProductAdministrativeAction, TrackProductAdministrativeActionRequest, Trackable, SearchResponseCollection, BatchedTrackingRequest, ProductCategoryUpdate, TrackProductCategoryUpdateRequest, TrackProductCategoryAdministrativeActionRequest, ProductCategoryAdministrativeAction, ContentCategoryAdministrativeAction, ContentCategoryUpdate, TrackContentCategoryAdministrativeActionRequest, TrackContentCategoryUpdateRequest, ContentUpdate, TrackContentUpdateRequest, ContentAdministrativeAction, TrackContentAdministrativeActionRequest, BrandUpdate, BrandAdministrativeAction, TrackBrandAdministrativeActionRequest, TrackBrandUpdateRequest, CompanyUpdate, TrackCompanyUpdateRequest, CompanyAdministrativeAction, TrackCompanyAdministrativeActionRequest } from '@relewise/client';

export class Integrator extends RelewiseClient {

    public batchSize: number = 1_000;

    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async updateProduct(request: ProductUpdate, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackProductUpdateRequest, void>(
            'TrackProductUpdateRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackProductUpdateRequest, Relewise.Client',
                productUpdate: request,
            },
            options);
    }

    public async executeProductAdministrativeAction(request: ProductAdministrativeAction, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackProductAdministrativeActionRequest, void>(
            'TrackProductAdministrativeActionRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackProductAdministrativeActionRequest, Relewise.Client',
                administrativeAction: request,
            },
            options);
    }

    public async updateProductCategory(request: ProductCategoryUpdate, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackProductCategoryUpdateRequest, void>(
            'TrackProductCategoryUpdateRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackProductCategoryUpdateRequest, Relewise.Client',
                productCategoryUpdate: request,
            },
            options);
    }

    public async executeProductCategoryAdministrativeAction(request: ProductCategoryAdministrativeAction, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackProductCategoryAdministrativeActionRequest, void>(
            'TrackProductCategoryAdministrativeActionRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackProductCategoryAdministrativeActionRequest, Relewise.Client',
                administrativeAction: request,
            },
            options);
    }

    public async updateContentCategory(request: ContentCategoryUpdate, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackContentCategoryUpdateRequest, void>(
            'TrackContentCategoryUpdateRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackContentCategoryUpdateRequest, Relewise.Client',
                contentCategoryUpdate: request,
            },
            options);
    }

    public async executeContentCategoryAdministrativeAction(request: ContentCategoryAdministrativeAction, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackContentCategoryAdministrativeActionRequest, void>(
            'TrackContentCategoryAdministrativeActionRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackContentCategoryAdministrativeActionRequest, Relewise.Client',
                administrativeAction: request,
            },
            options);
    }

    public async updateContent(request: ContentUpdate, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackContentUpdateRequest, void>(
            'TrackContentUpdateRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackContentUpdateRequest, Relewise.Client',
                contentUpdate: request,
            },
            options);
    }

    public async executeContentAdministrativeAction(request: ContentAdministrativeAction, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackContentAdministrativeActionRequest, void>(
            'TrackContentAdministrativeActionRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackContentAdministrativeActionRequest, Relewise.Client',
                administrativeAction: request,
            },
            options);
    }

    public async updateBrand(request: BrandUpdate, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackBrandUpdateRequest, void>(
            'TrackBrandUpdateRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackBrandUpdateRequest, Relewise.Client',
                brandUpdate: request,
            },
            options);
    }

    public async executeBrandAdministrativeAction(request: BrandAdministrativeAction, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackBrandAdministrativeActionRequest, void>(
            'TrackBrandAdministrativeActionRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackBrandAdministrativeActionRequest, Relewise.Client',
                administrativeAction: request,
            },
            options);
    }

    public async updateCompany(request: CompanyUpdate, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackCompanyUpdateRequest, void>(
            'TrackCompanyUpdateRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackCompanyUpdateRequest, Relewise.Client',
                companyUpdate: request,
            },
            options);
    }

    public async executeCompanyAdministrativeAction(request: CompanyAdministrativeAction, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackCompanyAdministrativeActionRequest, void>(
            'TrackCompanyAdministrativeActionRequest',
            {
                $type: 'Relewise.Client.Requests.Tracking.TrackCompanyAdministrativeActionRequest, Relewise.Client',
                administrativeAction: request,
            },
            options);
    }

    public async batch(trackable: Trackable[], options?: RelewiseRequestOptions): Promise<void | undefined> {
        if (!trackable) {
            throw new Error('No trackable items was provided');
        }

        if (trackable.length === 0) {
            return;
        }

        const chuncks = trackable.length > this.batchSize
            ? this.chunk(trackable, this.batchSize)
            : [trackable];

        for (const chunck of chuncks) {
            await this.request<BatchedTrackingRequest, void>(
                'BatchedTrackingRequest',
                {
                    $type: 'Relewise.Client.Requests.Tracking.BatchedTrackingRequest, Relewise.Client',
                    items: chunck,
                },
                options);
        }
    }

    private chunk(trackable: Trackable[], chunk: number) {
        const result = [];
        for (let i = 0; i < trackable.length; i += chunk) {
            result.push(trackable.slice(i, i + chunk));
        }
        return result;
    }
}