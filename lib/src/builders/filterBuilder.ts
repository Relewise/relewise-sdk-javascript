import { Filter, ProductAssortmentFilter, ProductCategoryIdFilter, ProductDataFilter, VariantAssortmentFilter } from "@/models/data-contracts";

export class FilterBuilder {
    private _filters: Filter[] = [];

    public get filters(): Filter[] {
        return this._filters;
    }

    /**
     * Adds a product assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): FilterBuilder {
        const assortments: number[] = Array.isArray(assortmentIds) 
            ? assortmentIds
            : [assortmentIds];

        const filter: ProductAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a variant assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addVariantsAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): FilterBuilder {
        const assortments: number[] = Array.isArray(assortmentIds) 
            ? assortmentIds
            : [assortmentIds];

        const filter: VariantAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category ids filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductCategoryIdFilter(evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor", categoryIds: string[] | string, negated: boolean = false): FilterBuilder {
        const ids: string[] = Array.isArray(categoryIds) 
            ? categoryIds
            : [categoryIds];

        const filter: ProductCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product data filter to the request
     * @param assortmentIds 
     * @param negated 
     */
     public addProductDataFilter(key: string, value: any, negated: boolean = false): FilterBuilder {
        const filter: ProductDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: false,
            mustMatchAllConditions: false,

            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    public reset(): FilterBuilder {
        this._filters = [];

        return this;
    }
}

export class PaginationBuilder {
    private pageNumber: number = 1;
    private pageSize: number = 10;

    public setPageSize(pageSize: number): PaginationBuilder {
        if (pageSize < 0) {
            throw new Error("pageSize can not be below 0")
        }

        this.pageSize = pageSize;

        return this;
    }

    /**
     * Page size is index 1 based,
     * @param pageNumber 
     * @returns 
     */
    public setPage(pageNumber: number): PaginationBuilder {
        if (pageNumber < 1) {
            throw new Error("pageNumber can not be below 1")
        }

        this.pageNumber = pageNumber;

        return this;
    }
}