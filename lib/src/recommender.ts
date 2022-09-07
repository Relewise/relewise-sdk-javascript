import { RelewiseClient, RelewiseClientOptions } from './relewise.client';
import {
    PurchasedWithProductRequest,
    ProductRecommendationResponse,
    ProductRecommendationRequest,
    ProductRecommendationRequestSettings,
    ContentRecommendationResponse,
    SelectedBrandPropertiesSettings,
    SelectedProductPropertiesSettings,
    SelectedVariantPropertiesSettings,
    ProductAndVariantId,
    ProductsViewedAfterViewingProductRequest,
    SimilarProductsRequest,
    ContentsViewedAfterViewingProductRequest,
    PurchasedWithCurrentCartRequest,
    ProductRecommendationResponseCollection,
    ProductRecommendationRequestCollection,
    CustomProductRecommendationRequest,
    PersonalProductRecommendationRequest,
    PopularProductsRequest,
    ProductsViewedAfterViewingContentRequest,
    PurchasedWithMultipleProductsRequest,
    RecentlyViewedProductsRequest,
    SearchTermBasedProductRecommendationRequest,
    SortProductsRequest,
    SortVariantsRequest,
    ContentRecommendationResponseCollection,
    ContentRecommendationRequestCollection,
    ContentsViewedAfterViewingContentRequest,
    ContentsViewedAfterViewingMultipleContentsRequest,
    ContentsViewedAfterViewingMultipleProductsRequest,
    PersonalContentRecommendationRequest,
    PopularContentsRequest,
    PopularSearchTermsRecommendationRequest,
    RecommendPopularSearchTermSettings,
    SearchTermRecommendationResponse,
    RecommendationRequest,
    ContentRecommendationRequestSettings,
    SelectedContentPropertiesSettings,
    SimilarProductsEvaluationSettings,
    Product,
} from './models/data-contracts';
import { FilterBuilder, Settings } from './builders';
import { UserFactory } from './factory/user.factory';

interface ProductsRecommendationBuider<TRequest> {
    build(): { request: TRequest, name: string };
};

interface ContentsRecommendationBuider<TRequest> {
    build(): { request: TRequest, name: string };
};

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

    public async recommendProducts<TRequest>(builder: ProductsRecommendationBuider<TRequest>): Promise<ProductRecommendationResponse | undefined> {
        const { name, request } = builder.build();
        return this.request<TRequest, ProductRecommendationResponse>(name, request);
    }

    // public async batchProductRecommendations(builder: ProductsRecommendationCollectionBuider): Promise<ProductRecommendationResponseCollection | undefined> {
    //     const request  = builder.build();
    //     return this.request<ProductRecommendationRequestCollection, ProductRecommendationResponse>('ProductRecommendationRequestCollection', request);
    // }

    public async batchProductRecommendations(request: ProductRecommendationRequestCollection): Promise<ProductRecommendationResponseCollection | undefined> {
        return this.request<ProductRecommendationRequestCollection, ProductRecommendationResponse>('ProductRecommendationRequestCollection', request);
    }

    public async recommendContents<TRequest>(builder: ContentsRecommendationBuider<TRequest>): Promise<ContentRecommendationResponse | undefined> {
        const { name, request } = builder.build();
        return this.request<TRequest, ContentRecommendationResponse>(name, request);
    }

    // public async batchContentRecommendations(builder: ContentsRecommendationCollectionBuider): Promise<ContentRecommendationResponseCollection | undefined> {
    //     const request  = builder.build();
    //     return this.request<ContentRecommendationRequestCollection, ProductRecommendationResponse>('ContentRecommendationResponseCollection', request);
    // }

    public async batchContentRecommendations(request: ContentRecommendationRequestCollection): Promise<ContentRecommendationResponseCollection | undefined> {
        return this.request<ContentRecommendationRequestCollection, ProductRecommendationResponse>('ContentRecommendationRequestCollection', request);
    }
}

export abstract class RecommendationRequestBuilder {
    private readonly filterBuilder: FilterBuilder = new FilterBuilder();

    constructor(
        private readonly settings: Settings) {
    }

    /**
     * Adds filters to the request
     * @param filterBuilder 
     * @returns 
     */
    public filters(filterBuilder: (builder: FilterBuilder) => void): this {
        filterBuilder(this.filterBuilder);

        return this;
    }

