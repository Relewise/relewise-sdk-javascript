import { test } from '@jest/globals';
import { BrandAdministrativeActionBuilder, ContentAdministrativeActionBuilder, ContentCategoryAdministrativeActionBuilder, Integrator, ProductAdministrativeActionBuilder, ProductCategoryAdministrativeActionBuilder } from '@relewise/integrations';
import { DataValueFactory, UserAdministrativeAction } from '../src';
import { testId } from './integration-tests/testData';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });

test('remove the client integration test fixtures', async () => {
    const productIds = ['1', '2', '3', 'Object facet evaluation mode test product', 'GetProductFacet test product', 'Cat Product #1', 'Cat Product #2', 'Cat Product #3'].map(testId);
    const contentIds = ['1', '2', '3', 'GetContentFacet test content'].map(testId);
    const runMarker = DataValueFactory.string(testId('run'));

    await integrator.executeProductAdministrativeAction(new ProductAdministrativeActionBuilder({
        productUpdateKind: 'Delete',
        variantUpdateKind: 'Delete',
        filters: f => f.addProductIdFilter(productIds),
    }).build());
    await integrator.executeContentAdministrativeAction(new ContentAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addContentIdFilter(contentIds),
    }).build());
    await integrator.executeProductCategoryAdministrativeAction(new ProductCategoryAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addProductCategoryDataFilter('IntegrationTestRun', c => c.addEqualsCondition(runMarker)),
    }).build());
    await integrator.executeContentCategoryAdministrativeAction(new ContentCategoryAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addContentCategoryDataFilter('IntegrationTestRun', c => c.addEqualsCondition(runMarker)),
    }).build());
    await integrator.executeBrandAdministrativeAction(new BrandAdministrativeActionBuilder({
        kind: 'Delete',
        filters: f => f.addBrandIdFilter(testId('brand-1')),
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
