import { RelewiseClient, RelewiseClientOptions } from './relewise.client';
import { 
    TrackOrderRequest, TrackCartRequest, TrackProductViewRequest, TrackProductCategoryViewRequest, TrackContentViewRequest, TrackContentCategoryViewRequest,
    TrackBrandViewRequest, User, TrackSearchTermRequest
} from './models/data-contracts';

export class Tracker extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async trackOrder({ user, subtotal, trackingNumber, lineItems, cartName = 'default' }: { user: User, subtotal: { currency: string, amount: number }, trackingNumber: string, lineItems: { productId: string, variantId?: string, lineTotal: number, quantity: number }[], cartName?: string }): Promise<void | undefined> {
        return this.request<TrackOrderRequest, void>('TrackOrderRequest', {
            order: {
                lineItems: lineItems.map(l => ({
                    product: {
                        id: l.productId
                    },
                    ...(l.variantId && { variant: { id: l.variantId }}),
                    lineTotal: l.lineTotal,
                    quantity: l.quantity
                })),
                subtotal: { amount: subtotal.amount, currency: { value: subtotal.currency }},
                trackingNumber: trackingNumber,
                cartName: cartName,
                user: user,
            }
        });
    }

    public async trackCart({ user, subtotal, lineItems, cartName = 'default' }: { user?: User, subtotal: { currency: string, amount: number }, lineItems: { productId: string, variantId?: string, lineTotal: number, quantity: number }[], cartName?: string }): Promise<void | undefined> {
        return this.request<TrackCartRequest, void>('TrackCartRequest', {
            cart: {
                lineItems: lineItems.map(l => ({
                    product: {
                        id: l.productId
                    },
                    ...(l.variantId && { variant: { id: l.variantId }}),
                    lineTotal: l.lineTotal,
                    quantity: l.quantity
                })),
                subtotal: { amount: subtotal.amount, currency: { value: subtotal.currency }},
                name: cartName,
                user: user,
            }
        });
    }

    public async trackProductView({ productId, variantId, user }: { productId: string, variantId?: string, user: User }): Promise<void | undefined> {
        return this.request<TrackProductViewRequest, void>('TrackProductViewRequest', {
            productView: {
                product: {
                    id: productId
                },
                ...(variantId && { variant: { id: variantId }}),
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

    public async trackSearchTerm({ term, language, user }: { term: string, user: User, language: string }): Promise<void | undefined> {
        return this.request<TrackSearchTermRequest, void>('TrackSearchTermRequest', {
            searchTerm: {
                language: {
                    value: language
                },
                term: term,
                user: user,
            }
        });
    }
}
