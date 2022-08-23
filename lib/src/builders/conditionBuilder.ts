import { ContainsCondition, DataValue, DistinctCondition, EqualsCondition, GreaterThanCondition, LessThanCondition, ValueConditionCollection } from "@/models/data-contracts";

export type Conditions = ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition;

export class ConditionBuilder {
    conditions: Conditions[] = [];

    public addContainsCondition(value: DataValueBase, valueCollectionEvaluationMode: 'All' | 'Any' = 'All', negated: boolean = false): this {
        const condition: ContainsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ContainsCondition, Relewise.Client',
            value: value,
            valueCollectionEvaluationMode: valueCollectionEvaluationMode,
            negated: negated
        };
        this.conditions.push(condition);

        return this;
    }

    public addDistinctCondition(numberOfOccurrencesAllowedWithTheSameValue: number, negated: boolean = false): this {
        const condition: DistinctCondition = {
            $type: 'Relewise.Client.Requests.Conditions.DistinctCondition, Relewise.Client',
            numberOfOccurrencesAllowedWithTheSameValue: numberOfOccurrencesAllowedWithTheSameValue,
            negated: negated
        };
        this.conditions.push(condition);

        return this;
    }

    public addEqualsCondition(value: DataValueBase, negated: boolean = false): this {
        const condition: EqualsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.EqualsCondition, Relewise.Client',
            value: value,
            negated: negated
        };
        this.conditions.push(condition);

        return this;
    }

    public addGreaterThanCondition(value: number, negated: boolean = false): this {
        const condition: GreaterThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.GreaterThanCondition, Relewise.Client',
            value: value,
            negated: negated
        };
        this.conditions.push(condition);

        return this;
    }

    public addLessThanCondition(value: number, negated: boolean = false): this {
        const condition: LessThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.LessThanCondition, Relewise.Client',
            value: value,
            negated: negated
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

export abstract class DataValueBase implements DataValue {
    constructor(type: 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection', value: any) {
        this.type = type;
        this.value = value;
    }

    type: 'String' | 'Double' | 'Boolean' | 'Multilingual' | 'Money' | 'MultiCurrency' | 'StringList' | 'DoubleList' | 'BooleanList' | 'MultilingualCollection';
    value: any;
}

export class StringDataValue extends DataValueBase {
    constructor(value: string) {
        super('String', value);
    }
}

export class StringListDataValue extends DataValueBase {
    constructor(value: string[]) {
        super('StringList', value);
    }
}

export class NumberDataValue extends DataValueBase {
    constructor(value: number) {
        super('Double', value);
    }
}

export class DoubleListDataValue extends DataValueBase {
    constructor(value: number[]) {
        super('DoubleList', value);
    }
}

export class BooleanDataValue extends DataValueBase {
    constructor(value: boolean) {
        super('Boolean', value);
    }
}

export class BooleanListDataValue extends DataValueBase {
    constructor(value: boolean[]) {
        super('BooleanList', value);
    }
}