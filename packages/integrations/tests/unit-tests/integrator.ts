
import { expect, test } from '@jest/globals';
import { Integrator } from '../../src';

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

test('Batch size', async() => {
    expect(integrator.batchSize).toBe(1_000);
});

test('Batch size', async() => {
    integrator.batchSize = 2;
    expect(integrator.batchSize).toBe(2);
});