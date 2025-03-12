import { Searcher, ProductSearchBuilder, ProductSearchRequest, UserFactory, ValueSelectorFactory, DataValueFactory, GetProductFacet, ProductAssortmentFacet, ProductDataStringValueFacetResult, CategoryFacetResult } from '../../src';
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
        .setRetailMedia({
            location: {
                key: 'SEARCH_RESULTS_PAGE', placements: [{ key: 'TOP' }], variation: { key: 'DESKTOP' },
            },
        })
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Facet result', async() => {
    const request: ProductSearchRequest = baseProductBuilder()
        .facets(f => f.addProductAssortmentFacet('Product'))
        .facets(f => f.addProductDataStringValueFacet('AnyString', 'Product'))
        .facets(f => f.addCategoryFacet('ImmediateParent'))
        .build();

    const result = await searcher.searchProducts(request);

    if (result && result.facets) {
        const facet: ProductAssortmentFacet | null = GetProductFacet.productAssortment(result.facets, 'Product');
        expect(facet).toBeDefined();

        const facet2: ProductDataStringValueFacetResult | null = GetProductFacet.dataString(result.facets, 'AnyString', 'Product');
        expect(facet2).toBeDefined();

        const facet3: CategoryFacetResult | null = GetProductFacet.category(result.facets, 'ImmediateParent');
        expect(facet3).toBeDefined();
    }

    expect(result?.hits).toBeGreaterThan(0);
});

test('ProductSearch with search constraint', async() => {

    const request: ProductSearchRequest = baseProductBuilder()
        .searchConstraints(constraints => constraints.setResultMustHaveVariantConstraint({ exceptWhenProductHasNoVariants: true }))
        .build();

    const result = await searcher.searchProducts(request);

    expect(result?.hits).toBeGreaterThan(0);
});

test('Highlighting', async() => {
    const request: ProductSearchRequest = baseProductBuilder()
        .setTerm('SomeValue')    
        .highlighting(h => {
            h.setHighlightable({ dataKeys: ['SomeString'] })
            // You have to specify to include the offset.
            // Currently offset is the only way to get a result, so if not set, you won't get a result.
            h.setShape({  
                offsets: { include: true },
                snippets: { include: true, includeMatchedWords: true, useEllipses: true } 
            })
        }).build();
    const result = await searcher.searchProducts(request);

    expect(result?.results![0].highlight?.offsets?.data[0].value.length).toBeGreaterThan(0);
    expect(result?.results![0].highlight?.snippets?.data[0].value[0].text).toBe("SomeValue");
})
