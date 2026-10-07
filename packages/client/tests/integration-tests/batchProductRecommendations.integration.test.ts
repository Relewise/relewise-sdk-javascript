import { testId } from './testData';
import { ProductRecommendationRequestCollection, ProductsRecommendationCollectionBuilder, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, SearchTermPredictionBuilder, SearchTermPredictionRequest, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'batched integration test',
    user: UserFactory.anonymous(),
};

test('Batched Product Recommendations', async() => {

    const request: ProductRecommendationRequestCollection = new ProductsRecommendationCollectionBuilder()
        .addRequest(new ProductsViewedAfterViewingProductBuilder(settings).setNumberOfRecommendations(1).product({ productId: testId('1') }).build())
        .addRequest(new PurchasedWithProductBuilder(settings).setNumberOfRecommendations(1).product({ productId: testId('1') }).build())
        .build();

    const result = await recommender.batchProductRecommendations(request);

    expect(result?.responses).toHaveLength(2);
    for (const response of result?.responses ?? []) {
        expect(response.recommendations?.length).toBeGreaterThan(0);
    }

});
