import { ContentHighlightProps, ContentSearchSettingsHighlightSettings, HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits, HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape } from "src/models/data-contracts";

export class ContentHighlightingBuilder {
    private enabled: boolean = true;
    private highlightable: ContentHighlightProps = {
        $type: 'Relewise.Client.Requests.Shared.Highlighting.ContentHighlightProps, Relewise.Client',
        displayName: false
    }; 
    private limit: HighlightSettings2ContentContentHighlightPropsHighlightSettings2Limits = {};
    private shape: HighlightSettings2ContentContentHighlightPropsHighlightSettings2ResponseShape = {
        includeOffsets: false
    };

    public enable(enabled: boolean): this {
        this.enabled = enabled;
        
        return this;
    }

    public setHighlightable(highlightable: { displayName?: boolean, dataKeys?: string[] | null }): this {
        this.highlightable.displayName = highlightable.displayName ?? false;
        this.highlightable.dataKeys = highlightable.dataKeys;

        return this;
    }

    public setLimit(limit: { maxEntryLimit?: number | null; maxSnippetsPerEntry?: number | null; maxSnippetsPerField?: number | null; }): this {
        this.limit.maxEntryLimit = limit.maxEntryLimit;
        this.limit.maxSnippetsPerEntry = limit.maxSnippetsPerEntry;
        this.limit.maxSnippetsPerField = limit.maxSnippetsPerField;

        return this;
    }

    public setShape(shape: { includeOffsets: boolean }): this {
        this.shape.includeOffsets = shape.includeOffsets;

        return this;
    }

    public build(): ContentSearchSettingsHighlightSettings {
        return {
            $type: 'Relewise.Client.Requests.Search.Settings.ContentSearchSettings+HighlightSettings, Relewise.Client',
            enabled: this.enabled,
            highlightable: this.highlightable,
            limit: this.limit,
            shape: this.shape
        } as ContentSearchSettingsHighlightSettings;
    }
}