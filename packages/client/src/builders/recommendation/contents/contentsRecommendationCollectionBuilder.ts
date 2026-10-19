import { ContentsViewedAfterViewingContentRequest, ContentsViewedAfterViewingMultipleContentsRequest, ContentsViewedAfterViewingMultipleProductsRequest, ContentsViewedAfterViewingProductRequest, PersonalContentRecommendationRequest, PopularContentsRequest, ContentRecommendationRequestCollection } from '../../../models/data-contracts';

export class ContentsRecommendationCollectionBuilder {
    private requests: (ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest)[] = [];

    private distinctContentsAcrossResults: boolean = true;
    private configuredContextValues: Record<string, string> | null = null;

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

    /**
     * Context values used to determine which merchandising rules apply to requests in this collection,
     * such as DeviceType=Mobile or SplitTestVariant=A.
     * Keys and values are case-sensitive.
     * These values provide defaults for requests in the collection.
     * Request values override matching collection keys; other collection values are inherited.
     * A null or empty dictionary provides no defaults.
     * Values are visible in LiveView and are not stored on the user. Do not include sensitive information.
     * @param contextValues Context values to replace the current values with, or null to clear them.
     * @returns This builder.
     */
    public contextValues(contextValues: Record<string, string> | null): this {
        this.configuredContextValues = contextValues === null ? null : { ...contextValues };

        return this;
    }

    /**
     * Adds or replaces a single context value.
     * @param key The case-sensitive context value key.
     * @param value The context value.
     * @returns This builder.
     */
    public addContextValue(key: string, value: string): this {
        this.configuredContextValues = {
            ...(this.configuredContextValues ?? {}),
            [key]: value,
        };

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
