import { ContentSearchRequest, ProductSearchRequest, SearchTermPredictionRequest } from '../../models/data-contracts';

export interface SearchBuilder<T = ProductSearchRequest | ContentSearchRequest | SearchTermPredictionRequest> {
    build(): T;
}
