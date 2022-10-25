import { PersonalProductCategoryRecommendationRequest, PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationRequestCollection } from '../../../models/data-contracts';

export class ProductCategoriesRecommendationCollectionBuilder {
    private requests: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)[] = [];
    private distinctProductsAcrossResults: boolean = true;

    public addRequest(request: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctProductsAcrossResults(distinctProductsAcrossResults: boolean = true): this {
        this.distinctProductsAcrossResults = distinctProductsAcrossResults;

        return this;
    }

    public build(): ProductCategoryRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ProductCategoryRecommendationRequestCollection, Relewise.Client',
            requireDistinctContentAcrossResults: this.distinctProductsAcrossResults,
            requests: this.requests,
        }
    }
}