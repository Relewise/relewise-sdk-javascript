import { Settings } from '@/builders/settings';
import { PersonalContentRecommendationRequest } from '@/models/data-contracts';
import { ContentSettingsRecommendationBuilder } from './contentSettingsRecommendationBuilder';
import { ContentsRecommendationBuilder } from './contentsRecommendationBuilder';

export class PersonalContentRecommendationBuilder extends ContentSettingsRecommendationBuilder implements ContentsRecommendationBuilder<PersonalContentRecommendationRequest> {
    constructor(
        settings: Settings) {
        super(settings);
    }

    public build() {
        const request: PersonalContentRecommendationRequest = {
            ...this.baseBuild(),
            settings: this.recommendationSettings,
        };

        return { request, name: 'PersonalContentRecommendationRequest' };
    }
}
