// These My Relewise UI endpoints require a master key and return after the work completes.
// Keep this integration-test setup outside the generated public SDK.
export async function syncIntegrationSearchIndex(): Promise<void> {
    const { npm_config_API_KEY: apiKey, npm_config_DATASET_ID: datasetId, npm_config_SERVER_URL: serverUrl } = process.env;
    if (!apiKey || !datasetId || !serverUrl) {
        throw new Error('Index synchronization requires API_KEY, DATASET_ID, and SERVER_URL');
    }

    // Finish rebuilding the default index before refreshing the search candidate caches.
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

    // A 2xx status alone is insufficient: require the operation's completion response.
    const result = await response.json();
    if (typeof result?.rebuildTimeMs !== 'number' || !Number.isFinite(result.rebuildTimeMs) || result.rebuildTimeMs < 0) {
        throw new Error('Integration search index synchronization returned an invalid rebuild response');
    }

    // Termless content search gets its candidates from presorted fill, not the search index.
    const refreshResponse = await fetch(`${serverUrl.replace(/\/$/, '')}/${datasetId}/ui/RefreshPresorterRequest`, {
        method: 'POST',
        headers: {
            Authorization: `APIKey ${apiKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ Fill: true, Popular: true, Fallback: true }),
        signal: AbortSignal.timeout(120_000),
    });
    if (!refreshResponse.ok) {
        throw new Error(`Integration presorter synchronization failed (HTTP ${refreshResponse.status}): ${await refreshResponse.text()}`);
    }
    const refreshResult = await refreshResponse.json();
    if (typeof refreshResult?.refreshTimeMs !== 'number' || !Number.isFinite(refreshResult.refreshTimeMs) || refreshResult.refreshTimeMs < 0) {
        throw new Error('Integration presorter synchronization returned an invalid refresh response');
    }
}
