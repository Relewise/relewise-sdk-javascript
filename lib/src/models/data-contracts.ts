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

export type AbandonedCartTriggerConfiguration = AbandonedCartTriggerResultTriggerConfiguration & {
  cartName?: string | null;
};

export interface AbandonedCartTriggerResultTriggerConfiguration {
  $type: string;
  custom?: Record<string, string | null>;

  /** @format uuid */
  id: string;
  name?: string | null;
  description?: string | null;
  group?: string | null;
  enabled: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;

  /** @format int32 */
  withinTimeSpanMinutes: number;
  settings?: Record<string, string | null>;
  userConditions?: UserConditionCollection | null;
}

export interface AnalyzerRequest {
  $type: string;
  language?: Language | null;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type AndCondition = UserCondition & { conditions?: UserConditionCollection | null };

export type AndFilter = Filter & {
  filters: (
    | AndFilter
    | BrandAssortmentFilter
    | BrandDataFilter
    | BrandIdFilter
    | CartDataFilter
    | ContentCategoryAssortmentFilter
    | ContentCategoryDataFilter
    | ContentCategoryHasAncestorFilter
    | ContentCategoryHasChildFilter
    | ContentCategoryHasParentFilter
    | ContentCategoryIdFilter
    | ContentCategoryLevelFilter
    | ContentDataFilter
    | ContentIdFilter
    | OrFilter
    | ProductAndVariantIdFilter
    | ProductAssortmentFilter
    | ProductCategoryAssortmentFilter
    | ProductCategoryDataFilter
    | ProductCategoryHasAncestorFilter
    | ProductCategoryHasChildFilter
    | ProductCategoryHasParentFilter
    | ProductCategoryIdFilter
    | ProductCategoryLevelFilter
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
  )[];
};

export interface ApplicableIndexes {
  indexes?: string[] | null;
}

export interface ApplicableLanguages {
  languages?: Language[] | null;
}

export interface AssortmentFacet {
  $type: string;
  assortmentFilterType: "Or";
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface AssortmentFacetResult {
  $type: string;
  assortmentFilterType: "Or";
  selected?: number[] | null;
  available?: Int32AvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export type BatchedTrackingRequest = TrackingRequest & {
  items?:
    | (
        | BrandAdministrativeAction
        | BrandUpdate
        | BrandView
        | Cart
        | ContentAdministrativeAction
        | ContentCategoryAdministrativeAction
        | ContentCategoryUpdate
        | ContentCategoryView
        | ContentUpdate
        | ContentView
        | Order
        | ProductAdministrativeAction
        | ProductCategoryAdministrativeAction
        | ProductCategoryUpdate
        | ProductCategoryView
        | ProductUpdate
        | ProductView
        | SearchTerm
        | UserUpdate
      )[]
    | null;
};

export interface BooleanAvailableFacetValue {
  value: boolean;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface BooleanContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: boolean[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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

export type BoostAndBuryRule = MerchandisingRule & {
  multiplierSelector?: DataDoubleSelector | FixedDoubleValueSelector | null;
};

export interface Brand {
  id: string;
  displayName?: string | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
}

export type BrandAdministrativeAction = Trackable & {
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
};

export type BrandAssortmentFilter = Filter & { assortments: number[] };

export type BrandDataFilter = DataFilter;

export type BrandDetailsCollectionResponse = TimedResponse & {
  brands?: BrandResultDetails[] | null;
  totalNumberOfResults?: number | null;
};

export type BrandFacet = StringValueFacet;

export type BrandFacetResult = StringBrandNameAndIdResultValueFacetResult;

export type BrandIdFilter = Filter & { brandIds: string[] };

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

export type BrandQuery = LicensedRequest & {
  filters?: FilterCollection | null;
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledBrands: boolean;
};

export interface BrandRecommendationRequest {
  $type: string;
  settings: BrandRecommendationRequestSettings;
  language?: Language | null;
  user: User;
  relevanceModifiers: RelevanceModifierCollection;
  filters: FilterCollection;
  displayedAtLocationType: string;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface BrandRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  prioritizeDiversityBetweenRequests: boolean;
  selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
  custom?: Record<string, string>;
}

export type BrandRecommendationResponse = RecommendationResponse & { recommendations?: BrandResult[] | null };

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

export type BrandUpdate = Trackable & {
  brand?: Brand | null;
  kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export type BrandView = Trackable & { user?: User | null; brand: Brand };

export type Cart = Trackable & {
  user?: User | null;
  name?: string | null;
  subtotal?: Money | null;
  lineItems?: LineItem[] | null;
  data?: Record<string, DataValue>;
};

export type CartDataFilter = Filter & {
  key: string;
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

export interface Category {
  $type: string;
  id?: string | null;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string | null>;
}

export interface CategoryAdministrativeAction {
  $type: string;
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "Disable" | "Enable" | "Delete";
  currency?: Currency | null;
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
  negated: boolean;
  custom?: Record<string, string>;
}

export interface CategoryIndexConfiguration {
  unspecified?: CategoryIndexConfigurationEntry | null;
}

export interface CategoryIndexConfigurationEntry {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
}

export interface CategoryLevelFilter {
  $type: string;
  levels?: number[] | null;
  negated: boolean;
  custom?: Record<string, string>;
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

export interface CategoryUpdate {
  $type: string;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  custom?: Record<string, string | null>;
}

export type ClearTextParser = Parser;

export interface ConditionConfiguration {
  user?: UserConditionConfiguration | null;
  input?: InputConditionConfiguration | null;
  target?: TargetConditionConfiguration | null;
  context?: ContextConditionConfiguration | null;
}

export type ContainsCondition = ValueCondition & {
  value?: DataValue | null;
  valueCollectionEvaluationMode: "All" | "Any";
};

export interface Content {
  id: string;
  displayName?: Multilingual | null;
  categoryPaths?: CategoryPath[] | null;
  assortments?: number[] | null;
  data?: Record<string, DataValue>;
  custom?: Record<string, string>;
}

export type ContentAdministrativeAction = Trackable & {
  filters?: FilterCollection | null;
  language?: Language | null;
  kind: "DisableInRecommendations" | "Disable" | "EnableInRecommendations" | "Enable" | "PermanentlyDelete" | "Delete";
  currency?: Currency | null;
};

export type ContentAssortmentFacet = AssortmentFacet;

export type ContentAssortmentFacetResult = AssortmentFacetResult;

export type ContentAttributeSorting = ContentSorting & {
  attribute: "Id" | "DisplayName";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ContentCategory = Category;

export type ContentCategoryAdministrativeAction = CategoryAdministrativeAction;

export type ContentCategoryAssortmentFilter = Filter & { assortments: number[] };

export type ContentCategoryDataFilter = DataFilter;

export type ContentCategoryDetailsCollectionResponse = TimedResponse & {
  categories?: ContentCategoryResultDetails[] | null;
  totalNumberOfResults?: number | null;
};

export type ContentCategoryHasAncestorFilter = HasAncestorCategoryFilter;

export type ContentCategoryHasChildFilter = HasChildCategoryFilter;

export type ContentCategoryHasParentFilter = HasParentCategoryFilter;

export type ContentCategoryIdFilter = CategoryIdFilter;

export interface ContentCategoryIdFilterCategoryQuery {
  $type: string;
  filters?: FilterCollection | null;

  /** @format int32 */
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;

  /** @format int32 */
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledCategories: boolean;

  /** @format int32 */
  includeChildCategoriesToDepth: number;

  /** @format int32 */
  includeParentCategoriesToDepth: number;
  custom?: Record<string, string | null>;
}

export type ContentCategoryInterestTriggerConfiguration = ContentCategoryInterestTriggerResultTriggerConfiguration & {
  categoryViews?: Int32NullableRange | null;
  contentViews?: Int32NullableRange | null;
  filters?: FilterCollection | null;
};

export interface ContentCategoryInterestTriggerResultTriggerConfiguration {
  $type: string;
  custom?: Record<string, string | null>;

  /** @format uuid */
  id: string;
  name?: string | null;
  description?: string | null;
  group?: string | null;
  enabled: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;

  /** @format int32 */
  withinTimeSpanMinutes: number;
  settings?: Record<string, string | null>;
  userConditions?: UserConditionCollection | null;
}

export type ContentCategoryLevelFilter = CategoryLevelFilter;

export type ContentCategoryQuery = ContentCategoryIdFilterCategoryQuery;

export interface ContentCategoryRecommendationRequest {
  $type: string;
  settings?: ContentCategoryRecommendationRequestSettings | null;
  language?: Language | null;
  user: User;
  relevanceModifiers: RelevanceModifierCollection;
  filters: FilterCollection;
  displayedAtLocationType: string;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type ContentCategoryRecommendationRequestCollection = LicensedRequest & {
  requests?: (PersonalContentCategoryRecommendationRequest | PopularContentCategoriesRecommendationRequest)[] | null;
  requireDistinctContentAcrossResults: boolean;
};

export interface ContentCategoryRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  prioritizeDiversityBetweenRequests: boolean;
  selectedContentCategoryProperties?: SelectedContentCategoryPropertiesSettings | null;
  custom?: Record<string, string | null>;
}

export type ContentCategoryRecommendationResponse = RecommendationResponse & {
  recommendations?: ContentCategoryResult[] | null;
};

export type ContentCategoryRecommendationResponseCollection = TimedResponse & {
  responses?: ContentCategoryRecommendationResponse[] | null;
};

export interface ContentCategoryRecommendationWeights {
  /** @format double */
  categoryViews: number;

  /** @format double */
  contentViews: number;
}

export type ContentCategoryResult = CategoryResult;

export type ContentCategoryResultDetails = ContentCategoryResultDetailsCategoryResultDetails;

export interface ContentCategoryResultDetailsCategoryResultDetails {
  $type: string;
  categoryId?: string | null;
  displayName?: Multilingual | null;
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
  childCategories?: ContentCategoryResultDetails[] | null;
  parentCategories?: ContentCategoryResultDetails[] | null;
}

export type ContentCategorySearchRequest = PaginatedSearchRequest & {
  term: string;
  settings?: ContentCategorySearchSettings | null;
};

export type ContentCategorySearchResponse = PaginatedSearchResponse;

export type ContentCategorySearchSettings = SearchSettings & {
  numberOfRecommendations?: number | null;
  onlyIncludeRecommendationsForEmptyResults?: boolean | null;
};

export type ContentCategoryUpdate = CategoryUpdate & { category?: ContentCategory | null };

export type ContentCategoryView = Trackable & { user?: User | null; idPath: string[] };

export type ContentDataBooleanValueFacet = BooleanContentDataValueFacet;

export type ContentDataBooleanValueFacetResult = BooleanContentDataValueFacetResult;

export type ContentDataDoubleRangeFacet = DoubleNullableContentDataRangeFacet;

export type ContentDataDoubleRangeFacetResult = DoubleNullableContentDataRangeFacetResult;

export type ContentDataDoubleRangesFacet = DoubleNullableContentDataRangesFacet;

export type ContentDataDoubleRangesFacetResult = DoubleNullableContentDataRangesFacetResult;

export type ContentDataDoubleValueFacet = DoubleContentDataValueFacet;

export type ContentDataDoubleValueFacetResult = DoubleContentDataValueFacetResult;

export type ContentDataFilter = DataFilter;

export type ContentDataIntegerValueFacet = Int32ContentDataValueFacet;

export type ContentDataIntegerValueFacetResult = Int32ContentDataValueFacetResult;

export type ContentDataSorting = ContentSorting & { key?: string | null; mode: "Auto" | "Alphabetical" | "Numerical" };

export type ContentDataStringValueFacet = StringContentDataValueFacet;

export type ContentDataStringValueFacetResult = StringContentDataValueFacetResult;

export type ContentDetailsCollectionResponse = TimedResponse & {
  contents?: ContentResultDetails[] | null;
  totalNumberOfResults?: number | null;
};

export interface ContentFacetQuery {
  items: (
    | ContentAssortmentFacet
    | ProductAssortmentFacet
    | BrandFacet
    | CategoryFacet
    | ContentDataDoubleRangeFacet
    | ContentDataDoubleRangesFacet
    | ContentDataStringValueFacet
    | ContentDataBooleanValueFacet
    | ContentDataDoubleValueFacet
    | ContentDataIntegerValueFacet
    | PriceRangeFacet
    | PriceRangesFacet
    | ProductDataDoubleRangeFacet
    | ProductDataDoubleRangesFacet
    | ProductDataStringValueFacet
    | ProductDataBooleanValueFacet
    | ProductDataDoubleValueFacet
    | ProductDataIntegerValueFacet
    | VariantSpecificationFacet
  )[];
}

export interface ContentFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataDoubleRangesFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataDoubleRangesFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ContentIdFilter = Filter & { contentIds: string[] };

export interface ContentIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  category?: CategoryIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export type ContentPopularitySorting = ContentSorting;

export type ContentQuery = LicensedRequest & {
  filters?: FilterCollection | null;
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledContents: boolean;
};

export interface ContentRecommendationRequest {
  $type: string;
  settings: ContentRecommendationRequestSettings;
  language?: Language | null;
  user: User;
  relevanceModifiers: RelevanceModifierCollection;
  filters: FilterCollection;
  displayedAtLocationType: string;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type ContentRecommendationRequestCollection = LicensedRequest & {
  requests?:
    | (
        | ContentsViewedAfterViewingContentRequest
        | ContentsViewedAfterViewingMultipleContentsRequest
        | ContentsViewedAfterViewingMultipleProductsRequest
        | ContentsViewedAfterViewingProductRequest
        | PersonalContentRecommendationRequest
        | PopularContentsRequest
      )[]
    | null;
  requireDistinctContentAcrossResults: boolean;
};

export interface ContentRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  selectedContentProperties?: SelectedContentPropertiesSettings | null;
  custom?: Record<string, string>;
  prioritizeDiversityBetweenRequests: boolean;
}

export type ContentRecommendationResponse = RecommendationResponse & { recommendations?: ContentResult[] | null };

export type ContentRecommendationResponseCollection = TimedResponse & {
  responses?: ContentRecommendationResponse[] | null;
};

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

export type ContentSearchRequest = PaginatedSearchRequest & {
  term?: string | null;
  facets?: ContentFacetQuery | null;
  settings?: ContentSearchSettings | null;
  sorting?: ContentSortBySpecification | null;
};

export type ContentSearchResponse = PaginatedSearchResponse & {
  results?: ContentResult[] | null;
  facets?: ContentFacetResult | null;
  recommendations?: ContentResult[] | null;
};

export type ContentSearchSettings = SearchSettings & {
  selectedContentProperties?: SelectedContentPropertiesSettings | null;
  recommendations: RecommendationSettings;
};

export interface ContentSortBySpecification {
  value?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export interface ContentSorting {
  $type: string;
  order: "Ascending" | "Descending";
  thenBy?: ContentAttributeSorting | ContentDataSorting | ContentPopularitySorting | ContentRelevanceSorting | null;
}

export type ContentUpdate = Trackable & {
  content?: Content | null;
  kind: "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export type ContentView = Trackable & { user?: User | null; content: Content };

export type ContentsViewedAfterViewingContentRequest = ContentRecommendationRequest & { contentId: string };

export type ContentsViewedAfterViewingMultipleContentsRequest = ContentRecommendationRequest & { contentIds: string[] };

export type ContentsViewedAfterViewingMultipleProductsRequest = ContentRecommendationRequest & {
  productAndVariantIds: ProductAndVariantId[];
};

export type ContentsViewedAfterViewingProductRequest = ContentRecommendationRequest & {
  productAndVariantId: ProductAndVariantId;
};

export interface ContextConditionConfiguration {
  filters?: RequestContextFilter[] | null;
}

export interface Currency {
  value: string;
}

export type CustomProductRecommendationRequest = ProductRecommendationRequest & {
  recommendationType: string;
  parameters?: Record<string, string>;
};

export type DataDoubleSelector = ValueSelector & { key?: string | null };

export interface DataFilter {
  $type: string;
  key: string;
  filterOutIfKeyIsNotFound: boolean;
  mustMatchAllConditions: boolean;
  conditions?: ValueConditionCollection | null;
  language?: Language | null;
  currency?: Currency | null;
  negated: boolean;
  custom?: Record<string, string>;
}

export interface DataIndexConfiguration {
  keys?: Record<string, FieldIndexConfiguration>;
  unspecified?: FieldIndexConfiguration | null;
}

export interface DataObject {
  data: Record<string, DataValue>;
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
    | "MultilingualCollection"
    | "Object"
    | "ObjectList";
  value?: any;
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

export type DecompoundRule = SearchRule & { word: string; head?: string | null; modifiers?: string[] | null };

export interface DecompoundRuleSaveSearchRulesRequest {
  $type: string;
  rules: DecompoundRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface DecompoundRuleSaveSearchRulesResponse {
  $type: string;
  rules?: DecompoundRule[] | null;
  statistics?: Statistics | null;
}

export interface DecompoundRuleSearchRulesResponse {
  $type: string;
  rules?: DecompoundRule[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type DecompoundRulesRequest = DecompoundRulesRequestSortBySearchRulesRequest;

export interface DecompoundRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: DecompoundRulesRequestSortBySorting;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface DecompoundRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type DecompoundRulesResponse = DecompoundRuleSearchRulesResponse;

export type DeleteDecompoundRulesRequest = DeleteSearchRulesRequest;

export type DeleteMerchandisingRuleRequest = LicensedRequest & { id: string };

export type DeletePredictionRulesRequest = DeleteSearchRulesRequest;

export type DeleteRedirectRulesRequest = DeleteSearchRulesRequest;

export type DeleteSearchIndexRequest = LicensedRequest & { id?: string | null; deletedBy?: string | null };

export interface DeleteSearchRulesRequest {
  $type: string;
  ids: string[];
  deletedBy: string;
  custom?: Record<string, string | null>;
}

export type DeleteSearchRulesResponse = TimedResponse;

export type DeleteStemmingRulesRequest = DeleteSearchRulesRequest;

export type DeleteSynonymsRequest = LicensedRequest & { ids?: string[] | null; deletedBy?: string | null };

export type DeleteSynonymsResponse = TimedResponse;

export type DeleteTriggerConfigurationRequest = LicensedRequest & { id: string };

export type DistinctCondition = ValueCondition & { numberOfOccurrencesAllowedWithTheSameValue: number };

export interface DoubleAvailableFacetValue {
  /** @format double */
  value: number;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface DoubleContentDataValueFacetResult {
  $type: string;
  key?: string | null;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  available?: DoubleAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableChainableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;

  /** @format double */
  upperBoundExclusive?: number | null;
}

export interface DoubleNullableChainableRangeAvailableFacetValue {
  value?: DoubleNullableChainableRange | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleNullableContentDataRangeFacet {
  $type: string;
  selected?: DoubleNullableRange | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface DoubleNullableContentDataRangeFacetResult {
  $type: string;
  key?: string | null;
  selected?: DoubleNullableRange | null;
  available?: DoubleNullableRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableContentDataRangesFacet {
  $type: string;
  predefinedRanges?: DoubleNullableChainableRange[] | null;

  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface DoubleNullableContentDataRangesFacetResult {
  $type: string;
  key?: string | null;

  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableProductDataRangeFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  selected?: DoubleNullableRange | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface DoubleNullableProductDataRangeFacetResult {
  $type: string;
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  selected?: DoubleNullableRange | null;
  available?: DoubleNullableRangeAvailableFacetValue | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableProductDataRangesFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  predefinedRanges?: DoubleNullableChainableRange[] | null;

  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  key: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface DoubleNullableProductDataRangesFacetResult {
  $type: string;
  key?: string | null;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";

  /** @format double */
  expandedRangeSize?: number | null;
  selected?: DoubleNullableChainableRange[] | null;
  available?: DoubleNullableChainableRangeAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface DoubleNullableRange {
  /** @format double */
  lowerBoundInclusive?: number | null;

  /** @format double */
  upperBoundInclusive?: number | null;
}

export interface DoubleNullableRangeAvailableFacetValue {
  value?: DoubleNullableRange | null;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface DoubleProductDataValueFacet {
  $type: string;
  dataSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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

export type EqualsCondition = ValueCondition & { value?: DataValue | null };

export interface ExpectedSearchTermResult {
  /** @format int32 */
  estimatedHits: number;
  type: "Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory";
}

export interface Facet {
  $type: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
}

export interface FacetResult {
  $type: string;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface FacetSettings {
  alwaysIncludeSelectedInAvailable: boolean;
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
  negated: boolean;
  custom?: Record<string, string>;
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
        | ContentCategoryHasAncestorFilter
        | ContentCategoryHasChildFilter
        | ContentCategoryHasParentFilter
        | ContentCategoryIdFilter
        | ContentCategoryLevelFilter
        | ContentDataFilter
        | ContentIdFilter
        | OrFilter
        | ProductAndVariantIdFilter
        | ProductAssortmentFilter
        | ProductCategoryAssortmentFilter
        | ProductCategoryDataFilter
        | ProductCategoryHasAncestorFilter
        | ProductCategoryHasChildFilter
        | ProductCategoryHasParentFilter
        | ProductCategoryIdFilter
        | ProductCategoryLevelFilter
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

export type FilterRule = MerchandisingRule;

export type FixedDoubleValueSelector = ValueSelector & { value: number };

export type FixedPositionRule = MerchandisingRule & { position: number };

export interface GlobalTriggerConfiguration {
  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;
  enabled: boolean;

  /** @format int32 */
  minimumCooldownAnyTrigger?: number | null;

  /** @format int32 */
  minimumCooldownSameTrigger?: number | null;

  /** @format int32 */
  minimumCooldownSameGroup?: number | null;
  settings?: Record<string, string | null>;
}

export type GlobalTriggerConfigurationRequest = LicensedRequest;

export type GlobalTriggerConfigurationResponse = TimedResponse & { configuration?: GlobalTriggerConfiguration | null };

export type GreaterThanCondition = ValueCondition & { value: number };

export type HasActivityCondition = UserCondition & { withinMinutes: number; forAtLeastSeconds: number };

export interface HasAncestorCategoryFilter {
  $type: string;
  categoryIds?: string[] | null;
  negated: boolean;
  custom?: Record<string, string>;
}

export type HasAuthenticatedIdCondition = UserCondition;

export interface HasChildCategoryFilter {
  $type: string;
  categoryIds?: string[] | null;
  negated: boolean;
  custom?: Record<string, string>;
}

export type HasClassificationCondition = UserCondition & { key?: string | null; value?: string | null };

export type HasEmailCondition = UserCondition;

export type HasIdentifierCondition = UserCondition & { key?: string | null };

export type HasLineItemsInCartCondition = UserCondition & {
  numberOfItems?: Int32NullableRange | null;
  cartName?: string | null;
  filters?: FilterCollection | null;
};

export type HasModifiedCartCondition = UserCondition & { withinMinutes: number; cartName?: string | null };

export interface HasParentCategoryFilter {
  $type: string;
  categoryIds?: string[] | null;
  negated: boolean;
  custom?: Record<string, string>;
}

export type HasPlacedOrderCondition = UserCondition & { withinMinutes: number };

export type HasRecentlyReceivedSameTriggerCondition = UserCondition & { withinMinutes: number };

export type HasRecentlyReceivedTriggerCondition = UserCondition & {
  withinMinutes: number;
  id?: string | null;
  group?: string | null;
  type?: number | null;
};

export type HtmlParser = Parser;

export type ITriggerResult = object;

export interface IndexConfiguration {
  language?: LanguageIndexConfiguration | null;
  product?: ProductIndexConfiguration | null;
  content?: ContentIndexConfiguration | null;
}

export interface InputConditionConfiguration {
  filters?: FilterCollection | null;
  evaluationMode: "Any" | "All";
}

export type InputModifierRule = MerchandisingRule;

export interface Int32AvailableFacetValue {
  /** @format int32 */
  value: number;

  /** @format int32 */
  hits: number;
  selected: boolean;
}

export interface Int32ContentDataValueFacet {
  $type: string;
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: number[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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

export interface LicensedRequest {
  $type: string;
  custom?: Record<string, string | null>;
}

export interface LineItem {
  product: Product;
  variant?: ProductVariant | null;
  custom?: Record<string, string>;

  /** @format float */
  quantity: number;

  /** @format double */
  lineTotal: number;
}

export interface MerchandisingRule {
  $type: string;
  custom?: Record<string, string | null>;

  /** @format uuid */
  id: string;
  name?: string | null;
  description?: string | null;
  group?: string | null;
  enabled: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;
  conditions?: ConditionConfiguration | null;
  request?: RequestConfiguration | null;

  /** @format double */
  priority: number;
  settings?: Record<string, string | null>;
}

export type MerchandisingRuleCollectionResponse = TimedResponse & {
  rules?: (BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule)[] | null;
};

export type MerchandisingRuleRequest = LicensedRequest & { id: string; type?: number | null };

export type MerchandisingRuleResponse = TimedResponse & {
  rule?: BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule | null;
};

export type MerchandisingRulesRequest = LicensedRequest & { type?: number | null };

export type MixedRecommendationResponseCollection = TimedResponse & {
  responses?:
    | (
        | BrandRecommendationResponse
        | ContentCategoryRecommendationResponse
        | ContentRecommendationResponse
        | ProductCategoryRecommendationResponse
        | ProductRecommendationResponse
        | SearchTermRecommendationResponse
      )[]
    | null;
};

export interface Money {
  /** @format double */
  amount: number;
  currency: Currency;
}

export interface MultiCurrency {
  values?: Money[] | null;
}

export interface Multilingual {
  values?: MultilingualValue[] | null;
}

export interface MultilingualCollection {
  values?: MultilingualCollectionValue[] | null;
}

export interface MultilingualCollectionValue {
  language?: Language | null;
  values?: string[] | null;
}

export interface MultilingualValue {
  language: Language;
  text?: string | null;
}

export type OrCondition = UserCondition & { conditions?: UserConditionCollection | null };

export type OrFilter = Filter & {
  filters: (
    | AndFilter
    | BrandAssortmentFilter
    | BrandDataFilter
    | BrandIdFilter
    | CartDataFilter
    | ContentCategoryAssortmentFilter
    | ContentCategoryDataFilter
    | ContentCategoryHasAncestorFilter
    | ContentCategoryHasChildFilter
    | ContentCategoryHasParentFilter
    | ContentCategoryIdFilter
    | ContentCategoryLevelFilter
    | ContentDataFilter
    | ContentIdFilter
    | OrFilter
    | ProductAndVariantIdFilter
    | ProductAssortmentFilter
    | ProductCategoryAssortmentFilter
    | ProductCategoryDataFilter
    | ProductCategoryHasAncestorFilter
    | ProductCategoryHasChildFilter
    | ProductCategoryHasParentFilter
    | ProductCategoryIdFilter
    | ProductCategoryLevelFilter
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
  )[];
};

export type Order = Trackable & {
  user: User;
  subtotal: Money;
  lineItems: LineItem[];
  trackingNumber: string;
  cartName: string;
  channel?: string | null;
  subChannel?: string | null;
};

export interface OverriddenContentRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations?: number | null;
  allowFillIfNecessaryToReachNumberOfRecommendations?: boolean | null;
  allowReplacingOfRecentlyShownRecommendations?: boolean | null;
  selectedContentProperties?: OverriddenSelectedContentPropertiesSettings | null;
  custom?: Record<string, string | null>;
  prioritizeDiversityBetweenRequests?: boolean | null;
}

export interface OverriddenProductRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations?: number | null;
  allowFillIfNecessaryToReachNumberOfRecommendations?: boolean | null;
  allowReplacingOfRecentlyShownRecommendations?: boolean | null;
  recommendVariant?: boolean | null;
  selectedProductProperties?: OverriddenSelectedProductPropertiesSettings | null;
  selectedVariantProperties?: OverriddenSelectedVariantPropertiesSettings | null;
  custom?: Record<string, string | null>;
  prioritizeDiversityBetweenRequests?: boolean | null;
  allowProductsCurrentlyInCart?: boolean | null;
  selectedBrandProperties?: OverriddenSelectedBrandPropertiesSettings | null;
}

export interface OverriddenSelectedBrandPropertiesSettings {
  displayName?: boolean | null;
  assortments?: boolean | null;
  viewedByUserInfo?: boolean | null;
  allData?: boolean | null;
  dataKeys?: string[] | null;
}

export interface OverriddenSelectedContentPropertiesSettings {
  displayName?: boolean | null;
  categoryPaths?: boolean | null;
  assortments?: boolean | null;
  allData?: boolean | null;
  viewedByUserInfo?: boolean | null;
  dataKeys?: string[] | null;
}

export interface OverriddenSelectedProductPropertiesSettings {
  displayName?: boolean | null;
  categoryPaths?: boolean | null;
  assortments?: boolean | null;
  pricing?: boolean | null;
  allData?: boolean | null;
  viewedByUserInfo?: boolean | null;
  purchasedByUserInfo?: boolean | null;
  brand?: boolean | null;
  allVariants?: boolean | null;
  dataKeys?: string[] | null;
}

export interface OverriddenSelectedVariantPropertiesSettings {
  displayName?: boolean | null;
  pricing?: boolean | null;
  allSpecifications?: boolean | null;
  assortments?: boolean | null;
  allData?: boolean | null;
  dataKeys?: string[] | null;
  specificationKeys?: string[] | null;
}

export interface PaginatedSearchRequest {
  $type: string;

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

export interface PaginatedSearchResponse {
  /** @format int32 */
  hits: number;
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface Parser {
  $type: string;
}

export type PersonalBrandRecommendationRequest = BrandRecommendationRequest & {
  sinceMinutesAgo: number;
  weights: BrandRecommendationWeights;
};

export type PersonalContentCategoryRecommendationRequest = ContentCategoryRecommendationRequest & {
  sinceMinutesAgo: number;
  weights: ContentCategoryRecommendationWeights;
};

export type PersonalContentRecommendationRequest = ContentRecommendationRequest;

export type PersonalProductCategoryRecommendationRequest = ProductCategoryRecommendationRequest & {
  sinceMinutesAgo: number;
  weights: ProductCategoryRecommendationWeights;
};

export type PersonalProductRecommendationRequest = ProductRecommendationRequest;

export type PopularBrandsRecommendationRequest = BrandRecommendationRequest & {
  sinceMinutesAgo: number;
  weights: BrandRecommendationWeights;
};

export type PopularContentCategoriesRecommendationRequest = ContentCategoryRecommendationRequest & {
  sinceMinutesAgo: number;
  weights: ContentCategoryRecommendationWeights;
};

export type PopularContentsRequest = ContentRecommendationRequest & { sinceMinutesAgo: number };

export type PopularProductCategoriesRecommendationRequest = ProductCategoryRecommendationRequest & {
  sinceMinutesAgo: number;
  weights: ProductCategoryRecommendationWeights;
};

export type PopularProductsRequest = ProductRecommendationRequest & {
  basedOn: "MostPurchased" | "MostViewed";
  sinceMinutesAgo: number;
};

export type PopularSearchTermsRecommendationRequest = RecommendationRequest & {
  term?: string | null;
  settings?: RecommendPopularSearchTermSettings | null;
};

export type PredictionRule = SearchRule & {
  condition: SearchTermCondition;
  promote: PredictionRulePromotion;
  suppress: PredictionRuleSuppression;
};

export interface PredictionRulePromotion {
  to: "Top" | "Bottom";
  values: string[];
}

export interface PredictionRuleSaveSearchRulesRequest {
  $type: string;
  rules: PredictionRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface PredictionRuleSaveSearchRulesResponse {
  $type: string;
  rules?: PredictionRule[] | null;
  statistics?: Statistics | null;
}

export interface PredictionRuleSearchRulesResponse {
  $type: string;
  rules?: PredictionRule[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export interface PredictionRuleSuppression {
  condition: "Contains";
  values: string[];
}

export type PredictionRulesRequest = PredictionRulesRequestSortBySearchRulesRequest;

export interface PredictionRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: PredictionRulesRequestSortBySorting;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface PredictionRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type PredictionRulesResponse = PredictionRuleSearchRulesResponse;

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

export type ProductAdministrativeAction = Trackable & {
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
};

export interface ProductAndVariantId {
  productId: string;
  variantId?: string | null;
}

export type ProductAndVariantIdFilter = Filter & { productAndVariantIds: ProductAndVariantId[] };

export type ProductAssortmentFacet = AssortmentFacet & {
  assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductAssortmentFacetResult = AssortmentFacetResult & {
  assortmentSelectionStrategy: "Product" | "Variant" | "VariantWithFallbackToProduct" | "ProductWithFallbackToVariant";
};

export type ProductAssortmentFilter = Filter & { assortments: number[] };

export type ProductAssortmentRelevanceModifier = RelevanceModifier & {
  assortments?: number[] | null;
  multiplyWeightBy: number;
};

export type ProductAttributeSorting = ProductSorting & {
  attribute: "Id" | "DisplayName" | "BrandId" | "BrandName" | "ListPrice" | "SalesPrice";
  mode: "Auto" | "Alphabetical" | "Numerical";
};

export type ProductCategory = Category;

export type ProductCategoryAdministrativeAction = CategoryAdministrativeAction;

export type ProductCategoryAssortmentFilter = Filter & { assortments: number[] };

export type ProductCategoryDataFilter = DataFilter;

export type ProductCategoryDetailsCollectionResponse = TimedResponse & {
  categories?: ProductCategoryResultDetails[] | null;
  totalNumberOfResults?: number | null;
};

export type ProductCategoryHasAncestorFilter = HasAncestorCategoryFilter;

export type ProductCategoryHasChildFilter = HasChildCategoryFilter;

export type ProductCategoryHasParentFilter = HasParentCategoryFilter;

export type ProductCategoryIdFilter = CategoryIdFilter;

export interface ProductCategoryIdFilterCategoryQuery {
  $type: string;
  filters?: FilterCollection | null;

  /** @format int32 */
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;

  /** @format int32 */
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledCategories: boolean;

  /** @format int32 */
  includeChildCategoriesToDepth: number;

  /** @format int32 */
  includeParentCategoriesToDepth: number;
  custom?: Record<string, string | null>;
}

export type ProductCategoryIdRelevanceModifier = RelevanceModifier & {
  categoryId?: string | null;
  evaluationScope: "ImmediateParent" | "ImmediateParentOrItsParent" | "Ancestor";
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductCategoryInterestTriggerConfiguration = ProductCategoryInterestTriggerResultTriggerConfiguration & {
  categoryViews?: Int32NullableRange | null;
  productViews?: Int32NullableRange | null;
  filters?: FilterCollection | null;
};

export interface ProductCategoryInterestTriggerResultTriggerConfiguration {
  $type: string;
  custom?: Record<string, string | null>;

  /** @format uuid */
  id: string;
  name?: string | null;
  description?: string | null;
  group?: string | null;
  enabled: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;

  /** @format int32 */
  withinTimeSpanMinutes: number;
  settings?: Record<string, string | null>;
  userConditions?: UserConditionCollection | null;
}

export type ProductCategoryLevelFilter = CategoryLevelFilter;

export type ProductCategoryQuery = ProductCategoryIdFilterCategoryQuery;

export interface ProductCategoryRecommendationRequest {
  $type: string;
  settings?: ProductCategoryRecommendationRequestSettings | null;
  language?: Language | null;
  user: User;
  relevanceModifiers: RelevanceModifierCollection;
  filters: FilterCollection;
  displayedAtLocationType: string;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type ProductCategoryRecommendationRequestCollection = LicensedRequest & {
  requests?: (PersonalProductCategoryRecommendationRequest | PopularProductCategoriesRecommendationRequest)[] | null;
  requireDistinctContentAcrossResults: boolean;
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

export type ProductCategoryRecommendationResponse = RecommendationResponse & {
  recommendations?: ProductCategoryResult[] | null;
};

export type ProductCategoryRecommendationResponseCollection = TimedResponse & {
  responses?: ProductCategoryRecommendationResponse[] | null;
};

export interface ProductCategoryRecommendationWeights {
  /** @format double */
  categoryViews: number;

  /** @format double */
  productViews: number;

  /** @format double */
  productPurchases: number;
}

export type ProductCategoryResult = CategoryResult;

export type ProductCategoryResultDetails = ProductCategoryResultDetailsCategoryResultDetails & {
  purchasedFromByDifferentNumberOfUsers: number;
  purchasedByUser?: PurchasedByUserInfo | null;
};

export interface ProductCategoryResultDetailsCategoryResultDetails {
  $type: string;
  categoryId?: string | null;
  displayName?: Multilingual | null;
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
  childCategories?: ProductCategoryResultDetails[] | null;
  parentCategories?: ProductCategoryResultDetails[] | null;
}

export type ProductCategorySearchRequest = PaginatedSearchRequest & {
  term: string;
  settings?: ProductCategorySearchSettings | null;
};

export type ProductCategorySearchResponse = PaginatedSearchResponse & {
  results?: ProductCategoryResult[] | null;
  recommendations?: ProductCategoryResult[] | null;
};

export type ProductCategorySearchSettings = SearchSettings & {
  numberOfRecommendations?: number | null;
  onlyIncludeRecommendationsForEmptyResults?: boolean | null;
};

export type ProductCategoryUpdate = CategoryUpdate & { category?: ProductCategory | null };

export type ProductCategoryView = Trackable & { user?: User | null; idPath: string[] };

export type ProductDataBooleanValueFacet = BooleanProductDataValueFacet;

export type ProductDataBooleanValueFacetResult = BooleanProductDataValueFacetResult;

export type ProductDataDoubleRangeFacet = DoubleNullableProductDataRangeFacet;

export type ProductDataDoubleRangeFacetResult = DoubleNullableProductDataRangeFacetResult;

export type ProductDataDoubleRangesFacet = DoubleNullableProductDataRangesFacet;

export type ProductDataDoubleRangesFacetResult = DoubleNullableProductDataRangesFacetResult;

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

export type ProductDetailsCollectionResponse = TimedResponse & {
  products?: ProductResultDetails[] | null;
  totalNumberOfResults?: number | null;
};

export type ProductDisplayNameFilter = Filter & {
  language?: Language | null;
  conditions?: ValueConditionCollection | null;
  mustMatchAllConditions: boolean;
};

export interface ProductFacetQuery {
  items: (
    | ContentAssortmentFacet
    | ProductAssortmentFacet
    | BrandFacet
    | CategoryFacet
    | ContentDataDoubleRangeFacet
    | ContentDataDoubleRangesFacet
    | ContentDataStringValueFacet
    | ContentDataBooleanValueFacet
    | ContentDataDoubleValueFacet
    | ContentDataIntegerValueFacet
    | PriceRangeFacet
    | PriceRangesFacet
    | ProductDataDoubleRangeFacet
    | ProductDataDoubleRangesFacet
    | ProductDataStringValueFacet
    | ProductDataBooleanValueFacet
    | ProductDataDoubleValueFacet
    | ProductDataIntegerValueFacet
    | VariantSpecificationFacet
  )[];
}

export interface ProductFacetResult {
  items?:
    | (
        | ProductAssortmentFacetResult
        | ContentAssortmentFacetResult
        | BrandFacetResult
        | CategoryFacetResult
        | ContentDataDoubleRangeFacetResult
        | ContentDataDoubleRangesFacetResult
        | ContentDataStringValueFacetResult
        | ContentDataBooleanValueFacetResult
        | ContentDataDoubleValueFacetResult
        | ContentDataIntegerValueFacetResult
        | PriceRangeFacetResult
        | PriceRangesFacetResult
        | ProductDataDoubleRangeFacetResult
        | ProductDataDoubleRangesFacetResult
        | ProductDataStringValueFacetResult
        | ProductDataBooleanValueFacetResult
        | ProductDataDoubleValueFacetResult
        | ProductDataIntegerValueFacetResult
        | VariantSpecificationFacetResult
      )[]
    | null;
}

export type ProductHasVariantsFilter = Filter & { numberOfVariants: Int32NullableRange };

export type ProductIdFilter = Filter & { productIds: string[] };

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

export type ProductInterestTriggerConfiguration = ProductInterestTriggerResultTriggerConfiguration & {
  productViews?: Int32NullableRange | null;
  filters?: FilterCollection | null;
  resultSettings?: ProductInterestTriggerResultResultSettings | null;
};

export interface ProductInterestTriggerResultResultSettings {
  selectedProductProperties?: SelectedProductPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
}

export interface ProductInterestTriggerResultTriggerConfiguration {
  $type: string;
  custom?: Record<string, string | null>;

  /** @format uuid */
  id: string;
  name?: string | null;
  description?: string | null;
  group?: string | null;
  enabled: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;

  /** @format int32 */
  withinTimeSpanMinutes: number;
  settings?: Record<string, string | null>;
  userConditions?: UserConditionCollection | null;
}

export type ProductListPriceFilter = Filter & { range: DecimalNullableRange; currency?: Currency | null };

export type ProductListPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductPerformanceRequest = AnalyzerRequest & {
  fromUnixTimeSeconds: number;
  toUnixTimeSeconds: number;
  filters?: FilterCollection | null;
  numberOfResults: number;
  skipNumberOfResults: number;
  byVariant: boolean;
  selectedProductProperties?: SelectedProductPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
  orderBy: "Created" | "Views" | "Sales" | "CartsOpened" | "RankByView" | "RankBySales";
  variantData: "FromVariant" | "FromProduct" | "FromProductDividedByVariants";
  classifications?: StringStringKeyValuePair[] | null;
  selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
};

export type ProductPerformanceResponse = TimedResponse & {
  results?: ProductPerformanceResult[] | null;
  totalNumberOfResults: number;
  remainingNumberOfResults: number;
};

export interface ProductPerformanceResult {
  product?: ProductResult | null;
  classifications?: ProductPerformanceResultClassificationMetrics[] | null;
}

export interface ProductPerformanceResultCartMetrics {
  /** @format int32 */
  opened: number;
}

export interface ProductPerformanceResultCategoryMetrics {
  category?: CategoryNameAndIdResult | null;
  immediateParent: boolean;
  rank?: ProductPerformanceResultViewsAndSalesMetrics | null;
}

export interface ProductPerformanceResultClassificationMetrics {
  combination?: Record<string, string | null>;
  views?: ProductPerformanceResultViewsMetrics | null;
  sales?: ProductPerformanceResultSalesMetrics | null;
  carts?: ProductPerformanceResultCartMetrics | null;
  rank?: ProductPerformanceResultRankMetrics | null;
}

export interface ProductPerformanceResultRankMetrics {
  overall?: ProductPerformanceResultViewsAndSalesMetrics | null;
  withinCategories?: ProductPerformanceResultCategoryMetrics[] | null;
  withinBrand?: ProductPerformanceResultViewsAndSalesMetrics | null;
}

export interface ProductPerformanceResultSalesByCurrency {
  currency?: Currency | null;

  /** @format int32 */
  orders: number;

  /** @format double */
  averageSubtotal: number;

  /** @format double */
  units: number;

  /** @format double */
  revenue: number;
}

export interface ProductPerformanceResultSalesMetrics {
  /** @format int32 */
  orders: number;

  /** @format double */
  averageNoOfLineItems: number;
  currencies?: ProductPerformanceResultSalesByCurrency[] | null;
  withKnownCartOpener?: ProductPerformanceResultSalesWithKnownCartOpenerMetrics | null;
}

export interface ProductPerformanceResultSalesWithKnownCartOpenerMetrics {
  /** @format int32 */
  orders: number;

  /** @format int32 */
  opened: number;

  /** @format double */
  openedPercent: number;
}

export interface ProductPerformanceResultViewsAndSalesMetrics {
  /** @format double */
  byViews: number;

  /** @format double */
  bySales: number;
}

export interface ProductPerformanceResultViewsMetrics {
  /** @format int32 */
  total: number;
}

export type ProductPopularitySorting = ProductSorting;

export type ProductQuery = LicensedRequest & {
  filters?: FilterCollection | null;
  numberOfResults: number;
  language?: Language | null;
  currency?: Currency | null;
  skipNumberOfResults: number;
  returnTotalNumberOfResults: boolean;
  includeDisabledProducts: boolean;
  includeDisabledVariants: boolean;
  excludeProductsWithNoVariants: boolean;
};

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
  $type: string;
  settings: ProductRecommendationRequestSettings;
  language?: Language | null;
  user: User;
  relevanceModifiers: RelevanceModifierCollection;
  filters: FilterCollection;
  displayedAtLocationType: string;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export type ProductRecommendationRequestCollection = LicensedRequest & {
  requests?:
    | (
        | CustomProductRecommendationRequest
        | PersonalProductRecommendationRequest
        | PopularProductsRequest
        | ProductsViewedAfterViewingContentRequest
        | ProductsViewedAfterViewingProductRequest
        | PurchasedWithCurrentCartRequest
        | PurchasedWithMultipleProductsRequest
        | PurchasedWithProductRequest
        | RecentlyViewedProductsRequest
        | SearchTermBasedProductRecommendationRequest
        | SimilarProductsRequest
        | SortProductsRequest
        | SortVariantsRequest
      )[]
    | null;
  requireDistinctProductsAcrossResults: boolean;
};

export interface ProductRecommendationRequestSettings {
  /** @format int32 */
  numberOfRecommendations: number;
  allowFillIfNecessaryToReachNumberOfRecommendations: boolean;
  allowReplacingOfRecentlyShownRecommendations: boolean;
  recommendVariant: boolean;
  selectedProductProperties?: SelectedProductPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
  custom?: Record<string, string>;
  prioritizeDiversityBetweenRequests: boolean;
  allowProductsCurrentlyInCart?: boolean | null;
  selectedBrandProperties?: SelectedBrandPropertiesSettings | null;
}

export type ProductRecommendationResponse = RecommendationResponse & { recommendations?: ProductResult[] | null };

export type ProductRecommendationResponseCollection = TimedResponse & {
  responses?: ProductRecommendationResponse[] | null;
};

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

export type ProductSalesPriceFilter = Filter & { range: DecimalNullableRange; currency?: Currency | null };

export type ProductSalesPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export type ProductSearchRequest = PaginatedSearchRequest & {
  term?: string | null;
  facets?: ProductFacetQuery | null;
  settings?: ProductSearchSettings | null;
  sorting?: ProductSortBySpecification | null;
};

export type ProductSearchResponse = PaginatedSearchResponse & {
  results?: ProductResult[] | null;
  facets?: ProductFacetResult | null;
  recommendations?: ProductResult[] | null;
  redirects?: RedirectResult[] | null;
};

export type ProductSearchSettings = SearchSettings & {
  selectedProductProperties?: SelectedProductPropertiesSettings | null;
  selectedVariantProperties?: SelectedVariantPropertiesSettings | null;
  explodedVariants?: number | null;
  recommendations: RecommendationSettings;
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

export type ProductUpdate = Trackable & {
  product?: Product | null;
  variants?: ProductVariant[] | null;
  productUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  variantUpdateKind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
  replaceExistingVariants: boolean;
  brandUpdateKind?: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace" | null;
};

export interface ProductVariant {
  id: string;
  displayName?: Multilingual | null;
  assortments?: number[] | null;
  specification?: Record<string, string | null>;
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

export type ProductView = Trackable & { user?: User | null; product: Product; variant?: ProductVariant | null };

export type ProductsViewedAfterViewingContentRequest = ProductRecommendationRequest & { contentId: string };

export type ProductsViewedAfterViewingProductRequest = ProductRecommendationRequest & {
  productAndVariantId: ProductAndVariantId;
};

export interface PurchasedByUserInfo {
  /** @format date-time */
  mostRecentPurchasedUtc: string;

  /** @format int64 */
  totalNumberOfTimesPurchased: number;
}

export type PurchasedWithCurrentCartRequest = ProductRecommendationRequest;

export type PurchasedWithMultipleProductsRequest = ProductRecommendationRequest & {
  productAndVariantIds: ProductAndVariantId[];
};

export type PurchasedWithProductRequest = ProductRecommendationRequest & { productAndVariantId: ProductAndVariantId };

export type RecentlyViewedProductsRequest = ProductRecommendationRequest;

export interface RecommendPopularSearchTermSettings {
  targetEntityTypes?: ("Product" | "Variant" | "ProductCategory" | "Brand" | "Content" | "ContentCategory")[] | null;

  /** @format int32 */
  numberOfRecommendations: number;
}

export interface RecommendationRequest {
  $type: string;
  language?: Language | null;
  user: User;
  relevanceModifiers: RelevanceModifierCollection;
  filters: FilterCollection;
  displayedAtLocationType: string;
  currency?: Currency | null;
  custom?: Record<string, string | null>;
}

export interface RecommendationResponse {
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export interface RecommendationSettings {
  /** @format int32 */
  take?: number | null;

  /** @format int32 */
  onlyIncludeRecommendationsWhenLessResultsThan?: number | null;
}

export interface RecommendationTypeCollection {
  unionCodes?: number[] | null;
}

export interface RedirectResult {
  /** @format uuid */
  id: string;
  condition: SearchTermCondition;
  destination?: string | null;
  data?: Record<string, string>;
}

export type RedirectRule = SearchRule & {
  condition: SearchTermCondition;
  destination?: string | null;
  data?: Record<string, string>;
};

export interface RedirectRuleSaveSearchRulesRequest {
  $type: string;
  rules: RedirectRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface RedirectRuleSaveSearchRulesResponse {
  $type: string;
  rules?: RedirectRule[] | null;
  statistics?: Statistics | null;
}

export interface RedirectRuleSearchRulesResponse {
  $type: string;
  rules?: RedirectRule[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type RedirectRulesRequest = RedirectRulesRequestSortBySearchRulesRequest;

export interface RedirectRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: RedirectRulesRequestSortBySorting;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface RedirectRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type RedirectRulesResponse = RedirectRuleSearchRulesResponse;

export interface RelevanceModifier {
  $type: string;
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

export interface RequestConfiguration {
  filters: "Merge" | "Suppress";
  relevanceModifiers: "Merge" | "Suppress";
  overriddenProductRecommendationRequestSettings?: OverriddenProductRecommendationRequestSettings | null;
  overriddenContentRecommendationRequestSettings?: OverriddenContentRecommendationRequestSettings | null;
}

export interface RequestContextFilter {
  recommendations?: RecommendationTypeCollection | null;
  searches?: SearchTypeCollection | null;
  locations?: string[] | null;
  languages?: Language[] | null;
  currencies?: Currency[] | null;
}

export type SaveDecompoundRulesRequest = DecompoundRuleSaveSearchRulesRequest;

export type SaveDecompoundRulesResponse = DecompoundRuleSaveSearchRulesResponse;

export type SaveGlobalTriggerConfigurationRequest = LicensedRequest & {
  configuration?: GlobalTriggerConfiguration | null;
  modifiedBy?: string | null;
};

export type SaveMerchandisingRuleRequest = LicensedRequest & {
  rule?: BoostAndBuryRule | FilterRule | FixedPositionRule | InputModifierRule | null;
  modifiedBy?: string | null;
};

export type SavePredictionRulesRequest = PredictionRuleSaveSearchRulesRequest;

export type SavePredictionRulesResponse = PredictionRuleSaveSearchRulesResponse;

export type SaveRedirectRulesRequest = RedirectRuleSaveSearchRulesRequest;

export type SaveRedirectRulesResponse = RedirectRuleSaveSearchRulesResponse;

export type SaveSearchIndexRequest = LicensedRequest & { index?: SearchIndex | null; modifiedBy?: string | null };

export type SaveStemmingRulesRequest = StemmingRuleSaveSearchRulesRequest;

export type SaveStemmingRulesResponse = StemmingRuleSaveSearchRulesResponse;

export type SaveSynonymsRequest = LicensedRequest & { synonyms?: Synonym[] | null; modifiedBy?: string | null };

export type SaveSynonymsResponse = TimedResponse & { values?: Synonym[] | null };

export type SaveTriggerConfigurationRequest = LicensedRequest & {
  configuration?:
    | AbandonedCartTriggerConfiguration
    | ContentCategoryInterestTriggerConfiguration
    | ProductCategoryInterestTriggerConfiguration
    | ProductInterestTriggerConfiguration
    | UserActivityTriggerConfiguration
    | null;
  modifiedBy?: string | null;
};

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

export type SearchIndexCollectionResponse = TimedResponse & { indexes?: SearchIndex[] | null };

export type SearchIndexRequest = LicensedRequest & { id?: string | null };

export type SearchIndexResponse = TimedResponse & { index?: SearchIndex | null };

export interface SearchIndexSelector {
  id: string;
}

export type SearchIndexesRequest = LicensedRequest;

export interface SearchRequest {
  $type: string;
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

export type SearchRequestCollection = SearchRequest & {
  requests: (
    | ContentCategorySearchRequest
    | ContentSearchRequest
    | ProductCategorySearchRequest
    | ProductSearchRequest
    | SearchRequestCollection
    | SearchTermPredictionRequest
  )[];
};

export interface SearchResponse {
  custom?: Record<string, string | null>;
  statistics?: Statistics | null;
}

export type SearchResponseCollection = SearchResponse & {
  responses?:
    | (
        | ContentCategorySearchResponse
        | ContentSearchResponse
        | ProductCategorySearchResponse
        | ProductSearchResponse
        | SearchResponseCollection
        | SearchTermPredictionResponse
      )[]
    | null;
};

export interface SearchRule {
  $type: string;

  /** @format uuid */
  id: string;
  indexes?: ApplicableIndexes | null;
  languages?: ApplicableLanguages | null;

  /** @format date-time */
  created: string;
  createdBy: string;

  /** @format date-time */
  modified: string;
  modifiedBy: string;

  /** @format date-time */
  approved?: string | null;
  approvedBy: string;
  isApproved: boolean;
}

export interface SearchRuleFilters {
  term?: string | null;
  approved?: boolean | null;

  /** @format uuid */
  id?: string | null;
}

export interface SearchSettings {
  $type: string;
}

export type SearchTerm = Trackable & { language?: Language | null; user?: User | null; term?: string | null };

export type SearchTermBasedProductRecommendationRequest = ProductRecommendationRequest & { term: string };

export interface SearchTermCondition {
  kind: "Equals" | "StartsWith" | "EndsWith" | "Contains";
  value: string;
  andConditions?: SearchTermCondition[] | null;
  orConditions?: SearchTermCondition[] | null;
}

export type SearchTermPredictionRequest = SearchRequest & {
  term: string;
  take: number;
  settings?: SearchTermPredictionSettings | null;
};

export type SearchTermPredictionResponse = SearchResponse & { predictions?: SearchTermPredictionResult[] | null };

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

export type SearchTermRecommendationResponse = RecommendationResponse & { recommendations?: SearchTermResult[] | null };

export interface SearchTermResult {
  term?: string | null;

  /** @format int32 */
  rank: number;
  expectedResultTypes?: ExpectedSearchTermResult[] | null;
}

export interface SearchTypeCollection {
  unionCodes?: number[] | null;
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
  key: string;
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

  /** @format double */
  significanceOfSimilarBrand: number;
}

export type SimilarProductsRequest = ProductRecommendationRequest & {
  existingProductId?: ProductAndVariantId | null;
  productData?: Product | null;
  considerAlreadyKnownInformationAboutProduct: boolean;
  evaluationSettings?: SimilarProductsEvaluationSettings | null;
};

export type SortProductsRequest = ProductRecommendationRequest & { productIds: string[] };

export type SortVariantsRequest = ProductRecommendationRequest & { productId: string };

export interface SpecificationsIndexConfiguration {
  keys?: Record<string, FieldIndexConfiguration>;
  unspecified?: FieldIndexConfiguration | null;
}

export interface Statistics {
  /** @format double */
  serverTimeInMs: number;
}

export type StemmingRule = SearchRule & { words: string[]; stem?: string | null };

export interface StemmingRuleSaveSearchRulesRequest {
  $type: string;
  rules: StemmingRule[];
  modifiedBy: string;
  custom?: Record<string, string | null>;
}

export interface StemmingRuleSaveSearchRulesResponse {
  $type: string;
  rules?: StemmingRule[] | null;
  statistics?: Statistics | null;
}

export interface StemmingRuleSearchRulesResponse {
  $type: string;
  rules?: StemmingRule[] | null;

  /** @format int32 */
  hits: number;
  statistics?: Statistics | null;
}

export type StemmingRulesRequest = StemmingRulesRequestSortBySearchRulesRequest;

export interface StemmingRulesRequestSortBySearchRulesRequest {
  $type: string;
  filters: SearchRuleFilters;
  sorting: StemmingRulesRequestSortBySorting;

  /** @format int32 */
  skip: number;

  /** @format int32 */
  take: number;
  custom?: Record<string, string | null>;
}

export interface StemmingRulesRequestSortBySorting {
  sortBy: "Created" | "Modified";
  sortOrder: "Ascending" | "Descending";
}

export type StemmingRulesResponse = StemmingRuleSearchRulesResponse;

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
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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
  key: string;
  collectionFilterType?: "Or" | "And" | null;
  selected?: string[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
  settings?: FacetSettings | null;
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
  settings?: FacetSettings | null;
}

export interface StringValueFacetResult {
  $type: string;
  selected?: string[] | null;
  available?: StringAvailableFacetValue[] | null;
  field: "Category" | "Assortment" | "ListPrice" | "SalesPrice" | "Brand" | "Data" | "VariantSpecification";
}

export interface Synonym {
  /** @format uuid */
  id: string;
  type: "OneWay" | "Multidirectional";
  indexes?: string[] | null;
  languages?: Language[] | null;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;
  from?: string[] | null;
  words?: string[] | null;

  /** @format date-time */
  approved?: string | null;
  approvedBy?: string | null;

  /** @format int64 */
  usages: number;
  isApproved: boolean;
  allowInPredictions: boolean;
}

export type SynonymsRequest = LicensedRequest & {
  sorting?: SynonymsRequestSynonymSortingSorting | null;
  take: number;
  skip: number;
  term?: string | null;
  isApproved?: boolean | null;
};

export interface SynonymsRequestSynonymSortingSorting {
  sortBy:
    | "Created"
    | "CreatedBy"
    | "Modified"
    | "ModifiedBy"
    | "Approved"
    | "ApprovedBy"
    | "Usages"
    | "Type"
    | "Predictable";
  sortOrder: "Ascending" | "Descending";
}

export type SynonymsResponse = TimedResponse & { values?: Synonym[] | null; hits: number };

export interface TargetConditionConfiguration {
  filters?: FilterCollection | null;
}

export interface TimedResponse {
  statistics?: Statistics | null;
}

export type TrackBrandAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: BrandAdministrativeAction | null;
};

export type TrackBrandUpdateRequest = TrackingRequest & { brandUpdate?: BrandUpdate | null };

export type TrackBrandViewRequest = TrackingRequest & { brandView: BrandView };

export type TrackCartRequest = TrackingRequest & { cart: Cart };

export type TrackContentAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ContentAdministrativeAction | null;
};

export type TrackContentCategoryAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ContentCategoryAdministrativeAction | null;
};

export type TrackContentCategoryUpdateRequest = TrackingRequest & {
  contentCategoryUpdate?: ContentCategoryUpdate | null;
};

export type TrackContentCategoryViewRequest = TrackingRequest & { contentCategoryView: ContentCategoryView };

export type TrackContentUpdateRequest = TrackingRequest & { contentUpdate?: ContentUpdate | null };

export type TrackContentViewRequest = TrackingRequest & { contentView: ContentView };

export type TrackOrderRequest = TrackingRequest & { order: Order };

export type TrackProductAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ProductAdministrativeAction | null;
};

export type TrackProductCategoryAdministrativeActionRequest = TrackingRequest & {
  administrativeAction?: ProductCategoryAdministrativeAction | null;
};

export type TrackProductCategoryUpdateRequest = TrackingRequest & {
  productCategoryUpdate?: ProductCategoryUpdate | null;
};

export type TrackProductCategoryViewRequest = TrackingRequest & { productCategoryView: ProductCategoryView };

export type TrackProductUpdateRequest = TrackingRequest & { productUpdate?: ProductUpdate | null };

export type TrackProductViewRequest = TrackingRequest & { productView: ProductView };

export type TrackSearchTermRequest = TrackingRequest & { searchTerm?: SearchTerm | null };

export type TrackUserUpdateRequest = TrackingRequest & { userUpdate?: UserUpdate | null };

export interface Trackable {
  $type: string;
  custom?: Record<string, string | null>;
}

export interface TrackingRequest {
  $type: string;
  custom?: Record<string, string | null>;
}

export type TriggerConfigurationCollectionResponse = TimedResponse & {
  configurations?:
    | (
        | AbandonedCartTriggerConfiguration
        | ContentCategoryInterestTriggerConfiguration
        | ProductCategoryInterestTriggerConfiguration
        | ProductInterestTriggerConfiguration
        | UserActivityTriggerConfiguration
      )[]
    | null;
};

export type TriggerConfigurationRequest = LicensedRequest & { id: string; type?: number | null };

export type TriggerConfigurationResponse = TimedResponse & {
  configuration?:
    | AbandonedCartTriggerConfiguration
    | ContentCategoryInterestTriggerConfiguration
    | ProductCategoryInterestTriggerConfiguration
    | ProductInterestTriggerConfiguration
    | UserActivityTriggerConfiguration
    | null;
};

export type TriggerConfigurationsRequest = LicensedRequest & { type?: number | null };

export type TriggerResultRequest = LicensedRequest & { configurationId: string };

export type TriggerResultResponse = TimedResponse & { result?: ITriggerResult | null };

export interface TrimStringTransformer {
  valuesToTrim: string[];
}

export interface User {
  authenticatedId?: string | null;
  temporaryId?: string | null;
  email?: string | null;
  classifications?: Record<string, string | null>;
  identifiers?: Record<string, string | null>;
  data?: Record<string, DataValue>;
  fingerprint?: string | null;
}

export type UserActivityTriggerConfiguration = UserActivityTriggerResultTriggerConfiguration;

export interface UserActivityTriggerResultTriggerConfiguration {
  $type: string;
  custom?: Record<string, string | null>;

  /** @format uuid */
  id: string;
  name?: string | null;
  description?: string | null;
  group?: string | null;
  enabled: boolean;

  /** @format date-time */
  created: string;
  createdBy?: string | null;

  /** @format date-time */
  modified: string;
  modifiedBy?: string | null;

  /** @format int32 */
  withinTimeSpanMinutes: number;
  settings?: Record<string, string | null>;
  userConditions?: UserConditionCollection | null;
}

export interface UserCondition {
  $type: string;
  custom?: Record<string, string | null>;
  negated: boolean;
}

export interface UserConditionCollection {
  items?:
    | (
        | AndCondition
        | HasActivityCondition
        | HasAuthenticatedIdCondition
        | HasClassificationCondition
        | HasEmailCondition
        | HasIdentifierCondition
        | HasLineItemsInCartCondition
        | HasModifiedCartCondition
        | HasPlacedOrderCondition
        | HasRecentlyReceivedSameTriggerCondition
        | HasRecentlyReceivedTriggerCondition
        | OrCondition
      )[]
    | null;
}

export interface UserConditionConfiguration {
  conditions?: UserConditionCollection | null;
}

export type UserDetailsCollectionResponse = TimedResponse & { results?: UserResultDetails[][] | null };

export type UserFavoriteProductRelevanceModifier = RelevanceModifier & {
  sinceMinutesAgo: number;
  numberOfPurchasesWeight: number;
  mostRecentPurchaseWeight: number;
  ifNotPurchasedBaseWeight: number;
};

export type UserQuery = LicensedRequest & {
  criteria?: UserQueryCriteria[] | null;
  language?: Language | null;
  currency?: Currency | null;
};

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

export type UserUpdate = Trackable & {
  user?: User | null;
  kind: "None" | "UpdateAndAppend" | "ReplaceProvidedProperties" | "ClearAndReplace";
};

export interface ValueCondition {
  $type: string;
  negated: boolean;
}

export interface ValueConditionCollection {
  items?: (ContainsCondition | DistinctCondition | EqualsCondition | GreaterThanCondition | LessThanCondition)[] | null;
}

export interface ValueSelector {
  $type: string;
}

export type VariantAssortmentFilter = Filter & { assortments: number[] };

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

export type VariantIdFilter = Filter & { variantIds: string[] };

export interface VariantIndexConfiguration {
  id?: FieldIndexConfiguration | null;
  displayName?: FieldIndexConfiguration | null;
  specifications?: SpecificationsIndexConfiguration | null;
  data?: DataIndexConfiguration | null;
}

export type VariantListPriceFilter = Filter & { range: DecimalNullableRange; currency?: Currency | null };

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

export type VariantSalesPriceFilter = Filter & { range: DecimalNullableRange; currency?: Currency | null };

export type VariantSalesPriceRelevanceModifier = RelevanceModifier & {
  range?: DecimalNullableRange | null;
  currency?: Currency | null;
  multiplyWeightBy: number;
  negated: boolean;
};

export type VariantSpecificationFacet = StringValueFacet & { key: string };

export type VariantSpecificationFacetResult = StringValueFacetResult & { key?: string | null };

export type VariantSpecificationFilter = Filter & { key: string; filterOutIfKeyIsNotFound: boolean; equalTo: string };

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
