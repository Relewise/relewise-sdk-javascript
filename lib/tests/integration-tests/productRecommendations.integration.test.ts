import { ProductRecommendationResponse, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'integration test',
    user: UserFactory.anonymous(),
};

test('PurchasedWithProduct', async() => {

    const result: ProductRecommendationResponse | undefined = await recommender.recommendProducts(new PurchasedWithProductBuilder(settings).product({productId: '1'}));

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});

test('ProductsViewedAfterViewingProduct', async() => {

    const result: ProductRecommendationResponse | undefined = await recommender.recommendProducts(new ProductsViewedAfterViewingProductBuilder(settings).product({productId: '1'}));

    expect(result).not.toBe(undefined);
    expect(result!.recommendations?.length).toBeGreaterThan(0);
});