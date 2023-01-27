import { ObjectValueEqualsCondition, ObjectValueContainsCondition, ObjectValueGreaterThanCondition, ObjectValueLessThanCondition, ObjectValueInRangeCondition, ObjectValueMinByCondition, ObjectValueMaxByCondition, DataValueBase, DoubleRange, DataObjectFilter } from '..';

export type Conditions = ObjectValueEqualsCondition | ObjectValueContainsCondition | ObjectValueGreaterThanCondition | ObjectValueLessThanCondition | ObjectValueInRangeCondition | ObjectValueMinByCondition | ObjectValueMaxByCondition;

export type CompareMode = 'All' | 'Any';

export class DataObjectFilterBuilder {
    conditions: Conditions[] = [];
    skip?: number | null;
    take?: number | null; 

    public addEqualsCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueEqualsCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueEqualsCondition, Relewise.Client',
            value: value,
            key: key,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addContainsCondition<T>(key: string, value: DataValueBase<T>, objectPath?: string[], mode: CompareMode = 'All', negated: boolean = false): this {
        const condition: ObjectValueContainsCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueContainsCondition, Relewise.Client',
            value: value,
            key: key,
            objectPath: objectPath,
            mode: mode,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addGreaterThanCondition(key: string, value: number, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueGreaterThanCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueGreaterThanCondition, Relewise.Client',
            value: value,
            key: key,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addLessThanCondition(key: string, value: number, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueLessThanCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueLessThanCondition, Relewise.Client',
            value: value,
            key: key,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addInRangeCondition(key: string, range: DoubleRange, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueInRangeCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueInRangeCondition, Relewise.Client',
            key: key,
            range: range,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addMinByCondition(key: string, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueMinByCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueMinByCondition, Relewise.Client',
            key: key,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    public addMaxByCondition(key: string, objectPath?: string[], negated: boolean = false): this {
        const condition: ObjectValueMaxByCondition = {
            $type: 'Relewise.Client.Requests.Filters.DataObjects.Conditions.ObjectValueMaxByCondition, Relewise.Client',
            key: key,
            objectPath: objectPath,
            negated: negated,
        };
        this.conditions.push(condition);

        return this;
    }

    build(): DataObjectFilter | null {
        return this.conditions.length === 0
            ? null
            : { 
                conditions: this.conditions,
                skip: this.skip, 
                take: this.take,
            }
    }
}