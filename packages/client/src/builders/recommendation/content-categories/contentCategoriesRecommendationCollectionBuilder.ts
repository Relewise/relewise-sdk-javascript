import { PersonalContentCategoryRecommendationRequest, PopularContentCategoriesRecommendationRequest, ContentCategoryRecommendationRequestCollection } from '../../../models/data-contracts';

export class ContentCategoriesRecommendationCollectionBuilder {
    private requests: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)[] = [];
    private distinctCategoriesAcrossResults: boolean = true;
    private configuredContextValues: Record<string, string> | null = null;

    public addRequest(request: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctCategoriesAcrossResults(distinctCategoriesAcrossResults: boolean = true): this {
        this.distinctCategoriesAcrossResults = distinctCategoriesAcrossResults;

        return this;
    }

    public contextValues(contextValues: Record<string, string> | null): this {
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

    public build(): ContentCategoryRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ContentRecommendationRequestCollection, Relewise.Client',
            requireDistinctCategoriesAcrossResults: this.distinctCategoriesAcrossResults,
            requests: this.requests,
            contextValues: this.configuredContextValues ?? undefined,
        }
    }
}
