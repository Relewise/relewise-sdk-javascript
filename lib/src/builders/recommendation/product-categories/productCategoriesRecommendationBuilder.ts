import { ProductCategoryRecommendationRequest } from '@/models/data-contracts';

export interface ProductCategoriesRecommendationBuilder<TRequest = ProductCategoryRecommendationRequest> {
    build(): { request: TRequest, name: string };
};