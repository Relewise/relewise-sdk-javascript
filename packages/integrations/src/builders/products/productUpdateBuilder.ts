import { Product, MultilingualDataValue, DataValue, ProductVariant, CategoryPath, MultiCurrencyDataValue, Brand, ProductUpdate } from '@relewise/client';

export class ProductUpdateBuilder {
    private product: Product;
    private productUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private variantUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private brandUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace' | null | undefined;
    private replaceExistingVariants: boolean;

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

    displayName(name: MultilingualDataValue): this {
        this.product.displayName = name.value;

        return this;
    }

    data(data: Record<string, DataValue>): this {
        this.product.data = data;

        return this;
    }

    variants(variants: ProductVariant[]): this { return this; }
    categoryPaths(categories: CategoryPath[]): this { return this; }
    assortments(assortments: number[]): this { return this; }
    listPrice(listPrice: MultiCurrencyDataValue): this { return this; }
    salesPrice(salesPrice: MultiCurrencyDataValue): this { return this; }
    brand(brand: Brand): this { return this; }

    build(): ProductUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.ProductUpdate, Relewise.Client',
            product: this.product,
            productUpdateKind: this.productUpdateKind,
            variantUpdateKind: this.variantUpdateKind,
            brandUpdateKind: this.brandUpdateKind,
            replaceExistingVariants: this.replaceExistingVariants,
        };
    }
}