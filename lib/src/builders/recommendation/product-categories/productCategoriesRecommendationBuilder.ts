export interface ProductCategoriesRecommendationBuilder<TRequest> {
    build(): { request: TRequest, name: string };
};