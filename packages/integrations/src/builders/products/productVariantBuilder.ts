import { MultilingualDataValue, DataValue, ProductVariant, MultiCurrencyDataValue } from '@relewise/client';

export class ProductVariantBuilder {
    private variant: ProductVariant;

    constructor({ id }: {
        id: string,
    }) {
        this.variant = { id: id };
    }

    displayName(name: MultilingualDataValue): this {
        this.variant.displayName = name.value;

        return this;
    }

    data(data: Record<string, DataValue>): this {
        this.variant.data = data;

        return this;
    }

    assortments(assortments: number[]): this {
        this.variant.assortments = assortments;

        return this;
    }

    listPrice(listPrice: MultiCurrencyDataValue): this {
        this.variant.listPrice = listPrice.value;

        return this;
    }

    salesPrice(salesPrice: MultiCurrencyDataValue): this {
        this.variant.salesPrice = salesPrice.value;

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