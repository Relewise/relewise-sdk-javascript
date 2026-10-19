import { expect, test } from '@jest/globals';
import {
    ContentCategoriesRecommendationCollectionBuilder,
    ContentsRecommendationCollectionBuilder,
    ProductCategoriesRecommendationCollectionBuilder,
    ProductsRecommendationCollectionBuilder,
} from '../../../../src';

test.each([
    ['product', new ProductsRecommendationCollectionBuilder()],
    ['content', new ContentsRecommendationCollectionBuilder()],
    ['product category', new ProductCategoriesRecommendationCollectionBuilder()],
    ['content category', new ContentCategoriesRecommendationCollectionBuilder()],
])('%s recommendation collection supports context values', (_, builder) => {
    const contextValues = {
        DeviceType: 'Mobile',
        SplitTestVariant: null,
    };

    const subject = builder
        .contextValues(contextValues)
        .build();

    expect(subject.contextValues).toEqual(contextValues);
});
