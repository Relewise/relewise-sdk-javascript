import { test } from '@jest/globals';
import { BrandUpdateBuilder, BrandAdministrativeActionBuilder, Integrator } from '../../../src';
import { DataValueFactory } from '@relewise/client';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Brand', async() => {
    const brand = new BrandUpdateBuilder({
        id: '1234',
        updateKind: 'ReplaceProvidedProperties',
    })
        .displayName('HP')
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice Brand'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'Removed': null,
            'Complex': DataValueFactory.object({
                'nestedDataKey': DataValueFactory.string('Key'),
            }),
        })
        .assortments([1, 2, 3]);

    await integrator.updateBrand(brand.build());

    const enable = new BrandAdministrativeActionBuilder({
        filters: (f) => f.addBrandDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Enable',
    });
    await integrator.executeBrandAdministrativeAction(enable.build());

    const disable = new BrandAdministrativeActionBuilder({
        filters: (f) => f.addBrandDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp), /* negated: */ true)),
        kind: 'Disable',
    });
    await integrator.executeBrandAdministrativeAction(disable.build());
});