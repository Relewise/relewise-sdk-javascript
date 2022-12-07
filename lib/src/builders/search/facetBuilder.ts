import { ProductCategoryAssortmentFacet, BrandFacet, CategoryFacet, ContentAssortmentFacet, ContentDataBooleanValueFacet, ContentDataDoubleRangeFacet, ContentDataDoubleRangesFacet, ContentDataDoubleValueFacet, ContentDataIntegerValueFacet, ContentDataStringValueFacet, FacetSettings, PriceRangeFacet, PriceRangesFacet, ProductAssortmentFacet, ProductCategoryDataBooleanValueFacet, ProductCategoryDataDoubleRangeFacet, ProductCategoryDataDoubleRangesFacet, ProductCategoryDataDoubleValueFacet, ProductCategoryDataIntegerValueFacet, ProductCategoryDataStringValueFacet, ProductDataBooleanValueFacet, ProductDataDoubleRangeFacet, ProductDataDoubleRangesFacet, ProductDataDoubleValueFacet, ProductDataIntegerValueFacet, ProductDataStringValueFacet, ProductFacetQuery, VariantSpecificationFacet } from '../../models/data-contracts';

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
        | ContentDataDoubleRangesFacet
        | PriceRangeFacet
        | PriceRangesFacet
        | ProductDataDoubleRangeFacet
        | ProductDataStringValueFacet
        | ProductDataBooleanValueFacet
        | ProductDataDoubleValueFacet
        | ProductDataIntegerValueFacet
        | VariantSpecificationFacet
        | ProductDataDoubleRangesFacet
        | ProductCategoryAssortmentFacet
        | ProductCategoryDataDoubleRangeFacet
        | ProductCategoryDataStringValueFacet
        | ProductCategoryDataBooleanValueFacet
        | ProductCategoryDataDoubleValueFacet
        | ProductCategoryDataIntegerValueFacet
        | ProductCategoryDataDoubleRangesFacet
    )[] = [];

    //#region Product
    public addCategoryFacet(categorySelectionStrategy: 'ImmediateParent' | 'Ancestors', selectedValues: string[] | null = null, facetSettings?: FacetSettings): this {
        const facet: CategoryFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.CategoryFacet, Relewise.Client',
            categorySelectionStrategy: categorySelectionStrategy,
            field: 'Category',
            selected: selectedValues,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addBrandFacet(selectedValues: string[] | null = null, facetSettings?: FacetSettings): this {
        const facet: BrandFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.BrandFacet, Relewise.Client',
            field: 'Brand',
            selected: selectedValues,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductAssortmentFacet(selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', selectedValues: number[] | null = null, facetSettings?: FacetSettings): this {
        const facet: ProductAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            assortmentSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addVariantSpecificationFacet(key: string, selectedValues: string[] | null = null, facetSettings?: FacetSettings): this {
        const facet: VariantSpecificationFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.VariantSpecificationFacet, Relewise.Client',
            field: 'VariantSpecification',
            key: key,
            selected: selectedValues,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleRangeFacet(key: string, selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant', lowerBound?: number, upperBound?: number, facetSettings?: FacetSettings): this {
        const facet: ProductDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleRangesFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null,
        facetSettings?: FacetSettings): this {

        const facet: ProductDataDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            dataSelectionStrategy: selectionStrategy,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataStringValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: string[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings): this {

        const facet: ProductDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataStringValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataBooleanValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: boolean[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings): this {

        const facet: ProductDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductDataDoubleValueFacet(
        key: string,
        selectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        selectedValues: number[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings): this {

        const facet: ProductDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            dataSelectionStrategy: selectionStrategy,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addSalesPriceRangeFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        lowerBound?: number,
        upperBound?: number,
        facetSettings?: FacetSettings): this {

        const facet: PriceRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangeFacet, Relewise.Client',
            field: 'SalesPrice',
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            priceSelectionStrategy,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addListPriceRangeFacet(
        priceSelectionStrategy: 'Product' | 'Variant' | 'VariantWithFallbackToProduct' | 'ProductWithFallbackToVariant',
        lowerBound?: number,
        upperBound?: number,
        facetSettings?: FacetSettings): this {

        const facet: PriceRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangeFacet, Relewise.Client',
            field: 'ListPrice',
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            priceSelectionStrategy,
            settings: facetSettings,
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
        }[] | null = null,
        facetSettings?: FacetSettings): this {

        const facet: PriceRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.PriceRangesFacet, Relewise.Client',
            field: 'ListPrice',
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            priceSelectionStrategy,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }
    //#endregion

    //#region Content
    public addContentAssortmentFacet(selectedValues: number[] | null = null, facetSettings?: FacetSettings): this {
        const facet: ContentAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            selected: selectedValues,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings): this {
        const facet: ContentDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            selected: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            key: key,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataDoubleRangesFacet(
        key: string,
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null, 
        facetSettings?: FacetSettings): this {

        const facet: ContentDataDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataStringValueFacet(key: string, selectedValues: string[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings): this {
        const facet: ContentDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataStringValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataBooleanValueFacet(key: string, selectedValues: boolean[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings): this {
        const facet: ContentDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addContentDataDoubleValueFacet(key: string, selectedValues: number[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings): this {
        const facet: ContentDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ContentDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }
    //#endregion

    //#region ProductCategories
    public addProductCategoryAssortmentFacet(selectedValues: number[] | null = null, facetSettings?: FacetSettings): this {
        const facet: ProductCategoryAssortmentFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryAssortmentFacet, Relewise.Client',
            field: 'Assortment',
            assortmentFilterType: 'Or',
            selected: selectedValues,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataDoubleRangeFacet(key: string, lowerBound?: number | null, upperBound?: number | null, facetSettings?: FacetSettings): this {
        const facet: ProductCategoryDataDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            selected: { lowerBoundInclusive: lowerBound, upperBoundInclusive: upperBound },
            key: key,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataDoubleRangesFacet(
        key: string,
        predefinedRanges?: {
            lowerBound?: number,
            upperBound?: number
        }[] | null,
        expandedRangeSize?: number | null,
        selectedValues: {
            lowerBound?: number,
            upperBound?: number
        }[] | null = null, 
        facetSettings?: FacetSettings): this {

        const facet: ProductCategoryDataDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductDataDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataStringValueFacet(key: string, selectedValues: string[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings): this {
        const facet: ProductCategoryDataStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataStringValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataBooleanValueFacet(key: string, selectedValues: boolean[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings): this {
        const facet: ProductCategoryDataBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataBooleanValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addProductCategoryDataDoubleValueFacet(key: string, selectedValues: number[] | null = null, collectionFilterType?: 'Or' | 'And', facetSettings?: FacetSettings): this {
        const facet: ProductCategoryDataDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.ProductCategoryDataDoubleValueFacet, Relewise.Client',
            field: 'Data',
            selected: selectedValues,
            key: key,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }
    //#endregion

    build(): ProductFacetQuery | null {
        return this.facets.length === 0
            ? null
            : { items: this.facets }
    }
}