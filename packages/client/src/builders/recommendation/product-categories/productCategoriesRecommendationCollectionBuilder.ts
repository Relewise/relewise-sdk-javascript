import { PersonalProductCategoryRecommendationRequest, PopularProductCategoriesRecommendationRequest, ProductCategoryRecommendationRequestCollection } from '../../../models/data-contracts';

export class ProductCategoriesRecommendationCollectionBuilder {
    private requests: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)[] = [];
    private distinctCategoriesAcrossResults: boolean = true;
    private configuredContextValues: Record<string, string | null> | null = null;

    public addRequest(request: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults: boolean = true): this {
        this.distinctCategoriesAcrossResults = distinctCategoriesAcrossResults;

        return this;
    }

    public contextValues(contextValues: Record<string, string | null> | null): this {
        this.configuredContextValues = contextValues === null ? null : { ...contextValues };

        return this;
    }

    public addContextValue(key: string, value: string): this {
        this.configuredContextValues = {
            ...(this.configuredContextValues ?? {}),
            [key]: value,
        };

        return this;
    }

    public build(): ProductCategoryRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ProductCategoryRecommendationRequestCollection, Relewise.Client',
            requireDistinctCategoriesAcrossResults: this.distinctCategoriesAcrossResults,
            requests: this.requests,
            contextValues: this.configuredContextValues ?? undefined,
        }
    }
}
