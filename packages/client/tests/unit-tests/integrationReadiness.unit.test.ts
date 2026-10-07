import { afterEach, expect, jest, test } from '@jest/globals';
import { awaitProducts, awaitRecommendations, awaitResultCount } from '../integrationReadiness';
import { Searcher } from '../../src';
import { fixtureRevision, fixtureRevisionKey } from '../integrationFixtures';

afterEach(() => { jest.useRealTimers(); });

test('waits for all fixtures rather than accepting partial visibility', async () => {
    jest.useFakeTimers();
    const search = jest.fn<() => Promise<number>>()
        .mockResolvedValueOnce(1).mockResolvedValueOnce(3);
    const waiting = awaitResultCount('run products', search, 3);
    await jest.advanceTimersByTimeAsync(500);
    await waiting;
    expect(search).toHaveBeenCalledTimes(2);
});

test('reports fixture context and last hit count when indexing times out', async () => {
    jest.useFakeTimers();
    const search = jest.fn<() => Promise<number>>().mockResolvedValue(1);
    const waiting = expect(awaitResultCount('Products: run-1, run-2', search, 2))
        .rejects.toThrow('Products: run-1, run-2 was not ready within 120000ms: expected 2 results, last observed 1');
    await jest.advanceTimersByTimeAsync(120_000);
    await waiting;
});

test('does not retry API failures as indexing delays', async () => {
    const search = jest.fn<() => Promise<undefined>>().mockRejectedValue(new Error('Unauthorized'));
    await expect(awaitResultCount('run products', search, 3)).rejects.toThrow('Unauthorized');
    expect(search).toHaveBeenCalledTimes(1);
});

test('waits for recommendation candidates instead of accepting an empty response', async () => {
    jest.useFakeTimers();
    const recommend = jest.fn<() => Promise<{ recommendations: unknown[] }>>()
        .mockResolvedValueOnce({ recommendations: [] })
        .mockResolvedValueOnce({ recommendations: [{}, {}] });
    const waiting = awaitRecommendations('recommendation candidates', recommend);
    await jest.advanceTimersByTimeAsync(500);
    await waiting;
    expect(recommend).toHaveBeenCalledTimes(2);
});

test('does not hide missing recommendation candidates when readiness times out', async () => {
    jest.useFakeTimers();
    const recommend = jest.fn<() => Promise<{ recommendations: unknown[] }>>()
        .mockResolvedValue({ recommendations: [] });
    const waiting = expect(awaitRecommendations('recommendation candidates', recommend))
        .rejects.toThrow('recommendation candidates was not ready within 120000ms');
    await jest.advanceTimersByTimeAsync(120_000);
    await waiting;
});

test('product readiness scopes results to both fixture IDs and the current revision', async () => {
    const searchProducts = jest.fn<Searcher['searchProducts']>().mockResolvedValue({ hits: 1 } as any);
    await awaitProducts({ searchProducts } as unknown as Searcher, ['persistent-product']);
    const filters = JSON.stringify(searchProducts.mock.calls[0][0].filters);
    expect(filters).toContain('persistent-product');
    expect(filters).toContain(fixtureRevisionKey);
    expect(filters).toContain(JSON.stringify(fixtureRevision));
});
