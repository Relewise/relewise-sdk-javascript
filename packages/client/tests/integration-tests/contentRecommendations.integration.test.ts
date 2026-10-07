import { testId } from './testData';
import { ContentRecommendationResponse, ContentsViewedAfterViewingContentBuilder, PersonalContentRecommendationBuilder, PopularContentsBuilder, ProductRecommendationResponse, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'integration test',
    user: UserFactory.byTemporaryId(testId('recommendation-viewer')),
};

test('ContentsViewedAfterViewing', async() => {

    const result: ContentRecommendationResponse | undefined = await recommender.recommendContentsViewedAfterViewingContent(new ContentsViewedAfterViewingContentBuilder(settings).setContentId(testId('1')).build());

    expect(result).toBeDefined();
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('PopularContents', async() => {

    const result: ContentRecommendationResponse | undefined = await recommender.recommendPopularContents(new PopularContentsBuilder(settings).sinceMinutesAgo(5000).build());

    expect(result).toBeDefined();
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('PersonalContent', async() => {
    const result: ContentRecommendationResponse | undefined = await recommender.recommendPersonalContents(new PersonalContentRecommendationBuilder(settings).build());

    expect(result).toBeDefined();
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});
