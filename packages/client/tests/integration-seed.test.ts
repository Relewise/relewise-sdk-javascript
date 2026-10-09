import { test } from '@jest/globals';
import { BrandUpdateBuilder, ContentCategoryUpdateBuilder, ContentUpdateBuilder, Integrator, ProductCategoryUpdateBuilder, ProductUpdateBuilder, ProductVariantBuilder } from '@relewise/integrations';
import { ContentSearchBuilder, DataValueFactory, ProductCategorySearchBuilder, ProductSearchBuilder, Searcher, Tracker, UserFactory } from '../src';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });
const searcher = new Searcher(datasetId!, apiKey!, { serverUrl });
const tracker = new Tracker(datasetId!, apiKey!, { serverUrl });

test('create or update persistent client fixtures', async () => {
    await integrator.updateBrand(new BrandUpdateBuilder({ id: '1', updateKind: 'ReplaceProvidedProperties' }).displayName('Relewise').build());
    for (const id of ['1', '2', '3', '4']) {
        await integrator.updateProductCategory(new ProductCategoryUpdateBuilder({ id, kind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: `Category ${id}` }]).build());
        await integrator.updateContentCategory(new ContentCategoryUpdateBuilder({ id, kind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: `Category ${id}` }]).build());
    }
    for (const id of ['1', '2', '3']) {
        await integrator.updateProduct(new ProductUpdateBuilder({
            id, productUpdateKind: 'ReplaceProvidedProperties',
            variantUpdateKind: 'ReplaceProvidedProperties', replaceExistingVariants: true,
        })
            .displayName([{ language: 'da', value: `Product ${id}` }, { language: 'en-US', value: `Product ${id}` }])
            .data({
                SomeString: DataValueFactory.string('SomeValue'),
                'some-data-key': DataValueFactory.number(10000),
                objects: DataValueFactory.objectCollection([{ list: DataValueFactory.stringCollection(['123', '456', '789']) }]),
            })
            .assortments([1, 2, 3])
            .brand({ id: '1', displayName: 'Relewise' })
            .listPrice([{ amount: 100, currency: 'DKK' }, { amount: 100, currency: 'USD' }])
            .salesPrice([{ amount: 50, currency: 'DKK' }, { amount: 50, currency: 'USD' }])
            .categoryPaths(c => c.path(p => p.category({ id: id === '3' ? '2' : '1' })))
            .variants([
                new ProductVariantBuilder({ id: 'numeric' }).data({ availableMarkets: DataValueFactory.number(1693526400) }).build(),
                new ProductVariantBuilder({ id: 'object' }).data({ availableMarkets: DataValueFactory.object({
                    US: DataValueFactory.object({ ValidFromDate: DataValueFactory.number(1693526400) }),
                }) }).build(),
            ]).build());
        await integrator.updateContent(new ContentUpdateBuilder({ id, updateKind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: `Content ${id}` }, { language: 'en-US', value: `Content ${id}` }])
            .data({ Description: DataValueFactory.multilingual([{ language: 'da', value: 'The last word should be highlighted' }]) })
            .assortments([1, 2, 3]).categoryPaths(c => c.path(p => p.category({ id: '1' }))).build());
    }

    // Retain these users and their behavior along with the catalog.
    const user = UserFactory.byTemporaryId('javascript-sdk-seed-viewer');
    await tracker.trackOrder({ user, orderNumber: `javascript-sdk-${Date.now()}`, subtotal: { amount: 200, currency: 'DKK' },
        lineItems: [{ productId: '1', quantity: 1, lineTotal: 100 }, { productId: '2', quantity: 1, lineTotal: 100 }] });
    for (const id of ['1', '2', '3']) {
        await tracker.trackProductView({ productId: id, user });
        await tracker.trackContentView({ contentId: id, user });
    }

    await Promise.all([
        ...['da', 'en-US'].map(async language => {
            const settings = { language, currency: language === 'da' ? 'DKK' : 'USD', displayedAtLocation: 'integration test', user: UserFactory.anonymous() };
            await Promise.all([
                waitForHits(() => searcher.searchProducts(new ProductSearchBuilder(settings).filters(f => f.addProductIdFilter(['1', '2', '3'])).build()), 3),
                waitForHits(() => searcher.searchContents(new ContentSearchBuilder(settings).filters(f => f.addContentIdFilter(['1', '2', '3'])).build()), 3),
            ]);
        }),
        waitForHits(() => searcher.searchProductCategories(new ProductCategorySearchBuilder({
            language: 'da', currency: 'DKK', displayedAtLocation: 'integration test', user: UserFactory.anonymous(),
        }).filters(f => f.addProductCategoryIdFilter('ImmediateParent', ['1', '2', '3', '4'])).build()), 4),
    ]);
}, 360_000);

// Only the initial seed needs to wait for indexing on a fresh dataset.
async function waitForHits(search: () => Promise<{ hits?: number | null } | undefined>, expectedHits: number): Promise<void> {
    const deadline = Date.now() + 300_000;
    while (Date.now() < deadline) {
        if ((await search())?.hits === expectedHits) return;
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    throw new Error(`Seed fixtures not searchable: expected ${expectedHits} hits`);
}
