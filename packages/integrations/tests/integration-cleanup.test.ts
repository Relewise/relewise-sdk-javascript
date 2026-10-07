import { test } from '@jest/globals';
import { DataValueFactory, UserAdministrativeAction } from '@relewise/client';
import { BrandAdministrativeActionBuilder, CompanyAdministrativeActionBuilder, ContentAdministrativeActionBuilder, ContentCategoryAdministrativeActionBuilder, Integrator, ProductAdministrativeActionBuilder, ProductCategoryAdministrativeActionBuilder } from '../src';
import { testId } from './integration-tests/testData';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });

test('remove integrations suite entities', async () => {
    const marker = DataValueFactory.string(testId('run'));
    await integrator.executeProductAdministrativeAction(new ProductAdministrativeActionBuilder({
        productUpdateKind: 'Delete',
        variantUpdateKind: 'Delete',
        filters: f => f.addProductIdFilter(['1', '2', '3', 'delete-product'].map(testId)),
    }).build());
    await integrator.executeContentAdministrativeAction(new ContentAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addContentIdFilter(testId('1')),
    }).build());
    await integrator.executeProductCategoryAdministrativeAction(new ProductCategoryAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addProductCategoryDataFilter('IntegrationTestRun', c => c.addEqualsCondition(marker)),
    }).build());
    await integrator.executeContentCategoryAdministrativeAction(new ContentCategoryAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addContentCategoryDataFilter('IntegrationTestRun', c => c.addEqualsCondition(marker)),
    }).build());
    await integrator.executeBrandAdministrativeAction(new BrandAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addBrandIdFilter([testId('1'), testId('1234')]),
    }).build());
    await integrator.executeCompanyAdministrativeAction(new CompanyAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addCompanyIdFilter([testId('1'), testId('2')]),
    }).build());
    const deleteUsers: UserAdministrativeAction = {
        $type: 'Relewise.Client.DataTypes.UserAdministrativeAction, Relewise.Client',
        userConditions: { items: [{
            $type: 'Relewise.Client.DataTypes.UserConditions.IdentifierCondition, Relewise.Client',
            negated: false,
            key: 'JavascriptSdkIntegrationRun',
            values: [testId('run')],
        }] },
        userUpdateAction: { $type: 'Relewise.Client.DataTypes.UserAdministrativeAction+DeleteUser, Relewise.Client' },
    };
    await integrator.batch([deleteUsers]);
}, 60_000);
