import { UserFactory, Searcher, ProductSearchBuilder, ContentSearchBuilder, SearchCollectionBuilder, SearchTermPredictionBuilder } from "@relewise/client";

const searcher = new Searcher("x", "y");

const productSearchBuilder = new ProductSearchBuilder(
    {
        language: "da-DK",
        currency: "DKK",
        displayedAtLocation: "search page",
        user: UserFactory.anonymous()
    })

    .setIndex("default")

    .setProductProperties({
        displayName: true,
        pricing: true,
        allData: true
    })
    .setVariantProperties({
        displayName: true,
        pricing: true,
        allData: true,
    })
    .setExplodedVariants(5)
    .setRecommendationSettings({take: 1, onlyIncludeRecommendationsWhenLessResultsThan: 1})

    .setTerm('hello')

    .pagination(p => p
        .setPageSize(30)
        .setPage(1))

    .filters(filters => filters
        .addVariantsAssortmentFilter(137, true)
        .addVariantsAssortmentFilter([137], true)
        .addProductAssortmentFilter([137], true)
        .addProductAssortmentFilter(137, true)
        .addProductDataFilter("size", "XL"))
    .postFilters(filters => filters
        .addProductAssortmentFilter(137)
        .addProductAssortmentFilter([137], true)
        .addProductDataFilter("size", "XL"));

searcher.searchProducts(productSearchBuilder.build());

const contentSearchBuilder = new ContentSearchBuilder({
    language: "da-DK",
    currency: "DKK",
    displayedAtLocation: "search page",
    user: UserFactory.anonymous()
})
.filters(filters => filters.addProductAssortmentFilter(137))
.setTerm("")
.filters(filters => filters.addProductAssortmentFilter(137));

const searchTermPredictionBuilder = new SearchTermPredictionBuilder({
    language: "da-DK",
    currency: "DKK",
    displayedAtLocation: "search page",
    user: UserFactory.anonymous()
})
.filters(filters => filters.addProductAssortmentFilter(137))
.setTerm("")
.addEntityType("Brand", "Content")
.filters(filters => filters.addProductAssortmentFilter(137));

searcher.searchTermPrediction(searchTermPredictionBuilder.build());

const searchCollectionBuilder = new SearchCollectionBuilder({
    language: "da-DK",
    currency: "DKK",
    displayedAtLocation: "search page",
    user: UserFactory.anonymous()
})
.filters(filters => filters.addProductAssortmentFilter(137))
.addRequest(productSearchBuilder.build())
.addBuilder(contentSearchBuilder)
.addBuilder(searchTermPredictionBuilder);

searcher.batch(searchCollectionBuilder.build());