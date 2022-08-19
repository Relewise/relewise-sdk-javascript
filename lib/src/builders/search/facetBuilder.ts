import { BrandFacet, CategoryFacet, ContentAssortmentFacet, ContentDataBooleanValueFacet, ContentDataDoubleRangeFacet, ContentDataDoubleValueFacet, ContentDataIntegerValueFacet, ContentDataStringValueFacet, PriceRangeFacet, PriceRangesFacet, ProductAssortmentFacet, ProductDataBooleanValueFacet, ProductDataDoubleRangeFacet, ProductDataDoubleValueFacet, ProductDataIntegerValueFacet, ProductDataStringValueFacet, ProductFacetQuery, VariantSpecificationFacet } from "@/models/data-contracts";

export class FacetBuilder {
    private facets: (
        | ContentAssortmentFacet
        | ProductAssortmentFacet
        | BrandFacet
        | CategoryFacet
        | ContentDataDoubleRangeFacet
        | ContentDataStringValueFacet
        | ContentDataBooleanValueFacet
        | ContentDataDoubleValueFacet
        | ContentDataIntegerValueFacet
        | PriceRangeFacet
        | PriceRangesFacet
        | ProductDataDoubleRangeFacet
        | ProductDataStringValueFacet
        | ProductDataBooleanValueFacet
        | ProductDataDoubleValueFacet
        | ProductDataIntegerValueFacet
        | VariantSpecificationFacet
    )[] = [];

    public addCategoryFacet(categorySelectionStrategy: "ImmediateParent" | "Ancestors", selectedValues: string[] | null = null): this {
        const facet: CategoryFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: "Category",
            selected: selectedValues
        };
        this.facets.push(facet);

        return this;
    }

    public addBrandFacet(selectedValues: string[] | null = null): this {
        const facet: BrandFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.BrandFacet, Relewise.Client',
            field: "Brand",
            selected: selectedValues
        };
        this.facets.push(facet);

        return this;
    }

    public addProductAssortmentFacet(selectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant", selectedValues: number[] | null = null): this {
        const facet: ProductAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductAssortmentFacet, Relewise.Client',
            field: "Assortment",
            assortmentFilterType: "Or",
            assortmentSelectionStrategy: selectionStrategy,
            selected: selectedValues
        };
        this.facets.push(facet);

        return this;
    }

    public addContentAssortmentFacet(selectedValues: number[] | null = null): this {
        const facet: ContentAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentAssortmentFacet, Relewise.Client',
            field: "Assortment",
            assortmentFilterType: "Or",
            selected: selectedValues
        };
        this.facets.push(facet);

        return this;
    }

    build(): ProductFacetQuery | null {
        return this.facets.length == 0
            ? null
            : { items: this.facets }
    }
}