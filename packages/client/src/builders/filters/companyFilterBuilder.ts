import { CompanyDataFilter, CompanyIdFilter } from 'src/models/data-contracts';
import { ConditionBuilder } from '../conditionBuilder';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { FilterBuilderBase } from './filterBuilderBase';
import { EntityDataFilterOptions, FilterOptions } from './filters.types.shared';

export class CompanyFilterBuilder extends FilterBuilderBase<CompanyFilterBuilder> {
    constructor() { super(CompanyFilterBuilder); }

    /**
     * Filters the request to only return the specificied contents
     * @param companyIds 
     * @param negated 
     */
    public addCompanyIdFilter(companyIds: string | string[], negated: boolean = false, options?: FilterOptions): this {
        const ids: string[] = Array.isArray(companyIds)
            ? companyIds
            : [companyIds];

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CompanyIdFilter = {
            $type: 'Relewise.Client.Requests.Filters.CompanyIdFilter, Relewise.Client',
            companyIds: ids,
            negated: negated,
            settings: internalSettingsBuilder.build(),
        };
        this.filters.push(filter);

        return this;
    }

    /**
     * Adds a compnany data filter to the request
     * @param key 
     * @param conditionBuilder 
     * @param mustMatchAllConditions 
     * @param filterOutIfKeyIsNotFound 
     * @param negated 
     */
    public addCompanyDataFilter(key: string, conditionBuilder: (builder: ConditionBuilder) => void, mustMatchAllConditions: boolean = true, filterOutIfKeyIsNotFound: boolean = true, negated: boolean = false, options?: EntityDataFilterOptions): this {
        const builder = new ConditionBuilder();
        conditionBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);

        const filter: CompanyDataFilter = {
            $type: 'Relewise.Client.Requests.Filters.CompanyDataFilter, Relewise.Client',
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
}
