import { afterEach, expect, jest, test } from '@jest/globals';

const originalRunId = process.env.npm_config_TEST_RUN_ID;
afterEach(() => {
    if (originalRunId === undefined) delete process.env.npm_config_TEST_RUN_ID;
    else process.env.npm_config_TEST_RUN_ID = originalRunId;
});

function idsForRun(runId: string) {
    process.env.npm_config_TEST_RUN_ID = runId;
    let ids!: typeof import('../integration-tests/testData');
    jest.isolateModules(() => { ids = require('../integration-tests/testData'); });
    return ids;
}

test('catalog survives a new run while transient users get a different cleanup marker', () => {
    const first = idsForRun('first-client');
    const second = idsForRun('second-client');
    expect(first.testId('1')).toBe(second.testId('1'));
    expect(first.disposableId('1')).not.toBe(second.disposableId('1'));
    expect(first.testId('1')).not.toBe(first.disposableId('1'));

    const user = second.markUser({ identifiers: { existing: 'retained' } as Record<string, string> });
    expect(user.identifiers.existing).toBe('retained');
    expect(user.identifiers.JavascriptSdkIntegrationRun).toBe(second.disposableId('run'));
    expect(user.identifiers.JavascriptSdkIntegrationRun).not.toBe(first.disposableId('run'));
});
