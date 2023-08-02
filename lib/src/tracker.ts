import { RelewiseClient, RelewiseClientOptions } from './relewise.client';
import { 
    TrackOrderRequest, TrackCartRequest, TrackProductViewRequest, TrackProductCategoryViewRequest, TrackContentViewRequest, TrackContentCategoryViewRequest,
    TrackBrandViewRequest, User, TrackSearchTermRequest, TrackUserUpdateRequest, DataValue,
} from './models/data-contracts';

export class Tracker extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }


    public async trackOrder({ user, subtotal, orderNumber, lineItems, cartName = 'default', trackingNumber }: {
        user: User,
        subtotal: { currency: string, amount: number },
        orderNumber: string,
        /** @deprecated Use orderNumber instead. */
        trackingNumber?: string,
        lineItems: { productId: string, variantId?: string, lineTotal: number, quantity: number }[], 
        cartName?: string
    }): Promise<void | undefined> {
        return this.request<TrackOrderRequest, void>('TrackOrderRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackOrderRequest, Relewise.Client',
            order: {
                $type: 'Relewise.Client.DataTypes.Order, Relewise.Client',
                lineItems: lineItems.map(l => ({
                    product: {
                        id: l.productId,
                    },
                    ...(l.variantId && { variant: { id: l.variantId }}),
                    lineTotal: l.lineTotal,
                    quantity: l.quantity,
                })),
                subtotal: { amount: subtotal.amount, currency: { value: subtotal.currency }},
                orderNumber: orderNumber,
                trackingNumber: trackingNumber,
                cartName: cartName,
                user: user,
            },
        });
    }

    public async trackCart({ user, subtotal, lineItems, data, cartName = 'default' }: { 
        user?: User, 
        subtotal: { currency: string, amount: number }, 
        lineItems: { productId: string, variantId?: string, lineTotal: number, quantity: number }[], 
        data?: Record<string, DataValue>, 
        cartName?: string 
    }): Promise<void | undefined> {
        return this.request<TrackCartRequest, void>('TrackCartRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackCartRequest, Relewise.Client',
            cart: {
                $type: 'Relewise.Client.DataTypes.Cart, Relewise.Client',
                lineItems: lineItems.map(l => ({
                    product: {
                        id: l.productId,
                    },
                    ...(l.variantId && { variant: { id: l.variantId }}),
                    lineTotal: l.lineTotal,
                    quantity: l.quantity,
                })),
                subtotal: { amount: subtotal.amount, currency: { value: subtotal.currency }},
                name: cartName,
                user: user,
                data: data,
            },
        });
    }

    public async trackProductView({ productId, variantId, user }: { productId: string, variantId?: string, user: User }): Promise<void | undefined> {
        return this.request<TrackProductViewRequest, void>('TrackProductViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackProductViewRequest, Relewise.Client',
            productView: {
                $type: 'Relewise.Client.DataTypes.ProductView, Relewise.Client',
                product: {
                    id: productId,
                },
                ...(variantId && { variant: { id: variantId }}),
                user: user,
            },
        });
    }

    public async trackProductCategoryView({ idPath, user }: { idPath: string[], user: User }): Promise<void | undefined> {
        return this.request<TrackProductCategoryViewRequest, void>('TrackProductCategoryViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackProductCategoryViewRequest, Relewise.Client',
            productCategoryView: {
                $type: 'Relewise.Client.DataTypes.ProductCategoryView, Relewise.Client',
                idPath: idPath,
                user: user,
            },
        });
    }

    public async trackContentView({ contentId, user }: { contentId: string, user: User }): Promise<void | undefined> {
        return this.request<TrackContentViewRequest, void>('TrackContentViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackContentViewRequest, Relewise.Client',
            contentView: {
                $type: 'Relewise.Client.DataTypes.ContentView, Relewise.Client',
                content: {
                    id: contentId,
                },
                user: user,
            },
        });
    }

    public async trackContentCategoryView({ idPath, user }: { idPath: string[], user: User }): Promise<void | undefined> {
        return this.request<TrackContentCategoryViewRequest, void>('TrackContentCategoryViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackContentCategoryViewRequest, Relewise.Client',
            contentCategoryView: {
                $type: 'Relewise.Client.DataTypes.ContentCategoryView, Relewise.Client',
                idPath: idPath,
                user: user,
            },
        });
    }

    public async trackBrandView({ brandId, user }: { brandId: string, user: User }): Promise<void | undefined> {
        return this.request<TrackBrandViewRequest, void>('TrackBrandViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackBrandViewRequest, Relewise.Client',
            brandView: {
                $type: 'Relewise.Client.DataTypes.BrandView, Relewise.Client',
                brand: {
                    id: brandId,
                },
                user: user,
            },
        });
    }

    public async trackSearchTerm({ term, language, user }: { term: string, user: User, language: string }): Promise<void | undefined> {
        return this.request<TrackSearchTermRequest, void>('TrackSearchTermRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackSearchTermRequest, Relewise.Client',
            searchTerm: {
                $type: 'Relewise.Client.DataTypes.SearchTerm, Relewise.Client',
                language: {
                    value: language,
                },
                term: term,
                user: user,
            },
        });
    }

    public async trackUserUpdate({ user, updateKind = 'UpdateAndAppend' }: { user: User, updateKind?: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace'  }): Promise<void | undefined> {
        return this.request<TrackUserUpdateRequest, void>('TrackUserUpdateRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackUserUpdateRequest, Relewise.Client',
            userUpdate: {
                $type: 'Relewise.Client.DataTypes.UserUpdate, Relewise.Client',
                user: user,
                kind: updateKind,
            },
        });
    }
}
