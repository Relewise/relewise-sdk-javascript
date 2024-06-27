import { AndFilter, FilterCollection, OrFilter } from 'src/models/data-contracts';
import { FilterSettingsBuilder } from '../filterSettingsBuilder';
import { AllFilters, FilterOptions } from './filters.types.shared';

type Constructor<T> = new () => T;

export abstract class FilterBuilderBase<TFilterBuilder extends FilterBuilderBase<any>> {
    constructor(private TFilterBuilderCtor: Constructor<TFilterBuilder>) {
    }

    protected filters: AllFilters[] = [];

    public and(filterBuilder: (builder: TFilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new this.TFilterBuilderCtor();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('And-filters must contain atleast 1 filter');
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

    public or(filterBuilder: (builder: TFilterBuilder) => void, negated: boolean = false, options?: FilterOptions): this {
        const builder = new this.TFilterBuilderCtor();
        filterBuilder(builder);

        const internalSettingsBuilder = new FilterSettingsBuilder();
        options?.filterSettings?.(internalSettingsBuilder);
            
        const filters = builder.build();
        if (filters === null || filters.items === undefined || filters.items === null || filters.items.length <= 0) {
            throw new Error('Or-filters must contain atleast 1 filter');
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