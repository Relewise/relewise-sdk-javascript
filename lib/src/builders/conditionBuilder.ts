import { ContainsCondition, DistinctCondition, EqualsCondition, GreaterThanCondition, LessThanCondition, ValueConditionCollection, DataValueBase, DataObjectFilter } from '..';
import { DataObjectFilterBuilder } from './dataObjectFilterBuilder';

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

    public addDataObjectCondition(filters: (builder: DataObjectFilterBuilder) => void, negated: boolean = false): this {
        const dataObjectFilterBuilder: DataObjectFilterBuilder = new DataObjectFilterBuilder();
        filters(dataObjectFilterBuilder);

        const condition: ContainsCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ContainsCondition, Relewise.Client',
            objectFilter: dataObjectFilterBuilder.build(),
            valueCollectionEvaluationMode: 'All',
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