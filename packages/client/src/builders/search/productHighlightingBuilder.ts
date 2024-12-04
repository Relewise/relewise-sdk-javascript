import { HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits, HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape, ProductHighlightProps, ProductSearchSettingsHighlightSettings } from '../../models/data-contracts';

export class ProductHighlightingBuilder {
    private enabled: boolean = true;
    private highlightable: ProductHighlightProps = {
        $type: 'Relewise.Client.Requests.Shared.Highlighting.ProductHighlightProps, Relewise.Client',
        displayName: false
    }; 
    private limit: HighlightSettings2ProductProductHighlightPropsHighlightSettings2Limits = {};
    private shape: HighlightSettings2ProductProductHighlightPropsHighlightSettings2ResponseShape = {
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

    public build(): ProductSearchSettingsHighlightSettings {
        return {
            $type: 'Relewise.Client.Requests.Search.Settings.ProductSearchSettings+HighlightSettings, Relewise.Client',
            enabled: this.enabled,
            highlightable: this.highlightable,
            limit: this.limit,
            shape: this.shape
        } as ProductSearchSettingsHighlightSettings;
    }
}