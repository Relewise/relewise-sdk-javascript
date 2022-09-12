import { RelewiseClient, RelewiseClientOptions } from './relewise.client';
import {
    ProductRecommendationResponse,
    ContentRecommendationResponse,
    ProductRecommendationResponseCollection,
    ProductRecommendationRequestCollection,
    ContentRecommendationResponseCollection,
    ContentRecommendationRequestCollection,
    PopularSearchTermsRecommendationRequest,
    SearchTermRecommendationResponse,
    ContentCategoryRecommendationRequestCollection,
    ContentCategoryRecommendationResponseCollection,
    ProductCategoryRecommendationRequestCollection,
    ProductCategoryRecommendationResponseCollection,
    PopularBrandsRecommendationRequest,
    BrandRecommendationResponse,
    PersonalBrandRecommendationRequest,
    PurchasedWithProductRequest,
    PersonalContentCategoryRecommendationRequest,
    PopularContentCategoriesRecommendationRequest,
    ContentCategoryRecommendationResponse,
    PersonalProductCategoryRecommendationRequest,
    PopularProductCategoriesRecommendationRequest,
    ProductCategoryRecommendationResponse,
    PopularContentsRequest,
    PersonalContentRecommendationRequest,
    ContentsViewedAfterViewingProductRequest,
    ContentsViewedAfterViewingMultipleProductsRequest,
    ContentsViewedAfterViewingMultipleContentsRequest,
    ContentsViewedAfterViewingContentRequest,
    SortVariantsRequest,
    SortProductsRequest,
    SimilarProductsRequest,
    SearchTermBasedProductRecommendationRequest,
    RecentlyViewedProductsRequest,
    PurchasedWithMultipleProductsRequest,
    PurchasedWithCurrentCartRequest,
    ProductsViewedAfterViewingProductRequest,
    ProductsViewedAfterViewingContentRequest,
    PopularProductsRequest,
    PersonalProductRecommendationRequest,
} from './models/data-contracts';

