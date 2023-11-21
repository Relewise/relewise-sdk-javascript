import { test } from '@jest/globals';
import { CompanyUpdateBuilder, CompanyAdministrativeActionBuilder, Integrator, CompanyUpdateBuilder } from '../../../src';
import { DataValueFactory } from '@relewise/client';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Companies', async() => {

    const parentCompany = new CompanyUpdateBuilder({
        id: '1',
        updateKind: 'ReplaceProvidedProperties',
        replaceExistingParents: true,
    });

    const company = new CompanyUpdateBuilder({
        id: '2',
        updateKind: 'ReplaceProvidedProperties',
        replaceExistingParents: true,
    })
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice Company'),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'Removed': null,
            'Complex': DataValueFactory.object({
                'nestedDataKey': DataValueFactory.string('Key'),
            }),
        })
        .parents([parentCompany.build().company]);

    await integrator.updateCompany(company.build());

    const enable = new CompanyAdministrativeActionBuilder({
        filters: (f) => f.addCompanyDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Enable',
    });
    await integrator.executeCompanyAdministrativeAction(enable.build());

    const disable = new CompanyAdministrativeActionBuilder({
        filters: (f) => f.addCompanyDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp), /* negated: */ true)),
        kind: 'Disable',
    });
    await integrator.executeCompanyAdministrativeAction(disable.build());
});