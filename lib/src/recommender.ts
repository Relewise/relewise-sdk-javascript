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
} from './models/data-contracts';
import { ContentsRecommendationBuilder, ProductsRecommendationBuilder } from './builders';

export class Recommender extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    // public async recommendPurchasedWithProductRequest(request: PurchasedWithProductRequest): Promise<ProductRecommendationResponse | undefined> {
    //     return this.request<PurchasedWithProductRequest, ProductRecommendationResponse>('PurchasedWithProductRequest', request);
    // }

    public async recommendPopularSearchTerms(request: PopularSearchTermsRecommendationRequest): Promise<SearchTermRecommendationResponse | undefined> {
        return this.request<PopularSearchTermsRecommendationRequest, SearchTermRecommendationResponse>('PopularSearchTermsRecommendationRequest', request);
    }

    public async recommendProducts<TRequest>(builder: ProductsRecommendationBuilder<TRequest>): Promise<ProductRecommendationResponse | undefined> {
        const { name, request } = builder.build();
        return this.request<TRequest, ProductRecommendationResponse>(name, request);
    }

    // public async batchProductRecommendations(builder: ProductsRecommendationCollectionBuilder): Promise<ProductRecommendationResponseCollection | undefined> {
    //     const request  = builder.build();
    //     return this.request<ProductRecommendationRequestCollection, ProductRecommendationResponse>('ProductRecommendationRequestCollection', request);
    // }

    public async recommendContents<TRequest>(builder: ContentsRecommendationBuilder<TRequest>): Promise<ContentRecommendationResponse | undefined> {
        const { name, request } = builder.build();
        return this.request<TRequest, ContentRecommendationResponse>(name, request);
    }

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
}