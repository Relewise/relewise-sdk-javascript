import { ProductCategoryRecommendationRequestSettings, SelectedProductCategoryPropertiesSettings, PersonalProductCategoryRecommendationRequest, ProductCategoryRecommendationWeights, PopularProductCategoriesRecommendationRequest } from '@/models/data-contracts';
import { RecommendationRequestBuilder } from '@/recommender';
import { Settings } from '../settings';

export class ProductCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ProductCategoryRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setProductCategoryProperties(ProductCategoryProperties: SelectedProductCategoryPropertiesSettings): this {
        this.recommendationSettings.selectedProductCategoryProperties = ProductCategoryProperties;

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

interface ProductCategoriesRecommendationBuider<TRequest> {
    build(): { request: TRequest, name: string };
};

export class PersonalProductCategoryRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuider<PersonalProductCategoryRecommendationRequest> {
    private since: number = 0;
    private weights: ProductCategoryRecommendationWeights = { categoryViews: 1.0, productViews: 1.0, productPurchases: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: ProductCategoryRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PersonalProductCategoryRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PersonalProductCategoryRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            sinceMinutesAgo: this.since,
            weights: this.weights,

            settings: this.recommendationSettings,
        };

        return { request, name: 'PersonalProductCategoryRecommendationRequest' };
    }
}

export class PopularProductCategoriesRecommendationBuilder extends ProductCategorySettingsRecommendationBuilder implements ProductCategoriesRecommendationBuider<PopularProductCategoriesRecommendationRequest> {
    private since: number = 0;
    private weights: ProductCategoryRecommendationWeights = { categoryViews: 1.0, productViews: 1.0, productPurchases: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: ProductCategoryRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PopularProductCategoriesRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularProductCategoriesRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),         
            sinceMinutesAgo: this.since,
            weights: this.weights,
            settings: this.recommendationSettings,
        };

        return { request, name: 'PopularProductCategoriesRecommendationRequest' };
    }
}