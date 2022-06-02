import { RELEWISE_DATASET_ID, RELEWISE_API_KEY } from "./config";
import { Recommender } from "@relewise/relewise-client";
const recommender = new Recommender(RELEWISE_DATASET_ID, RELEWISE_API_KEY);
recommender.popularProducts({
    basedOn: 'MostPurchased',
    sinceMinutesAgo: 10368000,
    language: {
        value: 'da-dk'
    },
    filters: {},
    settings: {
        selectedProductProperties: {
            displayName: true,
            dataKeys: [
                "Images",
                "Labeling",
                "SubTitle"
            ],
        }
    }
}).then((result) => {
    console.log(result);
});
