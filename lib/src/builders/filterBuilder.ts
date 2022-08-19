import { Filter, FilterCollection, ProductAssortmentFilter, ProductCategoryIdFilter, ProductDataFilter, ProductIdFilter, RelevanceModifier, RelevanceModifierCollection, VariantAssortmentFilter } from "@/models/data-contracts";

//type Conditions = ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition;

export class FilterBuilder {
    private filters: Filter[] = [];

    /**
     * Adds a product assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): this {
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
    public addVariantsAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): this {
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
     * Filters the request to only return products within the specificed categories
     * @param assortmentIds 
     * @param negated 
     */
    public addProductCategoryIdFilter(evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor", categoryIds: string[] | string, negated: boolean = false): this {
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
     * Filters the request to only return the specificied products
     * @param assortmentIds 
     * @param negated 
     */
    public addProductIdFilter(productIds: string | string[], negated: boolean = false): this {
        const ids: string[] = Array.isArray(productIds)
            ? productIds
            : [productIds];

        const filter: ProductIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductIdFilter, Relewise.Client',
            productIds: ids,
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
    // public addProductDataFilter(key: string, value: any, conditions: Conditions | Conditions[], negated: boolean = false): this {
    //     const filter: ProductDataFilter = {
    //         $type: 'Relewise.Client.Requests.Filters.ProductDataFilter, Relewise.Client',
    //         key: key,
    //         filterOutIfKeyIsNotFound: false,
    //         mustMatchAllConditions: false,
    //         conditions: {},
    //         negated: negated
    //     };
    //     this.filters.push(filter);

    //     return this;
    // }

    public reset(): this {
        this.filters = [];

        return this;
    }

    public build(): FilterCollection | null {
        return this.filters.length === 0
            ? null
            : { items: this.filters }
    }
}

export type Pagination = {
    take: number;
    skip: number;
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
     * Page size is index 1 based
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

    build(): Pagination {
        return {
            take: this.pageSize,
            skip: (this.pageNumber - 1) * this.pageSize
        }
    }
}

export class RelevanceModifierBuilder {
    private modifiers: RelevanceModifier[] = [];

    public reset(): this {
        this.modifiers = [];

        return this;
    }

    public build(): RelevanceModifierCollection | null {
        return this.modifiers.length === 0
            ? null
            : { items: this.modifiers }
    }
}