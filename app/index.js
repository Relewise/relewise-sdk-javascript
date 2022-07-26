import { RELEWISE_DATASET_ID, RELEWISE_API_KEY } from './local.config';
import { Tracker, User } from "@relewise/relewise-client";
const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY, "https://localhost:5000");
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
