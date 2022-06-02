import { RelewiseClient } from "./relewise.client";
import {
    PurchasedWithProductRequest,
    ProductsViewedAfterViewingProductRequest,
    ProductsViewedAfterViewingContentRequest,
    PopularProductsRequest,
    RecentlyViewedProductsRequest,
    ProductRecommendationResponse,
    PurchasedWithMultipleProductsRequest,
    PurchasedWithCurrentCartRequest,
    SimilarProductsRequest,
    PersonalProductRecommendationRequest,
    SearchTermBasedProductRecommendationRequest,
    PopularSearchTermsRecommendationRequest,
    SortProductsRequest,
    SortVariantsRequest,
    CustomProductRecommendationRequest,
    ContentsViewedAfterViewingContentRequest,
    PersonalContentRecommendationRequest,
    ContentsViewedAfterViewingMultipleContentsRequest,
    ContentsViewedAfterViewingProductRequest,
    ContentsViewedAfterViewingMultipleProductsRequest,
    PopularContentsRequest,
} from "./models/data-contracts";

export class Recommender extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, serverUrl?: string) {
        super(datasetId, apiKey, serverUrl);
    }

    public async purchasedWithProduct(request: PurchasedWithProductRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithProductRequest, ProductRecommendationResponse>('PurchasedWithProductRequest', request);
    }

    public async productsViewedAfterViewingProduct(request: ProductsViewedAfterViewingProductRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ProductsViewedAfterViewingProductRequest, ProductRecommendationResponse>('ProductsViewedAfterViewingProductRequest', request);
    }

    public async productsViewedAfterViewingContent(request: ProductsViewedAfterViewingContentRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ProductsViewedAfterViewingContentRequest, ProductRecommendationResponse>('ProductsViewedAfterViewingContentRequest', request);
    }

    public async purchasedWithMultipleProducts(request: PurchasedWithMultipleProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithMultipleProductsRequest, ProductRecommendationResponse>('PurchasedWithMultipleProductsRequest', request);
    }

    public async purchasedWithCurrentCartRequest(request: PurchasedWithCurrentCartRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithCurrentCartRequest, ProductRecommendationResponse>('PurchasedWithCurrentCartRequest', request);
    }

    public async popularProducts(request: PopularProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PopularProductsRequest, ProductRecommendationResponse>('PopularProductsRequest', request);
    }

    public async recentlyViewedProducts(request: RecentlyViewedProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<RecentlyViewedProductsRequest, ProductRecommendationResponse>('RecentlyViewedProductsRequest', request);
    }

    public async similarProducts(request: SimilarProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SimilarProductsRequest, ProductRecommendationResponse>('SimilarProductsRequest', request);
    }

    public async personalProductRecommendation(request: PersonalProductRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PersonalProductRecommendationRequest, ProductRecommendationResponse>('PersonalProductRecommendationRequest', request);
    }

    public async searchTermBasedProductRecommendation(request: SearchTermBasedProductRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SearchTermBasedProductRecommendationRequest, ProductRecommendationResponse>('SearchTermBasedProductRecommendationRequest', request);
    }

    public async popularSearchTermsRecommendation(request: PopularSearchTermsRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PopularSearchTermsRecommendationRequest, ProductRecommendationResponse>('PopularSearchTermsRecommendationRequest', request);
    }

    public async sortProducts(request: SortProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SortProductsRequest, ProductRecommendationResponse>('SortProductsRequest', request);
    }

    public async sortVariants(request: SortVariantsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SortVariantsRequest, ProductRecommendationResponse>('SortVariantsRequest', request);
    }

    public async customProductRecommendation(request: CustomProductRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<CustomProductRecommendationRequest, ProductRecommendationResponse>('CustomProductRecommendationRequest', request);
    }

    public async contentsViewedAfterViewingContent(request: ContentsViewedAfterViewingContentRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingContentRequest, ProductRecommendationResponse>('ContentsViewedAfterViewingContentRequest', request);
    }

    public async personalContentRecommendation(request: PersonalContentRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PersonalContentRecommendationRequest, ProductRecommendationResponse>('PersonalContentRecommendationRequest', request);
    }

    public async contentsViewedAfterViewingMultipleContents(request: ContentsViewedAfterViewingMultipleContentsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingMultipleContentsRequest, ProductRecommendationResponse>('ContentsViewedAfterViewingMultipleContentsRequest', request);
    }

    public async contentsViewedAfterViewingProduct(request: ContentsViewedAfterViewingProductRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingProductRequest, ProductRecommendationResponse>('ContentsViewedAfterViewingProductRequest', request);
    }

    public async contentsViewedAfterViewingMultipleProducts(request: ContentsViewedAfterViewingMultipleProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingMultipleProductsRequest, ProductRecommendationResponse>('ContentsViewedAfterViewingMultipleProductsRequest', request);
    }

    public async popularContents(request: PopularContentsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PopularContentsRequest, ProductRecommendationResponse>('PopularContentsRequest', request);
    }
}