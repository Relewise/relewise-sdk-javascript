import { User } from '../../src';

const runId = process.env.npm_config_TEST_RUN_ID;

if (!runId) {
    throw new Error('Set npm_config_TEST_RUN_ID to a unique value for each integration test run');
}

// Catalog fixtures survive runs; transient users and orders remain isolated.
export const testId = (id: string): string => `javascript-sdk-client-${id}`;
export const disposableId = (id: string): string => `javascript-sdk-${runId}-${id}`;

export const markUser = <T extends User>(user: T): T => {
    user.identifiers = { ...user.identifiers, JavascriptSdkIntegrationRun: disposableId('run') };
    return user;
};
