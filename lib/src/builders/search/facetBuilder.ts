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

    build(): ProductFacetQuery | null {
        return this.facets.length == 0
            ? null
            : { items: this.facets }
    }
}