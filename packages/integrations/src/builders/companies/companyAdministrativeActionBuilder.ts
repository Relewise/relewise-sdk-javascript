import { CompanyAdministrativeAction, FilterBuilder } from '@relewise/client';

export class CompanyAdministrativeActionBuilder {
    private filterBuilder = new FilterBuilder();
    private kind: 'Disable' |  'Enable'  | 'Delete';

    language: string | null | undefined;
    currency: string | null | undefined;

    constructor({ language, currency, kind, filters }: {
        currency?: string | null,
        language?: string | null,
        kind: 'Disable' | 'Enable' | 'Delete',
        filters: (filterBuilder: FilterBuilder) => void
    }) {
        this.language = language;
        this.currency = currency;
        this.kind = kind;

        filters(this.filterBuilder);
    }

    filters(filters: (filterBuilder: FilterBuilder) => void): this {
        filters(this.filterBuilder);

        return this;
    }

    build(): CompanyAdministrativeAction {
        const filters = this.filterBuilder.build();

        if (!filters || !filters.items || filters.items.length === 0) {
            throw new Error('No filters were provided for the brand administrative action');
        }

        return {
            $type: 'Relewise.Client.DataTypes.CompanyAdministrativeAction, Relewise.Client',
            ...(this.language && { language: { value: this.language } }),
            ...(this.currency && { currency: { value: this.currency } }),
            filters: filters,
            kind: this.kind,
        };
    }
}