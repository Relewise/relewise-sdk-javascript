import { syncIntegrationSearchIndex } from './integrationIndexSync';
import { awaitProducts, awaitContents, awaitProductCategories } from './integrationReadiness';
import { test } from '@jest/globals';
import { BrandUpdateBuilder, ContentCategoryUpdateBuilder, ContentUpdateBuilder, Integrator, ProductCategoryUpdateBuilder, ProductUpdateBuilder, ProductVariantBuilder } from '@relewise/integrations';
import { DataValueFactory, Searcher, Tracker, UserFactory } from '../src';
import { markUser, testId } from './integration-tests/testData';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });
const tracker = new Tracker(datasetId!, apiKey!, { serverUrl });
const searcher = new Searcher(datasetId!, apiKey!, { serverUrl });

const marker = { IntegrationTestRun: DataValueFactory.string(testId('run')) };
const viewer = markUser(UserFactory.byTemporaryId(testId('recommendation-viewer')));
const relatedViewer = markUser(UserFactory.byTemporaryId(testId('related-viewer')));

test('create the client integration test dataset fixtures', async () => {
    await integrator.updateBrand(new BrandUpdateBuilder({ id: testId('brand-1'), updateKind: 'ReplaceProvidedProperties' })
        .displayName(testId('Relewise')).data(marker).build());

    for (const id of ['1', '2', '3', '4']) {
        await integrator.updateProductCategory(new ProductCategoryUpdateBuilder({ id: testId(id), kind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: testId(`Product category ${id}`) }]).data(marker).build());
        await integrator.updateContentCategory(new ContentCategoryUpdateBuilder({ id: testId(id), kind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: testId(`Content category ${id}`) }]).data(marker).build());
    }

    for (const id of ['1', '2', '3']) {
        const numericVariant = new ProductVariantBuilder({ id: testId(`variant-numeric-${id}`) })
            .data({ availableMarkets: DataValueFactory.number(1693526400) })
            .build();
        const objectVariant = new ProductVariantBuilder({ id: testId(`variant-object-${id}`) })
            .data({ availableMarkets: DataValueFactory.object({ US: DataValueFactory.object({ ValidFromDate: DataValueFactory.number(1693526400) }) }) })
            .build();
        const product = new ProductUpdateBuilder({ id: testId(id), productUpdateKind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: testId(`Product ${id}`) }, { language: 'en-US', value: testId(`Product ${id}`) }])
            .data({
                ...marker,
                objects: DataValueFactory.objectCollection([{ list: DataValueFactory.stringCollection(['123', '456', '789']) }]),
                'some-data-key': DataValueFactory.number(10000),
                SomeString: DataValueFactory.string('SomeValue'),
            })
            .assortments([1, 2, 3])
            .brand({ id: testId('brand-1'), displayName: testId('Relewise') })
            .listPrice([{ amount: 100, currency: 'DKK' }, { amount: 100, currency: 'USD' }])
            .salesPrice([{ amount: 50, currency: 'DKK' }, { amount: 50, currency: 'USD' }])
            .variants([numericVariant, objectVariant])
            .categoryPaths(b => b.path(p => p.category({ id: testId(id === '3' ? '2' : '1') })));
        await integrator.updateProduct(product.build());
    }

    for (const id of ['1', '2', '3']) {
        const content = new ContentUpdateBuilder({ id: testId(id), updateKind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: testId(`Content ${id}`) }, { language: 'en-US', value: testId(`Content ${id}`) }])
            .data({ ...marker, Description: DataValueFactory.multilingual([{ language: 'da', value: 'The last word should be highlighted' }]) })
            .assortments([1, 2, 3])
            .categoryPaths(b => b.path(p => p.category({ id: testId('1') })));
        await integrator.updateContent(content.build());
    }

    await tracker.trackOrder({
        lineItems: [
            { productId: testId('1'), quantity: 1, lineTotal: 100 },
            { productId: testId('2'), quantity: 1, lineTotal: 100 },
        ],
        subtotal: { amount: 200, currency: 'DKK' },
        orderNumber: testId('order'),
        trackingNumber: testId('tracking'),
        user: viewer,
    });
    await tracker.trackProductView({ productId: testId('1'), user: viewer });
    await tracker.trackProductView({ productId: testId('2'), user: viewer });
    await tracker.trackContentView({ contentId: testId('1'), user: viewer });
    await tracker.trackContentView({ contentId: testId('2'), user: viewer });
    await tracker.trackContentView({ contentId: testId('1'), user: relatedViewer });
    await tracker.trackContentView({ contentId: testId('3'), user: relatedViewer });

    await syncIntegrationSearchIndex();

    await Promise.all([
        awaitProducts(searcher, ['1', '2', '3'].map(testId)),
        awaitProducts(searcher, ['1', '2', '3'].map(testId), 'en-US'),
        awaitContents(searcher, ['1', '2', '3'].map(testId)),
        awaitContents(searcher, ['1', '2', '3'].map(testId), 'en-US'),
        awaitProductCategories(searcher, ['1', '2', '3', '4'].map(testId)),
    ]);
}, 360_000);
