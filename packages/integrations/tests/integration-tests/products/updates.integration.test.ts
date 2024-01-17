import { test } from '@jest/globals';
import { DataValueFactory, ProductVariant, Trackable } from '@relewise/client';
import { Integrator, ProductAdministrativeActionBuilder, ProductUpdateBuilder, ProductVariantBuilder } from '../../../src';
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
    await integrator.executeProductAdministrativeAction(enable.build());

    const disable = new ProductAdministrativeActionBuilder({
        filters: (f) => f.addProductDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp), /* negated: */ true)),
        productUpdateKind: 'Disable',
    });
    await integrator.executeProductAdministrativeAction(disable.build());
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

test('product integration example for docs', async() => {
    // Copy dataset id + API key + server URL from my.relewise.com > Settings > Developer Settings
    // const integrator = new Integrator('00000000-0000-0000-0000-000000000001', 'your api key', { serverUrl: 'the server URL for the dataset'});

    // This is the recommended "Push" method, for importing product data into Relewise.

    // Create a timestamp which will be stored on every product, this way we can disable all products which have a lower timestamp than this, after the import has completed, effectively removing all products that weren't just updated.
    // It's important that the timestamp is the exact same for ALL products imported if we want to be able to batch-disable or delete expired products based on it.    
    const date: number = Date.now();

    const english = 'en';
    const dkk = 'dkk';
    
    const productUpdates: Trackable[] = [];
        
    // Foreach product that needs to be imported, do the following:
    {
        const variants: ProductVariant[] = [];
        // Foreach variant of this product
        {
            const variant: ProductVariant = {
                id: 'The variant id', // Variant id only has to be unique within the product
                data: {
                    'Materials': DataValueFactory.multilingualCollection([{ values: ['Wood', 'Metal'], language: english }]),
                    'Colors': DataValueFactory.multilingualCollection([{ values: ['Red', 'Green'], language: english }]),
                    'PrimaryMaterial': DataValueFactory.multilingual([{value: 'Wood', language: english}]),
                    'PrimaryColor': DataValueFactory.multilingual([{value: 'Red', language: english}]),
                },
            };
    
            variants.push(variant);
        }
        // Foreach variant END
    
        const product = new ProductUpdateBuilder({
            id: 'Product-SKU-01', // The Id should be the primary id of the product, which can be used to identify the product even outside the website for best compatibility with future integrations, like ERP order imports from other sales channels etc.
            productUpdateKind: 'ReplaceProvidedProperties',
            variantUpdateKind: 'ReplaceProvidedProperties',
            replaceExistingVariants: true, // Replace existing variants = true means that any other variants on the product, currenty existing in Relewise but not included in this update request, will be deleted, for full updates this is desired however for delta updates, this should obviously be set to false to avoid implicitly deleting non-modified variants.
        })
            .displayName([
                { language: english, value: 'The english display name' }, // We only set the english translation in this example but more can be set by parsing more Multilingual.Value.
            ])
            .listPrice([{currency: dkk, amount: 199}])
            .brand({
                id: 'brandId',
                displayName: 'Brand display name', // If you dont have both id and displayname for brands, displayname can be left out, id is required
            })
            .data({
                'ShortDescription': DataValueFactory.multilingual([{language: english, value: 'The short english description'}]), // We only set the english translation in this example but more can be set by parsing more Multilingual.Value. 
                'ImportedAt': DataValueFactory.number(date), // Important to set this timestamp to the exact same value for all content being updated as part of this full (not-delta) update, as we will use this timestamp to remove content that was not just imported, assuming they must have been removed since the last import and therefore should also be disabled in Relewise.
                'MinimumAge': DataValueFactory.number(4),
                'InStock': DataValueFactory.boolean(true),
                'USPs': DataValueFactory.stringCollection(['first usp', 'second usp', 'third usp']),
                // Add any additional fields you would want returned from Relewise as part of search results
            })
            .categoryPaths(b => b
                .path(p => p
                    .category({
                        id: '74',
                        displayName: [{ language: english, value: 'Play' }],
                    })
                    .category({
                        id: '2',
                        displayName: [{ language: english, value: 'Swings' }],
                    })
                    .category({
                        id: '529',
                        displayName: [{ language: english, value: 'Swing Seats' }],
                    }),
                ))
            .variants(variants);
    
        productUpdates.push(product.build());
    }
    // Foreach content element END
    
    // If this is a full-import (not delta) disable all non-included content elements
    {
        const disableNonUpdatedContet = new ProductAdministrativeActionBuilder({
            language: null,
            currency: null,
            filters(filterBuilder) {
                filterBuilder
                    .addContentDataFilter(
                        'ImportedAt',
                        (conditionBuilder) => conditionBuilder.addEqualsCondition(DataValueFactory.number(date), true),
                    );
            },
            productUpdateKind: 'Disable',
        });
        productUpdates.push(disableNonUpdatedContet.build());
    }
    
    const enableUpdatedContent = new ProductAdministrativeActionBuilder({
        language: null,
        currency: null,
        filters(filterBuilder) {
            filterBuilder
                .addContentDataFilter(
                    'ImportedAt',
                    (conditionBuilder) => conditionBuilder.addEqualsCondition(DataValueFactory.number(date), false),
                );
        },
        productUpdateKind: 'Enable',
    });
    
    productUpdates.push(enableUpdatedContent.build());
    
    // Send all product updates and the enable/disable action as a single (or few) network requests, the client will automatically send batches of 1.000 items per network request so you can pass as many as you like to the tracker.Track / TrackAsync method.
    await integrator.batch(productUpdates);
});