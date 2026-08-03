import { Tracker } from '../../src/tracker';

describe('RelewiseRequestOptions', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    test('passes keepalive to fetch when tracking events', async () => {
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockRejectedValue(new Error('No content')),
        } as unknown as Response);

        global.fetch = fetchMock;

        const tracker = new Tracker('dataset-id', 'api-key');

        await tracker.trackProductView({
            productId: 'product-id',
            user: {
                temporaryId: 'temporary-id',
            },
        }, { keepalive: true });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            keepalive: true,
        }));
    });
});
