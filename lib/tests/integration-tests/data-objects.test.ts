import { Searcher, ProductSearchBuilder, ProductSearchRequest, UserFactory, ValueSelectorFactory, DataValueFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseBuilder() {
    return new ProductSearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test - data object',
        user: UserFactory.anonymous(),
    });
};

// TODO: Enable when the API supports this!

// test('Test data objects can be deserialized', async() => {

//     const request: ProductSearchRequest = baseBuilder()
//         .filters(b => 
//             b.addProductDataFilter(
//                 'DataObject', 
//                 conditions => conditions.addContainsCondition(DataValueFactory.object({'d': DataValueFactory.string('a')}))),
//         )
//         .build();

//     const result = await searcher.searchProducts(request);

//     expect(result?.hits).toBe(0);
// });