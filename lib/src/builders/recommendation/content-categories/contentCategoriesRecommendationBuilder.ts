import { ContentCategoryRecommendationRequest } from '@/models/data-contracts';

export interface ContentCategoriesRecommendationBuilder<TRequest = ContentCategoryRecommendationRequest> {
    build(): { request: TRequest, name: string };
};