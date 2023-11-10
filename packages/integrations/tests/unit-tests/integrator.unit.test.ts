
import { expect, test } from '@jest/globals';
import { Integrator } from '../../src';

const integrator = new Integrator('dummy value', 'dummy value');

test('Batch size', async() => {
    expect(integrator.batchSize).toBe(1_000);
});

test('Batch size', async() => {
    integrator.batchSize = 2;
    expect(integrator.batchSize).toBe(2);
});