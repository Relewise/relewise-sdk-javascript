import { DataObjectBooleanValueFacet, DataObjectDoubleRangeFacet, DataObjectDoubleRangesFacet, DataObjectDoubleValueFacet, DataObjectStringValueFacet, FacetSettings } from '../../models/data-contracts';


export class DataObjectFacetBuilder {
    private facets: (DataObjectDoubleRangeFacet |
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

    build() {
        return this.facets.length === 0
            ? null
            : this.facets;
    }
}
