import { ContentSearchBuilder, ProductCategorySearchBuilder, ProductSearchBuilder, Searcher, UserFactory } from '../src';
import { fixtureRevision, fixtureRevisionKey } from './integrationFixtures';

const readinessTimeoutMs = 120_000;

// Retry visibility only: API/serialization errors must still fail the test immediately.
export async function awaitResultCount(
    description: string,
    resultCount: () => Promise<number | undefined>,
    expectedHits: number,
): Promise<void> {
    const deadline = Date.now() + readinessTimeoutMs;
    let hits: number | undefined;
    do {
        hits = await resultCount();
        if (hits === expectedHits) return;
        const remainingMs = deadline - Date.now();
        if (remainingMs <= 0) break;
        await new Promise(resolve => setTimeout(resolve, Math.min(500, remainingMs)));
    } while (Date.now() < deadline);
    throw new Error(`${description} was not ready within ${readinessTimeoutMs}ms: expected ${expectedHits} results, last observed ${hits ?? 'no response'}`);
}

const settings = (language: string) => ({
    language, currency: language === 'da' ? 'DKK' : 'USD',
    displayedAtLocation: 'integration fixture readiness', user: UserFactory.anonymous(),
});

export async function awaitProducts(searcher: Searcher, ids: string[], language = 'da'): Promise<void> {
    const request = new ProductSearchBuilder(settings(language))
        .filters(f => f.addProductIdFilter(ids)
            .addProductDataFilter(fixtureRevisionKey, c => c.addEqualsCondition(fixtureRevision))).build();
    await awaitResultCount(`Products (${language}): ${ids.join(', ')}`, async () => (await searcher.searchProducts(request))?.hits ?? undefined, ids.length);
}

export async function awaitContents(searcher: Searcher, ids: string[], language = 'da'): Promise<void> {
    const request = new ContentSearchBuilder(settings(language))
        .filters(f => f.addContentIdFilter(ids)
            .addContentDataFilter(fixtureRevisionKey, c => c.addEqualsCondition(fixtureRevision))).build();
    await awaitResultCount(`Content (${language}): ${ids.join(', ')}`, async () => (await searcher.searchContents(request))?.hits ?? undefined, ids.length);
}

export async function awaitProductCategories(searcher: Searcher, ids: string[]): Promise<void> {
    const request = new ProductCategorySearchBuilder(settings('da'))
        .filters(f => f.addProductCategoryIdFilter('ImmediateParent', ids)
            .addProductCategoryDataFilter(fixtureRevisionKey, c => c.addEqualsCondition(fixtureRevision))).build();
    await awaitResultCount(`Product categories: ${ids.join(', ')}`, async () => (await searcher.searchProductCategories(request))?.hits ?? undefined, ids.length);
}

export async function awaitRecommendations(
    description: string,
    recommend: () => Promise<{ recommendations?: unknown[] | null } | undefined>,
): Promise<void> {
    await awaitResultCount(description, async () => {
        const response = await recommend();
        return response === undefined ? undefined : Math.min(response.recommendations?.length ?? 0, 1);
    }, 1);
}
