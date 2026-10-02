import { User } from '@relewise/client';

const runId = process.env.npm_config_TEST_RUN_ID;

if (!runId) {
    throw new Error('Set npm_config_TEST_RUN_ID to a unique value for each integration test run');
}

export const testId = (id: string): string => `javascript-sdk-${runId}-${id}`;
export const testRunId = runId;

export const markUser = <T extends User>(user: T): T => {
    user.identifiers = { ...user.identifiers, JavascriptSdkIntegrationRun: testId('run') };
    return user;
};
