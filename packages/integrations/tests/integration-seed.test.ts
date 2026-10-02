import { test } from '@jest/globals';
import { DataValueFactory } from '@relewise/client';
import { BrandUpdateBuilder, ContentCategoryUpdateBuilder, Integrator, ProductCategoryUpdateBuilder } from '../src';
import { testId } from './integration-tests/testData';

const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
const integrator = new Integrator(datasetId!, apiKey!, { serverUrl });
const marker = { IntegrationTestRun: DataValueFactory.string(testId('run')) };

test('create the integrations suite category and brand fixtures', async () => {
    for (const id of ['1', '2', '3', '4']) {
        await integrator.updateProductCategory(new ProductCategoryUpdateBuilder({ id: testId(id), kind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: testId(`Product category ${id}`) }]).data(marker).build());
        await integrator.updateContentCategory(new ContentCategoryUpdateBuilder({ id: testId(id), kind: 'ReplaceProvidedProperties' })
            .displayName([{ language: 'da', value: testId(`Content category ${id}`) }]).data(marker).build());
    }
    await integrator.updateBrand(new BrandUpdateBuilder({ id: testId('1'), updateKind: 'ReplaceProvidedProperties' })
        .displayName(testId('Relewise')).data(marker).build());
}, 60_000);
