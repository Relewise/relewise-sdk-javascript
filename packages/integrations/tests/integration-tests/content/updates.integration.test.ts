import { test } from '@jest/globals';
import { ContentAdministrativeActionBuilder, ContentUpdateBuilder, Integrator } from '../../../src';
import { DataValueFactory, Trackable } from '@relewise/client';
const { npm_config_API_KEY: API_KEY, npm_config_DATASET_ID: DATASET_ID, npm_config_SERVER_URL: SERVER_URL } = process.env;

const integrator = new Integrator(DATASET_ID!, API_KEY!, { serverUrl: SERVER_URL });

const unixTimeStamp: number = Date.now();

test('Create Content', async() => {
    const Content = new ContentUpdateBuilder({
        id: '1234',
        updateKind: 'ReplaceProvidedProperties',
    })
        .displayName([
            { language: 'da', value: 'Toaster' },
        ])
        .data({
            'UnixTimestamp': DataValueFactory.number(unixTimeStamp),
            'Description': DataValueFactory.string('Really nice Content'),
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
                    id: '1',
                    displayName: [{ language: 'da', value: 'Værktøj' }],
                })
                .category({
                    id: '2',
                    displayName: [{ language: 'da', value: 'Udendørs' }],
                })
                .category({
                    id: '3',
                    displayName: [{ language: 'da', value: 'Skovle' }],
                }))
            .path(p => p
                .category({
                    id: '4',
                    displayName: [{ language: 'da', value: 'Tilbud' }],
                })));

    await integrator.updateContent(Content.build());

    const enable = new ContentAdministrativeActionBuilder({
        filters: (f) => f.addContentDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp))),
        kind: 'Enable',
    });
    await integrator.executeContentAdministrativeAction(enable.build());

    const disable = new ContentAdministrativeActionBuilder({
        filters: (f) => f.addContentDataFilter('UnixTimeStamp', c => c.addEqualsCondition(DataValueFactory.number(unixTimeStamp), /* negated: */ true)),
        kind: 'Disable',
    });
    await integrator.executeContentAdministrativeAction(disable.build());
});


test('content integration example for docs', async() => {
    // Copy dataset id + API key + server URL from my.relewise.com > Settings > Developer Settings
    // const integrator = new Integrator('00000000-0000-0000-0000-000000000001', 'your api key', { serverUrl: 'the server URL for the dataset'});

    // This is the recommended "Push" method, for importing content data into Relewise.
    
    // Create a timestamp which will be stored on every content element, this way we can disable all content which has a lower timestamp than this, after the import has completed, effectively removing all content that weren't just updated.
    // It's important that the timestamp is the exact same for ALL content imported if we want to be able to batch-disable or delete expired content based on it.
    const date: number = Date.now();
    const english = 'en';

    const contentUpdates: Trackable[] = [];
    
    // Foreach content element that needs to be imported, do the following:
    {
        const content = new ContentUpdateBuilder({
            id: 'Content-ID-01', // The Id should be the primary id of the content which isn't dependent on the title or other editable attributes of the content element.
            updateKind: 'ReplaceProvidedProperties',
        })
            .displayName([
                { language: english, value: 'The english display name' }, // We only set the english translation in this example but more can be set by parsing more Multilingual.Value.
            ])
            .data({
                'ShortDescription': DataValueFactory.multilingual([{language: english, value: 'The short english description'}]), // We only set the english translation in this example but more can be set by parsing more Multilingual.Value. 
                'ImportedAt': DataValueFactory.number(date), // Important to set this timestamp to the exact same value for all content being updated as part of this full (not-delta) update, as we will use this timestamp to remove content that was not just imported, assuming they must have been removed since the last import and therefore should also be disabled in Relewise.
                'ReadingTimeInMinutes': DataValueFactory.number(3),
                'News': DataValueFactory.boolean(true),
                'Badges': DataValueFactory.stringCollection(['fun', 'current season', 'some other badge']),
            // Add any additional fields you would want returned from Relewise as part of search results
            })
            .categoryPaths(b => b
                .path(p => p
                    .category({
                        id: '23',
                        displayName: [{ language: english, value: 'Outdoor' }],
                    })
                    .category({
                        id: '372',
                        displayName: [{ language: english, value: 'Hiking' }],
                    }),
                ));

        contentUpdates.push(content.build());
    }
    // Foreach content element END

    // If this is a full-import (not delta) disable all non-included content elements
    {
        const disableNonUpdatedContet = new ContentAdministrativeActionBuilder({
            language: null,
            currency: null,
            filters(filterBuilder) {
                filterBuilder
                    .addContentDataFilter(
                        'ImportedAt',
                        (conditionBuilder) => conditionBuilder.addEqualsCondition(DataValueFactory.number(date), true),
                    );
            },
            kind: 'Disable',
        });
        contentUpdates.push(disableNonUpdatedContet.build());
    }

    const enableUpdatedContent = new ContentAdministrativeActionBuilder({
        language: null,
        currency: null,
        filters(filterBuilder) {
            filterBuilder
                .addContentDataFilter(
                    'ImportedAt',
                    (conditionBuilder) => conditionBuilder.addEqualsCondition(DataValueFactory.number(date), false),
                );
        },
        kind: 'Enable',
    });
    contentUpdates.push(enableUpdatedContent.build());

    await integrator.batch(contentUpdates);
});