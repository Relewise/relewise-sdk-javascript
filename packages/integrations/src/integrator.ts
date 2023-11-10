import { RelewiseClient, RelewiseClientOptions, ProductUpdate, RelewiseRequestOptions, TrackProductUpdateRequest, ProductAdministrativeAction, TrackProductAdministrativeActionRequest, Trackable, SearchResponseCollection, BatchedTrackingRequest } from '@relewise/client';

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

    public async batch(trackable: Trackable[], options?: RelewiseRequestOptions): Promise<SearchResponseCollection | undefined> {
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
            await this.request<BatchedTrackingRequest, SearchResponseCollection>(
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