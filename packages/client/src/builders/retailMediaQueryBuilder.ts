import { RetailMediaQuery, RetailMediaQueryLocationSelector, SelectedDisplayAdPropertiesSettings } from '../models/data-contracts';

export class RetailMediaQueryBuilder {
    location?: RetailMediaQueryLocationSelector;
    selectedDisplayAdProperties: SelectedDisplayAdPropertiesSettings | null = null;

    public setLocation(location: RetailMediaQueryLocationSelector): this {
        this.location = location;

        return this;
    }

    public setSelectedDisplayAdProperties(displayAdProperties: Partial<SelectedDisplayAdPropertiesSettings> | null): this {
        this.selectedDisplayAdProperties = displayAdProperties as SelectedDisplayAdPropertiesSettings | null;

        return this;
    }

    public build(): RetailMediaQuery {
        if (this.location == null) {
            throw new Error('RetailMediaQuery must have a location set');
        }

        return {
            location: this.location,
            settings: {
                selectedDisplayAdProperties: this.selectedDisplayAdProperties
            }
        };
    }
}