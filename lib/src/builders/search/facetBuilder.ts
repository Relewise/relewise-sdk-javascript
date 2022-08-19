import { BrandFacet, Category, CategoryFacet, ContentAssortmentFacet, ContentDataBooleanValueFacet, ContentDataDoubleRangeFacet, ContentDataDoubleValueFacet, ContentDataIntegerValueFacet, ContentDataStringValueFacet, PriceRangeFacet, PriceRangesFacet, ProductAssortmentFacet, ProductDataBooleanValueFacet, ProductDataDoubleRangeFacet, ProductDataDoubleValueFacet, ProductDataIntegerValueFacet, ProductDataStringValueFacet, ProductFacetQuery, VariantSpecificationFacet } from "@/models/data-contracts";

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

    public addCategoryFacet(categorySelectionStrategy: "ImmediateParent" | "Ancestors", selectedValues?: string | string[] | null): this {
        const selected = Array.isArray(selectedValues)
            ? selectedValues
            : (selectedValues != null ? [selectedValues] : null);

        const facet: CategoryFacet ={
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: "Category",
            selected: selected
        };
        this.facets.push(facet);

        return this;
    }

    public addBrandFacet(selectedValues?: string | string[] | null): this {
        const selected = Array.isArray(selectedValues)
            ? selectedValues
            : (selectedValues != null ? [selectedValues] : null);

        const facet: BrandFacet ={
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.BrandFacet, Relewise.Client',
            field: "Brand",
            selected: selected
        };
        this.facets.push(facet);

        return this;
    }

    public addProductAssortmentFacet(selectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant", selectedValues?: number | number[] | null): this {
        const selected = Array.isArray(selectedValues)
            ? selectedValues
            : (selectedValues != null ? [selectedValues] : null);

        const facet: ProductAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductAssortmentFacet, Relewise.Client',
            field: "Assortment",
            assortmentFilterType: "Or",
            assortmentSelectionStrategy: selectionStrategy,
            selected: selected
        };
        this.facets.push(facet);

        return this;
    }

    public addContentAssortmentFacet(selectedValues?: number | number[] | null): this {
        const selected = Array.isArray(selectedValues)
            ? selectedValues
            : (selectedValues != null ? [selectedValues] : null);

        const facet: ContentAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentAssortmentFacet, Relewise.Client',
            field: "Assortment",
            assortmentFilterType: "Or",
            selected: selected
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