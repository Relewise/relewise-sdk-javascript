import { ContentsViewedAfterViewingContentRequest, ContentsViewedAfterViewingMultipleContentsRequest, ContentsViewedAfterViewingMultipleProductsRequest, ContentsViewedAfterViewingProductRequest, PersonalContentRecommendationRequest, PopularContentsRequest, ContentRecommendationRequestCollection } from '../../../models/data-contracts';

export class ContentsRecommendationCollectionBuilder {
    private requests: (ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest)[] = [];

    private distinctContentsAcrossResults: boolean = true;
    private configuredContextValues: Record<string, string | null> | null = null;

    public addRequest(request: ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest): this {
        this.requests.push(request);

        return this;
    }

    public requireDistinctContentsAcrossResults(distinctContentsAcrossResults: boolean = true): this {
        this.distinctContentsAcrossResults = distinctContentsAcrossResults;

        return this;
    }

    public contextValues(contextValues: Record<string, string | null> | null): this {
        this.configuredContextValues = contextValues;

        return this;
    }

    public build(): ContentRecommendationRequestCollection {
        return {
            $type: 'Relewise.Client.Requests.Recommendations.ContentRecommendationRequestCollection, Relewise.Client',
            requireDistinctContentsAcrossResults: this.distinctContentsAcrossResults,
            requests: this.requests,
            contextValues: this.configuredContextValues ?? undefined,
        };
    }
}
