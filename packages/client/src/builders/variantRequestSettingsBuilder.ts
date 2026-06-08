import { VariantRecommendationRequestSettings, VariantRequestSettings, VariantSearchRequestSettings } from '../models/data-contracts';

const variantSearchRequestSettingsType = 'Relewise.Client.Requests.Search.Settings.VariantSearchRequestSettings, Relewise.Client';
const variantRecommendationRequestSettingsType = 'Relewise.Client.Requests.Recommendations.VariantRecommendationRequestSettings, Relewise.Client';

export class VariantRequestSettingsBuilder<TVariantRequestSettings extends VariantRequestSettings = VariantRequestSettings> {
    private settings: VariantRequestSettings;

    protected constructor(type: string) {
        this.settings = {
            $type: type,
        };
    }

    public setMaxVariantsPerProduct(maxVariantsPerProduct: number | null): this {
        this.settings.maxVariantsPerProduct = maxVariantsPerProduct;

        return this;
    }

    public setSorting(sorting: VariantRequestSettings['sorting']): this {
        this.settings.sorting = sorting;

        return this;
    }

    public build(): TVariantRequestSettings {
        return this.settings as TVariantRequestSettings;
    }
}

export class VariantSearchRequestSettingsBuilder extends VariantRequestSettingsBuilder<VariantSearchRequestSettings> {
    public constructor() {
        super(variantSearchRequestSettingsType);
    }
}

export class VariantRecommendationRequestSettingsBuilder extends VariantRequestSettingsBuilder<VariantRecommendationRequestSettings> {
    public constructor() {
        super(variantRecommendationRequestSettingsType);
    }
}
