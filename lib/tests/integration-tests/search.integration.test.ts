import { Searcher, ProductSearchBuilder, ProductSearchRequest, UserFactory, ValueSelectorFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseBuilder() {
    return new ProductSearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('Relevance modifier without conditions', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .relevanceModifiers(b => b.addProductDataRelevanceModifier("NoveltyBoostModifier", conditions => conditions, ValueSelectorFactory.dataDoubleSelector("NoveltyBoostModifier")))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});