import { RELEWISE_DATASET_ID, RELEWISE_API_KEY, RELEWISE_SERVER_URL } from '../../local.config';
import { Tracker, User } from "@relewise/relewise-client";

const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY, { serverUrl: RELEWISE_SERVER_URL });

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
            user: User.Anonymous(),
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
            user: User.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});

test('Track Product View', async () => {
    const result = await tracker.tractProductView({
        productView: {
            product: {
                id: 'p-1'
            },
            user: User.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});

test('Track Product Category View', async () => {
    const result = await tracker.trackProductCategoryView({
        productCategoryView: {
            idPath: ["c1"],
            user: User.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});

test('Track Content View', async () => {
    const result = await tracker.trackContentView({
        contentView: {
            content: {
                id: 'p-1'
            },
            user: User.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});

test('Track Content Category View', async () => {
    const result = await tracker.trackContentCategoryView({
        contentCategoryView: {
            idPath: ["c1"],
            user: User.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});

test('Track Brand View', async () => {
    const result = await tracker.trackBrandView({
        brandView: {
            brand: {
                id: 'b-1'
            },
            user: User.Anonymous(),
        }
    });

    expect(result).toBeDefined();
});
