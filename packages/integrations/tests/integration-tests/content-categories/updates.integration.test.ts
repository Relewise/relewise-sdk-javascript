import { testId } from '../testData';
import { test } from '@jest/globals';
import { ContentCategoryUpdateBuilder, Integrator, ContentCategoryAdministrativeActionBuilder } from '../../../src';
import { DataValueFactory } from '@relewise/client';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Content Category', async() => {
    const category = new ContentCategoryUpdateBuilder({
        id: testId('1'),
        kind: 'ReplaceProvidedProperties',
    })
        .displayName([
            { language: 'da', value: 'Skovle' },
        ])
        .data({
            'IntegrationTestRun': DataValueFactory.string(testId('run')),
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Misc. skovle'),
            'Tags': DataValueFactory.stringCollection(['outdoor', 'quality', 'good-deal']),
            'InStock': DataValueFactory.boolean(true),
            'Removed': null,
            'Complex': DataValueFactory.object({
                'nestedDataKey': DataValueFactory.string('Key'),
            }),
        })
        .assortments([1, 2, 3])
        .categoryPaths(b => b
            .path(p => p
                .category({
                    id: testId('1'),
                    displayName: [{ language: 'da', value: 'Værktøj' }],
                })
                .category({
                    id: testId('2'),
                    displayName: [{ language: 'da', value: 'Udendørs' }],
                })
                .category({
                    id: testId('3'),
                    displayName: [{ language: 'da', value: 'Skovle' }],
                })));

    await integrator.updateContentCategory(category.build());

    const enable = new ContentCategoryAdministrativeActionBuilder({
        filters: (f) => f.addContentCategoryDataFilter('IntegrationTestRun', c => c.addEqualsCondition(DataValueFactory.string(testId('run'))))
            .addContentCategoryDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Enable',
    });
    await integrator.executeContentCategoryAdministrativeAction(enable.build());

    const disable = new ContentCategoryAdministrativeActionBuilder({
        filters: (f) => f.addContentCategoryDataFilter('IntegrationTestRun', c => c.addEqualsCondition(DataValueFactory.string(testId('run'))))
            .addContentCategoryDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Disable',
    });
    await integrator.executeContentCategoryAdministrativeAction(disable.build());
});
