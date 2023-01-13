import { DoubleRange, DataValueBase, ObjectValueMinByCondition, ObjectValueMaxByCondition, ObjectValueContainsCondition, ObjectValueEqualsCondition, ObjectValueGreaterThanCondition, ObjectValueLessThanCondition, ObjectValueInRangeCondition, ObjectValueCondition } from '..';

export type Conditions = | ObjectValueContainsCondition
    | ObjectValueEqualsCondition
    | ObjectValueGreaterThanCondition
    | ObjectValueInRangeCondition
    | ObjectValueLessThanCondition
    | ObjectValueMaxByCondition
    | ObjectValueMinByCondition;

export class DataObjectFilterConditionBuilder {
    conditions: Conditions[] = [];

    public addContainsCondition<T>(value: DataValueBase<T>, mode: 'All' | 'Any' = 'All', objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueContainsCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueContainsCondition, Relewise.Client',
            value: value,
            objectPath: objectPath,
            mode: mode,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addEqualsCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueEqualsCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueEqualsCondition, Relewise.Client',
            value: value,
            objectPath: objectPath,
            negated: negated,
            key: key,
        };
        this.conditions.push(condition);

        return this;
    }

    public addInRangeCondition(key: string, range: DoubleRange, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueInRangeCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ObjectValueInRangeCondition, Relewise.Client',
            range: range,
            key: key,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addGreaterThanCondition(key: string, value: number, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueGreaterThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ObjectValueGreaterThanCondition, Relewise.Client',
            value: value,
            negated: negated,
            key: key,
            objectPath: objectPath,
        };
        this.conditions.push(condition);

        return this;
    }

    public addLessThanCondition(key: string, value: number, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueLessThanCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ObjectValueLessThanCondition, Relewise.Client',
            value: value,
            negated: negated,
            key: key,
            objectPath: objectPath,
        };
        this.conditions.push(condition);

        return this;
    }

    public addMinByCondition(key: string, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueMinByCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ObjectValueMinByCondition, Relewise.Client',
            negated: negated,
            key: key,
            objectPath: objectPath,
        };
        this.conditions.push(condition);

        return this;
    }

    public addMaxByCondition(key: string, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueMaxByCondition = {
            $type: 'Relewise.Client.Requests.Conditions.ObjectValueMaxByCondition, Relewise.Client',
            negated: negated,
            key: key,
            objectPath: objectPath,
        };
        this.conditions.push(condition);

        return this;
    }

    public build(): Conditions[] | null {
        return this.conditions.length === 0
            ? null
            : this.conditions
    }
}