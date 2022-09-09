import { ProductRecommendationRequestCollection, ProductsRecommendationCollectionBuider, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, UserFactory } from '@relewise/client';
//import "search";

const { API_KEY: API_KEY, DATASET_ID: DATASET_ID } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!);

const settings = {
    language: 'en-US',
    currency: 'USD',
    displayedAtLocation: 'batched integration test',
    user: UserFactory.anonymous(),
};


const request: ProductRecommendationRequestCollection = new ProductsRecommendationCollectionBuider()
    .addRequest(new PurchasedWithProductBuilder(settings).product({ productId: '1' }).build().request)
    .addRequest(new ProductsViewedAfterViewingProductBuilder(settings).product({ productId: '1' }).build().request)
    .build();

try {
    recommender.batchProductRecommendations(request).then(x => console.log(x));

} catch (e) {
    console.log(e)
}