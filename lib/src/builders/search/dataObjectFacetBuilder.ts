import { DataObjectBooleanValueFacet, DataObjectDoubleRangeFacet, DataObjectDoubleRangesFacet, DataObjectDoubleValueFacet, DataObjectStringValueFacet, FacetSettings } from '../../models/data-contracts';


export class DataObjectFacetBuilder {
    private facets: (
        DataObjectDoubleRangeFacet |
        DataObjectDoubleRangesFacet |
        DataObjectStringValueFacet |
        DataObjectBooleanValueFacet |
        DataObjectDoubleValueFacet)[] = [];

    public addStringFacet(
        key: string,
        selectedValues: string[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings): this {

        const facet: DataObjectStringValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectStringValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addBooleanFacet(
        key: string,
        selectedValues: boolean[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings): this {

        const facet: DataObjectBooleanValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectBooleanValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addNumberFacet(
        key: string,
        selectedValues: number[] | null = null,
        collectionFilterType?: 'Or' | 'And',
        facetSettings?: FacetSettings): this {

        const facet: DataObjectDoubleValueFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectDoubleValueFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: selectedValues,
            collectionFilterType: collectionFilterType,
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addNumberRangeFacet(
        key: string,
        lowerBound?: number | null, 
        upperBound?: number | null,
        facetSettings?: FacetSettings): this {

        const facet: DataObjectDoubleRangeFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectDoubleRangeFacet, Relewise.Client',
            field: 'Data',
            key: key,
            selected: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            settings: facetSettings,
        };
        this.facets.push(facet);

        return this;
    }

    public addNumberRangesFacet(
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

        const facet: DataObjectDoubleRangesFacet = {
            $type: 'Relewise.Client.DataTypes.Search.Facets.Queries.DataObjectDoubleRangesFacet, Relewise.Client',
            field: 'Data',
            key: key,
            settings: facetSettings,
            predefinedRanges: predefinedRanges?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
            expandedRangeSize: expandedRangeSize,
            selected: selectedValues?.map(x => ({ lowerBoundInclusive: x.lowerBound, upperBoundExclusive: x.upperBound })),
        };
        this.facets.push(facet);

        return this;
    }

    build() {
        return this.facets.length === 0
            ? null
            : this.facets;
    }
}
