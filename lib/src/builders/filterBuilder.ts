import { AndFilter, BrandAssortmentFilter, BrandDataFilter, BrandIdFilter, CartDataFilter, ContentCategoryAssortmentFilter, ContentCategoryDataFilter, ContentCategoryIdFilter, ContentDataFilter, ContentIdFilter, Filter, FilterCollection, OrFilter, ProductAssortmentFilter, ProductCategoryAssortmentFilter, ProductCategoryDataFilter, ProductCategoryIdFilter, ProductDataFilter, ProductDisplayNameFilter, ProductHasVariantsFilter, ProductIdFilter, ProductListPriceFilter, ProductRecentlyPurchasedByUserFilter, ProductRecentlyViewedByUserFilter, ProductSalesPriceFilter, VariantAssortmentFilter, VariantDataFilter, VariantIdFilter, VariantListPriceFilter, VariantSalesPriceFilter, VariantSpecificationFilter } from '../models/data-contracts';
import { ConditionBuilder } from './conditionBuilder';

export class FilterBuilder {
    private filters: (AndFilter
        | BrandAssortmentFilter
        | BrandDataFilter
        | BrandIdFilter
        | CartDataFilter
        | ContentCategoryAssortmentFilter
        | ContentCategoryDataFilter
        | ContentCategoryIdFilter
        | ContentDataFilter
        | ContentIdFilter
        | OrFilter
        | ProductAssortmentFilter
        | ProductCategoryAssortmentFilter
        | ProductCategoryDataFilter
        | ProductCategoryIdFilter
        | ProductDataFilter
        | ProductDisplayNameFilter
        | ProductHasVariantsFilter
        | ProductIdFilter
        | ProductListPriceFilter
        | ProductRecentlyPurchasedByUserFilter
        | ProductRecentlyViewedByUserFilter
        | ProductSalesPriceFilter
        | VariantAssortmentFilter
        | VariantDataFilter
        | VariantIdFilter
        | VariantListPriceFilter
        | VariantSalesPriceFilter
        | VariantSpecificationFilter)[] = [];

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
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
    public addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const filter: ProductCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated,
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
    public addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const filter: ContentCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
                upperBoundInclusive: upperBound,
            },
            negated: negated,
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
            negated: negated,
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
            negated: negated,
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
                upperBoundInclusive: upperBound,
            },
            negated: negated,
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
                upperBoundInclusive: upperBound,
            },
            negated: negated,
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
                upperBoundInclusive: upperBound,
            },
            negated: negated,
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
                upperBoundInclusive: upperBound,
            },
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return variants with a certain specification
     * @param key 
     * @param equalTo 
     * @param filterOutIfKeyIsNotFound controls if variants with or without the key should be returned
     * @param negated 
     */
    public addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const filter: VariantSpecificationFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantSpecificationFilter, Relewise.Client',
            key: key,
            equalTo: equalTo,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    public and(filterBuilder: (builder: FilterBuilder) => void, negated: boolean = false): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('And-filters must contain atleast 1 filter');
        }

        const filter: AndFilter = {
            $type: 'Relewise.Client.Requests.Filters.AndFilter, Relewise.Client',
            filters: filters.items,
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    public or(filterBuilder: (builder: FilterBuilder) => void, negated: boolean = false): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('Or-filters must contain atleast 1 filter');
        }

        const filter: OrFilter = {
            $type: 'Relewise.Client.Requests.Filters.OrFilter, Relewise.Client',
            filters: filters.items,
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: ProductDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a variant data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: VariantDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a brand data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: BrandDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.BrandDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a cart data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addCartDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: CartDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.CartDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a cart data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: ContentCategoryDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentCategoryDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: ContentDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ContentDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: ProductCategoryDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product display name filter to the request
    * @param key 
    * @param conditionBuilder 
    * @param mustMatchAllConditions 
    * @param filterOutIfKeyIsNotFound 
    * @param negated 
    */
    public addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, negated: boolean = false): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const filter: ProductDisplayNameFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDisplayNameFilter, Relewise.Client',
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
        };
        this.filters.push(filter);

        return this;
    }

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