// Wait for normal indexing without changing server configuration.
export async function waitForHits(search: () => Promise<{ hits?: number | null } | undefined>, expectedHits: number): Promise<void> {
    const deadline = Date.now() + 120_000;
    let hits: number | null | undefined;
    do {
        hits = (await search())?.hits;
        if (hits === expectedHits) return;
        await new Promise(resolve => setTimeout(resolve, 500));
    } while (Date.now() < deadline);
    throw new Error(`Integration fixtures not searchable: expected ${expectedHits} hits, received ${hits ?? 'no response'}`);
}
