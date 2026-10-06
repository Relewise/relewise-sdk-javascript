// Use the same synchronous UI operation as My Relewise; keep it out of the public SDK.
export async function syncIntegrationSearchIndex(): Promise<void> {
    const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
    if (!apiKey || !datasetId || !serverUrl) {
        throw new Error('Index synchronization requires API_KEY, DATASET_ID, and SERVER_URL');
    }

    const response = await fetch(`${serverUrl.replace(/\/$/, '')}/${datasetId}/ui/RebuildSearchIndexRequest`, {
        method: 'POST',
        headers: {
            Authorization: `APIKey ${apiKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ IndexId: 'default' }),
        signal: AbortSignal.timeout(120_000),
    });

    if (!response.ok) {
        throw new Error(`Integration search index synchronization failed (HTTP ${response.status}): ${await response.text()}`);
    }

    const result = await response.json();
    if (typeof result?.rebuildTimeMs !== 'number' || !Number.isFinite(result.rebuildTimeMs) || result.rebuildTimeMs < 0) {
        throw new Error('Integration search index synchronization returned an invalid rebuild response');
    }
}
