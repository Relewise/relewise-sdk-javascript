import { BrandRecommendationRequest } from '@/models/data-contracts';

export interface BrandsRecommendationBuilder<TRequest = BrandRecommendationRequest> {
    build(): { request: TRequest, name: string };
};