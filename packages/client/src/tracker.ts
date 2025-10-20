import { RelewiseClient, RelewiseClientOptions, RelewiseRequestOptions } from './relewise.client';
import {
    TrackOrderRequest, TrackCartRequest, TrackProductViewRequest, TrackProductCategoryViewRequest, TrackContentViewRequest, TrackContentCategoryViewRequest,
    TrackBrandViewRequest, User, TrackSearchTermRequest, TrackUserUpdateRequest, DataValue,
    FeedDwell,
    TrackFeedDwellRequest,
    TrackFeedItemClickRequest,
    TrackFeedItemPreviewRequest,
    FeedItem,
    TrackProductEngagementRequest,
    ContentEngagement,
    TrackContentEngagementRequest,
    ProductEngagementData,
    ProductAndVariantId,
    ContentEngagementData,
} from './models/data-contracts';

export class Tracker extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async trackOrder({ user, subtotal, orderNumber, lineItems, cartName = 'default', trackingNumber, data }: {
        user: User,
        subtotal: { currency: string, amount: number },
        orderNumber: string,
        /** @deprecated Use orderNumber instead. */
        trackingNumber?: string,
        lineItems: { productId: string, variantId?: string, lineTotal: number, quantity: number, data?: Record<string, DataValue> }[],
        data?: Record<string, DataValue>,
        cartName?: string
    }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackOrderRequest, void>('TrackOrderRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackOrderRequest, Relewise.Client',
            order: {
                $type: 'Relewise.Client.DataTypes.Order, Relewise.Client',
                lineItems: lineItems.map(l => ({
                    product: {
                        id: l.productId,
                    },
                    ...(l.variantId && { variant: { id: l.variantId } }),
                    lineTotal: l.lineTotal,
                    quantity: l.quantity,
                    data: l.data,
                })),
                subtotal: { amount: subtotal.amount, currency: { value: subtotal.currency } },
                orderNumber: orderNumber,
                trackingNumber: trackingNumber,
                cartName: cartName,
                data: data,
                user: user,
            },
        }, options);
    }

    public async trackCart({ user, subtotal, lineItems, data, cartName = 'default' }: {
        user?: User,
        subtotal: { currency: string, amount: number },
        lineItems: { productId: string, variantId?: string, lineTotal: number, quantity: number, data?: Record<string, DataValue> }[],
        data?: Record<string, DataValue>,
        cartName?: string
    }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackCartRequest, void>('TrackCartRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackCartRequest, Relewise.Client',
            cart: {
                $type: 'Relewise.Client.DataTypes.Cart, Relewise.Client',
                lineItems: lineItems.map(l => ({
                    product: {
                        id: l.productId,
                    },
                    ...(l.variantId && { variant: { id: l.variantId } }),
                    lineTotal: l.lineTotal,
                    quantity: l.quantity,
                    data: l.data,
                })),
                subtotal: { amount: subtotal.amount, currency: { value: subtotal.currency } },
                name: cartName,
                user: user,
                data: data,
            },
        }, options);
    }

    public async trackProductView({ productId, variantId, user }: { productId: string, variantId?: string, user: User }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackProductViewRequest, void>('TrackProductViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackProductViewRequest, Relewise.Client',
            productView: {
                $type: 'Relewise.Client.DataTypes.ProductView, Relewise.Client',
                product: {
                    id: productId,
                },
                ...(variantId && { variant: { id: variantId } }),
                user: user,
            },
        }, options);
    }

    public async trackProductCategoryView({ idPath, user }: { idPath: string[], user: User }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackProductCategoryViewRequest, void>('TrackProductCategoryViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackProductCategoryViewRequest, Relewise.Client',
            productCategoryView: {
                $type: 'Relewise.Client.DataTypes.ProductCategoryView, Relewise.Client',
                idPath: idPath,
                user: user,
            },
        }, options);
    }

    public async trackContentView({ contentId, user }: { contentId: string, user: User }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackContentViewRequest, void>('TrackContentViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackContentViewRequest, Relewise.Client',
            contentView: {
                $type: 'Relewise.Client.DataTypes.ContentView, Relewise.Client',
                content: {
                    id: contentId,
                },
                user: user,
            },
        }, options);
    }

    public async trackContentCategoryView({ idPath, user }: { idPath: string[], user: User }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackContentCategoryViewRequest, void>('TrackContentCategoryViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackContentCategoryViewRequest, Relewise.Client',
            contentCategoryView: {
                $type: 'Relewise.Client.DataTypes.ContentCategoryView, Relewise.Client',
                idPath: idPath,
                user: user,
            },
        }, options);
    }

    public async trackBrandView({ brandId, user }: { brandId: string, user: User }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackBrandViewRequest, void>('TrackBrandViewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackBrandViewRequest, Relewise.Client',
            brandView: {
                $type: 'Relewise.Client.DataTypes.BrandView, Relewise.Client',
                brand: {
                    id: brandId,
                },
                user: user,
            },
        }, options);
    }

    public async trackSearchTerm({ term, language, user }: { term: string, user: User, language: string }, options?: RelewiseRequestOptions): Promise<void | undefined> {
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
        }, options);
    }

    public async trackUserUpdate({ user, updateKind = 'UpdateAndAppend' }: { user: User, updateKind?: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace' }, options?: RelewiseRequestOptions): Promise<void | undefined> {
        return this.request<TrackUserUpdateRequest, void>('TrackUserUpdateRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackUserUpdateRequest, Relewise.Client',
            userUpdate: {
                $type: 'Relewise.Client.DataTypes.UserUpdate, Relewise.Client',
                user: user,
                kind: updateKind,
            },
        }, options);
    }

    public async trackProductEngagement({ user, engagement, product }: { user: User, product: ProductAndVariantId, engagement: ProductEngagementData }, options?: RelewiseRequestOptions) {
        return this.request<TrackProductEngagementRequest, void>('TrackProductEngagementRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackProductEngagementRequest, Relewise.Client',
            productEngagement: {
                $type: 'Relewise.Client.DataTypes.ProductEngagement, Relewise.Client',
                user: user,
                id: product,
                engagement: engagement
            }
        }, options);
    }

    public async trackContentEngagement({ user, engagement, contentId }: { user: User, contentId: string, engagement: ContentEngagementData }, options?: RelewiseRequestOptions) {
        return this.request<TrackContentEngagementRequest, void>('TrackContentEngagementRequest', {
            $type: 'Relewise.Client.Requests.Tracking.TrackContentEngagementRequest, Relewise.Client',
            contentEngagement: {
                $type: 'Relewise.Client.DataTypes.ContentEngagement, Relewise.Client',
                user: user,
                id: contentId,
                engagement: engagement
            }
        }, options);
    }

    public async trackFeedDwell({ user, feedId, dwellTimeMilliseconds, visibleItems }: { user: User; feedId: string, dwellTimeMilliseconds: number, visibleItems: FeedItem[] }, options?: RelewiseRequestOptions) {
        return this.request<TrackFeedDwellRequest, void>('TrackFeedDwellRequest', {
            $type: 'Relewise.Client.Requests.Tracking.Feed.TrackFeedDwellRequest, Relewise.Client',
            dwell: {
                $type: 'Relewise.Client.DataTypes.Feed.FeedDwell, Relewise.Client',
                user: user,
                feedId: feedId,
                dwellTimeMilliseconds: dwellTimeMilliseconds,
                visibleItems: visibleItems,
            }
        }, options);
    }

    public async trackFeedItemClick({ user, feedId, item }: { user: User; feedId: string; item?: FeedItem }, options?: RelewiseRequestOptions) {
        return this.request<TrackFeedItemClickRequest, void>('TrackFeedItemClickRequest', {
            $type: 'Relewise.Client.Requests.Tracking.Feed.TrackFeedItemClickRequest, Relewise.Client',
            click: {
                $type: 'Relewise.Client.DataTypes.Feed.FeedItemClick, Relewise.Client',
                user: user,
                feedId: feedId,
                item: item,
            }
        }, options);
    }

    public async trackFeedItemPreview({ user, feedId, item }: { user: User; feedId: string; item?: FeedItem }, options?: RelewiseRequestOptions) {
        return this.request<TrackFeedItemPreviewRequest, void>('TrackFeedItemPreviewRequest', {
            $type: 'Relewise.Client.Requests.Tracking.Feed.TrackFeedItemPreviewRequest, Relewise.Client',
            preview: {
                $type: 'Relewise.Client.DataTypes.Feed.FeedItemPreview, Relewise.Client',
                user: user,
                feedId: feedId,
                item: item,
            }
        }, options);
    }
}