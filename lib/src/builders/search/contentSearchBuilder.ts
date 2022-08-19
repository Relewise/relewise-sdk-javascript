import { ContentSearchRequest } from "@/models/data-contracts";
import { PaginationBuilder } from "../paginationBuilder";
import { Settings } from "../settings";
import { FacetBuilder } from "./facetBuilder";
import { SearchBuilder } from "./searchBuilder";
import { SearchRequestBuilder } from "./searchRequestBuilder";

export class ContentSearchBuilder extends SearchRequestBuilder implements SearchBuilder {
    private facetBuilder: FacetBuilder = new FacetBuilder();
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

    public facets(facets: (pagination: FacetBuilder) => void) : this {
        facets(this.facetBuilder);

        return this;
    }

    public build(): ContentSearchRequest {
        return {
            ...this.baseBuild(),
            ...this.paginationBuilder.build(),
            term: this.term,
            facets: this.facetBuilder.build(),
            sorting: null
        };
    }
}