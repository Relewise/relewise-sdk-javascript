import { DataValue, Brand, BrandUpdate } from '@relewise/client';

export class BrandUpdateBuilder {
    private brand: Brand;
    private updateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace';

    constructor({ id, updateKind }: {
        id: string,
        updateKind: 'None' | 'UpdateAndAppend' | 'ReplaceProvidedProperties' | 'ClearAndReplace',
    }) {
        this.brand = { id: id };
        this.updateKind = updateKind;
    }

    displayName(name: string): this {
        this.brand.displayName = name;

        return this;
    }

    data(data: Record<string, DataValue | null>): this {
        this.brand.data = data as Record<string, DataValue>; // TODO remove dirty hack

        return this;
    }

    assortments(assortments: number[]): this {
        this.brand.assortments = assortments;

        return this;
    }

    build(): BrandUpdate {
        return {
            $type: 'Relewise.Client.DataTypes.BrandUpdate, Relewise.Client',
            brand: this.brand,
            kind: this.updateKind,
        };
    }
}