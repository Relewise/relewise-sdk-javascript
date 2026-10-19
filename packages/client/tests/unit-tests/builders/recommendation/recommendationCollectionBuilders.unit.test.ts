import { expect, test } from '@jest/globals';
import {
    ContentCategoriesRecommendationCollectionBuilder,
    ContentsRecommendationCollectionBuilder,
    ProductCategoriesRecommendationCollectionBuilder,
    ProductsRecommendationCollectionBuilder,
} from '../../../../src';

const collectionBuilderFactories = [
    ['product', () => new ProductsRecommendationCollectionBuilder()],
    ['content', () => new ContentsRecommendationCollectionBuilder()],
    ['product category', () => new ProductCategoriesRecommendationCollectionBuilder()],
    ['content category', () => new ContentCategoriesRecommendationCollectionBuilder()],
] as const;

test.each(collectionBuilderFactories)('%s recommendation collection supports replacing and appending context values', (_, createBuilder) => {
    const contextValues = {
        DeviceType: 'Mobile',
        SplitTestVariant: 'A',
    };

    const subject = createBuilder()
        .contextValues(contextValues)
        .addContextValue('DeviceType', 'Desktop')
        .build();

    expect(subject.contextValues).toEqual({
        DeviceType: 'Desktop',
        SplitTestVariant: 'A',
    });
    expect(contextValues).toEqual({
        DeviceType: 'Mobile',
        SplitTestVariant: 'A',
    });
});

test.each(collectionBuilderFactories)('%s recommendation collection can clear context values', (_, createBuilder) => {
    const subject = createBuilder()
        .contextValues({ DeviceType: 'Mobile' })
        .contextValues(null)
        .build();

    expect(subject.contextValues).toBeUndefined();
});
