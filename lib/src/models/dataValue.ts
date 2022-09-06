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

export class StringCollectionDataValue extends DataValueBase<string[]> {
    constructor(value: string[]) {
        super('StringList', value);
    }
}

export class NumberDataValue extends DataValueBase<number> {
    constructor(value: number) {
        super('Double', value);
    }
}

export class DoubleCollectionDataValue extends DataValueBase<number[]> {
    constructor(value: number[]) {
        super('DoubleList', value);
    }
}

export class BooleanDataValue extends DataValueBase<boolean> {
    constructor(value: boolean) {
        super('Boolean', value);
    }
}

export class BooleanCollectionDataValue extends DataValueBase<boolean[]> {
    constructor(value: boolean[]) {
        super('BooleanList', value);
    }
}

export class MoneyDataValue extends DataValueBase<Money> {
    constructor(amount: number, currency: string) {
        super('Money', {
            amount: amount,
            currency: { value: currency },
        });
    }
}

export class MultiCurrencyDataValue extends DataValueBase<MultiCurrency> {
    constructor(values: { amount: number, currency: string }[]) {
        super('MultiCurrency', {
            values: values.map(x => ({ amount: x.amount, currency: { value: x.currency } })),
        });
    }
}

export class MultilingualDataValue extends DataValueBase<Multilingual> {
    constructor(values: { value: string, language: string }[]) {
        super('Multilingual', {
            values: values.map(x => ({ text: x.value, language: { value: x.language } })),
        });
    }
}