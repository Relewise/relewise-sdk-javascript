import { ContentSearchBuilder, ProductCategorySearchBuilder, ProductSearchBuilder, Searcher, UserFactory } from '../src';

const readinessTimeoutMs = 120_000;

// Retry visibility only: API/serialization errors must still fail the test immediately.
export async function awaitSearchHits(
    description: string,
    search: () => Promise<{ hits?: number | null } | undefined>,
    expectedHits: number,
): Promise<void> {
    const deadline = Date.now() + readinessTimeoutMs;
    let hits: number | undefined;
    do {
        hits = (await search())?.hits ?? undefined;
        if (hits === expectedHits) return;
        const remainingMs = deadline - Date.now();
        if (remainingMs <= 0) break;
        await new Promise(resolve => setTimeout(resolve, Math.min(500, remainingMs)));
    } while (Date.now() < deadline);
    throw new Error(`${description} was not indexed within ${readinessTimeoutMs}ms: expected ${expectedHits} hits, last observed ${hits ?? 'no response'}`);
}

const settings = (language: string) => ({
    language, currency: language === 'da' ? 'DKK' : 'USD',
    displayedAtLocation: 'integration fixture readiness', user: UserFactory.anonymous(),
});

export async function awaitProducts(searcher: Searcher, ids: string[], language = 'da'): Promise<void> {
    const request = new ProductSearchBuilder(settings(language))
        .filters(f => f.addProductIdFilter(ids)).build();
    await awaitSearchHits(`Products (${language}): ${ids.join(', ')}`, () => searcher.searchProducts(request), ids.length);
}

export async function awaitContents(searcher: Searcher, ids: string[], language = 'da'): Promise<void> {
    const request = new ContentSearchBuilder(settings(language))
        .filters(f => f.addContentIdFilter(ids)).build();
    await awaitSearchHits(`Content (${language}): ${ids.join(', ')}`, () => searcher.searchContents(request), ids.length);
}

export async function awaitProductCategories(searcher: Searcher, ids: string[]): Promise<void> {
    const request = new ProductCategorySearchBuilder(settings('da'))
        .filters(f => f.addProductCategoryIdFilter('ImmediateParent', ids)).build();
    await awaitSearchHits(`Product categories: ${ids.join(', ')}`, () => searcher.searchProductCategories(request), ids.length);
}
