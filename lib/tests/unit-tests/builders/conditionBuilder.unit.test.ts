import { test, expect } from '@jest/globals'
import { ConditionBuilder, StringDataValue } from '../../../src/builders/conditionBuilder';

test('build', () => {
    const subject = new ConditionBuilder().addContainsCondition(new StringDataValue("X"), "Any").build();

    expect(subject?.items?.length).toBe(1);
});