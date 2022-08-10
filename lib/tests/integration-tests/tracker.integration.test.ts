import { Tracker, UserFactory } from '../../src';

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const tracker = new Tracker(DATASET_ID, API_KEY, { serverUrl: SERVER_URL });

test('Track Order', async () => {
    await expect(async() => await tracker.trackOrder({
            lineItems: [
                {
                    lineTotal: 100,
                    productId: 'p-1',
                    quantity: 1,
                    variantId: 'v1'
                }
            ],
            subtotal: {
                amount: 100,
                currency: 'DKK', 
            },
            trackingNumber: '',
            user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Product View', async () => {
    await expect(async() => await tracker.trackProductView({
         productId: 'p-1',
         user: UserFactory.anonymous()
    })).not.toThrow();
});

test('Track Product Category View', async () => {
    await expect(async() => await tracker.trackProductCategoryView({
            idPath: ['c1'],
            user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Content View', async () => {
    await expect(async() => await tracker.trackContentView({
        contentId: 'p-1',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Content Category View', async () => {
    await expect(async() => await tracker.trackContentCategoryView({
        idPath: ['c1'],
        user: UserFactory.anonymous(),
    })).not.toThrow();
});

test('Track Brand View', async () => {
    await expect(async() => await tracker.trackBrandView({
        brandId: 'b-1',
        user: UserFactory.anonymous(),
    })).not.toThrow();
});