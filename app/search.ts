import { UserFactory, Searcher, ProductSearchBuilder, ContentSearchBuilder, SearchCollectionBuilder, SelectedVariantPropertiesSettings } from "../lib/src";

const searcher = new Searcher("x", "y");

const productSearchBuilder = new ProductSearchBuilder(
    {
        language: "da-DK",
        currency: "DKK",
        displayedAtLocation: "search page",
        user: UserFactory.anonymous()
    })

    .setIndex("default")
    .addCustom("key1", "value")
    .removeCustom("key1")

    .setProductProperties({
        displayName: true,
        pricing: true,
        allData: true,
        kaf: "",
    })
    .setVariantProperties({
        displayName: true,
        pricing: true,
        allData: true,
    } as SelectedVariantPropertiesSettings)
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

searcher.searchContents(contentSearchBuilder.build());

const searchCollectionBuilder = new SearchCollectionBuilder({
    language: "da-DK",
    currency: "DKK",
    displayedAtLocation: "search page",
    user: UserFactory.anonymous()
})
.filters(filters => filters.addProductAssortmentFilter(137))
.addRequest(productSearchBuilder.build())
.addBuilder(contentSearchBuilder);

searcher.batch(searchCollectionBuilder.build());