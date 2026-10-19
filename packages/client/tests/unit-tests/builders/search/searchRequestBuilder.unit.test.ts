import { UserFactory } from '../../../../src/factory';
import { SearchTermPredictionBuilder } from '../../../../src/builders/search';
import { test, expect } from '@jest/globals'
import { SearchTermPredictionRequest } from '../../../../src/models/data-contracts';

function baseBuilder() { 
    return new SearchTermPredictionBuilder({
        language: 'da-DK',
        currency: 'DKK',
        displayedAtLocation: 'search page', 
        user: UserFactory.anonymous(),
    });
};

test('constructor', () => {
    const subject = baseBuilder().build();

    expect(subject.language?.value).toBe('da-DK');
    expect(subject.currency?.value).toBe('DKK');
    expect(subject.displayedAtLocation).toBe('search page');
    expect(subject.user).toBeDefined();
});

test('Index', () => {
    const expectedIndexId = 'content';
    const subject: SearchTermPredictionRequest = baseBuilder()
        .setIndex(expectedIndexId)
        .build();

    expect(subject.indexSelector?.id).toBe(expectedIndexId);
});

test('context values can be replaced and appended without mutating the input', () => {
    const contextValues = { DeviceType: 'Mobile' };

    const subject = baseBuilder()
        .contextValues(contextValues)
        .addContextValue('DeviceType', 'Desktop')
        .addContextValue('SplitTestVariant', 'A')
        .build();

    expect(subject.contextValues).toEqual({
        DeviceType: 'Desktop',
        SplitTestVariant: 'A',
    });
    expect(contextValues).toEqual({ DeviceType: 'Mobile' });
});

test('context values can be cleared', () => {
    const subject = baseBuilder()
        .contextValues({ DeviceType: 'Mobile' })
        .contextValues(null)
        .build();

    expect(subject.contextValues).toBeUndefined();
});
