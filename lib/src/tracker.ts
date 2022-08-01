import { RelewiseClient, RelewiseClientOptions } from "./relewise.client";
import { 
    TrackOrderRequest, TrackCartRequest, TrackProductViewRequest, TrackProductCategoryViewRequest, TrackContentViewRequest, TrackContentCategoryViewRequest,
    TrackBrandViewRequest, User
} from "./models/data-contracts";

export class Tracker extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async trackOrder(request: TrackOrderRequest): Promise<void | undefined> {
        return this.request<TrackOrderRequest, void>('TrackOrderRequest', request);
    }

    public async trackCart(request: TrackCartRequest): Promise<void | undefined> {
        return this.request<TrackCartRequest, void>('TrackCartRequest', request);
    }

    public async tractProductView({ productId, user }: { productId: string, user: User }): Promise<void | undefined> {
        return this.request<TrackProductViewRequest, void>('TrackProductViewRequest', {
            productView: {
                product: {
                    id: productId
                },
                user: user,
            }
        });
    }

    public async trackProductCategoryView({ idPath, user }: { idPath: string[], user: User }): Promise<void | undefined> {
        return this.request<TrackProductCategoryViewRequest, void>('TrackProductCategoryViewRequest', {
            productCategoryView: {
                idPath: idPath,
                user: user,
            }
        });
    }

    public async trackContentView({ contentId, user }: { contentId: string, user: User }): Promise<void | undefined> {
        return this.request<TrackContentViewRequest, void>('TrackContentViewRequest', {
            contentView: {
                content: {
                    id: contentId
                },
                user: user,
            }
        });
    }

    public async trackContentCategoryView({ idPath, user }: { idPath: string[], user: User }): Promise<void | undefined> {
        return this.request<TrackContentCategoryViewRequest, void>('TrackContentCategoryViewRequest', {
            contentCategoryView: {
                idPath: idPath,
                user: user,
            }
        });
    }

    public async trackBrandView({ brandId, user }: { brandId: string, user: User }): Promise<void | undefined> {
        return this.request<TrackBrandViewRequest, void>('TrackBrandViewRequest', {
            brandView: {
                brand: {
                    id: brandId
                },
                user: user,
            }
        });
    }
}
