import { ProductSearchRequest, ProductSearchSettings, RecommendationSettings, RetailMediaQuery, SelectedBrandPropertiesSettings, SelectedProductPropertiesSettings, SelectedVariantPropertiesSettings, VariantSearchSettings } from '../../models/data-contracts';
import { PaginationBuilder } from '../paginationBuilder';
import { Settings } from '../settings';
import { FacetBuilder } from './facetBuilder';
import { ProductSortingBuilder } from './productSortingBuilder';
import { SearchBuilder } from './searchBuilder';
import { SearchRequestBuilder } from './searchRequestBuilder';

export class ProductSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder: FacetBuilder = new FacetBuilder();
    private retailMediaQuery: RetailMediaQuery | null = null;
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private sortingBuilder: ProductSortingBuilder = new ProductSortingBuilder();
    private term: string | null | undefined;

    private searchSettings: ProductSearchSettings = {
        $type: 'Relewise.Client.Requests.Search.Settings.ProductSearchSettings, Relewise.Client',
        recommendations: {},
    };

    constructor(settings: Settings) {
        super(settings)
    }

    public setSelectedProductProperties(productProperties: Partial<SelectedProductPropertiesSettings>): this {
        this.searchSettings.selectedProductProperties = productProperties as SelectedProductPropertiesSettings;

        return this;
    }

    public setSelectedVariantProperties(variantProperties: Partial<SelectedVariantPropertiesSettings>): this {
        this.searchSettings.selectedVariantProperties = variantProperties as SelectedVariantPropertiesSettings;

        return this;
    }

    public setSelectedBrandProperties(brandProperties: Partial<SelectedBrandPropertiesSettings>): this {
        this.searchSettings.selectedBrandProperties = brandProperties as SelectedBrandPropertiesSettings;

        return this;
    }

    public setVariantSearchSettings(variantSearchSettings: Partial<VariantSearchSettings>): this {
        this.searchSettings.variantSettings = variantSearchSettings as VariantSearchSettings;

        return this;
    }

    public setExplodedVariants(count?: number | null): this {
        this.searchSettings.explodedVariants = count;

        return this;
    }

    public setRecommendationSettings(settings: RecommendationSettings): this {
        this.searchSettings.recommendations = settings;

        return this;
    }

    public setRetailMedia(query: RetailMediaQuery): this {
        this.retailMediaQuery = query;

        return this;
    }

    /**
     * Set the term used to filter products by
     */
    public setTerm(term: string | null | undefined): this {

        this.term = term;

        return this;
    }

    public pagination(paginate: (pagination: PaginationBuilder) => void): this {
        paginate(this.paginationBuilder);

        return this;
    }

    public facets(facets: (facets: FacetBuilder) => void): this {
        facets(this.facetBuilder);

        return this;
    }

    public sorting(sorting: (sortingBuilder: ProductSortingBuilder) => void): this {
        sorting(this.sortingBuilder);

        return this;
    }

    public build(): ProductSearchRequest {
        const { take, skip } = this.paginationBuilder.build();
        return {
            $type: 'Relewise.Client.Requests.Search.ProductSearchRequest, Relewise.Client',
            ...this.baseBuild(),
            take,
            skip,

            term: this.term,

            facets: this.facetBuilder.build(),
            settings: this.searchSettings,
            sorting: this.sortingBuilder.build(),
            retailMediaQuery: this.retailMediaQuery,
        } as ProductSearchRequest;
    }
}