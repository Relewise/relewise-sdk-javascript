import { Tracker, UserFactory } from "../../src";

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const tracker = new Tracker(DATASET_ID, API_KEY, { serverUrl: SERVER_URL });

test('Track Order', async () => {
    const result = await tracker.trackOrder({
            cartName: "default",
            lineItems: [],
            subtotal: {
                amount: 100,
                currency: "DKK", 
            },
            trackingNumber: "",
            user: UserFactory.anonymous(),
    });

    expect(result).toBeDefined();
});

test('Track Cart', async () => {
    const result = await tracker.trackCart({
        cartName: "default",
        lineItems: [],
        subtotal: {
            amount: 100,
            currency: "DKK", 
        },
        user: UserFactory.anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Product View', async () => {
    const result = await tracker.tractProductView({
         productId: 'p-1',
         user: UserFactory.anonymous()
    });
    expect(result).toBeDefined();
});

test('Track Product Category View', async () => {
    const result = await tracker.trackProductCategoryView({
            idPath: ["c1"],
            user: UserFactory.anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Content View', async () => {
    const result = await tracker.trackContentView({
        contentId: 'p-1',
        user: UserFactory.anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Content Category View', async () => {
    const result = await tracker.trackContentCategoryView({
        idPath: ["c1"],
        user: UserFactory.anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Brand View', async () => {
    const result = await tracker.trackBrandView({
        brandId: 'b-1',
        user: UserFactory.anonymous(),
    });
    expect(result).toBeDefined();
});
