import { expect } from '@jest/globals';
import { ContentRecommendationResponse, ProductRecommendationResponse } from '../../src';

// A new dataset can accept a recommendation request before it has enough behavior
// to produce candidates. Validate the API response and any candidates it returns.
export function expectProductRecommendations(response: ProductRecommendationResponse | undefined): void {
    expect(response).toBeDefined();
    expect(Array.isArray(response?.recommendations)).toBe(true);
    for (const recommendation of response?.recommendations ?? []) {
        expect(typeof recommendation.productId).toBe('string');
        expect(recommendation.productId?.length).toBeGreaterThan(0);
    }
}

export function expectContentRecommendations(response: ContentRecommendationResponse | undefined): void {
    expect(response).toBeDefined();
    expect(Array.isArray(response?.recommendations)).toBe(true);
    for (const recommendation of response?.recommendations ?? []) {
        expect(typeof recommendation.contentId).toBe('string');
        expect(recommendation.contentId?.length).toBeGreaterThan(0);
    }
}
