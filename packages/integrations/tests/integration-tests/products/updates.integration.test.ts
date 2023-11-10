import { test, expect } from '@jest/globals';
import { Integrator, ProductAdministrativeActionBuilder, ProductUpdateBuilder, ProductVariantBuilder } from '../../../src';
import { DataValueFactory } from '@relewise/client';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Product', async() => {
    const product = new ProductUpdateBuilder({
        id: '1234',
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
            'Complex': DataValueFactory.object({
                'nestedDataKey': DataValueFactory.string('Key'),
            }),
        })
        .assortments([1, 2, 3])
        .brand({ id: '1', displayName: 'Relewise' })
        .listPrice([{ amount: 100, currency: 'DKK' }])
        .salesPrice([{ amount: 50, currency: 'DKK' }])
        .categoryPaths(b => b
            .path(p => p
                .category({
                    id: '1',
                    displayName: [{ language: 'da', value: 'Værktøj' }],
                })
                .category({
                    id: '2',
                    displayName: [{ language: 'da', value: 'Udendørs' }],
                })
                .category({
                    id: '3',
                    displayName: [{ language: 'da', value: 'Skovle' }],
                }))
            .path(p => p
                .category({
                    id: '4',
                    displayName: [{ language: 'da', value: 'Tilbud' }],
                })));

    await integrator.updateProduct(product.build());

    const enable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        productUpdateKind: 'Enable',
    });
    await integrator.productAdministrativeAction(enable.build());

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp), /* negated: */ true)),
        productUpdateKind: 'Disable',
    });
    await integrator.productAdministrativeAction(disable.build());
});

test('Batch create products', async() => {
    const product = new ProductUpdateBuilder({
        id: '12345',
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
        })
        .assortments([1, 2, 3])
        .brand({ id: '1', displayName: 'Relewise' })
        .listPrice([{ amount: 100, currency: 'DKK' }])
        .salesPrice([{ amount: 50, currency: 'DKK' }]);

    const product2 = new ProductUpdateBuilder({
        id: '4321',
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
        })
        .assortments([1, 2, 3])
        .brand({ id: '1', displayName: 'Relewise' })
        .listPrice([{ amount: 100, currency: 'DKK' }])
        .salesPrice([{ amount: 50, currency: 'DKK' }]);

    const enable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        productUpdateKind: 'Enable',
    });

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp), /* negated: */ true)),
        productUpdateKind: 'Disable',
    });

    await integrator.batch([product.build(), product2.build(), enable.build(), disable.build()]);
});

test('Create Product with variants', async() => {

    const variant1 = new ProductVariantBuilder({ id: 'v-1' })
        .displayName([{ language: 'da', value: 'Small Sweater' }])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice product'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
        })
        .specifications({ Size: 'S' })
        .build();

    const variant2 = new ProductVariantBuilder({ id: 'v-2' })
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
        id: '12345',
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