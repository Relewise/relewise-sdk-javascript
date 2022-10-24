import { PersonalContentCategoryRecommendationRequest, PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationRequestCollection } from '../../../models/data-contracts';

export class ContentCategoriesRecommendationCollectionBuilder {
    private requests: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)[] = [];
    private distinctProductsAcrossResults: boolean = true;

    public addRequest(request: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctProductsAcrossResults(distinctProductsAcrossResults: boolean = true): this {
        this.distinctProductsAcrossResults = distinctProductsAcrossResults;

        return this;
    }

    public build(): ContentCategoryRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ContentRecommendationRequestCollection, Relewise.Client',
            requireDistinctContentAcrossResults: this.distinctProductsAcrossResults,
            requests: this.requests,
        }
    }
}