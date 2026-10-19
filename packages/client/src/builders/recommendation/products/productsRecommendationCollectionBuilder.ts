import { CustomProductRecommendationRequest, PersonalProductRecommendationRequest, PopularProductsRequest, ProductsViewedAfterViewingContentRequest, ProductsViewedAfterViewingProductRequest, PurchasedWithCurrentCartRequest, PurchasedWithMultipleProductsRequest, PurchasedWithProductRequest, RecentlyViewedProductsRequest, SearchTermBasedProductRecommendationRequest, SimilarProductsRequest, SortProductsRequest, SortVariantsRequest, ProductRecommendationRequestCollection } from '../../../models/data-contracts';

export class ProductsRecommendationCollectionBuilder {
    private requests: (CustomProductRecommendationRequest
        | PersonalProductRecommendationRequest
        | PopularProductsRequest
        | ProductsViewedAfterViewingContentRequest
        | ProductsViewedAfterViewingProductRequest
        | PurchasedWithCurrentCartRequest
        | PurchasedWithMultipleProductsRequest
        | PurchasedWithProductRequest
        | RecentlyViewedProductsRequest
        | SearchTermBasedProductRecommendationRequest
        | SimilarProductsRequest
        | SortProductsRequest
        | SortVariantsRequest)[] = [];

    private distinctProductsAcrossResults: boolean = true;
    private configuredContextValues: Record<string, string> | null = null;

    public addRequest(request: CustomProductRecommendationRequest
        | PersonalProductRecommendationRequest
        | PopularProductsRequest
        | ProductsViewedAfterViewingContentRequest
        | ProductsViewedAfterViewingProductRequest
        | PurchasedWithCurrentCartRequest
        | PurchasedWithMultipleProductsRequest
        | PurchasedWithProductRequest
        | RecentlyViewedProductsRequest
        | SearchTermBasedProductRecommendationRequest
        | SimilarProductsRequest
        | SortProductsRequest
        | SortVariantsRequest): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctProductsAcrossResults(distinctProductsAcrossResults: boolean = true): this {
        this.distinctProductsAcrossResults = distinctProductsAcrossResults;

        return this;
    }

    /**
     * Context values used to determine which merchandising rules apply to requests in this collection,
     * such as DeviceType=Mobile or SplitTestVariant=A.
     * Keys and values are case-sensitive.
     * These values provide defaults for requests in the collection.
     * Request values override matching collection keys; other collection values are inherited.
     * A null or empty dictionary provides no defaults.
     * Values are visible in LiveView and are not stored on the user. Do not include sensitive information.
     * @param contextValues Context values to replace the current values with, or null to clear them.
     * @returns This builder.
     */
    public contextValues(contextValues: Record<string, string> | null): this {
        this.configuredContextValues = contextValues === null ? null : { ...contextValues };

        return this;
    }

    /**
     * Adds or replaces a single context value.
     * @param key The case-sensitive context value key.
     * @param value The case-sensitive context value.
     * @returns This builder.
     */
    public addContextValue(key: string, value: string): this {
        this.configuredContextValues = {
            ...(this.configuredContextValues ?? {}),
            [key]: value,
        };

        return this;
    }

    public build(): ProductRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ProductRecommendationRequestCollection, Relewise.Client',
            requireDistinctProductsAcrossResults: this.distinctProductsAcrossResults,
            requests: this.requests,
            contextValues: this.configuredContextValues ?? undefined,
        };
    }
}
