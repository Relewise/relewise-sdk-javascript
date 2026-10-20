import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { OAuthTokenProvider } from '../../src/oauthTokenProvider';
import { Tracker } from '../../src/tracker';

const datasetId = '11111111-1111-1111-1111-111111111111';
const clientId = '22222222-2222-2222-2222-222222222222';
const serverUrl = 'https://example.com/prefix';

function jsonResponse(body: unknown, status = 200, headers?: Record<string, string>): Response {
    return {
        ok: status >= 200 && status < 300,
        status,
        statusText: status === 401 ? 'Unauthorized' : 'OK',
        headers: new Headers(headers),
        json: jest.fn<() => Promise<unknown>>().mockResolvedValue(body),
    } as unknown as Response;
}

function noContentResponse(): Response {
    return {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn<() => Promise<unknown>>().mockRejectedValue(new Error('No content')),
    } as unknown as Response;
}

describe('OAuthTokenProvider', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('acquires, validates, and renews a token ten seconds before expiry', async () => {
        const fetchMock = jest
            .fn<typeof fetch>()
            .mockResolvedValueOnce(
                jsonResponse({
                    access_token: 'token-1',
                    token_type: 'Bearer',
                    expires_in: 300,
                }),
            )
            .mockResolvedValueOnce(
                jsonResponse({
                    access_token: 'token-2',
                    token_type: 'bearer',
                    expires_in: 300,
                }),
            );
        const now = jest.spyOn(Date, 'now').mockReturnValue(0);
        const provider = new OAuthTokenProvider(clientId, 's e+c', fetchMock as typeof fetch);
        const endpoint = `${serverUrl}/${datasetId}/oauth/token`;

        const first = await provider.getToken(endpoint);
        now.mockReturnValue(289_999);
        const cached = await provider.getToken(endpoint);
        now.mockReturnValue(290_000);
        const renewed = await provider.getToken(endpoint);

        expect(first.accessToken).toBe('token-1');
        expect(first.expiresAt).toEqual(new Date(300_000));
        expect(cached).toBe(first);
        expect(renewed.accessToken).toBe('token-2');
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(fetchMock).toHaveBeenNthCalledWith(
            1,
            endpoint,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`${clientId}:s+e%2Bc`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials',
            }),
        );
    });

    test('shares one acquisition between concurrent callers', async () => {
        const fetchMock = jest.fn<typeof fetch>().mockResolvedValue(
            jsonResponse({
                access_token: 'token-1',
                token_type: 'Bearer',
                expires_in: 300,
            }),
        );
        const provider = new OAuthTokenProvider(clientId, 'secret', fetchMock as typeof fetch);
        const endpoint = `${serverUrl}/${datasetId}/oauth/token`;

        const tokens = await Promise.all(Array.from({ length: 20 }, () => provider.getToken(endpoint)));

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(tokens.map((token) => token.accessToken)).toEqual(Array(20).fill('token-1'));
    });

    test('does not leave a failed acquisition cached or permanently in flight', async () => {
        const fetchMock = jest
            .fn<typeof fetch>()
            .mockResolvedValueOnce(jsonResponse({}, 503))
            .mockResolvedValueOnce(
                jsonResponse({
                    access_token: 'replacement',
                    token_type: 'Bearer',
                    expires_in: 300,
                }),
            );
        const provider = new OAuthTokenProvider(clientId, 'secret', fetchMock as typeof fetch);
        const endpoint = `${serverUrl}/${datasetId}/oauth/token`;

        await expect(provider.getToken(endpoint)).rejects.toThrow('OAuth token acquisition failed with status 503.');
        await expect(provider.getToken(endpoint)).resolves.toEqual(expect.objectContaining({ accessToken: 'replacement' }));
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test("a cancelled waiter does not cancel another caller's shared acquisition", async () => {
        let completeFetch!: (response: Response) => void;
        const fetchMock = jest.fn<typeof fetch>().mockReturnValue(new Promise<Response>((resolve) => (completeFetch = resolve)));
        const provider = new OAuthTokenProvider(clientId, 'secret', fetchMock as typeof fetch);
        const endpoint = `${serverUrl}/${datasetId}/oauth/token`;
        const first = provider.getToken(endpoint);
        const cancellation = new AbortController();
        const waiter = provider.getToken(endpoint, undefined, cancellation.signal);

        cancellation.abort();
        await expect(waiter).rejects.toHaveProperty('name', 'AbortError');

        completeFetch(
            jsonResponse({
                access_token: 'token-1',
                token_type: 'Bearer',
                expires_in: 300,
            }),
        );
        await expect(first).resolves.toEqual(expect.objectContaining({ accessToken: 'token-1' }));
        await expect(provider.getToken(endpoint)).resolves.toEqual(expect.objectContaining({ accessToken: 'token-1' }));
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});

describe('OAuth Relewise client', () => {
    test('preserves the existing API-key constructor and does not acquire a token', async () => {
        const fetchMock = jest.fn<typeof fetch>().mockResolvedValue(noContentResponse());
        const tracker = new Tracker('dataset-id', 'api-key', {
            fetch: fetchMock as typeof fetch,
        });

        await tracker.trackProductView({
            productId: 'product-1',
            user: { temporaryId: 'user-1' },
        });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.relewise.com/dataset-id/v1/TrackProductViewRequest',
            expect.objectContaining({
                headers: expect.objectContaining({ Authorization: 'APIKey api-key' }),
            }),
        );
    });

    test('validates OAuth identifiers and server URL locally', () => {
        expect(() => new Tracker('not-a-uuid', { type: 'oauth', clientId, clientSecret: 'secret' }, { serverUrl })).toThrow('Dataset id must be a valid UUID when using OAuth.');
        expect(() => new Tracker(datasetId, { type: 'oauth', clientId: 'not-a-uuid', clientSecret: 'secret' }, { serverUrl })).toThrow('Client id must be a valid UUID.');
        expect(() => new Tracker(datasetId, { type: 'oauth', clientId, clientSecret: 'secret' }, { serverUrl: '' })).toThrow('Server URL cannot be null or empty when using OAuth.');
    });

    test('reuses a token and preserves the API request contract', async () => {
        const fetchMock = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
            if (url.toString().endsWith('/oauth/token')) {
                return jsonResponse({
                    access_token: 'token-1',
                    token_type: 'Bearer',
                    expires_in: 300,
                });
            }

            expect(init?.headers).toEqual(expect.objectContaining({ Authorization: 'Bearer token-1' }));
            return noContentResponse();
        });
        const tracker = new Tracker(
            datasetId,
            { type: 'oauth', clientId, clientSecret: 'secret' },
            {
                serverUrl,
                fetch: fetchMock as typeof fetch,
            },
        );

        await tracker.trackProductView({
            productId: 'product-1',
            user: { temporaryId: 'user-1' },
        });
        await tracker.trackProductView({
            productId: 'product-2',
            user: { temporaryId: 'user-1' },
        });

        expect(fetchMock).toHaveBeenCalledTimes(3);
        expect(fetchMock.mock.calls[0][0]).toBe(`${serverUrl}/${datasetId}/oauth/token`);
        expect(fetchMock.mock.calls[1][0]).toBe(`${serverUrl}/${datasetId}/v1/TrackProductViewRequest`);
        expect(fetchMock.mock.calls[2][0]).toBe(`${serverUrl}/${datasetId}/v1/TrackProductViewRequest`);
    });

    test('shares one replacement and retries the complete request once after invalid_token', async () => {
        let tokenRequests = 0;
        const apiRequests: RequestInit[] = [];
        const fetchMock = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
            if (url.toString().endsWith('/oauth/token')) {
                tokenRequests++;
                return jsonResponse({
                    access_token: `token-${tokenRequests}`,
                    token_type: 'Bearer',
                    expires_in: 300,
                });
            }

            apiRequests.push(init!);
            const authorization = (init?.headers as Record<string, string>).Authorization;
            return authorization === 'Bearer token-1'
                ? jsonResponse(null, 401, {
                      'WWW-Authenticate': 'Bearer realm="relewise", error="invalid_token"',
                  })
                : noContentResponse();
        });
        const tracker = new Tracker(
            datasetId,
            { type: 'oauth', clientId, clientSecret: 'secret' },
            {
                serverUrl,
                fetch: fetchMock as typeof fetch,
            },
        );

        await Promise.all(
            Array.from({ length: 5 }, (_, index) =>
                tracker.trackProductView({
                    productId: `product-${index}`,
                    user: { temporaryId: 'user-1' },
                }),
            ),
        );

        expect(tokenRequests).toBe(2);
        expect(apiRequests).toHaveLength(10);
        expect(apiRequests.slice(0, 5).map((request) => (request.headers as Record<string, string>).Authorization)).toEqual(Array(5).fill('Bearer token-1'));
        expect(apiRequests.slice(5).map((request) => (request.headers as Record<string, string>).Authorization)).toEqual(Array(5).fill('Bearer token-2'));
        expect(apiRequests.slice(5).map((request) => request.body)).toEqual(apiRequests.slice(0, 5).map((request) => request.body));
    });
});
