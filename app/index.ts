import { ProductRecommendationRequestCollection, ProductsRecommendationCollectionBuider, ProductsViewedAfterViewingProductBuilder, PurchasedWithProductBuilder, Recommender, UserFactory } from '@relewise/client';
//import "search";

const { API_KEY: API_KEY, DATASET_ID: DATASET_ID } = process.env;

const recommender = new Recommender(DATASET_ID!, API_KEY!);

const settings = {
    language: 'da-DK',
    currency: 'DKK',
    displayedAtLocation: 'Product Details Page',
    user: UserFactory.anonymous(),
};

const request: ProductRecommendationRequestCollection = new ProductsRecommendationCollectionBuider()
    .addRequest(new PurchasedWithProductBuilder(settings).product({ productId: '1' }).build())
    .addRequest(new ProductsViewedAfterViewingProductBuilder(settings).product({ productId: '1' }).build())
    .build();

const result: ProductRecommendationRequestCollection = await recommender.batchProductRecommendations(request)

