import { ContentSearchRequest } from "@/models/data-contracts";
import { PaginationBuilder } from "../paginationBuilder";
import { Settings } from "../settings";
import { ContentSortingBuilder } from './contentSortingBuilder';
import { FacetBuilder } from "./facetBuilder";
import { SearchBuilder } from "./searchBuilder";
import { SearchRequestBuilder } from "./searchRequestBuilder";

export class ContentSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder: FacetBuilder = new FacetBuilder();
    private paginationBuilder: PaginationBuilder = new PaginationBuilder();
    private sortingBuilder: ContentSortingBuilder = new ContentSortingBuilder();
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

    public facets(facets: (pagination: FacetBuilder) => void) : this {
        facets(this.facetBuilder);

        return this;
    }

    public sorting(sorting: (sortingBuilder: ContentSortingBuilder) => void): this {
        sorting(this.sortingBuilder);

        return this;
    }

    public build(): ContentSearchRequest {
        const { take, skip } = this.paginationBuilder.build();
        return {
            ...this.baseBuild(),

            take,
            skip,

            term: this.term,
            
            facets: this.facetBuilder.build(),
            sorting: this.sortingBuilder.build()
        };
    }
}