    protected baseBuild(): Omit<RecommendationRequest, '$type'> {
        return {
            currency: { value: this.settings.currency },
            user: this.settings.user,
            language: { value: this.settings.language },
            displayedAtLocationType: this.settings.displayedAtLocation,
            filters: this.filterBuilder.build() ?? {},
            relevanceModifiers: null ?? {},
        };
    }
}

export class ProductsRecommendationCollectionBuider {
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

    private requireDistinctProductsAcrossResults: boolean = true;

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

    public distinctProductsAcrossResults(required: boolean = true): this {
        this.requireDistinctProductsAcrossResults = required;

        return this;
    }

    public build(): ProductRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ProductRecommendationRequestCollection, Relewise.Client',
            requireDistinctProductsAcrossResults: this.requireDistinctProductsAcrossResults,
            requests: this.requests,
        };
    }
}

export class ContentsRecommendationCollectionBuider {
    private requests: (ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest)[] = [];

    private requireDistinctContentAcrossResults: boolean = true;

    public addRequest(request: ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest): this {
        this.requests.push(request);

        return this;
    }

    public distinctContentAcrossResults(required: boolean = true): this {
        this.requireDistinctContentAcrossResults = required;

        return this;
    }

    public build(): ContentRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ContentRecommendationRequestCollection, Relewise.Client',
            requireDistinctContentAcrossResults: this.requireDistinctContentAcrossResults,
            requests: this.requests,
        };
    }
}

export class ProductSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        recommendVariant: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setProductProperties(productProperties: SelectedProductPropertiesSettings): this {
        this.recommendationSettings.selectedProductProperties = productProperties;

        return this;
    }

    public setVariantProperties(variantProperties: SelectedVariantPropertiesSettings): this {
        this.recommendationSettings.selectedVariantProperties = variantProperties;

        return this;
    }

    public setBrandProperties(brandProperties: SelectedBrandPropertiesSettings): this {
        this.recommendationSettings.selectedBrandProperties = brandProperties;

        return this;
    }

    public setNumberOfRecommendations(count: number): this {
        this.recommendationSettings.numberOfRecommendations = count;

        return this;
    }

    public allowFillIfNecessaryToReachNumberOfRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowFillIfNecessaryToReachNumberOfRecommendations = allowed;

        return this;
    }

    public allowReplacingOfRecentlyShownRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowReplacingOfRecentlyShownRecommendations = allowed;

        return this;
    }

    public allowProductsCurrentlyInCart(allowed: boolean = true): this {
        this.recommendationSettings.allowProductsCurrentlyInCart = allowed;

        return this;
    }

    public prioritizeDiversityBetweenRequests(prioritize: boolean = true): this {
        this.recommendationSettings.prioritizeDiversityBetweenRequests = prioritize;

        return this;
    }

    public recommendVariant(recommend: boolean = true): this {
        this.recommendationSettings.recommendVariant = recommend;

        return this;
    }
}

export class ContentSettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setContentProperties(contentProperties: SelectedContentPropertiesSettings): this {
        this.recommendationSettings.selectedContentProperties = contentProperties;

        return this;
    }

    public setNumberOfRecommendations(count: number): this {
        this.recommendationSettings.numberOfRecommendations = count;

        return this;
    }

    public allowFillIfNecessaryToReachNumberOfRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowFillIfNecessaryToReachNumberOfRecommendations = allowed;

        return this;
    }

    public allowReplacingOfRecentlyShownRecommendations(allowed: boolean = true): this {
        this.recommendationSettings.allowReplacingOfRecentlyShownRecommendations = allowed;

        return this;
    }

    public prioritizeDiversityBetweenRequests(prioritize: boolean = true): this {
        this.recommendationSettings.prioritizeDiversityBetweenRequests = prioritize;

        return this;
    }
}

export class ProductRecommendationBuilder extends ProductSettingsRecommendationBuilder {
    protected productAndVariantId: ProductAndVariantId | null = null;

    constructor(
        settings: Settings) {
        super(settings);
    }

    public product(product: { productId: string, variantId?: string }): this {
        this.productAndVariantId = product;

        return this;
    }
}

