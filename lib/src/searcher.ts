import { RelewiseClient, RelewiseClientOptions } from './relewise.client';
import { 
    SearchRequestCollection, 
    SearchResponseCollection, 
    ProductSearchRequest, 
    ProductSearchResponse,
    ProductCategorySearchRequest, 
    ProductCategorySearchResponse,
    ContentSearchRequest,
    ContentSearchResponse,
    SearchTermPredictionRequest,
    SearchTermPredictionResponse,
} from './models/data-contracts';

export class Searcher extends RelewiseClient {
    constructor(protected readonly datasetId: string, protected readonly apiKey: string, options?: RelewiseClientOptions) {
        super(datasetId, apiKey, options);
    }

    public async searchProducts(request: ProductSearchRequest): Promise<ProductSearchResponse | undefined> {
        return this.request<ProductSearchRequest, ProductSearchResponse>('ProductSearchRequest', request);
    }

    public async searchProductCategories(request: ProductCategorySearchRequest): Promise<ProductCategorySearchResponse | undefined> {
        return this.request<ProductCategorySearchRequest, ProductCategorySearchResponse>('ProductCategorySearchRequest', request);
    }

    public async searchContents(request: ContentSearchRequest): Promise<ContentSearchResponse | undefined> {
        return this.request<ContentSearchRequest, ContentSearchResponse>('ContentSearchRequest', request);
    }

    public async searchTermPrediction(request: SearchTermPredictionRequest): Promise<SearchTermPredictionResponse | undefined> {
        return this.request<SearchTermPredictionRequest, SearchTermPredictionResponse>('SearchTermPredictionRequest', request);
    }

    public async batch(requestCollections: SearchRequestCollection): Promise<SearchResponseCollection | undefined> {
        return this.request<SearchRequestCollection, SearchResponseCollection>('SearchRequestCollection', requestCollections);
    }
}