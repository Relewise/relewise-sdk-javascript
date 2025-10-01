import { FeedRecommendationNextItemsRequest } from '../../../models/data-contracts';

export class FeedRecommendationNextItemsBuilder {
    private initializedFeedId: string;

    constructor({ initializedFeedId }: { initializedFeedId: string }) {
        this.initializedFeedId = initializedFeedId;
    }

    public build() {
        const request: FeedRecommendationNextItemsRequest = {
            $type: 'Relewise.Client.Requests.Recommendations.Feed.FeedRecommendationNextItemsRequest, Relewise.Client',
            initializedFeedId: this.initializedFeedId,
        };

        return request;
    }
}
