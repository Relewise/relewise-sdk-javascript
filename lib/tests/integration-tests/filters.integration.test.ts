import { ProductSearchBuilder, ProductSearchRequest, Searcher, UserFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseBuilder() {
    return new ProductSearchBuilder({
        language: 'en-US',
        currency: 'USD',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('Product Assortment filter', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .filters(f => f.addProductAssortmentFilter([10_000_000]))
        .pagination(p => p.setPageSize(20))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.results?.length).toBe(0);
});

test('Product Id filter', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .filters(f => f.addProductIdFilter(['p-1']))
        .pagination(p => p.setPageSize(20))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.results?.length).toBe(1);
});