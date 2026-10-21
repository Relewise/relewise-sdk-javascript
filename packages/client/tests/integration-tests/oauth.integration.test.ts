import { expect, jest, test } from '@jest/globals';
import { Tracker, UserFactory } from '../../src';

const {
    npm_config_DATASET_ID: datasetId,
    npm_config_OAUTH_CLIENT_ID: clientId,
    npm_config_OAUTH_CLIENT_SECRET: clientSecret,
    npm_config_SERVER_URL: serverUrl,
} = process.env;

const configured = Boolean(datasetId && clientId && clientSecret && serverUrl);
const dedicatedOAuthRun = process.env.npm_lifecycle_event === 'integration-test:oauth';
const oauthTest = configured || dedicatedOAuthRun ? test : test.skip;

function settings() {
    if (!datasetId || !clientId || !clientSecret || !serverUrl) {
        throw new Error('OAuth integration testing requires DATASET_ID, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, and SERVER_URL.');
    }

    return { datasetId, clientId, clientSecret, serverUrl };
}

oauthTest('OAuth client credentials acquire one token and reuse it for API requests', async () => {
    const { datasetId, clientId, clientSecret, serverUrl } = settings();
    const nativeFetch = globalThis.fetch.bind(globalThis);
    let tokenRequests = 0;
    let apiRequests = 0;

    const observedFetch: typeof fetch = async (input, init) => {
        const url = input instanceof Request ? input.url : input.toString();
        const authorization = new Headers(init?.headers).get('Authorization');

        if (url.endsWith(`/${datasetId}/oauth/token`)) {
            tokenRequests++;
            expect(authorization?.startsWith('Basic ')).toBe(true);
        }
        else {
            apiRequests++;
            expect(authorization?.startsWith('Bearer ')).toBe(true);
        }

        return nativeFetch(input, init);
    };
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(observedFetch);

    try {
        const tracker = new Tracker(
            datasetId,
            {
                type: 'oauth',
                clientId,
                clientSecret,
            },
            { serverUrl },
        );
        const user = UserFactory.byTemporaryId(`oauth-integration-test-${Date.now()}`);

        await tracker.trackProductView({ productId: 'oauth-integration-test-1', user });
        await tracker.trackProductView({ productId: 'oauth-integration-test-2', user });

        expect(tokenRequests).toBe(1);
        expect(apiRequests).toBe(2);
    } finally {
        fetchSpy.mockRestore();
    }
}, 30_000);

oauthTest('OAuth client credentials recover from an actual invalid-token response', async () => {
    const { datasetId, clientId, clientSecret, serverUrl } = settings();
    const nativeFetch = globalThis.fetch.bind(globalThis);
    let tokenRequests = 0;
    let rejectNextApiToken = true;
    const apiRequestBodies: Array<BodyInit | null | undefined> = [];

    const observedFetch: typeof fetch = async (input, init) => {
        const url = input instanceof Request ? input.url : input.toString();
        const authorization = new Headers(init?.headers).get('Authorization');

        if (url.endsWith(`/${datasetId}/oauth/token`)) {
            tokenRequests++;
            expect(authorization?.startsWith('Basic ')).toBe(true);
            return nativeFetch(input, init);
        }

        expect(authorization?.startsWith('Bearer ')).toBe(true);
        apiRequestBodies.push(init?.body);

        if (rejectNextApiToken) {
            rejectNextApiToken = false;
            const headers = new Headers(init?.headers);
            headers.set('Authorization', 'Bearer invalid-javascript-sdk-test-token');
            return nativeFetch(input, { ...init, headers });
        }

        return nativeFetch(input, init);
    };
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(observedFetch);

    try {
        const tracker = new Tracker(
            datasetId,
            {
                type: 'oauth',
                clientId,
                clientSecret,
            },
            { serverUrl },
        );

        await tracker.trackProductView({
            productId: 'oauth-invalid-token-recovery-test',
            user: UserFactory.byTemporaryId(`oauth-invalid-token-recovery-${Date.now()}`),
        });

        expect(tokenRequests).toBe(2);
        expect(apiRequestBodies).toHaveLength(2);
        expect(apiRequestBodies[1]).toBe(apiRequestBodies[0]);
    } finally {
        fetchSpy.mockRestore();
    }
}, 30_000);
