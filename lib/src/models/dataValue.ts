import { DataObject, DataValue, MultiCurrency, Multilingual } from './data-contracts';

export type DataValueTypes = 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection' | 'Object' | 'ObjectList';

export abstract class DataValueBase<T> implements DataValue {
    constructor(type: DataValueTypes, value: T, isCollection: boolean) {
        this.type = type;
        this.value = value;
        this.isCollection = isCollection;
    }

    type: DataValueTypes;
    value: T;
    isCollection: boolean;
}

export interface CollectionWithType<T> {
    $type: string;
    $values: T[];
}

export interface MultiCurrencyWithType extends MultiCurrency {
    $type: string;
}

export interface MultilingualWithType extends Multilingual {
    $type: string;
}

export interface DataObjectWithType extends DataObject {
    $type: string;
}

export class StringDataValue extends DataValueBase<string> {
    constructor(value: string) {
        super('String', value, false);
    }
}

export class StringCollectionDataValue extends DataValueBase<CollectionWithType<string>> {
    constructor(value: string[]) {
        super('StringList',
            {
                $type: 'System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib',
                $values: value,
            },
            true);
    }
}

export class NumberDataValue extends DataValueBase<number> {
    constructor(value: number) {
        super('Double', value, false);
    }
}

export class DoubleCollectionDataValue extends DataValueBase<CollectionWithType<number>> {
    constructor(value: number[]) {
        super('DoubleList',
            {
                $type: 'System.Collections.Generic.List`1[[System.Double, System.Private.CoreLib]], System.Private.CoreLib',
                $values: value,
            },
            true);
    }
}

export class BooleanDataValue extends DataValueBase<boolean> {
    constructor(value: boolean) {
        super('Boolean', value, false);
    }
}

export class BooleanCollectionDataValue extends DataValueBase<CollectionWithType<boolean>> {
    constructor(value: boolean[]) {
        super('BooleanList',
            {
                $type: 'System.Collections.Generic.List`1[[System.Boolean, System.Private.CoreLib]], System.Private.CoreLib',
                $values: value,
            },
            true);
    }
}

export class MultiCurrencyDataValue extends DataValueBase<MultiCurrencyWithType> {
    constructor(values: { amount: number, currency: string }[]) {
        super('MultiCurrency',
            {
                $type: 'Relewise.Client.DataTypes.MultiCurrency, Relewise.Client',
                values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })),
            },
            true);
    }
}

export class MultilingualDataValue extends DataValueBase<MultilingualWithType> {
    constructor(values: { value: string, language: string }[]) {
        super('Multilingual',
            {
                $type: 'Relewise.Client.DataTypes.Multilingual, Relewise.Client',
                values: values.map(x => ({ text: x.value, language: { value: x.language } })),
            },
            true);
    }
}

export class ObjectDataValue extends DataValueBase<DataObjectWithType> {
    constructor(dataObject: { [key: string]: DataValue }) {
        super('Object',
            {
                $type: 'Relewise.Client.DataTypes.DataObject, Relewise.Client',
                data: dataObject,
            },
            false);
    }
}

export class ObjectCollectionDataValue extends DataValueBase<CollectionWithType<DataObjectWithType>> {
    constructor(dataObjects: { [key: string]: DataValue }[]) {
        super('ObjectList',
            {
                $type: 'Relewise.Client.DataTypes.DataObject, Relewise.Client',
                $values: dataObjects.map(x => ({ $type: 'Relewise.Client.DataTypes.DataObject, Relewise.Client', data: x })),
            },
            true);
    }
}