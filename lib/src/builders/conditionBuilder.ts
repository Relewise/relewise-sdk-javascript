import { ContainsCondition, DataValue, DistinctCondition, EqualsCondition, GreaterThanCondition, LessThanCondition, Money, Multilingual, Value, ValueConditionCollection } from '@/models/data-contracts';

export type Conditions = ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition;

export class ConditionBuilder {
    conditions: Conditions[] = [];

    public addContainsCondition<T>(value: DataValueBase<T>, valueCollectionEvaluationMode: 'All' | 'Any' = 'All', negated: boolean = false): this {
        const condition: ContainsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ContainsCondition, Relewise.Client',
            value: value,
            valueCollectionEvaluationMode: valueCollectionEvaluationMode,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addDistinctCondition(numberOfOccurrencesAllowedWithTheSameValue: number, negated: boolean = false): this {
        const condition: DistinctCondition = {
            $type: 'Relewise.Client.Requests.Conditions.DistinctCondition, Relewise.Client',
            numberOfOccurrencesAllowedWithTheSameValue: numberOfOccurrencesAllowedWithTheSameValue,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addEqualsCondition<T>(value: DataValueBase<T>, negated: boolean = false): this {
        const condition: EqualsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.EqualsCondition, Relewise.Client',
            value: value,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addGreaterThanCondition(value: number, negated: boolean = false): this {
        const condition: GreaterThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.GreaterThanCondition, Relewise.Client',
            value: value,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addLessThanCondition(value: number, negated: boolean = false): this {
        const condition: LessThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.LessThanCondition, Relewise.Client',
            value: value,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public build(): ValueConditionCollection | null {
        return this.conditions.length === 0
            ? null
            : { items: this.conditions }
    }
}

export abstract class DataValueBase<T> implements DataValue {
    constructor(type: 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection', value: T) {
        this.type = type;
        this.value = value;
    }

    type: 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection';
    value: T;
}

export class StringDataValue extends DataValueBase<string> {
    constructor(value: string) {
        super('String', value);
    }
}

export class StringListDataValue extends DataValueBase<string[]> {
    constructor(value: string[]) {
        super('StringList', value);
    }
}

export class NumberDataValue extends DataValueBase<number> {
    constructor(value: number) {
        super('Double', value);
    }
}

export class DoubleListDataValue extends DataValueBase<number[]> {
    constructor(value: number[]) {
        super('DoubleList', value);
    }
}

export class BooleanDataValue extends DataValueBase<boolean> {
    constructor(value: boolean) {
        super('Boolean', value);
    }
}

export class BooleanListDataValue extends DataValueBase<boolean[]> {
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

export class MultilingualDataValue extends DataValueBase<Multilingual> {
    constructor(values: { value: string, language: string }[]) {
        super('Multilingual', {
            values: values.map(x => ({ text: x.value, language: { value: x.language } }))
        });
    }
}