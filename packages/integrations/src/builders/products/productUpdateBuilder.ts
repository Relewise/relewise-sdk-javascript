import { Product, DataValue, ProductVariant, CategoryPath, Brand, ProductUpdate } from '@relewise/client';

export class ProductUpdateBuilder {
    private product: Product;
    private productUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private variantUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private brandUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace' | null | undefined;
    private replaceExistingVariants: boolean;
    private productVariants: ProductVariant[] | null | undefined;

    constructor({ id, productUpdateKind, brandUpdateKind, variantUpdateKind = 'UpdateAndAppend', replaceExistingVariants = true }: {
        id: string,
        productUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace',
        variantUpdateKind?: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace',
        replaceExistingVariants?: boolean,
        brandUpdateKind?: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace' | null
    }) {
        this.product = { id: id };
        this.productUpdateKind = productUpdateKind;
        this.variantUpdateKind = variantUpdateKind;
        this.replaceExistingVariants = replaceExistingVariants;
        this.brandUpdateKind = brandUpdateKind;
    }

    displayName(values: {
        value: string;
        language: string;
    }[]): this {
        this.product.displayName = { 
            values: values.map(x => ({ text: x.value, language: { value: x.language } })), 
        };

        return this;
    }

    data(data: Record<string, DataValue | null>): this {
        this.product.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    variants(variants: ProductVariant[]): this {
        this.productVariants = variants;

        return this;
    }

    categoryPaths(categories: CategoryPath[]): this {
        this.product.categoryPaths = categories;

        return this;
    }

    assortments(assortments: number[]): this {
        this.product.assortments = assortments;

        return this;
    }

    listPrice(values: {
        amount: number;
        currency: string;
    }[]): this {
        this.product.listPrice = { values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })) };

        return this;
    }

    salesPrice(values: {
        amount: number;
        currency: string;
    }[]): this {
        this.product.salesPrice = { values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })) };

        return this;
    }

    brand(brand: Brand): this {
        this.product.brand = brand;

        return this;
    }

    build(): ProductUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.ProductUpdate, Relewise.Client',
            product: this.product,
            variants: this.productVariants,
            productUpdateKind: this.productUpdateKind,
            variantUpdateKind: this.variantUpdateKind,
            brandUpdateKind: this.brandUpdateKind,
            replaceExistingVariants: this.replaceExistingVariants,
        };
    }
}