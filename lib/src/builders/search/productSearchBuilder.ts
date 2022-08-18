import { ContentSearchRequest, ProductSearchRequest, RecommendationSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings } from "@/models/data-contracts";
import { PaginationBuilder } from "../filterBuilder";
import { Settings } from "../settings";
import { Builder } from "./builder";
import { SearchRequestBuilder } from "./searchRequestBuilder";

export class ContentSearchBuilder extends SearchRequestBuilder implements Builder {
    private pageNumber: number = 1;
    private pageSize: number = 0;
    private term: string | null | undefined;

    constructor(settings: Settings) {
        super(settings)
    }

    public setTerm(term: string) {
        return this;
    }

    public build(): ContentSearchRequest {
        return {
            ...this.baseBuild(),
            skip: 0,
            take: 0,
        };
    }
}

export class ProductSearchBuilder extends SearchRequestBuilder implements Builder {
    private pageNumber: number = 1;
    private pageSize: number = 10;
    private term: string | null | undefined;

    constructor(settings: Settings) {
        super(settings)
    }

    public setProductProperties(productProperties: SelectedProductPropertiesSettings): ProductSearchBuilder {

        return this;
    }

    public setVariantProperties(variantProperties: SelectedVariantPropertiesSettings): ProductSearchBuilder {

        return this;
    }

    public setExplodedVariants(count?: number | null): ProductSearchBuilder {

        return this;
    }

    public setRecommendationSettings({ take, onlyIncludeRecommendationsWhenLessResultsThan }: {  take?: number | null, onlyIncludeRecommendationsWhenLessResultsThan?: number | null }): ProductSearchBuilder {

        return this;
    }
    // public setRecommendationSettings(settings: RecommendationSettings): ProductSearchBuilder {

    //     return this;
    // }

    /**
     * Set the term used to filter products by
     */
    public setTerm(term: string | null | undefined): ProductSearchBuilder {

        this.term = term;

        return this;
    }

    public pagination(paginate: (pagination: PaginationBuilder) => void) : ProductSearchBuilder {

        return this;
    }


    public build(): ProductSearchRequest {
        return {
            ...this.baseBuild(),
    
            skip: (this.pageNumber - 1) * this.pageSize,
            take: this.pageSize,
            term: this.term,

            facets: null,
            settings: null,
            sorting: null,   
        };
    }
}

