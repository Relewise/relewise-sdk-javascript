import { testId } from '../testData';
import { test } from '@jest/globals';
import { ContentAdministrativeActionBuilder, ContentUpdateBuilder, Integrator } from '../../../src';
import { DataValueFactory } from '@relewise/client';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Content', async() => {
    const Content = new ContentUpdateBuilder({
        id: testId('1'),
        updateKind: 'ReplaceProvidedProperties',
    })
        .displayName([
            { language: 'da', value: 'Toaster' },
        ])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.multilingual([{language: 'da', value: 'The last word should be highlighted'}]),
            'Tags': DataValueFactory.stringCollection(['fall collection', 'blue', 'good-deal']),
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
                }))
            .path(p => p
                .category({
                    id: testId('4'),
                    displayName: [{ language: 'da', value: 'Tilbud' }],
                })));

    await integrator.updateContent(Content.build());

    const enable = new ContentAdministrativeActionBuilder({
        filters: (f) => f.addContentIdFilter(testId('1')).addContentDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Enable',
    });
    await integrator.executeContentAdministrativeAction(enable.build());

    const disable = new ContentAdministrativeActionBuilder({
        filters: (f) => f.addContentIdFilter(testId('1')).addContentDataFilter('UnixTimestamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Disable',
    });
    await integrator.executeContentAdministrativeAction(disable.build());
});
