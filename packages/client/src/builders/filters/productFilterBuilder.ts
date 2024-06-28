import { ProductAndVariantIdFilter, ProductAssortmentFilter, ProductCategoryAssortmentFilter, ProductCategoryHasAncestorFilter, ProductCategoryHasChildFilter, ProductCategoryHasParentFilter, ProductCategoryHasProductsFilter, ProductCategoryIdFilter, ProductCategoryLevelFilter, ProductDataFilter, ProductDisplayNameFilter, ProductHasVariantsFilter, ProductIdFilter, ProductListPriceFilter, ProductRecentlyPurchasedByUserFilter, ProductRecentlyViewedByUserFilter, ProductSalesPriceFilter, ProductAndVariantId, ProductCategoryDataFilter, ProductCategoryDataHasKeyFilter, ProductCategoryDisabledFilter, ProductCategoryRecentlyViewedByUserFilter } from 'src/models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class ProductFilterBuilder extends FilterBuilderBase<ProductFilterBuilder> {
    constructor() { super(ProductFilterBuilder); }

    /**
     * Adds a product assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
                
        const filter: ProductCategoryAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(categoryIds)
            ? categoryIds
            : [categoryIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductCategoryIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryIdFilter, Relewise.Client',
            evaluationScope: evaluationScope,
            categoryIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);
    
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
    
        const filter: ProductCategoryDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);
    
        return this;
    }
        
    /**
     * Filters the request to only return the specificied products
     * @param productIds 
     * @param negated 
     */
    public addProductIdFilter(productIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(productIds)
            ? productIds
            : [productIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
                
        const filter: ProductIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductIdFilter, Relewise.Client',
            productIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductHasVariantsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductHasVariantsFilter, Relewise.Client',
            numberOfVariants: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products purchased since a certain point in time
     * @param sinceUtc 
     * @param negated 
     */
    public addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductRecentlyPurchasedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyPurchasedByUserFilter, Relewise.Client',
            sinceUtc: sinceUtc,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return products viewed since a certain point in time
     * @param sinceUtc 
     * @param negated 
     */
    public addProductRecentlyViewedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductRecentlyViewedByUserFilter, Relewise.Client',
            sinceUtc: sinceUtc,
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductSalesPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductSalesPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductListPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductListPriceFilter, Relewise.Client',
            range: {
                lowerBoundInclusive: lowerBound,
                upperBoundInclusive: upperBound,
            },
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductDisplayNameFilter(conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductDisplayNameFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDisplayNameFilter, Relewise.Client',
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product variant filter to the request
    * @param products 
    * @param negated 
    */
    public addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductAndVariantIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductAndVariantIdFilter, Relewise.Client',
            productAndVariantIds: Array.isArray(products) ? products : [products],
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product category level filter to the request
    * @param levels 
    * @param negated 
    */
    public addProductCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductCategoryLevelFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryLevelFilter, Relewise.Client',
            levels: Array.isArray(levels) ? levels : [levels],
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product category has parent filter to the request
    * @param categoryIds 
    * @param negated 
    */
    public addProductCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductCategoryHasParentFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasParentFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product category has child filter to the request
    * @param categoryIds 
    * @param negated 
    */
    public addProductCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductCategoryHasChildFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasChildFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product category has ancestor filter to the request
    * @param categoryIds 
    * @param negated 
    */
    public addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductCategoryHasAncestorFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasAncestorFilter, Relewise.Client',
            categoryIds: categoryIds ? (Array.isArray(categoryIds) ? categoryIds : [categoryIds]) : undefined,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
    * Adds a product category has products filter to the request ensuring that only categories with products in them are returned
    * @param categoryIds 
    * @param negated 
    */
    public addProductCategoryHasProductsFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filter: ProductCategoryHasProductsFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryHasProductsFilter, Relewise.Client',
            
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addProductDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            objectPath: options?.objectPath,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a product category has key filter to the request
     * @param key 
     * @param negated 
     * @param options
     */
    public addProductCategoryDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
    
        const filter: ProductCategoryDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);
    
        return this;
    }
    
    /**
     * Adds a product category is disabled filter to the request - only works for product queries, not in searches or recommendations
     * @param key 
     * @param negated 
     * @param options
     */
    public addProductCategoryDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
    
        const filter: ProductCategoryDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);
    
        return this;
    }

    public addProductCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: ProductCategoryRecentlyViewedByUserFilter = {
            $type: 'Relewise.Client.Requests.Filters.ProductCategoryRecentlyViewedByUserFilter, Relewise.Client',
            sinceMinutesAgo: sinceMinutesAgo,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);
    
        return this;
    }
}
