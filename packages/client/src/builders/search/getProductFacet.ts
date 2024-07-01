import { BrandFacetResult, CategoryFacetResult, CategoryHierarchyFacet, ProductAssortmentFacetResult, ProductFacetResult } from 'src/models/data-contracts';

// Use `declare global` to add a static method to the `ProductFacetResult` interface
export class GetProductFacet {
    static productAssortment(items: ProductFacetResult, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant'): ProductAssortmentFacetResult | null {
        if (!items?.items) return null;

        const result = items
            .items
            .filter((item: any) =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.ProductAssortmentFacetResult' &&
                'field' in item &&
                item.field === 'Assortment' &&
                'assortmentSelectionStrategy' in item &&
                item.assortmentSelectionStrategy === selectionStrategy)
            [0];

        return result as ProductAssortmentFacetResult;
    }

    static brand(items: ProductFacetResult): BrandFacetResult | null {
        if (!items?.items) return null;

        const result = items
            .items
            .filter((item: any) =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.BrandFacetResult' &&
                'field' in item &&
                item.field === 'Brand')
            [0];

        return result as BrandFacetResult;
    }

    static category(items: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryFacetResult | null {
        if (!items?.items) return null;

        const result = items
            .items
            .filter((item: any) =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.CategoryFacetResult' &&
                'categorySelectionStrategy' in item
                && item.categorySelectionStrategy === selectionStrategy)
            [0];

        return result as CategoryFacetResult;
    }

    static categoryHierarchy(items: ProductFacetResult, selectionStrategy: 'ImmediateParent' | 'Ancestors' | 'Descendants'): CategoryHierarchyFacet | null {
        if (!items?.items) return null;

        const result = items
            .items
            .filter((item: any) =>
                '$type' in item &&
                item.$type === 'Relewise.Client.DataTypes.Search.Facets.Result.CategoryHierarchyFacet' &&
                'categorySelectionStrategy' in item &&
                item.categorySelectionStrategy === selectionStrategy)
            [0];

        return result as CategoryHierarchyFacet;
    }
};