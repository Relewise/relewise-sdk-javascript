import { ProductAdministrativeAction, FilterBuilder } from '@relewise/client';

export class ProductAdministrativeActionBuilder {
    private filterBuilder = new FilterBuilder();
    private productUpdateKind: 'None' | 'Disable' | 'Enable' | 'PermanentlyDelete' | 'Delete';
    private variantUpdateKind: 'None' | 'Disable' | 'Enable' | 'PermanentlyDelete' | 'Delete';
    language: string | null | undefined;
    currency: string | null | undefined;

    constructor({ language, currency, productUpdateKind, variantUpdateKind = 'None', filters }: {
        currency?: string | null,
        language?: string | null,
        productUpdateKind: 'None' | 'Disable' | 'Enable' | 'PermanentlyDelete' | 'Delete',
        variantUpdateKind?: 'None' | 'Disable' | 'Enable' | 'PermanentlyDelete' | 'Delete',
        filters: (filterBuilder: FilterBuilder) => void
    }) {
        this.language = language;
        this.currency = currency;
        this.productUpdateKind = productUpdateKind;
        this.variantUpdateKind = variantUpdateKind;

        filters(this.filterBuilder);
    }

    filters(filters: (filterBuilder: FilterBuilder) => void): this {
        filters(this.filterBuilder);

        return this;
    }

    build(): ProductAdministrativeAction {
        const filters = this.filterBuilder.build();

        if (!filters) {
            throw new Error('No filters was provided for the product administrative action');
        }

        return {
            $type: 'Relewise.Client.DataTypes.ProductAdministrativeAction, Relewise.Client',
            ...(this.language && { language: { value: this.language } }),
            ...(this.currency && { currency: { value: this.currency } }),
            filters: filters,
            productUpdateKind: this.productUpdateKind,
            variantUpdateKind: this.variantUpdateKind,
        };
    }
}