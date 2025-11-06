import { FeedRecommendationInitializationBuilder, Recommender, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'Integration test',
    user: UserFactory.anonymous(),
};

test('Feed Recommendation', async () => {

    const request = new FeedRecommendationInitializationBuilder(settings, { minimumPageSize: 10 })
        .addCompostion({
            options: {
                type: 'Product',
                count: { lowerBoundInclusive: 1, upperBoundInclusive: 2 }
            },
            settingsBuilder: (builder) => {
                builder.rotationLimit(5)
            }
        });

    const result = await recommender.recommendFeedRecommendationInitialization(request.build());

    expect(result).not.toBe(undefined);
});