import { RelewiseClient } from "./relewise.client";
import { 
    TrackOrderRequest, TrackCartRequest, TrackProductViewRequest, TrackProductCategoryViewRequest, TrackContentViewRequest, TrackContentCategoryViewRequest,
    TrackBrandViewRequest
} from "./models/data-contracts";

export class Tracker extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, serverUrl?: string) {
        super(datasetId, apiKey, serverUrl);
    }

    public async trackOrder(request: TrackOrderRequest): Promise<void | undefined> {
        return this.request<TrackOrderRequest, void>('TrackOrderRequest', request);
    }

    public async trackCart(request: TrackCartRequest): Promise<void | undefined> {
        return this.request<TrackCartRequest, void>('TrackCartRequest', request);
    }

    public async tractkProductView(request: TrackProductViewRequest): Promise<void | undefined> {
        return this.request<TrackProductViewRequest, void>('TrackProductViewRequest', request);
    }

    public async trackProductCategoryView(request: TrackProductCategoryViewRequest): Promise<void | undefined> {
        return this.request<TrackProductCategoryViewRequest, void>('TrackProductCategoryViewRequest', request);
    }

    public async trackContentView(request: TrackContentViewRequest): Promise<void | undefined> {
        return this.request<TrackContentViewRequest, void>('TrackContentViewRequest', request);
    }

    public async trackContentCategoryView(request: TrackContentCategoryViewRequest): Promise<void | undefined> {
        return this.request<TrackContentCategoryViewRequest, void>('TrackContentCategoryViewRequest', request);
    }

    public async trackBrandView(request: TrackBrandViewRequest): Promise<void | undefined> {
        return this.request<TrackBrandViewRequest, void>('TrackBrandViewRequest', request);
    }
}
