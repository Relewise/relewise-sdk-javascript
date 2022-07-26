import { RELEWISE_DATASET_ID, RELEWISE_API_KEY } from './local.config';
import { Tracker, User } from "@relewise/relewise-client";
const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY, { serverUrl: "https://localhost:5000" });
tracker.trackOrder({
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
tracker.trackCart({
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
tracker.tractkProductView({
    productView: {
        product: {
            id: "1",
        },
        user: User.Anonymous()
    }
});
tracker.trackContentView({
    contentView: {
        content: {
            id: "1",
        },
        user: User.Anonymous()
    }
});
tracker.trackBrandView({
    brandView: {
        brand: {
            id: "1",
        },
        user: User.Anonymous()
    }
});
tracker.trackProductCategoryView({
    productCategoryView: {
        idPath: ["1"],
        user: User.Anonymous()
    }
});
tracker.trackContentCategoryView({
    contentCategoryView: {
        idPath: ["1"],
        user: User.Anonymous()
    }
});
