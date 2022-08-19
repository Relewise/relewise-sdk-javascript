import { ContentSearchRequest, ProductSearchRequest, ProductSearchSettings, RecommendationSettings, SelectedBrandPropertiesSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings } from "@/models/data-contracts";
import { PaginationBuilder } from "../paginationBuilder";
import { Settings } from "../settings";
import { SearchBuilder } from "./searchBuilder";
import { SearchRequestBuilder } from "./searchRequestBuilder";

export class ContentSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private term: string | null | undefined;

    constructor(settings: Settings) {
        super(settings)
    }

    public setTerm(term: string | null | undefined): this {
        this.term = term;

        return this;
    }

    public pagination(paginate: (pagination: PaginationBuilder) => void) : this {
        paginate(this.paginationBuilder);

        return this;
    }

    public build(): ContentSearchRequest {
        return {
            ...this.baseBuild(),
            ...this.paginationBuilder.build(),
            term: this.term,
        };
    }
}

export class ProductSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private term: string | null | undefined;

    private searchSettings: ProductSearchSettings = {
        $type: 'Relewise.Client.Requests.Search.Settings.ProductSearchSettings, Relewise.Client'
    };

    constructor(settings: Settings) {
        super(settings)
    }

    public setProductProperties(productProperties: SelectedProductPropertiesSettings): this {
        this.searchSettings.selectedProductProperties = productProperties;

        return this;
    }

    public setVariantProperties(variantProperties: SelectedVariantPropertiesSettings): this {
        this.searchSettings.selectedVariantProperties = variantProperties;

        return this;
    }

    public setBrandProperties(brandProperties: SelectedBrandPropertiesSettings): this {
        this.searchSettings.selectedBrandProperties = brandProperties;

        return this;
    }

    public setExplodedVariants(count?: number | null): this {
        this.searchSettings.explodedVariants = count;

        return this;
    }

    // public setRecommendationSettings({ take, onlyIncludeRecommendationsWhenLessResultsThan }: {  take?: number | null, onlyIncludeRecommendationsWhenLessResultsThan?: number | null }): ProductSearchBuilder {

    //     return this;
    // }
    public setRecommendationSettings(settings: RecommendationSettings): this {
        this.searchSettings.recommendations = settings;

        return this;
    }

    /**
     * Set the term used to filter products by
     */
    public setTerm(term: string | null | undefined): this {

        this.term = term;

        return this;
    }

    public pagination(paginate: (pagination: PaginationBuilder) => void) : this {
        paginate(this.paginationBuilder);

        return this;
    }

    public build(): ProductSearchRequest {
        return {
            ...this.baseBuild(),
            ...this.paginationBuilder.build(),

            term: this.term,

            facets: null,
            settings: this.searchSettings,
            sorting: null,
        };
    }
}

