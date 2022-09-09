import { StringDataValue, StringCollectionDataValue, NumberDataValue, DoubleCollectionDataValue, BooleanDataValue, BooleanCollectionDataValue, MoneyDataValue, MultiCurrencyDataValue, MultilingualDataValue } from '..';

export class DataValueFactory {
    static string(value: string): StringDataValue {
        return new StringDataValue(value);
    }
    
    static stringCollection(collection: string[]): StringCollectionDataValue {
        return new StringCollectionDataValue(collection);
    }

    static number(value: number): NumberDataValue {
        return new NumberDataValue(value);
    }

    static doubleCollection(collection: number[]): DoubleCollectionDataValue {
        return new DoubleCollectionDataValue(collection);
    }

    static boolean(value: boolean): BooleanDataValue {
        return new BooleanDataValue(value);
    }

    static booleanCollection(collection: boolean[]): BooleanCollectionDataValue {
        return new BooleanCollectionDataValue(collection);
    }

    static money(amount: number, currency: string): MoneyDataValue {
        return new MoneyDataValue(amount, currency);
    }

    static multiCurrency(values: { amount: number, currency: string }[]): MultiCurrencyDataValue {
        return new MultiCurrencyDataValue(values);
    }

    static multilingual(values: { value: string, language: string }[]): MultilingualDataValue {
        return new MultilingualDataValue(values);
    }
}