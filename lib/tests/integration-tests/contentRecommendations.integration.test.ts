import { ContentRecommendationResponse, ContentsViewedAfterViewingContentBuilder, PopularContentsBuilder, ProductRecommendationResponse, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'integration test',
    user: UserFactory.anonymous(),
};

test('ContentsViewedAfterViewing', async() => {

    const result: ContentRecommendationResponse | undefined = await recommender.recommendProducts(new ContentsViewedAfterViewingContentBuilder(settings).setContentId('1087'));

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('PopularContents', async() => {

    const result: ContentRecommendationResponse | undefined = await recommender.recommendProducts(new PopularContentsBuilder(settings).sinceMinutesAgo(5000));

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});