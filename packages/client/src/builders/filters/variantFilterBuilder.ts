import { VariantAssortmentFilter, VariantDataFilter, VariantDataHasKeyFilter, VariantDisabledFilter, VariantIdFilter, VariantListPriceFilter, VariantSalesPriceFilter, VariantSpecificationFilter } from 'src/models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';

export class VariantFilterBuilder extends FilterBuilderBase<VariantFilterBuilder> {
    constructor() { super(VariantFilterBuilder); }

    /**
     * Adds a variant assortment filter to the request
     * @param assortmentIds 
     * @param negated 
     */
    public addVariantAssortmentFilter(assortmentIds: number[] | number, negated: boolean = false, options?: FilterOptions): this {
        const assortments: number[] = Array.isArray(assortmentIds)
            ? assortmentIds
            : [assortmentIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantAssortmentFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantAssortmentFilter, Relewise.Client',
            assortments: assortments,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Filters the request to only return the specificied variants
     * @param variantIds 
     * @param negated 
     */
    public addVariantIdFilter(variantIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(variantIds)
            ? variantIds
            : [variantIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantIdFilter, Relewise.Client',
            variantIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addVariantListPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantListPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantListPriceFilter, Relewise.Client',
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
     * Filters the request to only return variants within a certain SalesPrice-range
     * @param lowerBound 
     * @param upperBound 
     * @param negated 
     */
    public addVariantSalesPriceFilter(lowerBound?: number, upperBound?: number, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantSalesPriceFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantSalesPriceFilter, Relewise.Client',
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
     * Filters the request to only return variants with a certain specification
     * @param key 
     * @param equalTo 
     * @param filterOutIfKeyIsNotFound controls if variants with or without the key should be returned
     * @param negated 
     */
    public addVariantSpecificationFilter(key: string, equalTo: string, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantSpecificationFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantSpecificationFilter, Relewise.Client',
            key: key,
            equalTo: equalTo,
            filterOutIfKeyIsNotFound: filterOutIfKeyIsNotFound,
            negated: negated,
            settings: internalSettingsBuilder.build(),
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
    public addVariantDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDataFilter, Relewise.Client',
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
     * Adds a variant has key filter to the request
     * @param key 
     * @param negated 
     * @param options
     */
    public addVariantDataHasKeyFilter(key: string, negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantDataHasKeyFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDataHasKeyFilter, Relewise.Client',
            key: key,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a variant is disabled filter to the request - only works for product queries, not in searches or recommendations
     * @param key 
     * @param negated 
     * @param options
     */
    public addVariantDisabledFilter(negated: boolean = false, options?: FilterOptions): this {
        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: VariantDisabledFilter = {
            $type: 'Relewise.Client.Requests.Filters.VariantDisabledFilter, Relewise.Client',
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }
}
