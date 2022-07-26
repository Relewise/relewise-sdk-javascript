/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AndFilter = Filter & {
  filters?:
    | (
        | AndFilter
        | BrandAssortmentFilter
        | BrandDataFilter
        | BrandIdFilter
        | CartDataFilter
        | ContentCategoryAssortmentFilter
        | ContentCategoryDataFilter
        | ContentCategoryIdFilter
        | ContentDataFilter
        | ContentIdFilter
        | OrFilter
        | ProductAssortmentFilter
        | ProductCategoryAssortmentFilter
        | ProductCategoryDataFilter
        | ProductCategoryIdFilter
        | ProductDataFilter
        | ProductDisplayNameFilter
        | ProductHasVariantsFilter
        | ProductIdFilter
        | ProductListPriceFilter
        | ProductRecentlyPurchasedByUserFilter
        | ProductRecentlyViewedByUserFilter
        | ProductSalesPriceFilter
        | VariantAssortmentFilter
        | VariantDataFilter
        | VariantIdFilter
        | VariantListPriceFilter
        | VariantSalesPriceFilter
        | VariantSpecificationFilter
      )[]
    | null;
};

export interface AssortmentFacet {
  $type: string;
  assortmentFilterType: "Or";
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface AssortmentFacetResult {
  $type: string;
  assortmentFilterType: "Or";
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface BatchedTrackingRequest {
  items?: Trackable[] | null;
  custom?: Record<string, string | null>;
}

export interface BooleanAvailableFacetValue {
  value: boolean;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface BooleanContentDataValueFacet {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface BooleanContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface BooleanProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface BooleanProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  available?: BooleanAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface Brand {
  id?: string | null;
  displayName?: string | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
}

export interface BrandAdministrativeAction {
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type BrandAssortmentFilter = Filter & { assortments?: number[] | null };

export type BrandDataFilter = DataFilter;

export type BrandFacet = StringValueFacet;

export type BrandFacetResult = StringBrandNameAndIdResultValueFacetResult;

export type BrandIdFilter = Filter & { brandIds?: string[] | null };

export type BrandIdRelevanceModifier = RelevanceModifier & {
  brandId?: string | null;
  ifProductIsBrandMultiplyWeightBy: number;
  ifProductIsNotBrandMultiplyWeightBy: number;
};

export interface BrandIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
}

export interface BrandNameAndIdResult {
  id?: string | null;
  displayName?: string | null;
}

export interface BrandNameAndIdResultAvailableFacetValue {
  value?: BrandNameAndIdResult | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface BrandRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  prioritizeDiversityBetweenRequests: boolean;
  selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
  custom?: Record<string, string | null>;
}

export interface BrandRecommendationResponse {
  recommendations?: BrandResult[] | null;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface BrandRecommendationWeights {
  /** @format double */
  brandViews: number;

  /** @format double */
  productViews: number;

  /** @format double */
  productPurchases: number;
}

export interface BrandResult {
  id?: string | null;
  displayName?: string | null;

  /** @format int32 */
  rank: number;
  viewedByUser?: ViewedByUserInfo | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export interface BrandResultDetails {
  brandId?: string | null;
  displayName?: string | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  viewedByUser?: ViewedByUserInfo | null;

  /** @format date-time */
  createdUtc: string;

  /** @format date-time */
  lastViewedUtc?: string | null;

  /** @format int64 */
  viewedTotalNumberOfTimes: number;

  /** @format int32 */
  viewedByDifferentNumberOfUsers: number;
  disabled: boolean;
  custom?: Record<string, string | null>;

  /** @format int32 */
  purchasedFromByDifferentNumberOfUsers: number;
  purchasedByUser?: PurchasedByUserInfo | null;
}

export interface BrandUpdate {
  brand?: Brand | null;
  kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface BrandView {
  user?: User | null;
  brand?: Brand | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface Cart {
  user?: User | null;
  name?: string | null;
  subtotal?: Money | null;
  lineItems?: LineItem[] | null;
  data?: Record<string, DataValue>;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type CartDataFilter = Filter & {
  key?: string | null;
  filterOutIfKeyIsNotFound: boolean;
  mustMatchAllConditions: boolean;
  conditions?: ValueConditionCollection | null;
  language?: Language | null;
  currency?: Currency | null;
};

export interface CartDetails {
  name?: string | null;

  /** @format date-time */
  modifiedUtc: string;
  lineItems?: LineItem[] | null;
  subtotal?: Money | null;
  data?: Record<string, DataValue>;
}

export interface CartMetrics {
  /** @format int32 */
  opened: number;
}

export interface Category {
  $type: string;
  id?: string | null;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export type CategoryFacet = StringValueFacet & { categorySelectionStrategy: "ImmediateParent" | "Ancestors" };

export type CategoryFacetResult = StringCategoryNameAndIdResultValueFacetResult & {
  categorySelectionStrategy: "ImmediateParent" | "Ancestors";
};

export interface CategoryIdFilter {
  $type: string;
  categoryIds?: string[] | null;
  evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
  typeName?: string | null;
  negated: boolean;
  custom?: Record<string, string | null>;
}

export interface CategoryIndexConfiguration {
  unspecified?: CategoryIndexConfigurationEntry | null;
}

export interface CategoryIndexConfigurationEntry {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
}

export interface CategoryMetrics {
  category?: CategoryNameAndIdResult | null;
  immediateParent: boolean;
  rank?: ViewsAndSalesMetrics | null;
}

export interface CategoryNameAndId {
  id: string;
  displayName?: Multilingual | null;
}

export interface CategoryNameAndIdResult {
  id?: string | null;
  displayName?: string | null;
}

export interface CategoryNameAndIdResultAvailableFacetValue {
  value?: CategoryNameAndIdResult | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface CategoryPath {
  breadcrumbPathStartingFromRoot: CategoryNameAndId[];
}

export interface CategoryPathResult {
  pathFromRoot?: CategoryNameAndIdResult[] | null;

  /** @format int32 */
  rank: number;
}

export interface CategoryPathResultDetails {
  breadcrumbPathStartingFromRoot?: CategoryNameAndId[] | null;
}

export interface CategoryResult {
  $type: string;
  categoryId?: string | null;
  displayName?: string | null;

  /** @format int32 */
  rank: number;
  viewedByUser?: ViewedByUserInfo | null;
  paths?: CategoryPathResult[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export interface ClassificationMetrics {
  combination?: Record<string, string | null>;
  views?: ViewsMetrics | null;
  sales?: SalesMetrics | null;
  carts?: CartMetrics | null;
  rank?: RankMetrics | null;
}

export type ClearTextParser = Parser;

export type ContainsCondition = ValueCondition & {
  value?: DataValue | null;
  valueCollectionEvaluationMode: "All" | "Any";
};

export interface Content {
  id?: string | null;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export interface ContentAdministrativeAction {
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "DisableInRecommendations" | "Disable" | "EnableInRecommendations" | "Enable" | "PermanentlyDelete" | "Delete";
  currency?: Currency | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type ContentAssortmentFacet = AssortmentFacet;

export type ContentAssortmentFacetResult = AssortmentFacetResult;

export type ContentAttributeSorting = ContentSorting & {
  attribute: "Id" | "DisplayName";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ContentCategory = Category;

export interface ContentCategoryAdministrativeAction {
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type ContentCategoryAssortmentFilter = Filter & { assortments?: number[] | null };

export type ContentCategoryDataFilter = DataFilter;

export type ContentCategoryIdFilter = CategoryIdFilter;

export interface ContentCategoryRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  prioritizeDiversityBetweenRequests: boolean;
  selectedContentCategoryProperties?: SelectedContentCategoryPropertiesSettings | null;
  custom?: Record<string, string | null>;
}

export interface ContentCategoryRecommendationResponse {
  recommendations?: ContentCategoryResult[] | null;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface ContentCategoryRecommendationWeights {
  /** @format double */
  categoryViews: number;

  /** @format double */
  contentViews: number;
}

export type ContentCategoryResult = CategoryResult;

export interface ContentCategorySearchRequest {
  term?: string | null;
  settings?: ContentCategorySearchSettings | null;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export type ContentCategorySearchSettings = SearchSettings & {
  numberOfRecommendations?: number | null;
  onlyIncludeRecommendationsForEmptyResults?: boolean | null;
};

export interface ContentCategoryUpdate {
  category?: ContentCategory | null;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type ContentDataBooleanValueFacet = BooleanContentDataValueFacet;

export type ContentDataBooleanValueFacetResult = BooleanContentDataValueFacetResult;

export type ContentDataDoubleRangeFacet = DoubleNullableContentDataRangeFacet;

export type ContentDataDoubleRangeFacetResult = DoubleContentDataRangeFacetResult;

export type ContentDataDoubleValueFacet = DoubleContentDataValueFacet;

export type ContentDataDoubleValueFacetResult = DoubleContentDataValueFacetResult;

export type ContentDataFilter = DataFilter;

export type ContentDataIntegerValueFacet = Int32ContentDataValueFacet;

export type ContentDataIntegerValueFacetResult = Int32ContentDataValueFacetResult;

export type ContentDataSorting = ContentSorting & { key?: string | null; mode: "Auto" | "Alphabetical" | "Numerical" };

export type ContentDataStringValueFacet = StringContentDataValueFacet;

export type ContentDataStringValueFacetResult = StringContentDataValueFacetResult;

export interface ContentDetailsCollectionResponse {
  contents?: ContentResultDetails[] | null;

  /** @format int32 */
  totalNumberOfResults?: number | null;
  statistics?: Statistics | null;
}

export interface ContentFacetQuery {
  items?:
    | (
        | ContentAssortmentFacet
        | ProductAssortmentFacet
        | BrandFacet
        | CategoryFacet
        | ContentDataDoubleRangeFacet
        | ContentDataStringValueFacet
        | ContentDataBooleanValueFacet
        | ContentDataDoubleValueFacet
        | ContentDataIntegerValueFacet
        | PriceRangeFacet
        | PriceRangesFacet
        | ProductDataDoubleRangeFacet
        | ProductDataStringValueFacet
        | ProductDataBooleanValueFacet
        | ProductDataDoubleValueFacet
        | ProductDataIntegerValueFacet
        | VariantSpecificationFacet
      )[]
    | null;
}

export interface ContentFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | DataRangesFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | RangesFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ContentIdFilter = Filter & { contentIds?: string[] | null };

export interface ContentIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  category?: CategoryIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export type ContentPopularitySorting = ContentSorting;

export interface ContentQuery {
  filters?: FilterCollection | null;

  /** @format int32 */
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;

  /** @format int32 */
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledContents: boolean;
  custom?: Record<string, string | null>;
}

export interface ContentRecommendationRequest {
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface ContentRecommendationRequestCollection {
  requests?: ContentRecommendationRequest[] | null;
  requireDistinctContentAcrossResults: boolean;
  custom?: Record<string, string | null>;
}

export interface ContentRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  selectedContentProperties?: SelectedContentPropertiesSettings | null;
  custom?: Record<string, string | null>;
  prioritizeDiversityBetweenRequests: boolean;
}

export interface ContentRecommendationResponse {
  recommendations?: ContentResult[] | null;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export type ContentRelevanceSorting = ContentSorting;

export interface ContentResult {
  contentId?: string | null;
  displayName?: string | null;

  /** @format int32 */
  rank: number;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  categoryPaths?: CategoryPathResult[] | null;
  viewedByUser?: ViewedByUserInfo | null;
  custom?: Record<string, string | null>;
}

export interface ContentResultDetails {
  contentId?: string | null;
  displayName?: Multilingual | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  categoryPaths?: CategoryPathResultDetails[] | null;
  viewedByUser?: ViewedByUserInfo | null;

  /** @format date-time */
  createdUtc: string;

  /** @format date-time */
  lastViewedUtc?: string | null;

  /** @format int64 */
  viewedTotalNumberOfTimes: number;

  /** @format int32 */
  viewedByDifferentNumberOfUsers: number;
  disabled: boolean;
  deleted: boolean;
  custom?: Record<string, string | null>;
}

export interface ContentSearchRequest {
  term?: string | null;
  facets?: ContentFacetQuery | null;
  settings?: ContentSearchSettings | null;
  sorting?: ContentSortBySpecification | null;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface ContentSearchResponse {
  results?: ContentResult[] | null;
  facets?: ContentFacetResult | null;
  recommendations?: ContentResult[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type ContentSearchSettings = SearchSettings & {
  selectedContentProperties?: SelectedContentPropertiesSettings | null;
  recommendations?: RecommendationSettings | null;
};

export interface ContentSortBySpecification {
  value?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export interface ContentSorting {
  $type: string;
  order: "Ascending" | "Descending";
  thenBy?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export interface ContentUpdate {
  content?: Content | null;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface ContentView {
  user?: User | null;
  content?: Content | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface ContentsViewedAfterViewingContentRequest {
  contentId?: string | null;
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface ContentsViewedAfterViewingMultipleContentsRequest {
  contentIds?: string[] | null;
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface ContentsViewedAfterViewingMultipleProductsRequest {
  productAndVariantIds?: ProductAndVariantId[] | null;
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface ContentsViewedAfterViewingProductRequest {
  productAndVariantId?: ProductAndVariantId | null;
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface Currency {
  value: string;
}

export interface CustomProductRecommendationRequest {
  recommendationType?: string | null;
  parameters?: Record<string, string | null>;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type DataDoubleSelector = ValueSelector & { key?: string | null };

export interface DataFilter {
  $type: string;
  key?: string | null;
  filterOutIfKeyIsNotFound: boolean;
  mustMatchAllConditions: boolean;
  conditions?: ValueConditionCollection | null;
  language?: Language | null;
  currency?: Currency | null;
  typeName?: string | null;
  negated: boolean;
  custom?: Record<string, string | null>;
}

export interface DataIndexConfiguration {
  keys?: Record<string, FieldIndexConfiguration>;
  unspecified?: FieldIndexConfiguration | null;
}

export interface DataRangesFacetResult {
  key?: string | null;
  dataSelectionStrategy?:
    | "Product"
    | "Variant"
    | "VariantWithFallbackToProduct"
    | "ProductWithFallbackToVariant"
    | null;

  /** @format int32 */
  rangeSize: number;
  selected?: DoubleRange[] | null;
  available?: DoubleRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DataValue {
  type:
    | "String"
    | "Double"
    | "Boolean"
    | "Multilingual"
    | "Money"
    | "MultiCurrency"
    | "StringList"
    | "DoubleList"
    | "BooleanList"
    | "MultilingualCollection";
  value: any;
}

export interface DecimalNullableChainableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;

  /** @format double */
  upperBoundExclusive?: number | null;
}

export interface DecimalNullableChainableRangeAvailableFacetValue {
  value?: DecimalNullableChainableRange | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DecimalNullableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;

  /** @format double */
  upperBoundInclusive?: number | null;
}

export interface DecimalRange {
  /** @format double */
  lowerBoundInclusive: number;

  /** @format double */
  upperBoundInclusive: number;
}

export interface DecimalRangeAvailableFacetValue {
  value?: DecimalRange | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DeleteSearchIndexRequest {
  id?: string | null;
  deletedBy?: string | null;
  custom?: Record<string, string | null>;
}

export type DistinctCondition = ValueCondition & { numberOfOccurrencesAllowedWithTheSameValue: number };

export interface DoubleAvailableFacetValue {
  /** @format double */
  value: number;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleContentDataRangeFacetResult {
  $type: string;
  key?: string | null;
  selected?: DoubleNullableRange | null;
  available?: DoubleRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleContentDataValueFacet {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableContentDataRangeFacet {
  $type: string;
  selected?: DoubleNullableRange | null;
  key?: string | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableProductDataRangeFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  selected?: DoubleNullableRange | null;
  key?: string | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;

  /** @format double */
  upperBoundInclusive?: number | null;
}

export interface DoubleProductDataRangeFacetResult {
  $type: string;
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  selected?: DoubleNullableRange | null;
  available?: DoubleRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleRange {
  /** @format double */
  lowerBoundInclusive: number;

  /** @format double */
  upperBoundInclusive: number;
}

export interface DoubleRangeAvailableFacetValue {
  value?: DoubleRange | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export type EqualsCondition = ValueCondition & { value?: DataValue | null };

export interface ExpectedSearchTermResult {
  /** @format int32 */
  estimatedHits: number;
  type: "Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory";
}

export interface Facet {
  $type: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface FacetResult {
  $type: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface FieldIndexConfiguration {
  included: boolean;

  /** @format int32 */
  weight: number;
  predictionSourceType: "Disabled" | "IndividualWords" | "PartialWordSequences" | "CompleteWordSequence";
  parser?: ClearTextParser | HtmlParser | null;
}

export interface Filter {
  $type: string;
  typeName?: string | null;
  negated: boolean;
  custom?: Record<string, string | null>;
}

export interface FilterCollection {
  items?:
    | (
        | AndFilter
        | BrandAssortmentFilter
        | BrandDataFilter
        | BrandIdFilter
        | CartDataFilter
        | ContentCategoryAssortmentFilter
        | ContentCategoryDataFilter
        | ContentCategoryIdFilter
        | ContentDataFilter
        | ContentIdFilter
        | OrFilter
        | ProductAssortmentFilter
        | ProductCategoryAssortmentFilter
        | ProductCategoryDataFilter
        | ProductCategoryIdFilter
        | ProductDataFilter
        | ProductDisplayNameFilter
        | ProductHasVariantsFilter
        | ProductIdFilter
        | ProductListPriceFilter
        | ProductRecentlyPurchasedByUserFilter
        | ProductRecentlyViewedByUserFilter
        | ProductSalesPriceFilter
        | VariantAssortmentFilter
        | VariantDataFilter
        | VariantIdFilter
        | VariantListPriceFilter
        | VariantSalesPriceFilter
        | VariantSpecificationFilter
      )[]
    | null;
}

export type FixedDoubleValueSelector = ValueSelector & { value: number };

export type GreaterThanCondition = ValueCondition & { value: number };

export type HtmlParser = Parser;

export interface IndexConfiguration {
  language?: LanguageIndexConfiguration | null;
  product?: ProductIndexConfiguration | null;
  content?: ContentIndexConfiguration | null;
}

export interface Int32AvailableFacetValue {
  /** @format int32 */
  value: number;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface Int32ContentDataValueFacet {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface Int32ContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface Int32NullableRange {
  /** @format int32 */
  lowerBoundInclusive?: number | null;

  /** @format int32 */
  upperBoundInclusive?: number | null;
}

export interface Int32ProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface Int32ProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface KeyMultiplier {
  key?: string | null;

  /** @format double */
  multiplier: number;
}

export interface Language {
  value: string;
}

export interface LanguageIndexConfiguration {
  languages?: LanguageIndexConfigurationEntry[] | null;
}

export interface LanguageIndexConfigurationEntry {
  language?: Language | null;
  included: boolean;
  isO639_1?: string | null;
}

export type LessThanCondition = ValueCondition & { value: number };

export interface LineItem {
  product: Product;
  variant?: ProductVariant | null;
  custom?: Record<string, string>;

  /** @format float */
  quantity: number;

  /** @format double */
  lineTotal: number;
}

export interface Money {
  /** @format double */
  amount: number;
  currency: Currency;
}

export interface MultiCurrency {
  values: Money[];
}

export interface Multilingual {
  values: Value[];
}

export type OrFilter = Filter & {
  filters?:
    | (
        | AndFilter
        | BrandAssortmentFilter
        | BrandDataFilter
        | BrandIdFilter
        | CartDataFilter
        | ContentCategoryAssortmentFilter
        | ContentCategoryDataFilter
        | ContentCategoryIdFilter
        | ContentDataFilter
        | ContentIdFilter
        | OrFilter
        | ProductAssortmentFilter
        | ProductCategoryAssortmentFilter
        | ProductCategoryDataFilter
        | ProductCategoryIdFilter
        | ProductDataFilter
        | ProductDisplayNameFilter
        | ProductHasVariantsFilter
        | ProductIdFilter
        | ProductListPriceFilter
        | ProductRecentlyPurchasedByUserFilter
        | ProductRecentlyViewedByUserFilter
        | ProductSalesPriceFilter
        | VariantAssortmentFilter
        | VariantDataFilter
        | VariantIdFilter
        | VariantListPriceFilter
        | VariantSalesPriceFilter
        | VariantSpecificationFilter
      )[]
    | null;
};

export interface Order {
  user: User;
  subtotal: Money;
  lineItems: LineItem[];
  trackingNumber: string;
  cartName: string;
  channel?: string | null;
  subChannel?: string | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface Parser {
  $type: string;
}

export interface PersonalBrandRecommendationRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights?: BrandRecommendationWeights | null;
  settings?: BrandRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PersonalContentCategoryRecommendationRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights?: ContentCategoryRecommendationWeights | null;
  settings?: ContentCategoryRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PersonalContentRecommendationRequest {
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PersonalProductCategoryRecommendationRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights?: ProductCategoryRecommendationWeights | null;
  settings?: ProductCategoryRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PersonalProductRecommendationRequest {
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PopularBrandsRecommendationRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights?: BrandRecommendationWeights | null;
  settings?: BrandRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PopularContentCategoriesRecommendationRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights?: ContentCategoryRecommendationWeights | null;
  settings?: ContentCategoryRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PopularContentsRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  settings?: ContentRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PopularProductCategoriesRecommendationRequest {
  /** @format int32 */
  sinceMinutesAgo: number;
  weights?: ProductCategoryRecommendationWeights | null;
  settings?: ProductCategoryRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PopularProductsRequest {
  basedOn: "MostPurchased" | "MostViewed";

  /** @format int32 */
  sinceMinutesAgo: number;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PopularSearchTermsRecommendationRequest {
  term?: string | null;
  settings?: RecommendPopularSearchTermSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type PriceRangeFacet = Facet & {
  selected?: DecimalNullableRange | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type PriceRangeFacetResult = FacetResult & {
  selected?: DecimalNullableRange | null;
  available?: DecimalRangeAvailableFacetValue | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type PriceRangesFacet = Facet & {
  predefinedRanges?: DecimalNullableChainableRange[] | null;
  expandedRangeSize?: number | null;
  selected?: DecimalNullableChainableRange[] | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type PriceRangesFacetResult = FacetResult & {
  expandedRangeSize?: number | null;
  selected?: DecimalNullableChainableRange[] | null;
  available?: DecimalNullableChainableRangeAvailableFacetValue[] | null;
  priceSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export interface Product {
  id: string;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string>;
  listPrice?: MultiCurrency | null;
  salesPrice?: MultiCurrency | null;
  brand?: Brand | null;
}

export interface ProductAdministrativeAction {
  filters?: FilterCollection | null;
  language?: Language | null;
  productUpdateKind:
    | "None"
    | "DisableInRecommendations"
    | "Disable"
    | "EnableInRecommendations"
    | "Enable"
    | "PermanentlyDelete"
    | "Delete";
  variantUpdateKind:
    | "None"
    | "DisableInRecommendations"
    | "Disable"
    | "EnableInRecommendations"
    | "Enable"
    | "PermanentlyDelete"
    | "Delete";
  currency?: Currency | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface ProductAndVariantId {
  productId: string;
  variantId?: string | null;
}

export type ProductAssortmentFacet = AssortmentFacet & {
  assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductAssortmentFacetResult = AssortmentFacetResult & {
  assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductAssortmentFilter = Filter & { assortments?: number[] | null };

export type ProductAssortmentRelevanceModifier = RelevanceModifier & {
  assortments?: number[] | null;
  multiplyWeightBy: number;
};

export type ProductAttributeSorting = ProductSorting & {
  attribute: "Id" | "DisplayName" | "BrandId" | "BrandName" | "ListPrice" | "SalesPrice";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductCategory = Category;

export interface ProductCategoryAdministrativeAction {
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type ProductCategoryAssortmentFilter = Filter & { assortments?: number[] | null };

export type ProductCategoryDataFilter = DataFilter;

export type ProductCategoryIdFilter = CategoryIdFilter;

export type ProductCategoryIdRelevanceModifier = RelevanceModifier & {
  categoryId?: string | null;
  evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
  multiplyWeightBy: number;
  negated: boolean;
};

export interface ProductCategoryRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  prioritizeDiversityBetweenRequests: boolean;
  selectedProductCategoryProperties?: SelectedProductCategoryPropertiesSettings | null;
  custom?: Record<string, string | null>;
}

export interface ProductCategoryRecommendationResponse {
  recommendations?: ProductCategoryResult[] | null;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface ProductCategoryRecommendationWeights {
  /** @format double */
  categoryViews: number;

  /** @format double */
  productViews: number;

  /** @format double */
  productPurchases: number;
}

export type ProductCategoryResult = CategoryResult;

export interface ProductCategorySearchRequest {
  term?: string | null;
  settings?: ProductCategorySearchSettings | null;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface ProductCategorySearchResponse {
  results?: ProductCategoryResult[] | null;
  recommendations?: ProductCategoryResult[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type ProductCategorySearchSettings = SearchSettings & {
  numberOfRecommendations?: number | null;
  onlyIncludeRecommendationsForEmptyResults?: boolean | null;
};

export interface ProductCategoryUpdate {
  category?: ProductCategory | null;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface ProductCategoryView {
  user?: User | null;
  idPath?: string[] | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export type ProductDataBooleanValueFacet = BooleanProductDataValueFacet;

export type ProductDataBooleanValueFacetResult = BooleanProductDataValueFacetResult;

export type ProductDataDoubleRangeFacet = DoubleNullableProductDataRangeFacet;

export type ProductDataDoubleRangeFacetResult = DoubleProductDataRangeFacetResult;

export type ProductDataDoubleValueFacet = DoubleProductDataValueFacet;

export type ProductDataDoubleValueFacetResult = DoubleProductDataValueFacetResult;

export type ProductDataFilter = DataFilter;

export type ProductDataIntegerValueFacet = Int32ProductDataValueFacet;

export type ProductDataIntegerValueFacetResult = Int32ProductDataValueFacetResult;

export type ProductDataRelevanceModifier = RelevanceModifier & {
  key?: string | null;
  considerAsMatchIfKeyIsNotFound: boolean;
  multiplyWeightBy: number;
  mustMatchAllConditions: boolean;
  conditions?:
    | (ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition)[]
    | null;
  multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
};

export type ProductDataSorting = ProductSorting & {
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductDataStringValueFacet = StringProductDataValueFacet;

export type ProductDataStringValueFacetResult = StringProductDataValueFacetResult;

export interface ProductDetailsCollectionResponse {
  products?: ProductResultDetails[] | null;

  /** @format int32 */
  totalNumberOfResults?: number | null;
  statistics?: Statistics | null;
}

export type ProductDisplayNameFilter = Filter & {
  language?: Language | null;
  conditions?: ValueConditionCollection | null;
  mustMatchAllConditions: boolean;
};

export interface ProductFacetQuery {
  items?:
    | (
        | ContentAssortmentFacet
        | ProductAssortmentFacet
        | BrandFacet
        | CategoryFacet
        | ContentDataDoubleRangeFacet
        | ContentDataStringValueFacet
        | ContentDataBooleanValueFacet
        | ContentDataDoubleValueFacet
        | ContentDataIntegerValueFacet
        | PriceRangeFacet
        | PriceRangesFacet
        | ProductDataDoubleRangeFacet
        | ProductDataStringValueFacet
        | ProductDataBooleanValueFacet
        | ProductDataDoubleValueFacet
        | ProductDataIntegerValueFacet
        | VariantSpecificationFacet
      )[]
    | null;
}

export interface ProductFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | DataRangesFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | RangesFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ProductHasVariantsFilter = Filter & { numberOfVariants?: Int32NullableRange | null };

export type ProductIdFilter = Filter & { productIds?: string[] | null };

export type ProductIdRelevanceModifier = RelevanceModifier & {
  productIds?: string[] | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export interface ProductIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  category?: CategoryIndexConfiguration | null;
  brand?: BrandIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
  variants?: VariantIndexConfiguration | null;
}

export type ProductListPriceFilter = Filter & { range?: DecimalNullableRange | null; currency?: Currency | null };

export type ProductListPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export interface ProductPerformanceRequest {
  /** @format int64 */
  fromUnixTimeSeconds: number;

  /** @format int64 */
  toUnixTimeSeconds: number;
  filters: FilterCollection;

  /** @format int32 */
  numberOfResults: number;

  /** @format int32 */
  skipNumberOfResults: number;
  byVariant: boolean;
  selectedProductProperties: SelectedProductPropertiesSettings;
  selectedVariantProperties: SelectedVariantPropertiesSettings;
  orderBy: "Created" | "Views" | "Sales" | "CartsOpened" | "RankByView" | "RankBySales";
  variantData: "FromVariant" | "FromProduct" | "FromProductDividedByVariants";
  classifications: StringStringKeyValuePair[];
  selectedBrandProperties: SelectedBrandPropertiesSettings;
  typeName: string;
  language: Language;
  currency: Currency;
  custom?: Record<string, string | null>;
}

export interface ProductPerformanceResponse {
  results?: ProductPerformanceResult[] | null;

  /** @format int32 */
  totalNumberOfResults: number;

  /** @format int32 */
  remainingNumberOfResults: number;
  statistics?: Statistics | null;
}

export interface ProductPerformanceResult {
  product?: ProductResult | null;
  classifications?: ClassificationMetrics[] | null;
}

export type ProductPopularitySorting = ProductSorting;

export interface ProductQuery {
  filters?: FilterCollection | null;

  /** @format int32 */
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;

  /** @format int32 */
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledProducts: boolean;
  includeDisabledVariants: boolean;
  excludeProductsWithNoVariants: boolean;
  custom?: Record<string, string | null>;
}

export type ProductRecentlyPurchasedByUserFilter = Filter & { sinceUtc: string };

export type ProductRecentlyPurchasedByUserRelevanceModifier = RelevanceModifier & {
  sinceUtc: string;
  ifPreviouslyPurchasedByUserMultiplyWeightBy: number;
  ifNotPreviouslyPurchasedByUserMultiplyWeightBy: number;
};

export type ProductRecentlyViewedByUserFilter = Filter & { sinceUtc: string };

export type ProductRecentlyViewedByUserRelevanceModifier = RelevanceModifier & {
  sinceUtc: string;
  ifPreviouslyViewedByUserMultiplyWeightBy: number;
  ifNotPreviouslyViewedByUserMultiplyWeightBy: number;
};

export interface ProductRecommendationRequest {
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface ProductRecommendationRequestCollection {
  requests?: ProductRecommendationRequest[] | null;
  requireDistinctProductsAcrossResults: boolean;
  custom?: Record<string, string | null>;
}

export interface ProductRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  recommendVariant: boolean;
  selectedProductProperties?: SelectedProductPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
  custom?: Record<string, string | null>;
  prioritizeDiversityBetweenRequests: boolean;
  allowProductsCurrentlyInCart?: boolean | null;
  selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
}

export interface ProductRecommendationResponse {
  recommendations?: ProductResult[] | null;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export type ProductRelevanceSorting = ProductSorting;

export interface ProductResult {
  productId?: string | null;
  displayName?: string | null;
  variant?: VariantResult | null;

  /** @format int32 */
  rank: number;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  categoryPaths?: CategoryPathResult[] | null;
  purchasedByUser?: PurchasedByUserInfo | null;
  viewedByUser?: ViewedByUserInfo | null;
  custom?: Record<string, string | null>;

  /** @format double */
  listPrice?: number | null;

  /** @format double */
  salesPrice?: number | null;
  brand?: BrandResult | null;
  allVariants?: VariantResult[] | null;
}

export interface ProductResultDetails {
  productId?: string | null;
  displayName?: Multilingual | null;
  variant?: VariantResult | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  categoryPaths?: CategoryPathResultDetails[] | null;
  purchasedByUser?: PurchasedByUserInfo | null;
  viewedByUser?: ViewedByUserInfo | null;
  custom?: Record<string, string | null>;
  allVariants?: VariantResultDetails[] | null;

  /** @format date-time */
  createdUtc: string;

  /** @format date-time */
  lastPurchasedUtc?: string | null;

  /** @format date-time */
  lastViewedUtc?: string | null;

  /** @format int64 */
  containedInTotalNumberOfOrders: number;

  /** @format int64 */
  viewedTotalNumberOfTimes: number;

  /** @format int32 */
  purchasedByDifferentNumberOfUsers: number;

  /** @format int32 */
  viewedByDifferentNumberOfUsers: number;
  disabled: boolean;
  deleted: boolean;
  listPrice?: MultiCurrency | null;
  salesPrice?: MultiCurrency | null;
  brand?: BrandResultDetails | null;
}

export type ProductSalesPriceFilter = Filter & { range?: DecimalNullableRange | null; currency?: Currency | null };

export type ProductSalesPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export interface ProductSearchRequest {
  term?: string | null;
  facets?: ProductFacetQuery | null;
  settings?: ProductSearchSettings | null;
  sorting?: ProductSortBySpecification | null;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface ProductSearchResponse {
  results?: ProductResult[] | null;
  facets?: ProductFacetResult | null;
  recommendations?: ProductResult[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type ProductSearchSettings = SearchSettings & {
  selectedProductProperties?: SelectedProductPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
  explodedVariants?: number | null;
  recommendations?: RecommendationSettings | null;
  selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
};

export interface ProductSortBySpecification {
  value?:
    | ProductAttributeSorting
    | ProductDataSorting
    | ProductPopularitySorting
    | ProductRelevanceSorting
    | ProductVariantAttributeSorting
    | ProductVariantSpecificationSorting
    | null;
}

export interface ProductSorting {
  $type: string;
  order: "Ascending" | "Descending";
  thenBy?:
    | ProductAttributeSorting
    | ProductDataSorting
    | ProductPopularitySorting
    | ProductRelevanceSorting
    | ProductVariantAttributeSorting
    | ProductVariantSpecificationSorting
    | null;
}

export interface ProductUpdate {
  product?: Product | null;
  variants?: ProductVariant[] | null;
  productUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  variantUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  replaceExistingVariants: boolean;
  brandUpdateKind?: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace" | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface ProductVariant {
  id: string;
  displayName?: Multilingual | null;
  assortments?: number[] | null;
  specification?: Record<string, string>;
  data?: Record<string, DataValue>;
  custom?: Record<string, string>;
  listPrice?: MultiCurrency | null;
  salesPrice?: MultiCurrency | null;
}

export type ProductVariantAttributeSorting = ProductSorting & {
  attribute: "Id" | "DisplayName" | "ListPrice" | "SalesPrice";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductVariantSpecificationSorting = ProductSorting & {
  key?: string | null;
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export interface ProductView {
  user: User;
  product: Product;
  variant?: ProductVariant | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface ProductsViewedAfterViewingContentRequest {
  contentId?: string | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface ProductsViewedAfterViewingProductRequest {
  productAndVariantId?: ProductAndVariantId | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PurchasedByUserInfo {
  /** @format date-time */
  mostRecentPurchasedUtc: string;

  /** @format int64 */
  totalNumberOfTimesPurchased: number;
}

export interface PurchasedWithCurrentCartRequest {
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PurchasedWithMultipleProductsRequest {
  productAndVariantIds?: ProductAndVariantId[] | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface PurchasedWithProductRequest {
  productAndVariantId?: ProductAndVariantId | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type RangesFacetResult = FacetResult & {
  rangeSize: number;
  selected?: DoubleRange[] | null;
  available?: DoubleRangeAvailableFacetValue[] | null;
};

export interface RankMetrics {
  overall?: ViewsAndSalesMetrics | null;
  withinCategories?: CategoryMetrics[] | null;
  withinBrand?: ViewsAndSalesMetrics | null;
}

export interface RecentlyViewedProductsRequest {
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface RecommendPopularSearchTermSettings {
  targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;

  /** @format int32 */
  numberOfRecommendations: number;
}

export interface RecommendationSettings {
  /** @format int32 */
  take?: number | null;

  /** @format int32 */
  onlyIncludeRecommendationsWhenLessResultsThan?: number | null;
}

export interface RelevanceModifier {
  $type: string;
  typeName?: string | null;
  filters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface RelevanceModifierCollection {
  items?:
    | (
        | BrandIdRelevanceModifier
        | ProductAssortmentRelevanceModifier
        | ProductCategoryIdRelevanceModifier
        | ProductDataRelevanceModifier
        | ProductIdRelevanceModifier
        | ProductListPriceRelevanceModifier
        | ProductRecentlyPurchasedByUserRelevanceModifier
        | ProductRecentlyViewedByUserRelevanceModifier
        | ProductSalesPriceRelevanceModifier
        | UserFavoriteProductRelevanceModifier
        | VariantAssortmentRelevanceModifier
        | VariantDataRelevanceModifier
        | VariantListPriceRelevanceModifier
        | VariantSalesPriceRelevanceModifier
        | VariantSpecificationsInCommonRelevanceModifier
        | VariantSpecificationValueRelevanceModifier
      )[]
    | null;
}

export interface SalesByCurrency {
  currency?: Currency | null;

  /** @format int32 */
  orders: number;

  /** @format double */
  averageSubtotal: number;
}

export interface SalesMetrics {
  /** @format int32 */
  orders: number;

  /** @format double */
  averageNoOfLineItems: number;
  currencies?: SalesByCurrency[] | null;
  withKnownCartOpener?: SalesWithKnownCartOpenerMetrics | null;
}

export interface SalesWithKnownCartOpenerMetrics {
  /** @format int32 */
  orders: number;

  /** @format int32 */
  opened: number;

  /** @format double */
  openedPercent: number;
}

export interface SaveSearchIndexRequest {
  index?: SearchIndex | null;
  modifiedBy?: string | null;
  custom?: Record<string, string | null>;
}

export interface SearchIndex {
  id?: string | null;
  description?: string | null;
  enabled: boolean;
  isDefault: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;
  custom?: Record<string, string | null>;
  configuration?: IndexConfiguration | null;
}

export interface SearchIndexCollectionResponse {
  indexes?: SearchIndex[] | null;
  statistics?: Statistics | null;
}

export interface SearchIndexRequest {
  id?: string | null;
  custom?: Record<string, string | null>;
}

export interface SearchIndexResponse {
  index?: SearchIndex | null;
  statistics?: Statistics | null;
}

export interface SearchIndexSelector {
  id?: string | null;
}

export interface SearchIndexesRequest {
  custom?: Record<string, string | null>;
}

export interface SearchRequest {
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface SearchRequestCollection {
  requests?: SearchRequest[] | null;
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface SearchResponse {
  statistics?: Statistics | null;
}

export interface SearchResponseCollection {
  responses?: SearchResponse[] | null;
  statistics?: Statistics | null;
}

export interface SearchSettings {
  $type: string;
}

export interface SearchTerm {
  language?: Language | null;
  user?: User | null;
  term?: string | null;
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface SearchTermBasedProductRecommendationRequest {
  term?: string | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface SearchTermPredictionRequest {
  term?: string | null;

  /** @format int32 */
  take: number;
  settings?: SearchTermPredictionSettings | null;
  language?: Language | null;
  currency?: Currency | null;
  user?: User | null;
  displayedAtLocation?: string | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  indexSelector?: SearchIndexSelector | null;
  postFilters?: FilterCollection | null;
  custom?: Record<string, string | null>;
}

export interface SearchTermPredictionResponse {
  predictions?: SearchTermPredictionResult[] | null;
  statistics?: Statistics | null;
}

export interface SearchTermPredictionResult {
  term?: string | null;

  /** @format int32 */
  rank: number;
  expectedResultTypes?: ExpectedSearchTermResult[] | null;
  type: "Match" | "WordContinuation" | "Word" | "WordSequence";
  correctedWordsMask?: boolean[] | null;
}

export type SearchTermPredictionSettings = SearchSettings & {
  targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;
};

export interface SearchTermRecommendationResponse {
  recommendations?: SearchTermResult[] | null;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface SearchTermResult {
  term?: string | null;

  /** @format int32 */
  rank: number;
  expectedResultTypes?: ExpectedSearchTermResult[] | null;
}

export interface SelectedBrandPropertiesSettings {
  displayName: boolean;
  assortments: boolean;
  viewedByUserInfo: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
}

export interface SelectedContentCategoryPropertiesSettings {
  displayName: boolean;
  paths: boolean;
  assortments: boolean;
  viewedByUserInfo: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
}

export interface SelectedContentPropertiesSettings {
  displayName: boolean;
  categoryPaths: boolean;
  assortments: boolean;
  allData: boolean;
  viewedByUserInfo: boolean;
  dataKeys?: string[] | null;
}

export interface SelectedProductCategoryPropertiesSettings {
  displayName: boolean;
  paths: boolean;
  assortments: boolean;
  viewedByUserInfo: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
}

export interface SelectedProductPropertiesSettings {
  displayName: boolean;
  categoryPaths: boolean;
  assortments: boolean;
  pricing: boolean;
  allData: boolean;
  viewedByUserInfo: boolean;
  purchasedByUserInfo: boolean;
  brand: boolean;
  allVariants: boolean;
  dataKeys?: string[] | null;
}

export interface SelectedVariantPropertiesSettings {
  displayName: boolean;
  pricing: boolean;
  allSpecifications: boolean;
  assortments: boolean;
  allData: boolean;
  dataKeys?: string[] | null;
  specificationKeys?: string[] | null;
}

export interface SignificantDataValue {
  key?: string | null;
  comparer: "Equals" | "NumericPercentDifference" | "StringSimilarity" | "KeyExists";

  /** @format double */
  significance: number;
  transformer?: TrimStringTransformer | null;
}

export interface SimilarProductsEvaluationSettings {
  /** @format double */
  significanceOfSimilaritiesInDisplayName: number;
  productDisplayNameTransformer?: TrimStringTransformer | null;

  /** @format double */
  significanceOfSimilarListPrice: number;

  /** @format double */
  significanceOfCommonImmediateParentCategories: number;

  /** @format double */
  significanceOfCommonParentsParentCategories: number;

  /** @format double */
  significanceOfCommonAncestorCategories: number;

  /** @format double */
  significanceOfCommonProductDataKeys: number;

  /** @format double */
  significanceOfIdenticalProductDataValues: number;
  significantProductDataFields?: SignificantDataValue[] | null;

  /** @format double */
  significanceOfSimilarSalesPrice: number;
}

export interface SimilarProductsRequest {
  existingProductId?: ProductAndVariantId | null;
  productData?: Product | null;
  considerAlreadyKnownInformationAboutProduct: boolean;
  evaluationSettings?: SimilarProductsEvaluationSettings | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface SortProductsRequest {
  productIds?: string[] | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface SortVariantsRequest {
  productId?: string | null;
  settings?: ProductRecommendationRequestSettings | null;
  language?: Language | null;
  user?: User | null;
  relevanceModifiers?: RelevanceModifierCollection | null;
  filters?: FilterCollection | null;
  displayedAtLocationType?: string | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface SpecificationsIndexConfiguration {
  keys?: Record<string, FieldIndexConfiguration>;
  unspecified?: FieldIndexConfiguration | null;
}

export interface Statistics {
  /** @format double */
  serverTimeInMs: number;
}

export interface StringAvailableFacetValue {
  value?: string | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface StringBrandNameAndIdResultValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: BrandNameAndIdResultAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringCategoryNameAndIdResultValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: CategoryNameAndIdResultAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringContentDataValueFacet {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringProductDataValueFacetResult {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringStringKeyValuePair {
  key: string;
  value: string;
}

export interface StringValueFacet {
  $type: string;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface StringValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface TrackBrandAdministrativeActionRequest {
  administrativeAction?: BrandAdministrativeAction | null;
  custom?: Record<string, string | null>;
}

export interface TrackBrandUpdateRequest {
  brandUpdate?: BrandUpdate | null;
  custom?: Record<string, string | null>;
}

export interface TrackBrandViewRequest {
  brandView?: BrandView | null;
  custom?: Record<string, string | null>;
}

export interface TrackCartRequest {
  cart?: Cart | null;
  custom?: Record<string, string | null>;
}

export interface TrackContentAdministrativeActionRequest {
  administrativeAction?: ContentAdministrativeAction | null;
  custom?: Record<string, string | null>;
}

export interface TrackContentCategoryAdministrativeActionRequest {
  administrativeAction?: ContentCategoryAdministrativeAction | null;
  custom?: Record<string, string | null>;
}

export interface TrackContentCategoryUpdateRequest {
  contentCategoryUpdate?: ContentCategoryUpdate | null;
  custom?: Record<string, string | null>;
}

export interface TrackContentUpdateRequest {
  contentUpdate?: ContentUpdate | null;
  custom?: Record<string, string | null>;
}

export interface TrackContentViewRequest {
  contentView?: ContentView | null;
  custom?: Record<string, string | null>;
}

export interface TrackOrderRequest {
  order: Order;
  custom?: Record<string, string | null>;
}

export interface TrackProductAdministrativeActionRequest {
  administrativeAction?: ProductAdministrativeAction | null;
  custom?: Record<string, string | null>;
}

export interface TrackProductCategoryAdministrativeActionRequest {
  administrativeAction?: ProductCategoryAdministrativeAction | null;
  custom?: Record<string, string | null>;
}

export interface TrackProductCategoryUpdateRequest {
  productCategoryUpdate?: ProductCategoryUpdate | null;
  custom?: Record<string, string | null>;
}

export interface TrackProductCategoryViewRequest {
  productCategoryView?: ProductCategoryView | null;
  custom?: Record<string, string | null>;
}

export interface TrackProductUpdateRequest {
  productUpdate?: ProductUpdate | null;
  custom?: Record<string, string | null>;
}

export interface TrackProductViewRequest {
  productView: ProductView;
  custom?: Record<string, string | null>;
}

export interface TrackSearchTermRequest {
  searchTerm?: SearchTerm | null;
  custom?: Record<string, string | null>;
}

export interface TrackUserUpdateRequest {
  userUpdate?: UserUpdate | null;
  custom?: Record<string, string | null>;
}

export interface Trackable {
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface TrimStringTransformer {
  valuesToTrim?: string[] | null;
}

export class User {
  authenticatedId?: string | null;
  temporaryId?: string | null;
  email?: string | null;
  classifications?: Record<string, string>;
  identifiers?: Record<string, string>;
  data?: Record<string, DataValue>;

  static Anonymous(): User {
    return {};
  }

  static ByAuthenticatedId(authenticatedId: string, temporaryId?: string): User {
    return { authenticatedId, temporaryId };
  }

  static ByTemporaryId(temporaryId: string): User {
    return { temporaryId };
  }

  static ByIdentifier(key: string, value: string): User {
    return { identifiers: { [key]: value } };
  }

  static ByIdentifiers(identifiers: Record<string, string>): User {
    return { identifiers };
  }

  static ByEmail(email: string): User {
    return { email };
  }
}

export interface UserDetailsCollectionResponse {
  results?: UserResultDetails[][] | null;
  statistics?: Statistics | null;
}

export type UserFavoriteProductRelevanceModifier = RelevanceModifier & {
  sinceMinutesAgo: number;
  numberOfPurchasesWeight: number;
  mostRecentPurchaseWeight: number;
  ifNotPurchasedBaseWeight: number;
};

export interface UserQuery {
  criteria?: UserQueryCriteria[] | null;
  language?: Language | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface UserQueryCriteria {
  authenticatedId?: string | null;
  temporaryId?: string | null;
  email?: string | null;
  language?: Language | null;
  currency?: Currency | null;
  identifiers?: Record<string, string | null>;
}

export interface UserResultDetails {
  authenticatedId?: string | null;
  temporaryId?: string | null;
  email?: string | null;
  classifications?: Record<string, string | null>;

  /** @format date-time */
  lastCartUpdateUtc?: string | null;

  /** @format date-time */
  lastActivityUtc: string;

  /** @format date-time */
  lastOrderUtc?: string | null;
  carts?: Record<string, CartDetails>;
  lastActiveCartName?: string | null;

  /** @format int32 */
  totalNumberOfOrders: number;
  identifiers?: Record<string, string | null>;

  /** @format int32 */
  key: number;
  data?: Record<string, DataValue>;
  temporaryIds?: string[] | null;
}

export interface UserUpdate {
  user?: User | null;
  kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  typeName?: string | null;
  custom?: Record<string, string | null>;
}

export interface Value {
  language: Language;
  text: string;
}

export interface ValueCondition {
  $type: string;
  typeName?: string | null;
  negated: boolean;
}

export interface ValueConditionCollection {
  items?: (ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition)[] | null;
}

export interface ValueSelector {
  $type: string;
}

export type VariantAssortmentFilter = Filter & { assortments?: number[] | null };

export type VariantAssortmentRelevanceModifier = RelevanceModifier & {
  assortments?: number[] | null;
  multiplyWeightBy: number;
};

export type VariantDataFilter = DataFilter;

export type VariantDataRelevanceModifier = RelevanceModifier & {
  key?: string | null;
  considerAsMatchIfKeyIsNotFound: boolean;
  multiplyWeightBy: number;
  mustMatchAllConditions: boolean;
  conditions?:
    | (ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition)[]
    | null;
  multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
};

export type VariantIdFilter = Filter & { variantIds?: string[] | null };

export interface VariantIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  specifications?: SpecificationsIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export type VariantListPriceFilter = Filter & { range?: DecimalNullableRange | null; currency?: Currency | null };

export type VariantListPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export interface VariantResult {
  variantId?: string | null;
  displayName?: string | null;
  specification?: Record<string, string | null>;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;

  /** @format int32 */
  rank: number;
  custom?: Record<string, string | null>;

  /** @format double */
  listPrice?: number | null;

  /** @format double */
  salesPrice?: number | null;
}

export interface VariantResultDetails {
  variantId?: string | null;
  displayName?: Multilingual | null;
  specification?: Record<string, string | null>;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
  listPrice?: MultiCurrency | null;
  salesPrice?: MultiCurrency | null;
  disabled: boolean;
}

export type VariantSalesPriceFilter = Filter & { range?: DecimalNullableRange | null; currency?: Currency | null };

export type VariantSalesPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export type VariantSpecificationFacet = StringValueFacet & { key?: string | null };

export type VariantSpecificationFacetResult = StringValueFacetResult & { key?: string | null };

export type VariantSpecificationFilter = Filter & {
  key?: string | null;
  filterOutIfKeyIsNotFound: boolean;
  equalTo?: string | null;
};

export type VariantSpecificationValueRelevanceModifier = RelevanceModifier & {
  key?: string | null;
  value?: string | null;
  ifIdenticalMultiplyWeightBy: number;
  ifNotIdenticalMultiplyWeightBy: number;
  ifSpecificationKeyNotFoundApplyNotEqualMultiplier: boolean;
};

export type VariantSpecificationsInCommonRelevanceModifier = RelevanceModifier & {
  specificationKeysAndMultipliers?: KeyMultiplier[] | null;
};

export interface ViewedByUserInfo {
  /** @format date-time */
  mostRecentlyViewedUtc: string;

  /** @format int32 */
  totalNumberOfTimesViewed: number;
}

export interface ViewsAndSalesMetrics {
  /** @format double */
  byViews: number;

  /** @format double */
  bySales: number;
}

export interface ViewsMetrics {
  /** @format int32 */
  total: number;
}
