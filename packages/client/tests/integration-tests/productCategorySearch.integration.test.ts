import { Searcher, ProductCategorySearchBuilder, ProductCategorySearchRequest, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseProductCategoryBuilder() {
    return new ProductCategorySearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('ProductCategorySearch', async() => {

    const request: ProductCategorySearchRequest = baseProductCategoryBuilder()
        .build();

    const result = await searcher.searchProductCategories(request);

    expect(result?.hits).toBeGreaterThan(0);
});