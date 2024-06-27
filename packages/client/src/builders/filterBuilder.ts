import { AndFilter, CartDataFilter, FilterCollection, OrFilter, ProductAndVariantId } from '../models/data-contracts';
import { FilterSettingsBuilder } from './filterSettingsBuilder';
import { ConditionBuilder } from './conditionBuilder';
import { BrandFilterBuilder } from './filters/brandFilterBuilder';
import { CompanyFilterBuilder } from './filters/companyFilterBuilder';
import { ContentFilterBuilder } from './filters/contentFilterBuilder';
import { ProductFilterBuilder } from './filters/productFilterBuilder';
import { VariantFilterBuilder } from './filters/variantFilterBuilder';
import { AllFilters, FilterOptions, EntityDataFilterOptions } from './filters/filters.types.shared';

export class FilterBuilder {
    private filters: AllFilters[] = [];

    private productFilterBuilder: ProductFilterBuilder = new ProductFilterBuilder();
    private brandFilterBuilder: BrandFilterBuilder = new BrandFilterBuilder();
    private contentFilterBuilder: ContentFilterBuilder = new ContentFilterBuilder();
    private variantFilterBuilder: VariantFilterBuilder = new VariantFilterBuilder();
    private companyFilterBuilder: CompanyFilterBuilder = new CompanyFilterBuilder();

