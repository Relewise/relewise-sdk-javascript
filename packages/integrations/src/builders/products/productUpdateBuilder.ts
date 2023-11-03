import { Product, MultilingualDataValue, DataValue, ProductVariant, CategoryPath, MultiCurrencyDataValue, Brand, ProductUpdate } from '@relewise/client';

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

    displayName(name: MultilingualDataValue): this {
        this.product.displayName = name.value;

        return this;
    }

    data(data: Record<string, DataValue>): this {
        this.product.data = data;

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

    listPrice(listPrice: MultiCurrencyDataValue): this {
        this.product.listPrice = listPrice.value;

        return this;
    }

    salesPrice(salesPrice: MultiCurrencyDataValue): this {
        this.product.salesPrice = salesPrice.value;

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