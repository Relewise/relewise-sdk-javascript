import { Settings } from '@/builders/settings';
import { PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationWeights } from '@/models/data-contracts';
import { ContentCategoriesRecommendationBuilder } from './contentCategoriesRecommendationBuilder';
import { ContentCategorySettingsRecommendationBuilder } from './contentCategorySettingsRecommendationBuilder';

export class PopularContentCategoriesRecommendationBuilder extends ContentCategorySettingsRecommendationBuilder implements ContentCategoriesRecommendationBuilder<PopularContentCategoriesRecommendationRequest> {
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

        return request;
    }
}