import { RELEWISE_DATASET_ID, RELEWISE_API_KEY } from "../config";
import { Recommender } from "@relewise/relewise-client";
import { ProductRecommendationTest } from "./tester";
const recommender = new Recommender(RELEWISE_DATASET_ID, RELEWISE_API_KEY);
const popularProductsTest = new ProductRecommendationTest("Popular Products Recommendation", () => recommender.popularProducts({
    basedOn: 'MostPurchased',
    sinceMinutesAgo: 10368000,
    language: {
        value: 'da-dk'
    },
    filters: {},
    settings: {
        allowFillIfNecessaryToReachNumberOfRecommendations: false,
        numberOfRecommendations: 500
    },
}));
const recentlyViewedProductsTest = new ProductRecommendationTest("Recently Viewed Products Recommendation", () => recommender.recentlyViewedProducts({
    language: {
        value: 'da-dk'
    },
    filters: {},
}));
const personalProductRecommendationTest = new ProductRecommendationTest("Personal Product Recommendation", () => recommender.personalProductRecommendation({
    language: {
        value: 'da-dk'
    },
    filters: {},
}));
export default [
    popularProductsTest,
    recentlyViewedProductsTest,
    personalProductRecommendationTest
];
