import { Searcher, GetContentFacet, UserFactory, CategoryFacetResult, ContentSearchBuilder, ContentSearchRequest, ContentAssortmentFacet, ContentDataStringValueFacetResult } from '../../src';
import { test, expect } from '@jest/globals'

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const searcher = new Searcher(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

function baseContentBuilder() {
    return new ContentSearchBuilder({
        language: 'da',
        currency: 'DKK',
        displayedAtLocation: 'integration test',
        user: UserFactory.anonymous(),
    });
};

test('Facet result', async() => {
    const request: ContentSearchRequest = baseContentBuilder()
        .facets(f => f.addContentAssortmentFacet())
        .facets(f => f.addContentDataStringValueFacet('AnyString'))
        .facets(f => f.addCategoryFacet('ImmediateParent'))
        .build();

    const result = await searcher.searchContents(request);

    if (result && result.facets) {
        const facet: ContentAssortmentFacet | null = GetContentFacet.assortment(result.facets);
        expect(facet).toBeDefined();

        const facet2: ContentDataStringValueFacetResult | null = GetContentFacet.dataString(result.facets, 'AnyString');
        expect(facet2).toBeDefined();

        const facet3: CategoryFacetResult | null = GetContentFacet.category(result.facets, 'ImmediateParent');
        expect(facet3).toBeDefined();
    }

    expect(result?.hits).toBeGreaterThan(0);
});

test('Highlighting', async() => {
    const request: ContentSearchRequest = baseContentBuilder()
        .setTerm('highlighted')    
        .highlighting(h => {
            h.setHighlightable({ dataKeys: ['Description'] })
            h.setLimit({ maxWordsBeforeMatch: 3 })
            // You have to specify to include the offset.
            // Currently offset is the only way to get a result, so if not set, you won't get a result.
            h.setShape({  
                offsets: { include: true },
                snippets: { include: true, includeMatchedWords: true, useEllipses: true } 
            })
        }).build();
    
    const result = await searcher.searchContents(request);

    expect(result?.results![0].highlight?.offsets?.data[0].value.length).toBeGreaterThan(0);
    expect(result?.results![0].highlight?.snippets?.data[0].value[0].text).toBe("...word should be highlighted");
})