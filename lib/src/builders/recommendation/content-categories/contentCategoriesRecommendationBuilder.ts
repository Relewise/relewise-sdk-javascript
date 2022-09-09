export interface ContentCategoriesRecommendationBuilder<TRequest> {
    build(): { request: TRequest, name: string };
};