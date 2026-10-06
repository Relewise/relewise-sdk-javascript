import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import { syncIntegrationSearchIndex } from '../integrationIndexSync';

const originalFetch = globalThis.fetch;
const originalEnvironment = { ...process.env };
const fetchMock = jest.fn<typeof fetch>();

beforeEach(() => {
    process.env.npm_config_DATASET_ID = 'test-dataset';
    process.env.npm_config_API_KEY = 'test-key';
    process.env.npm_config_SERVER_URL = 'https://example.test/';
    globalThis.fetch = fetchMock;
    fetchMock.mockReset();
});

afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env = { ...originalEnvironment };
});

test('does not continue until the rebuild response has completed', async () => {
    let completeRebuild!: (response: Response) => void;
    fetchMock.mockImplementationOnce(() => new Promise(resolve => { completeRebuild = resolve; }))
        .mockResolvedValue(new Response(JSON.stringify({ refreshTimeMs: 5 }), { status: 200 }));
    let completed = false;
    const syncing = syncIntegrationSearchIndex().then(() => { completed = true; });
    await Promise.resolve();
    expect(completed).toBe(false);
    expect(fetchMock).toHaveBeenCalledWith('https://example.test/test-dataset/ui/RebuildSearchIndexRequest', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ IndexId: 'default' }),
        headers: expect.objectContaining({ Authorization: 'APIKey test-key' }),
    }));
    completeRebuild(new Response(JSON.stringify({ rebuildTimeMs: 12 }), { status: 200 }));
    await syncing;
    expect(completed).toBe(true);
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://example.test/test-dataset/ui/RefreshPresorterRequest', expect.objectContaining({
        body: JSON.stringify({ Fill: true, Popular: true, Fallback: true }),
    }));
});

test('fails on a rejected rebuild rather than continuing to search tests', async () => {
    fetchMock.mockResolvedValue(new Response('Index rebuild already in progress', { status: 400 }));
    await expect(syncIntegrationSearchIndex()).rejects.toThrow('HTTP 400');
    expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('rejects a successful HTTP response that is not a rebuild response', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({}), { status: 200 }));
    await expect(syncIntegrationSearchIndex()).rejects.toThrow('invalid rebuild response');
});

test('does not continue until the presorter refresh completes', async () => {
    let completeRefresh!: (response: Response) => void;
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ rebuildTimeMs: 12 }), { status: 200 }))
        .mockImplementationOnce(() => new Promise(resolve => { completeRefresh = resolve; }));
    let completed = false;
    const syncing = syncIntegrationSearchIndex().then(() => { completed = true; });
    while (fetchMock.mock.calls.length < 2) await Promise.resolve();
    expect(completed).toBe(false);
    completeRefresh(new Response(JSON.stringify({ refreshTimeMs: 5 }), { status: 200 }));
    await syncing;
    expect(completed).toBe(true);
});

test('fails when presorter refresh fails after a successful index rebuild', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ rebuildTimeMs: 12 }), { status: 200 }))
        .mockResolvedValueOnce(new Response('CPU usage too high', { status: 400 }));
    await expect(syncIntegrationSearchIndex()).rejects.toThrow('presorter synchronization failed (HTTP 400)');
});