    /**
     * Adds a product assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a variant assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addVariantAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a brand assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addBrandAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a content assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addContentAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a content category assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addContentCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Adds a product category assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addProductCategoryAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryAssortmentFilter(assortmentIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products within the specified categories
     * @param evaluationScope 
     * @param categoryIds 
     * @param negated 
     */
    public addProductCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryIdFilter(evaluationScope, categoryIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return contents within the specified categories
     * @param evaluationScope 
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryIdFilter(evaluationScope: 'ImmediateParent' | 'ImmediateParentOrItsParent' | 'Ancestor', categoryIds: string[] | string, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryIdFilter(evaluationScope, categoryIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified products
     * @param productIds 
     * @param negated 
     */
    public addProductIdFilter(productIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductIdFilter(productIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified variants
     * @param variantIds 
     * @param negated 
     */
    public addVariantIdFilter(variantIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantIdFilter(variantIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified brands
     * @param brandIds 
     * @param negated 
     */
    public addBrandIdFilter(brandIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandIdFilter(brandIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified contents
     * @param contentIds 
     * @param negated 
     */
    public addContentIdFilter(contentIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentIdFilter(contentIds, negated, options);
        return this;
    }

    /**
     * Filters the request to only return the specified contents
     * @param companyIds 
     * @param negated 
     */
    public addCompanyIdFilter(companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.companyFilterBuilder.addCompanyIdFilter(companyIds, negated, options);
        return this;
    }

    /**
     * Adds a range filter to the request ensuring the product has a certain range of variants
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addProductHasVariantsFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductHasVariantsFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products purchased since a certain point in time
     * @param sinceUtc 
     * @param negated 
     */
    public addProductRecentlyPurchasedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyPurchasedByUserFilter(sinceUtc, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products viewed since a certain point in time
     * @param sinceUtc 
     * @param negated 
     */
    public addProductRecentlyViewedByUserFilter(sinceUtc: string, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductRecentlyViewedByUserFilter(sinceUtc, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products within a certain SalesPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addProductSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductSalesPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return products within a certain ListPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addProductListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductListPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return variants within a certain SalesPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantSalesPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return variants within a certain ListPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantListPriceFilter(lowerBound, upperBound, negated, options);
        return this;
    }

    /**
     * Filters the request to only return variants with a certain specification
     * @param key 
     * @param equalTo 
     * @param filterOutIfKeyIsNotFound controls if variants with or without the key should be returned
     * @param negated 
     */
    public addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantSpecificationFilter(key, equalTo, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    public and(filterBuilder: (builder: FilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('And-filters must contain at least 1 filter');
        }

        const filter: AndFilter = {
            $type: 'Relewise.Client.Requests.Filters.AndFilter, Relewise.Client',
            filters: filters.items,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    public or(filterBuilder: (builder: FilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new FilterBuilder();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('Or-filters must contain at least 1 filter');
        }

        const filter: OrFilter = {
            $type: 'Relewise.Client.Requests.Filters.OrFilter, Relewise.Client',
            filters: filters.items,
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
        this.productFilterBuilder.addProductDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
    public addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.variantFilterBuilder.addVariantDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
    public addBrandDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.brandFilterBuilder.addBrandDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
    public addCartDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CartDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.CartDataFilter, Relewise.Client',
            key: key,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            mustMatchAllConditions: mustMatchAllConditions,
            conditions: builder.build(),
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a content category data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addContentCategoryDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.contentFilterBuilder.addContentCategoryDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
    public addContentDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.contentFilterBuilder.addContentDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
        this.productFilterBuilder.addProductCategoryDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
        return this;
    }

    /**
     * Adds a company data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        this.companyFilterBuilder.addCompanyDataFilter(key, conditionBuilder, mustMatchAllConditions, filterOutIfKeyIsNotFound, negated, options);
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
        this.productFilterBuilder.addProductDisplayNameFilter(conditionBuilder, mustMatchAllConditions, negated, options);
        return this;
    }

    /**
     * Adds a product variant filter to the request
     * @param products 
     * @param negated 
     */
    public addProductAndVariantIdFilter(products: ProductAndVariantId | ProductAndVariantId[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductAndVariantIdFilter(products, negated, options);
        return this;
    }

    /**
     * Adds a product category level filter to the request
     * @param levels 
     * @param negated 
     */
    public addProductCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryLevelFilter(levels, negated, options);
        return this;
    }

    /**
     * Adds a product category has parent filter to the request
     * @param categoryIds 
     * @param negated 
     */
    public addProductCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasParentFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a product category has child filter to the request
     * @param categoryIds 
     * @param negated 
     */
    public addProductCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasChildFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a product category has ancestor filter to the request
     * @param categoryIds 
     * @param negated 
     */
    public addProductCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasAncestorFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a content category level filter to the request
     * @param levels 
     * @param negated 
     */
    public addContentCategoryLevelFilter(levels: number | number[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryLevelFilter(levels, negated, options);
        return this;
    }

    /**
     * Adds a content category has parent filter to the request
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryHasParentFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasParentFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a content category has child filter to the request
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryHasChildFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasChildFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a content category has ancestor filter to the request
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryHasAncestorFilter(categoryIds?: string | string[], negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasAncestorFilter(categoryIds, negated, options);
        return this;
    }

    /**
     * Adds a product category has products filter to the request ensuring that only categories with products in them are returned
     * @param categoryIds 
     * @param negated 
     */
    public addProductCategoryHasProductsFilter(negated: boolean = false, options?: FilterOptions): this {
        this.productFilterBuilder.addProductCategoryHasProductsFilter(negated, options);
        return this;
    }

    /**
     * Adds a content category has contents filter to the request ensuring that only categories with content in them are returned
     * @param categoryIds 
     * @param negated 
     */
    public addContentCategoryHasContentsFilter(negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryHasContentsFilter(negated, options);
        return this;
    }

    /**
     * Adds a brand has key filter to the request
     * @param key 
     * @param negated 
     * @param options
     */
    public addBrandDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a brand is disabled filter to the request - only works for product queries, not in searches or recommendations
     * @param key 
     * @param negated 
     * @param options
     */
    public addBrandDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.brandFilterBuilder.addBrandDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a company has key filter to the request
     * @param key 
     * @param negated 
     * @param options
     */
    public addCompanyDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.companyFilterBuilder.addCompanyDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a company is disabled filter to the request - only works for product queries, not in searches or recommendations
     * @param key 
     * @param negated 
     * @param options
     */
    public addCompanyDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.companyFilterBuilder.addCompanyDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a variant has key filter to the request
     * @param key 
     * @param negated 
     * @param options
     */
    public addVariantDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a variant is disabled filter to the request - only works for product queries, not in searches or recommendations
     * @param key 
     * @param negated 
     * @param options
     */
    public addVariantDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.variantFilterBuilder.addVariantDisabledFilter(negated, options);
        return this;
    }

    /**
     * Adds a content category has key filter to the request
     * @param key 
     * @param negated 
     * @param options
     */
    public addContentCategoryDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryDataHasKeyFilter(key, negated, options);
        return this;
    }

    /**
     * Adds a content category is disabled filter to the request - only works for product queries, not in searches or recommendations
     * @param key 
     * @param negated 
     * @param options
     */
    public addContentCategoryDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryDisabledFilter(negated, options);
        return this;
    }

    public addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo: number, negated: boolean = false, options?: FilterOptions): this {
        this.contentFilterBuilder.addContentCategoryRecentlyViewedByUserFilter(sinceMinutesAgo, negated, options);
        return this;
    }

    public reset(): this {
        this.filters = [];
        this.productFilterBuilder.reset();
        this.brandFilterBuilder.reset();
        this.contentFilterBuilder.reset();
        this.variantFilterBuilder.reset();
        this.companyFilterBuilder.reset();
        return this;
    }

    public build(): FilterCollection | null {
        const productFilters = this.productFilterBuilder.build();
        const brandFilters = this.brandFilterBuilder.build();
        const contentFilters = this.contentFilterBuilder.build();
        const variantFilters = this.variantFilterBuilder.build();
        const companyFilters = this.companyFilterBuilder.build();

        const combinedFilters = [
            ...(this.filters ?? []),
            ...(productFilters?.items ?? []),
            ...(brandFilters?.items ?? []),
            ...(contentFilters?.items ?? []),
            ...(variantFilters?.items ?? []),
            ...(companyFilters?.items ?? []),
        ];

        return combinedFilters.length === 0 ? null : { items: combinedFilters };
    }
}