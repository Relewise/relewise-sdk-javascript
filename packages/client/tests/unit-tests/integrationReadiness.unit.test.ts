import { afterEach, expect, jest, test } from '@jest/globals';
import { awaitSearchHits } from '../integrationReadiness';

afterEach(() => { jest.useRealTimers(); });

test('waits for all fixtures rather than accepting partial visibility', async () => {
    jest.useFakeTimers();
    const search = jest.fn<() => Promise<{ hits: number }>>()
        .mockResolvedValueOnce({ hits: 1 }).mockResolvedValueOnce({ hits: 3 });
    const waiting = awaitSearchHits('run products', search, 3);
    await jest.advanceTimersByTimeAsync(500);
    await waiting;
    expect(search).toHaveBeenCalledTimes(2);
});

test('reports fixture context and last hit count when indexing times out', async () => {
    jest.useFakeTimers();
    const search = jest.fn<() => Promise<{ hits: number }>>().mockResolvedValue({ hits: 1 });
    const waiting = expect(awaitSearchHits('Products: run-1, run-2', search, 2))
        .rejects.toThrow('Products: run-1, run-2 was not indexed within 45000ms: expected 2 hits, last observed 1');
    await jest.advanceTimersByTimeAsync(45_000);
    await waiting;
});

test('does not retry API failures as indexing delays', async () => {
    const search = jest.fn<() => Promise<undefined>>().mockRejectedValue(new Error('Unauthorized'));
    await expect(awaitSearchHits('run products', search, 3)).rejects.toThrow('Unauthorized');
    expect(search).toHaveBeenCalledTimes(1);
});
