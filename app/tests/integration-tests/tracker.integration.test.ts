import { Tracker, UserFactory } from "@relewise/relewise-client";

const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const tracker = new Tracker(DATASET_ID, API_KEY, { serverUrl: SERVER_URL });

test('Track Order', async () => {
    const result = await tracker.trackOrder({
        order: {
            cartName: "",
            lineItems: [],
            subtotal: {
                amount: 100,
                currency: {
                    value: "DKK",
                }
            },
            trackingNumber: "",
            user: UserFactory.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});

test('Track Cart', async () => {
    const result = await tracker.trackCart({
        cart: {
            lineItems: [],
            subtotal: {
                amount: 100,
                currency: {
                    value: "DKK",
                }
            },
            user: UserFactory.Anonymous(),
        }
    });
    expect(result).toBeDefined();
});

test('Track Product View', async () => {
    const result = await tracker.tractProductView({
         productId: 'p-1',
         user: UserFactory.Anonymous()
    });
    expect(result).toBeDefined();
});

test('Track Product Category View', async () => {
    const result = await tracker.trackProductCategoryView({
            idPath: ["c1"],
            user: UserFactory.Anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Content View', async () => {
    const result = await tracker.trackContentView({
        contentId: 'p-1',
        user: UserFactory.Anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Content Category View', async () => {
    const result = await tracker.trackContentCategoryView({
        idPath: ["c1"],
        user: UserFactory.Anonymous(),
    });
    expect(result).toBeDefined();
});

test('Track Brand View', async () => {
    const result = await tracker.trackBrandView({
        brandId: 'b-1',
        user: UserFactory.Anonymous(),
    });
    expect(result).toBeDefined();
});
