import { awaitProducts, awaitContents, awaitProductCategories, awaitRecommendations } from './integrationReadiness';
import { contentFixtureNames, fixtureData, productCategoryFixtureNames, productFixtureNames } from './integrationFixtures';
import { test } from '@jest/globals';
import { BrandUpdateBuilder, ContentCategoryUpdateBuilder, ContentUpdateBuilder, Integrator, ProductCategoryUpdateBuilder, ProductUpdateBuilder, ProductVariantBuilder } from '@relewise/integrations';
import { ContentsViewedAfterViewingContentBuilder, DataValueFactory, PersonalContentRecommendationBuilder, PopularContentsBuilder, PopularProductsBuilder, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, Searcher, Tracker, UserFactory } from '../src';
import { disposableId, testId } from './integration-tests/testData';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });
const tracker = new Tracker(datasetId!, apiKey!, { serverUrl });
const searcher = new Searcher(datasetId!, apiKey!, { serverUrl });
const recommender = new Recommender(datasetId!, apiKey!, { serverUrl });

const marker = fixtureData;
const viewer = UserFactory.byTemporaryId(testId('recommendation-viewer'));
const relatedViewer = UserFactory.byTemporaryId(testId('related-viewer'));

test('upsert the persistent client integration test fixtures', async () => {
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
        const product = new ProductUpdateBuilder({
            id: testId(id), productUpdateKind: 'ReplaceProvidedProperties',
            variantUpdateKind: 'ReplaceProvidedProperties', replaceExistingVariants: true,
        })
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

    {
        const product = new ProductUpdateBuilder({
            id: testId('Object facet evaluation mode test product'),
            productUpdateKind: 'ReplaceProvidedProperties',
        })
            .data({
                ...marker,
                'ObjectForFacet': DataValueFactory.object({
                    'Key': DataValueFactory.string('data')
                })
            });
        await integrator.updateProduct(product.build());
    }

    {
        const facetVariant = new ProductVariantBuilder({ id: testId('GetProductFacet test variant') })
            .specifications({ SomeSpecification: 'S' })
            .build();
        const product = new ProductUpdateBuilder({
            id: testId('GetProductFacet test product'),
            productUpdateKind: 'ReplaceProvidedProperties',
        })
            .data({
                ...marker,
                'SomeString': DataValueFactory.string('Really nice product'),
                'SomeDouble': DataValueFactory.number(1),
                'SomeBoolean': DataValueFactory.boolean(true),
                'SomeObject': DataValueFactory.object({})
            })
            .variants([facetVariant]);
        await integrator.updateProduct(product.build());
    }

    {
        const product = new ProductUpdateBuilder({
            id: testId('Cat Product #1'),
            productUpdateKind: 'ReplaceProvidedProperties',
        }).data(marker).categoryPaths(c => c.path(p => p.category({ id: testId('1') })));
        await integrator.updateProduct(product.build());
        const product2 = new ProductUpdateBuilder({
            id: testId('Cat Product #2'),
            productUpdateKind: 'ReplaceProvidedProperties',
        }).data(marker).categoryPaths(c => c.path(p => p.category({ id: testId('1') })));
        await integrator.updateProduct(product2.build());
        const product3 = new ProductUpdateBuilder({
            id: testId('Cat Product #3'),
            productUpdateKind: 'ReplaceProvidedProperties',
        }).data(marker).categoryPaths(c => c.path(p => p.category({ id: testId('2') })));
        await integrator.updateProduct(product3.build());
    }

    {
        const content = new ContentUpdateBuilder({
            id: testId('GetContentFacet test content'),
            updateKind: 'ReplaceProvidedProperties'
        })
            .data({
                ...marker,
                'SomeString': DataValueFactory.string('Really nice product'),
                'SomeDouble': DataValueFactory.number(1),
                'SomeBoolean': DataValueFactory.boolean(true),
                'SomeObject': DataValueFactory.object({})
            })
            .assortments([1, 2, 3]);
        await integrator.updateContent(content.build());
    }

    {
        const category = new ProductCategoryUpdateBuilder({
            id: testId('GetProductCategoryFacet test category'),
            kind: 'ReplaceProvidedProperties'
        })
            .data({
                ...marker,
                'SomeString': DataValueFactory.string('Test String'),
                'SomeBoolean': DataValueFactory.boolean(true),
                'SomeDouble': DataValueFactory.number(100),
                'SomeObject': DataValueFactory.object({})
            });
        await integrator.updateProductCategory(category.build());
    }

    await tracker.trackOrder({
        lineItems: [
            { productId: testId('1'), quantity: 1, lineTotal: 100 },
            { productId: testId('2'), quantity: 1, lineTotal: 100 },
        ],
        subtotal: { amount: 200, currency: 'DKK' },
        orderNumber: disposableId('order'),
        trackingNumber: disposableId('tracking'),
        user: viewer,
    });
    await tracker.trackProductView({ productId: testId('1'), user: viewer });
    await tracker.trackProductView({ productId: testId('2'), user: viewer });
    await tracker.trackContentView({ contentId: testId('1'), user: viewer });
    await tracker.trackContentView({ contentId: testId('2'), user: viewer });
    await tracker.trackContentView({ contentId: testId('1'), user: relatedViewer });
    await tracker.trackContentView({ contentId: testId('3'), user: relatedViewer });

    // Wait for normal indexing and candidate-cache propagation through public search APIs.

    await Promise.all([
        awaitProducts(searcher, productFixtureNames.map(testId)),
        awaitProducts(searcher, ['1', '2', '3'].map(testId), 'en-US'),
        awaitContents(searcher, contentFixtureNames.map(testId)),
        awaitContents(searcher, ['1', '2', '3'].map(testId), 'en-US'),
        awaitProductCategories(searcher, productCategoryFixtureNames.map(testId)),
    ]);

    const settings = {
        language: 'en-US', currency: 'USD', displayedAtLocation: 'integration fixture readiness',
        user: UserFactory.anonymous(),
    };
    await Promise.all([
        awaitRecommendations('PurchasedWithProduct candidates', () => recommender.recommendPurchasedWithProduct(
            new PurchasedWithProductBuilder(settings).product({ productId: testId('1') }).build())),
        awaitRecommendations('ProductsViewedAfterViewingProduct candidates', () => recommender.recommendProductsViewedAfterViewingProduct(
            new ProductsViewedAfterViewingProductBuilder(settings).product({ productId: testId('1') }).build())),
        awaitRecommendations('PopularProducts candidates', () => recommender.recommendPopularProducts(
            new PopularProductsBuilder(settings).sinceMinutesAgo(5000)
                .setPopularityMultiplier(pm => pm.setDataKeyPopularityMultiplierSelector({ key: 'some-data-key' })).build())),
        awaitRecommendations('ContentsViewedAfterViewingContent candidates', () => recommender.recommendContentsViewedAfterViewingContent(
            new ContentsViewedAfterViewingContentBuilder(settings).setContentId(testId('1')).build())),
        awaitRecommendations('PopularContents candidates', () => recommender.recommendPopularContents(
            new PopularContentsBuilder(settings).sinceMinutesAgo(5000).build())),
        awaitRecommendations('PersonalContent candidates', () => recommender.recommendPersonalContents(
            new PersonalContentRecommendationBuilder(settings).build())),
    ]);
}, 480_000);
