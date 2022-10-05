import { DataValue, Money, MultiCurrency, Multilingual } from './data-contracts';

export type DataValueTypes = 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection';

export abstract class DataValueBase<T> implements DataValue {
    constructor(type: DataValueTypes, value: T) {
        this.type = type;
        this.value = value;
    }

    type: DataValueTypes;
    value: T;
}

export class StringDataValue extends DataValueBase<string> {
    constructor(value: string) {
        super('String', value);
    }
}

export class StringCollectionDataValue extends DataValueBase<Object> {
    constructor(value: string[]) {
        super('StringList', 
            {
                $type: 'System.Collections.Generic.List`1[[System.String, System.Private.CoreLib]], System.Private.CoreLib',
                $values: value,
            });
    }
}

export class NumberDataValue extends DataValueBase<number> {
    constructor(value: number) {
        super('Double', value);
    }
}

export class DoubleCollectionDataValue extends DataValueBase<Object> {
    constructor(value: number[]) {
        super('DoubleList',
            {
                $type: 'System.Collections.Generic.List`1[[System.Double, System.Private.CoreLib]], System.Private.CoreLib',
                $values: value,
            });
    }
}

export class BooleanDataValue extends DataValueBase<boolean> {
    constructor(value: boolean) {
        super('Boolean', value);
    }
}

export class BooleanCollectionDataValue extends DataValueBase<Object> {
    constructor(value: boolean[]) {
        super('BooleanList', 
            {
                $type: 'System.Collections.Generic.List`1[[System.Boolean, System.Private.CoreLib]], System.Private.CoreLib',
                $values: value,
            });
    }
}

export class MoneyDataValue extends DataValueBase<Object> {
    constructor(amount: number, currency: string) {
        super('Money', 
            {
                $type: 'Relewise.Client.DataTypes.Money, Relewise.Client',
                amount: amount,
                currency: {
                    value: currency,
                },
            });
    }
}

interface MultiCurrencyWithType extends MultiCurrency {
    $type: string;
}

export class MultiCurrencyDataValue extends DataValueBase<MultiCurrencyWithType> {
    constructor(values: { amount: number, currency: string }[]) {
        super('MultiCurrency', 
            {
                $type: 'Relewise.Client.DataTypes.MultiCurrency, Relewise.Client',
                values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })),
            });
    }
}

interface MultilingualWithType extends Multilingual {
    $type: string;
}

export class MultilingualDataValue extends DataValueBase<MultilingualWithType> {
    constructor(values: { value: string, language: string }[]) {
        super('Multilingual', 
            {
                $type: 'Relewise.Client.DataTypes.Multilingual, Relewise.Client',
                values: values.map(x => ({ text: x.value, language: { value: x.language } })),
            });
    }
}