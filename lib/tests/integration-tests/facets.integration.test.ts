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

test('SalesPrice facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addSalesPriceRangeFacet('Product'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('SalesPrice');
});

test('Brand facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addBrandFacet())
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Brand');
});

test('ProductData facet', async() => {

    const request: ProductSearchRequest = baseBuilder()
        .facets(f => f.addProductDataStringValueFacet('ShortDescription', 'Product'))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.facets?.items![0].field).toBe('Data');
});