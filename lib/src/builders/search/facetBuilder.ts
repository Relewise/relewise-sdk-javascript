import { BrandFacet, CategoryFacet, ContentAssortmentFacet, ContentDataBooleanValueFacet, ContentDataDoubleRangeFacet, ContentDataDoubleValueFacet, ContentDataIntegerValueFacet, ContentDataStringValueFacet, Facet, PriceRangeFacet, PriceRangesFacet, ProductAssortmentFacet, ProductDataBooleanValueFacet, ProductDataDoubleRangeFacet, ProductDataDoubleValueFacet, ProductDataIntegerValueFacet, ProductDataStringValueFacet, ProductFacetQuery, VariantSpecificationFacet } from '@/models/data-contracts';

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

    public addCategoryFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors', selectedValues: string[] | null = null): this {
        const facet: CategoryFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: 'Category',
            selected: selectedValues,
        };
        this.facets.push(facet);

        return this;
    }

    public addBrandFacet(selectedValues: string[] | null = null): this {
        const facet: BrandFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.BrandFacet, Relewise.Client',
            field: 'Brand',
            selected: selectedValues,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductAssortmentFacet(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues: number[] | null = null): this {
        const facet: ProductAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            assortmentSelectionStrategy: selectionStrategy,
            selected: selectedValues,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentAssortmentFacet(selectedValues: number[] | null = null): this {
        const facet: ContentAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            selected: selectedValues,
        };
        this.facets.push(facet);

        return this;
    }

    public addVariantSpecificationFacet(key: string, selectedValues: string[] | null = null): this {
        const facet: VariantSpecificationFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.VariantSpecificationFacet, Relewise.Client',
            field: 'VariantSpecification',
            key: key,
            selected: selectedValues,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleRangeFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number): this {
        const facet: ProductDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataStringValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: string[] | null = null,
        collectionFilterType?: 'Or' | 'And'): this {

        const facet: ProductDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataStringValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataBooleanValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: boolean[] | null = null,
        collectionFilterType?: 'Or' | 'And'): this {

        const facet: ProductDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: number[] | null = null,
        collectionFilterType?: 'Or' | 'And'): this {

        const facet: ProductDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
        };
        this.facets.push(facet);

        return this;
    }

    public addSalesPriceRangeFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        lowerBound?: number,
        upperBound?: number): this {

        const facet: PriceRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangeFacet, Relewise.Client',
            field: 'SalesPrice',
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            priceSelectionStrategy,
        };
        this.facets.push(facet);

        return this;
    }

    public addListPriceRangeFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        lowerBound?: number,
        upperBound?: number): this {

        const facet: PriceRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangeFacet, Relewise.Client',
            field: 'ListPrice',
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            priceSelectionStrategy,
        };
        this.facets.push(facet);

        return this;
    }

    public addListPriceRangesFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null): this {

        const facet: PriceRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangesFacet, Relewise.Client',
            field: 'ListPrice',
            predefinedRanges: predefinedRanges?.map(x => ({lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound})),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound})),
            priceSelectionStrategy,
        };
        this.facets.push(facet);

        return this;
    }

    build(): ProductFacetQuery | null {
        return this.facets.length === 0
            ? null
            : { items: this.facets }
    }
}