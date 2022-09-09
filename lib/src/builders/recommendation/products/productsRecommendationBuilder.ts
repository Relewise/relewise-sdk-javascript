import { ProductRecommendationRequest } from '@/models/data-contracts';

export interface ProductsRecommendationBuilder<TRequest = ProductRecommendationRequest> {
    build(): { request: TRequest, name: string };
};