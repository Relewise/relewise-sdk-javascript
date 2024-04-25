import { Searcher, ProductSearchBuilder, ProductSearchRequest, UserFactory, ValueSelectorFactory, DataValueFactory } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseProductBuilder() {
    return new ProductSearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('ProductSearch: Relevance modifier without conditions', async() => {

    const request: ProductSearchRequest = baseProductBuilder()
        .relevanceModifiers(b => b.addProductDataRelevanceModifier('NoveltyBoostModifier', conditions => conditions, ValueSelectorFactory.dataDoubleSelector('NoveltyBoostModifier')))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Product search - data object facets', async() => {
    const request: ProductSearchRequest = baseProductBuilder()
        .facets(f => f.addProductDataObjectFacet(
            't',
            'Product',
            f => f
                .addStringFacet('d', ['values'])
                .addBooleanFacet('b', [true]),
            {
                conditions: c => c.addContainsCondition('d', DataValueFactory.boolean(true)),
                take: 1,
                skip: 2,
            },
            { alwaysIncludeSelectedInAvailable: true, includeZeroHitsInAvailable: false }))

        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Retail Media search', async() => {
    const request: ProductSearchRequest = baseProductBuilder()
        .setRetailMediaSettings({
            selectors: [
                { locationSlug: 'SEARCH_RESULTS_PAGE', placeholderSlug: 'TOP', variationSlug: 'DESKTOP' },
            ],
        })
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Retail Media search', async() => {
    const request: ProductSearchRequest = baseProductBuilder()
        .setRetailMediaSelectors([
            { locationSlug: 'SEARCH_RESULTS_PAGE', placeholderSlug: 'TOP', variationSlug: 'DESKTOP' },
            { locationSlug: 'CATEGORY_PAGE', placeholderSlug: 'TOP', variationSlug: 'DESKTOP' },
        ])
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});