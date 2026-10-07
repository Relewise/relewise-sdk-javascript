import { test } from '@jest/globals';
import { Integrator } from '@relewise/integrations';
import { UserAdministrativeAction } from '../src';
import { disposableId } from './integration-tests/testData';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });

test('remove transient client integration test users', async () => {
    // Search fixtures and recommendation seed users survive cleanup.
    const deleteUsers: UserAdministrativeAction = {
        $type: 'Relewise.Client.DataTypes.UserAdministrativeAction, Relewise.Client',
        userConditions: { items: [{
            $type: 'Relewise.Client.DataTypes.UserConditions.IdentifierCondition, Relewise.Client',
            negated: false,
            key: 'JavascriptSdkIntegrationRun',
            values: [disposableId('run')],
        }] },
        userUpdateAction: { $type: 'Relewise.Client.DataTypes.UserAdministrativeAction+DeleteUser, Relewise.Client' },
    };
    await integrator.batch([deleteUsers]);
}, 60_000);
