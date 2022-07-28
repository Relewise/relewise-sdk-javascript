import { RELEWISE_DATASET_ID, RELEWISE_API_KEY } from '../../local.config';
import { Tracker, User } from "@relewise/relewise-client";

const tracker = new Tracker(RELEWISE_DATASET_ID, RELEWISE_API_KEY, { serverUrl: "https://localhost:5000" });

describe("Track Order", () => {
    it("Should return OK", async() => {
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

        console.log(result);

        expect(RELEWISE_DATASET_ID).toEqual("2023b77a-7e25-47e8-853f-8c42f46a359b");
    })
});