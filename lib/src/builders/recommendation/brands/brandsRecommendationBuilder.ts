export interface BrandsRecommendationBuilder<TRequest> {
    build(): { request: TRequest, name: string };
};