export class Recommender extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async recommendPopularSearchTerms(request: PopularSearchTermsRecommendationRequest): Promise<SearchTermRecommendationResponse | undefined> {
        return this.request<PopularSearchTermsRecommendationRequest, SearchTermRecommendationResponse>('PopularSearchTermsRecommendationRequest', request);
    }

    //#region Brands

    public async recommendPersonalBrands(request: PersonalBrandRecommendationRequest): Promise<BrandRecommendationResponse | undefined> {
        return this.request<PersonalBrandRecommendationRequest, BrandRecommendationResponse>('PersonalBrandRecommendationRequest', request);
    }

    public async recommendPopularBrands(request: PopularBrandsRecommendationRequest): Promise<BrandRecommendationResponse | undefined> {
        return this.request<PopularBrandsRecommendationRequest, BrandRecommendationResponse>('PopularBrandsRecommendationRequest', request);
    }

    //#endregion

    //#region Content Categories
    public async recommendPersonalContentCategories(request: PersonalContentCategoryRecommendationRequest): Promise<ContentCategoryRecommendationResponse | undefined> {
        return this.request<PersonalContentCategoryRecommendationRequest, ContentCategoryRecommendationResponse>('PersonalContentCategoryRecommendationRequest', request);
    }

    public async recommendPopularContentCategories(request: PopularContentCategoriesRecommendationRequest): Promise<ContentCategoryRecommendationResponse | undefined> {
        return this.request<PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationResponse>('PopularContentCategoriesRecommendationRequest', request);
    }

    //#endregion

    //#region Product Categories
    public async recommendPersonalProductCategories(request: PersonalProductCategoryRecommendationRequest): Promise<ProductCategoryRecommendationResponse | undefined> {
        return this.request<PersonalProductCategoryRecommendationRequest, ProductCategoryRecommendationResponse>('PersonalProductCategoryRecommendationRequest', request);
    }

    public async recommendPopularProductCategories(request: PopularProductCategoriesRecommendationRequest): Promise<ProductCategoryRecommendationResponse | undefined> {
        return this.request<PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationResponse>('PopularProductCategoriesRecommendationRequest', request);
    }

    //#endregion

    //#region Products

    public async recommendPurchasedWithProduct(request: PurchasedWithProductRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithProductRequest, ProductRecommendationResponse>('PurchasedWithProductRequest', request);
    }

    public async recommendPurchasedWithMultipleProducts(request: PurchasedWithMultipleProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithMultipleProductsRequest, ProductRecommendationResponse>('PurchasedWithMultipleProductsRequest', request);
    }

    public async sortVariants(request: SortVariantsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SortVariantsRequest, ProductRecommendationResponse>('SortVariantsRequest', request);
    }

    public async sortProducts(request: SortProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SortProductsRequest, ProductRecommendationResponse>('SortProductsRequest', request);
    }

    public async recommendSimilarProducts(request: SimilarProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SimilarProductsRequest, ProductRecommendationResponse>('SimilarProductsRequest', request);
    }

    public async recommendSearchTermBasedProducts(request: SearchTermBasedProductRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<SearchTermBasedProductRecommendationRequest, ProductRecommendationResponse>('SearchTermBasedProductRecommendationRequest', request);
    }

    public async recentlyViewedProducts(request: RecentlyViewedProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<RecentlyViewedProductsRequest, ProductRecommendationResponse>('RecentlyViewedProductsRequest', request);
    }

    public async recommendPurchasedWithCurrentCart(request: PurchasedWithCurrentCartRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithCurrentCartRequest, ProductRecommendationResponse>('PurchasedWithCurrentCartRequest', request);
    }

    public async recommendProductsViewedAfterViewingProduct(request: ProductsViewedAfterViewingProductRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ProductsViewedAfterViewingProductRequest, ProductRecommendationResponse>('ProductsViewedAfterViewingProductRequest', request);
    }

    public async recommendProductsViewedAfterViewingContent(request: ProductsViewedAfterViewingContentRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<ProductsViewedAfterViewingContentRequest, ProductRecommendationResponse>('ProductsViewedAfterViewingContentRequest', request);
    }

    public async recommendPopularProducts(request: PopularProductsRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PopularProductsRequest, ProductRecommendationResponse>('PopularProductsRequest', request);
    }

    public async recommendPersonalProducts(request: PersonalProductRecommendationRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PersonalProductRecommendationRequest, ProductRecommendationResponse>('PersonalProductRecommendationRequest', request);
    }

    //#endregion

    //#region Content

    public async recommendPopularContents(request: PopularContentsRequest): Promise<ContentRecommendationResponse | undefined> {
        return this.request<PopularContentsRequest, ContentRecommendationResponse>('PopularContentsRequest', request);
    }

    public async recommendPersonalContents(request: PersonalContentRecommendationRequest): Promise<ContentRecommendationResponse | undefined> {
        return this.request<PersonalContentRecommendationRequest, ContentRecommendationResponse>('PopularContentsRequest', request);
    }

    public async recommendContentsViewedAfterViewingProduct(request: ContentsViewedAfterViewingProductRequest): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingProductRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingProductRequest', request);
    }

    public async recommendContentsViewedAfterViewingMultipleProducts(request: ContentsViewedAfterViewingMultipleProductsRequest): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingMultipleProductsRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingProductRequest', request);
    }

    public async recommendContentsViewedAfterViewingMultipleContents(request: ContentsViewedAfterViewingMultipleContentsRequest): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingMultipleContentsRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingMultipleContentsRequest', request);
    }

    public async recommendContentsViewedAfterViewingContent(request: ContentsViewedAfterViewingContentRequest): Promise<ContentRecommendationResponse | undefined> {
        return this.request<ContentsViewedAfterViewingContentRequest, ContentRecommendationResponse>('ContentsViewedAfterViewingContentRequest', request);
    }

    //#endregion

    //#region Batching 
    public async batchProductRecommendations(request: ProductRecommendationRequestCollection): Promise<ProductRecommendationResponseCollection | undefined> {
        return this.request<ProductRecommendationRequestCollection, ProductRecommendationResponseCollection>('ProductRecommendationRequestCollection', request);
    }

    public async batchContentRecommendations(request: ContentRecommendationRequestCollection): Promise<ContentRecommendationResponseCollection | undefined> {
        return this.request<ContentRecommendationRequestCollection, ContentRecommendationResponseCollection>('ContentRecommendationRequestCollection', request);
    }

    public async batchContentCategoryRecommendations(request: ContentCategoryRecommendationRequestCollection): Promise<ContentCategoryRecommendationResponseCollection | undefined> {
        return this.request<ContentCategoryRecommendationRequestCollection, ContentCategoryRecommendationResponseCollection>('ContentCategoryRecommendationRequestCollection', request);
    }

    public async batchProductCategoryRecommendations(request: ProductCategoryRecommendationRequestCollection): Promise<ProductCategoryRecommendationResponseCollection | undefined> {
        return this.request<ProductCategoryRecommendationRequestCollection, ProductCategoryRecommendationResponseCollection>('ProductCategoryRecommendationRequestCollection', request);
    }

    //#endregion
}