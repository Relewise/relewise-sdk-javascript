import { BrandAssortmentFilter, BrandIdFilter, ContentCategoryAssortmentFilter, ContentCategoryIdFilter, ContentIdFilter, Filter, FilterCollection, Int32NullableRange, ProductAssortmentFilter, ProductCategoryAssortmentFilter, ProductCategoryIdFilter, ProductDataFilter, ProductDisplayNameFilter, ProductHasVariantsFilter, ProductIdFilter, ProductListPriceFilter, ProductRecentlyPurchasedByUserFilter, ProductRecentlyViewedByUserFilter, ProductSalesPriceFilter, RelevanceModifier, RelevanceModifierCollection, VariantAssortmentFilter, VariantIdFilter, VariantListPriceFilter, VariantSalesPriceFilter } from "@/models/data-contracts";

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
    public addVariantAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): this {
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
     * Adds a brand assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addBrandAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const filter: BrandAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const filter: ContentCategoryAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const filter: ProductCategoryAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products within the specificed categories
     * @param evaluationScope 
     * @param categoryIds 
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
     * Filters the request to only return contents within the specificed categories
     * @param evaluationScope 
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryIdFilter(evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor", categoryIds: string[] | string, negated: boolean = false): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const filter: ContentCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specificied products
     * @param productIds 
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
     * Filters the request to only return the specificied variants
     * @param variantIds 
     * @param negated 
     */
    public addVariantIdFilter(variantIds: string | string[], negated: boolean = false): this {
        const ids: string[] = Array.isArray(variantIds)
            ? variantIds
            : [variantIds];

        const filter: VariantIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantIdFilter, Relewise.Client',
            variantIds: ids,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specificied brands
     * @param brandIds 
     * @param negated 
     */
    public addBrandIdFilter(brandIds: string | string[], negated: boolean = false): this {
        const ids: string[] = Array.isArray(brandIds)
            ? brandIds
            : [brandIds];

        const filter: BrandIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandIdFilter, Relewise.Client',
            brandIds: ids,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specificied contents
     * @param contentIds 
     * @param negated 
     */
    public addContentIdFilter(contentIds: string | string[], negated: boolean = false): this {
        const ids: string[] = Array.isArray(contentIds)
            ? contentIds
            : [contentIds];

        const filter: ContentIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentIdFilter, Relewise.Client',
            contentIds: ids,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated: boolean = false): this {
        const filter: ProductHasVariantsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductHasVariantsFilter, Relewise.Client',
            numberOfVariants: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound
            },
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products purchased since a certain point in time
     * @param sinceUtc 
     * @param negated 
     */
    public addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated: boolean = false): this {
        const filter: ProductRecentlyPurchasedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyPurchasedByUserFilter, Relewise.Client',
            sinceUtc: sinceUtc,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products viewed since a certain point in time
     * @param sinceUtc 
     * @param negated 
     */
    public addProductRecentlyViewedByUserFilter(sinceUtc: string, negated: boolean = false): this {
        const filter: ProductRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyViewedByUserFilter, Relewise.Client',
            sinceUtc: sinceUtc,
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products within a certain SalesPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false): this {
        const filter: ProductSalesPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductSalesPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound
            },
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products within a certain ListPice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false): this {
        const filter: ProductListPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductListPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound
            },
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return variants within a certain SalesPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
     public addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false): this {
        const filter: VariantSalesPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantSalesPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound
            },
            negated: negated
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return variants within a certain ListPice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
     public addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false): this {
        const filter: VariantListPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantListPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound
            },
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