export class PurchasedWithProductBuilder extends ProductRecommendationBuilder implements ProductsRecommendationBuider<PurchasedWithProductRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        // if (this.productAndVariantId === null) {
        //     throw new Error('Must specificy a product');
        // }

        const request: PurchasedWithProductRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId!,
            $type: 'Relewise.Client.Requests.Recommendations.PurchasedWithProductRequest, Relewise.Client',
        } as PurchasedWithProductRequest;

        return { request, name: 'PurchasedWithProductRequest' };
    }
}


export class PurchasedWithMultipleProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<PurchasedWithMultipleProductsRequest> {
    private products: ProductAndVariantId[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    public addProduct(product: { productId: string, variantId?: string }): this {
        this.products.push(product);

        return this;
    }

    public addProducts(products: { productId: string, variantId?: string }[]): this {
        products.forEach(x => this.products.push(x));

        return this;
    }

    public build() {
        const request: PurchasedWithMultipleProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantIds: this.products,
        };

        return { request, name: 'PurchasedWithMultipleProductsRequest' };
    }
}

export class SortProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<SortProductsRequest> {
    private ids: string[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setProductIds(productIds: string[]): this {
        this.ids = productIds;

        return this;
    }

    public build() {
        const request: SortProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productIds: this.ids,
        };

        return { request, name: 'SortProductsRequest' };
    }
}

export class SortVariantsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<SortVariantsRequest> {
    private id: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setProductId(productId: string): this {
        this.id = productId;

        return this;
    }

    public build() {
        const request: SortVariantsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productId: this.id,
        };

        return { request, name: 'SortVariantsRequest' };
    }
}

export class PopularProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<PopularProductsRequest> {
    private since: number = 0;
    private basedOnSelection: 'MostPurchased' | 'MostViewed' = 'MostPurchased';

    constructor(
        settings: Settings) {
        super(settings);
    }

    public basedOn(basedOn: 'MostPurchased' | 'MostViewed'): this {
        this.basedOnSelection = basedOn;

        return this;
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public build() {
        const request: PopularProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            basedOn: this.basedOnSelection,
            sinceMinutesAgo: this.since,
        };

        return { request, name: 'PopularProductsRequest' };
    }
}

export class RecentlyViewedProductsBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<RecentlyViewedProductsRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: RecentlyViewedProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return { request, name: 'RecentlyViewedProductsRequest' };
    }
}

export class PurchasedWithCurrentCartBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<PurchasedWithCurrentCartRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: PurchasedWithCurrentCartRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return { request, name: 'PurchasedWithCurrentCartRequest' };
    }
}

export class ProductsViewedAfterViewingProductBuilder extends ProductRecommendationBuilder implements ProductsRecommendationBuider<ProductsViewedAfterViewingProductRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        if (this.productAndVariantId === null) {
            throw new Error('Must specificy a product');
        }

        const request: ProductsViewedAfterViewingProductRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId,
            $type: 'Relewise.Client.Requests.Recommendations.ProductsViewedAfterViewingProductRequest, Relewise.Client',
        } as ProductsViewedAfterViewingProductRequest;

        return { request, name: 'ProductsViewedAfterViewingProductRequest' };
    }
}

export class PersonalProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<PersonalProductRecommendationRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: PersonalProductRecommendationRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return { request, name: 'PersonalProductRecommendationRequest' };
    }
}

export class ProductsViewedAfterViewingContentBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<ProductsViewedAfterViewingContentRequest> {
    private id: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    setContentId(contentId: string): this {
        this.id = contentId;

        return this;
    }

    public build() {
        const request: ProductsViewedAfterViewingContentRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            contentId: this.id,
        };

        return { request, name: 'ProductsViewedAfterViewingContentRequest' };
    }
}

export class ContentsViewedAfterViewingContentBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuider<ContentsViewedAfterViewingContentRequest> {
    private id: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    setContentId(contentId: string): this {
        this.id = contentId;

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingContentRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            contentId: this.id,
        };

        return { request, name: 'ContentsViewedAfterViewingContentRequest' };
    }
}


export class SearchTermBasedProductRecommendationBuilder extends ProductSettingsRecommendationBuilder implements ProductsRecommendationBuider<SearchTermBasedProductRecommendationRequest> {
    private term: string = '';

    constructor(
        settings: Settings) {
        super(settings);
    }

    setTerm(term: string): this {
        this.term = term;

        return this;
    }

    public build() {
        const request: SearchTermBasedProductRecommendationRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            term: this.term,
        };

        return { request, name: 'SearchTermBasedProductRecommendationRequest' };
    }
}

export class ContentsViewedAfterViewingProductBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuider<ContentsViewedAfterViewingProductRequest> {
    private productAndVariantId: ProductAndVariantId = {
        productId: '',
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public product(product: { productId: string, variantId?: string }): this {
        this.productAndVariantId = product;

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingProductRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantId: this.productAndVariantId,
        };

        return { request, name: 'ContentsViewedAfterViewingProductRequest' };
    }
}

export class PopularContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuider<PopularContentsRequest> {
    private since: number = 0;

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public build() {
        const request: PopularContentsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            sinceMinutesAgo: this.since,
        };

        return { request, name: 'PopularContentsRequest' };
    }
}

export class PersonalContentRecommendationBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuider<PersonalContentRecommendationRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: PersonalContentRecommendationRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,

        };

        return { request, name: 'PersonalContentRecommendationRequest' };
    }
}

export class ContentsViewedAfterViewingMultipleContentsBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuider<ContentsViewedAfterViewingMultipleContentsRequest> {
    private ids: string[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    setContentIds(...ids: string[]): this {
        this.ids = ids;

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingMultipleContentsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            contentIds: this.ids,
        };

        return { request, name: 'ContentsViewedAfterViewingMultipleContentsRequest' };
    }
}


export class ContentsViewedAfterViewingMultipleProductsBuilder extends ContentSettingsRecommendationBuilder implements ProductsRecommendationBuider<ContentsViewedAfterViewingMultipleProductsRequest> {
    private products: ProductAndVariantId[] = [];

    constructor(
        settings: Settings) {
        super(settings);
    }

    public addProduct(product: { productId: string, variantId?: string }): this {
        this.products.push(product);

        return this;
    }

    public addProducts(products: { productId: string, variantId?: string }[]): this {
        products.forEach(x => this.products.push(x));

        return this;
    }

    public build() {
        const request: ContentsViewedAfterViewingMultipleProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
            productAndVariantIds: this.products,
        };

        return { request, name: 'ContentsViewedAfterViewingMultipleProductsRequest' };
    }
}


export class PopularSearchTermsRecommendationBuilder extends RecommendationRequestBuilder {
    term: string | null | undefined;

    recommendationSettings: RecommendPopularSearchTermSettings = {
        numberOfRecommendations: 10,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setTerm(term: string | null | undefined): this {
        this.term = term;

        return this;
    }

    public addEntityType(...types: ('Product' | 'Variant' | 'ProductCategory' | 'Brand' | 'Content' | 'ContentCategory')[]): this {
        this.recommendationSettings.targetEntityTypes = types;

        return this;
    }

    public build() {
        const request: PopularSearchTermsRecommendationRequest = {
            ...this.baseBuild(),
            term: this.term,
            $type: '',
            settings: this.recommendationSettings,
        };

        return { request, name: 'PopularSearchTermsRecommendationRequest' };
    }
}



export class SimilarProductsProductBuilder extends ProductRecommendationBuilder implements ProductsRecommendationBuider<SimilarProductsRequest> {
    private evaluationSettings: SimilarProductsEvaluationSettings | null = null;
    private considerAlreadyKnownInformationAboutProduct: boolean = false;
    private productData: Product | null = null;

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setSimilarProductsEvaluationSettings(settings: SimilarProductsEvaluationSettings): this {
        this.evaluationSettings = settings;

        return this;
    }

    public build() {
        const request: SimilarProductsRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings as ProductRecommendationRequestSettings,
            existingProductId: this.productAndVariantId,
            considerAlreadyKnownInformationAboutProduct: this.considerAlreadyKnownInformationAboutProduct,
            productData: this.productData,
            evaluationSettings: this.evaluationSettings,
        };

        return { request, name: 'SimilarProductsRequest' };
    }
}

const settings = {
    language: 'da-DK',
    currency: 'DKK',
    displayedAtLocation: 'Product details page',
    user: UserFactory.anonymous(),
};

new Recommender('x', 'y')
    .recommendProducts(new PurchasedWithProductBuilder(settings))
    .then((p: ProductRecommendationResponse | undefined) => {
        return p;
    })

new Recommender('x', 'y')
    .recommendProducts(new PurchasedWithProductBuilder(settings).product({ productId: 'p-1' }))
    .then((p: ProductRecommendationResponse | undefined) => {
        return p;
    });
