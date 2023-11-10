import { Product, DataValue, ProductVariant, Brand, ProductUpdate, CategoryNameAndId, CategoryPath } from '@relewise/client';

export type ProductCategoryPath = {
    path: PathNode[]
};

export type PathNode = {
    id: string;
    displayName: {
        value: string;
        language: string;
    }[]
}

export class ProductUpdateBuilder {
    private product: Product;
    private productUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private variantUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';
    private brandUpdateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace' | null | undefined;
    private replaceExistingVariants: boolean;
    private productVariants: ProductVariant[] | null | undefined;

    constructor({ id, productUpdateKind, brandUpdateKind, variantUpdateKind = 'UpdateAndAppend', replaceExistingVariants = false }: {
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

    /**
     * Add multiple category paths to a product. Start from the root to the lowest child. Example: Tools -> Outdoor -> Shovel
     * @param paths 
     * @returns 
     */

    categoryPaths(builder: (b: CategoryPathBuilder) => void): this {
        const b = new CategoryPathBuilder();
        builder(b);
        this.product.categoryPaths = b.build();
        
        return this;
    }
    // categoryPaths(paths: ProductCategoryPath[]): this {
    //     this.product.categoryPaths = paths.map(p => ({
    //         breadcrumbPathStartingFromRoot: p.path.map(path => ({
    //             id: path.id, 
    //             displayName: { values: path.displayName.map(x => ({ text: x.value, language: { value: x.language } })) },
    //         })),
    //     }));

    //     return this;
    // }

    assortments(assortments: number[]): this {
        this.product.assortments = assortments;

        return this;
    }

    listPrice(values: { amount: number;  currency: string; }[]): this {
        this.product.listPrice = { values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })) };

        return this;
    }

    salesPrice(values: { amount: number; currency: string; }[]): this {
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

export class CategoryPathBuilder {
    private paths: CategoryPath[] = [];

    path(builder: (builder: PathBuilder) => void): this {
        const b = new PathBuilder();
        builder(b);
        this.paths.push({ breadcrumbPathStartingFromRoot: b.build() });

        return this;    
    }

    build(): CategoryPath[] {
        return this.paths;
    }
}

export class PathBuilder {
    private path: PathNode[] = [];

    category(categoryIdAndName: {
        id: string;
        displayName: {
            value: string;
            language: string;
        }[]
    }): this {

        this.path.push(categoryIdAndName);
        
        return this;    
    }

    build(): CategoryNameAndId[] {
        return this.path.map(x=> ({
            id: x.id, 
            displayName: { values: x.displayName.map(d => ({ text: d.value, language: { value: d.language } })) },
        }));
    }
}