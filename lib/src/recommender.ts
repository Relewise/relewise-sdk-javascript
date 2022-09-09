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
} from './models/data-contracts';

export class Recommender extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
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

    public async recommendPurchasedWithProduct(request: PurchasedWithProductRequest): Promise<ProductRecommendationResponse | undefined> {
        return this.request<PurchasedWithProductRequest, ProductRecommendationResponse>('PurchasedWithProductRequest', request);
    }

    public async recommendPopularSearchTerms(request: PopularSearchTermsRecommendationRequest): Promise<SearchTermRecommendationResponse | undefined> {
        return this.request<PopularSearchTermsRecommendationRequest, SearchTermRecommendationResponse>('PopularSearchTermsRecommendationRequest', request);
    }

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