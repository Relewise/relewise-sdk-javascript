import { expect, jest, test } from '@jest/globals';
import { UserFactory } from '../../src';
import { isInvalidTokenResponse } from '../../src/oauthChallenge';
import { Tracker } from '../../src/tracker';

const {
    npm_config_DATASET_ID: datasetId,
    npm_config_OAUTH_CLIENT_ID: clientId,
    npm_config_OAUTH_CLIENT_SECRET: clientSecret,
    npm_config_SERVER_URL: serverUrl,
} = process.env;

function positiveInteger(name: string, fallback: number): number {
    const configured = process.env[`npm_config_${name}`];
    const value = configured === undefined ? fallback : Number(configured);
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`${name} must be a positive integer.`);
    }
    return value;
}

const durationMs = positiveInteger('OAUTH_SMOKE_DURATION_MS', 7 * 60 * 1_000);
const intervalMs = positiveInteger('OAUTH_SMOKE_INTERVAL_MS', 250);
const concurrency = positiveInteger('OAUTH_SMOKE_CONCURRENCY', 4);
const smokeTest = process.env.npm_lifecycle_event === 'integration-test:oauth-smoke' ? test : test.skip;

smokeTest('long-running OAuth traffic renews, recovers from invalid_token, and keeps succeeding', async () => {
    if (!datasetId || !clientId || !clientSecret || !serverUrl) {
        throw new Error('OAuth smoke testing requires DATASET_ID, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, and SERVER_URL.');
    }

    const nativeFetch = globalThis.fetch.bind(globalThis);
    const startedAt = Date.now();
    const endsAt = startedAt + durationMs;
    let tokenRequests = 0;
    let apiRequests = 0;
    let completedRequests = 0;
    let invalidTokenInjected = false;
    let invalidTokenResponses = 0;
    let nextProgressAt = startedAt + 30_000;

    const observedFetch: typeof fetch = async (input, init) => {
        const url = input instanceof Request ? input.url : input.toString();
        const authorization = new Headers(init?.headers).get('Authorization');

        if (url.endsWith(`/${datasetId}/oauth/token`)) {
            tokenRequests++;
            expect(authorization?.startsWith('Basic ')).toBe(true);
            return nativeFetch(input, init);
        }

        apiRequests++;
        expect(authorization?.startsWith('Bearer ')).toBe(true);

        // Token request #2 is the normal early renewal. Corrupt the first API call
        // using that replacement so the real API returns invalid_token and forces
        // one more acquisition and retry while traffic continues.
        if (tokenRequests >= 2 && !invalidTokenInjected) {
            invalidTokenInjected = true;
            const headers = new Headers(init?.headers);
            headers.set('Authorization', 'Bearer invalid-javascript-sdk-smoke-token');
            const response = await nativeFetch(input, { ...init, headers });
            if (isInvalidTokenResponse(response)) invalidTokenResponses++;
            return response;
        }

        return nativeFetch(input, init);
    };
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockImplementation(observedFetch);
    const tracker = new Tracker(
        datasetId,
        { type: 'oauth', clientId, clientSecret },
        { serverUrl },
    );
    const user = UserFactory.byTemporaryId(`oauth-long-running-smoke-${startedAt}`);

    try {
        while (Date.now() < endsAt) {
            await Promise.all(
                Array.from({ length: concurrency }, (_, index) =>
                    tracker.trackProductView({
                        productId: `oauth-long-running-smoke-${index}`,
                        user,
                    }),
                ),
            );
            completedRequests += concurrency;

            if (Date.now() >= nextProgressAt) {
                console.log(`OAuth smoke progress: ${completedRequests} completed API calls, ${tokenRequests} token requests.`);
                nextProgressAt += 30_000;
            }

            const remainingMs = endsAt - Date.now();
            if (remainingMs > 0) {
                await new Promise((resolve) => setTimeout(resolve, Math.min(intervalMs, remainingMs)));
            }
        }

        expect(completedRequests).toBeGreaterThan(0);
        expect(apiRequests).toBeGreaterThan(completedRequests);
        expect(invalidTokenInjected).toBe(true);
        expect(invalidTokenResponses).toBe(1);
        expect(tokenRequests).toBeGreaterThanOrEqual(3);
    } finally {
        fetchSpy.mockRestore();
    }
}, durationMs + 60_000);
