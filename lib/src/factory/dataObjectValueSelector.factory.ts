import { DataObjectFilter, DataObjectValueSelector } from 'src/models/data-contracts';
import { DataObjectFilterConditionBuilder } from '../builders/dataObjectFilterConditionBuilder';

export class DataObjectValueSelectorFactory {
    private key!: string;
    private filter?: DataObjectFilter;
    private childSelector?: DataObjectValueSelector;
    private fallbackSelector?: DataObjectValueSelector;

    public select(key: string, settings?: {
        filter?: {
            conditions?: (builder: DataObjectFilterConditionBuilder) => void,
            skip?: number,
            take?: number 
        } | null, 
        childSelector?: (childSelector: DataObjectValueSelectorFactory) => void | null,
        fallbackSelector?: (childSelector: DataObjectValueSelectorFactory) => void | null
    })
    {
        this.key = key;
        
        if (settings) {
            if (settings.filter) {
                const conditionsBuilder = new DataObjectFilterConditionBuilder();
                if (settings.filter?.conditions) {
                    settings.filter?.conditions(conditionsBuilder);
                }
    
                this.filter = {
                    skip: settings.filter.skip,
                    take: settings.filter.take, 
                    conditions: conditionsBuilder.build(),
                }
            }
    
            if (settings.childSelector) {
                const childSelector = new DataObjectValueSelectorFactory();
                if (settings?.childSelector) {
                    settings?.childSelector(childSelector);
                }
                this.childSelector = childSelector.build();
            }

            if (settings.fallbackSelector) {
                const fallbackSelector = new DataObjectValueSelectorFactory();
                if (settings?.fallbackSelector) {
                    settings?.fallbackSelector(fallbackSelector);
                }
                this.fallbackSelector = fallbackSelector.build();
            }
        }
    }

    public build(): DataObjectValueSelector {
        return {
            key: this.key,
            filter: this.filter,
            childSelector: this.childSelector,
            fallbackSelector: this.fallbackSelector,
        }
    }
}