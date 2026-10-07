import { test, expect } from '@jest/globals';
import { Integrator, ProductAdministrativeActionBuilder, ProductUpdateBuilder, ProductVariantBuilder } from '../../../src';
import { DataValueFactory } from '@relewise/client';
import { randomUUID } from 'crypto';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Product', async() => {
    const product = new ProductUpdateBuilder({
        id: 'javascript-sdk-integrations-1',
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .displayName([
            { language: 'da', value: 'Toaster' },
        ])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice product'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'Removed': null,
            'Materials': DataValueFactory.multilingualCollection([{ values: ['Wood', 'Metal'], language: 'da' }]),
            'Complex': DataValueFactory.object({
                'nestedDataKey': DataValueFactory.string('Key'),
            }),
            'availableMarkets': DataValueFactory.object({
                'US': DataValueFactory.object({
                    'ValidFromDate': DataValueFactory.number(1693526400),
                }),
            }),
            'some-data-key': DataValueFactory.number(10000),
            'SomeString': DataValueFactory.string('SomeValue'),
        })
        .assortments([1, 2, 3])
        .brand({ id: 'javascript-sdk-integrations-1', displayName: 'Relewise' })
        .listPrice([{ amount: 100, currency: 'DKK' }])
        .salesPrice([{ amount: 50, currency: 'DKK' }])
        .categoryPaths(b => b
            .path(p => p
                .category({
                    id: 'javascript-sdk-integrations-1',
                })
                .category({
                    id: 'javascript-sdk-integrations-2',
                    displayName: [{ language: 'da', value: 'Udendørs' }],
                })
                .category({
                    id: 'javascript-sdk-integrations-3',
                    displayName: [{ language: 'da', value: 'Skovle' }],
                }))
            .path(p => p
                .category({
                    id: 'javascript-sdk-integrations-4',
                    displayName: [{ language: 'da', value: 'Tilbud' }],
                })));

    await integrator.updateProduct(product.build());

    const enable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductIdFilter('javascript-sdk-integrations-1').addProductDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        productUpdateKind: 'Enable',
    });
    await integrator.executeProductAdministrativeAction(enable.build());

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductIdFilter('javascript-sdk-integrations-1').addProductDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        productUpdateKind: 'Disable',
    });
    await integrator.executeProductAdministrativeAction(disable.build());
});

test('Batch create products', async() => {
    const product = new ProductUpdateBuilder({
        id: 'javascript-sdk-integrations-1',
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .displayName([
            { language: 'da', value: 'Toaster' },
        ])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice product'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'objects': DataValueFactory.objectCollection([{
                'list': DataValueFactory.stringCollection(['123', '456', '789']),
            }]),
        })
        .assortments([1, 2, 3])
        .brand({ id: 'javascript-sdk-integrations-1', displayName: 'Relewise' })
        .listPrice([{ amount: 100, currency: 'DKK' }])
        .salesPrice([{ amount: 50, currency: 'DKK' }]);

    const product2 = new ProductUpdateBuilder({
        id: 'javascript-sdk-integrations-2',
        productUpdateKind: 'ReplaceProvidedProperties',
    })
        .displayName([
            { language: 'da', value: 'Laptop' },
        ])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice product'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'objects': DataValueFactory.objectCollection([{
                'list': DataValueFactory.stringCollection(['123', '456', '789']),
            }]),
        })
        .assortments([1, 2, 3])
        .brand({ id: 'javascript-sdk-integrations-1', displayName: 'Relewise' })
        .listPrice([{ amount: 100, currency: 'DKK' }])
        .salesPrice([{ amount: 50, currency: 'DKK' }]);

    const product3 = new ProductUpdateBuilder({
        id: 'javascript-sdk-integrations-3',
        productUpdateKind: 'ReplaceProvidedProperties',
    }).data({
        'objects': DataValueFactory.objectCollection([{
            'list': DataValueFactory.stringCollection(['123', '456', '789']),
        }]),
    });

    const enable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductIdFilter(['javascript-sdk-integrations-1', 'javascript-sdk-integrations-2']).addProductDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        productUpdateKind: 'Enable',
    });

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductIdFilter(['javascript-sdk-integrations-1', 'javascript-sdk-integrations-2']).addProductDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        productUpdateKind: 'Disable',
    });

    await integrator.batch([product.build(), product2.build(), product3.build(), enable.build(), disable.build()]);
});

test('Create Product with variants', async() => {

    const variant1 = new ProductVariantBuilder({ id: 'javascript-sdk-integrations-v-1' })
        .displayName([{ language: 'da', value: 'Small Sweater' }])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice product'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'availableMarkets': DataValueFactory.number(1693526400),
        })
        .specifications({ Size: 'S' })
        .build();

    const variant2 = new ProductVariantBuilder({ id: 'javascript-sdk-integrations-v-2' })
        .displayName([{ language: 'da', value: 'Medium Sweater' }])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice product'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
        })
        .specifications({ Size: 'M' })
        .build();

    const product = new ProductUpdateBuilder({
        id: 'javascript-sdk-integrations-1',
        productUpdateKind: 'ReplaceProvidedProperties',
        variantUpdateKind: 'ReplaceProvidedProperties',
        replaceExistingVariants: true,
    })
        .displayName([
            { language: 'da', value: 'Sweater' },
        ])
        .variants([variant1, variant2]);

    await integrator.updateProduct(product.build());
});

test('Delete a disposable product', async () => {
    const id = `javascript-sdk-delete-${randomUUID()}`;
    await integrator.updateProduct(new ProductUpdateBuilder({ id, productUpdateKind: 'ReplaceProvidedProperties' }).build());
    await integrator.executeProductAdministrativeAction(new ProductAdministrativeActionBuilder({
        filters: f => f.addProductIdFilter(id), productUpdateKind: 'Delete', variantUpdateKind: 'Delete',
    }).build());
});
