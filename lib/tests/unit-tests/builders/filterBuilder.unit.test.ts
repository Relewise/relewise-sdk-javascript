import { test, expect } from '@jest/globals'
import { FilterBuilder } from '../../../src/builders/filterBuilder';
import { FilterCollection } from '../../../src/models/data-contracts';


function baseBuilder() {
    return new FilterBuilder();
};

test('empty', () => {
    const subject: FilterCollection | null = baseBuilder()
        .build();

    expect(subject).toBe(null);
});

test('product id filter', () => {
    const subject: FilterCollection | null = baseBuilder()
        .addProductIdFilter('1')
        .build();

    expect(subject?.items?.length).toBe(1);
});