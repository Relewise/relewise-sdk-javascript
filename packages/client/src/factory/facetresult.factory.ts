import { BrandFacetResult, ProductAssortmentFacetResult, ProductFacetResult } from 'src/models/data-contracts';

// Use `declare global` to add a static method to the `ProductFacetResult` interface
export class GetProductFacet {
    static productAssortment(items: ProductFacetResult, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant'): ProductAssortmentFacetResult | null {
        if (!items) return null;

        const result = items
            .items!
            .filter((item: unknown) =>
                item !== null && typeof item === 'object' && 'assortmentSelectionStrategy' in item && item.assortmentSelectionStrategy === selectionStrategy)
            [0];

        return result as ProductAssortmentFacetResult;
    }

    static brand(items: ProductFacetResult): BrandFacetResult | null {
        if (!items) return null;

        const result = items
            .items!
            .filter((item: unknown) =>
                item !== null && typeof item === 'object' && 'field' in item && item.field === 'Brand')
            [0];

        return result as BrandFacetResult;
    }
};