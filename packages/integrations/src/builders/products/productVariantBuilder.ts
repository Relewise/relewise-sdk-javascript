import { DataValue, ProductVariant } from '@relewise/client';

export class ProductVariantBuilder {
    private variant: ProductVariant;

    constructor({ id }: {
        id: string,
    }) {
        this.variant = { id: id };
    }

    displayName(values: {
        value: string;
        language: string;
    }[]): this {
        this.variant.displayName = { 
            values: values.map(x => ({ text: x.value, language: { value: x.language } })), 
        };

        return this;
    }

    data(data: Record<string, DataValue | null>): this {
        this.variant.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    assortments(assortments: number[]): this {
        this.variant.assortments = assortments;

        return this;
    }

    listPrice(values: {
        amount: number;
        currency: string;
    }[]): this {
        this.variant.listPrice = { values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })) };

        return this;
    }

    salesPrice(values: {
        amount: number;
        currency: string;
    }[]): this {
        this.variant.salesPrice = { values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })) };

        return this;
    }

    specifications(specifications: Record<string, string>): this {
        this.variant.specification = specifications;

        return this;
    }

    build(): ProductVariant {
        return this.variant;
    }
}