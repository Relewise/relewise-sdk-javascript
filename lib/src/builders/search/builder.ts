import { ContentSearchRequest, ProductSearchRequest, SearchTermPredictionRequest } from "@/models/data-contracts";

export interface Builder<T = ProductSearchRequest | ContentSearchRequest | SearchTermPredictionRequest> {
    build(): T;
}
