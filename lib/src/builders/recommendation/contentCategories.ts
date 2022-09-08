import { ContentCategoryRecommendationRequestSettings, SelectedContentCategoryPropertiesSettings, PersonalContentCategoryRecommendationRequest, ContentCategoryRecommendationWeights, PopularContentCategoriesRecommendationRequest } from '@/models/data-contracts';
import { RecommendationRequestBuilder } from '@/recommender';
import { Settings } from '../settings';

export class ContentCategorySettingsRecommendationBuilder extends RecommendationRequestBuilder {
    protected recommendationSettings: ContentCategoryRecommendationRequestSettings = {
        allowFillIfNecessaryToReachNumberOfRecommendations: true,
        allowReplacingOfRecentlyShownRecommendations: true,
        numberOfRecommendations: 10,
        prioritizeDiversityBetweenRequests: false,
    };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public setContentCategoryProperties(ContentCategoryProperties: SelectedContentCategoryPropertiesSettings): this {
        this.recommendationSettings.selectedContentCategoryProperties = ContentCategoryProperties;

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

interface ContentCategoriesRecommendationBuider<TRequest> {
    build(): { request: TRequest, name: string };
};

export class PersonalContentCategoryRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuider<PersonalContentCategoryRecommendationRequest> {
    private since: number = 0;
    private weights: ContentCategoryRecommendationWeights = { categoryViews: 1.0, contentViews: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: ContentCategoryRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PersonalContentCategoryRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PersonalContentCategoryRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),
            sinceMinutesAgo: this.since,
            weights: this.weights,

            settings: this.recommendationSettings,
        };

        return { request, name: 'PersonalContentCategoryRecommendationRequest' };
    }
}

export class PopularContentCategoriesRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuider<PopularContentCategoriesRecommendationRequest> {
    private since: number = 0;
    private weights: ContentCategoryRecommendationWeights = { categoryViews: 1.0, contentViews: 1.0 };

    constructor(
        settings: Settings) {
        super(settings);
    }

    public sinceMinutesAgo(sinceMinutesAgo: number): this {
        this.since = sinceMinutesAgo;

        return this;
    }

    public setWeights(weights: ContentCategoryRecommendationWeights): this {
        this.weights = weights;

        return this;
    }

    public build() {
        const request: PopularContentCategoriesRecommendationRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.PopularContentCategoriesRecommendationRequest, Relewise.Client',
            ...this.baseBuild(),         
            sinceMinutesAgo: this.since,
            weights: this.weights,
            settings: this.recommendationSettings,
        };

        return { request, name: 'PopularContentCategoriesRecommendationRequest' };
    }
}