import { UserFactory, Searcher, ProductSearchBuilder, ContentSearchBuilder, SearchCollectionBuilder, SearchTermPredictionBuilder, FilterBuilder, StringDataValue, ProductSortingBuilder } from "@relewise/client";

const searcher = new Searcher("x", "y");

const settings = {
    language: "da-DK",
    currency: "DKK",
    displayedAtLocation: "search page",
    user: UserFactory.anonymous()
};

const defaultSearchBuilderExample = new ProductSearchBuilder(settings)
    .setProductProperties({
        displayName: true,
        pricing: true,
        dataKeys: ["Url", "ShortDescription", "ImageUrls"]
    })
    .pagination(p => p
        .setPageSize(30)
        .setPage(1))
    .facets(f => f
        .addBrandFacet(["HP", "Lenovo"])
        .addSalesPriceRangeFacet("Product", 100, 500)
        .addVariantSpecificationFacet("Size", ["XL"])
    )
    .filters(f => f
        .addProductAssortmentFilter(1)
        .addVariantAssortmentFilter(1)
    );

searcher.searchProducts(defaultSearchBuilderExample.build());

const productSearchBuilder = new ProductSearchBuilder(settings)

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
    .setRecommendationSettings({ take: 1, onlyIncludeRecommendationsWhenLessResultsThan: 1 })

    .setTerm('hello')

    .pagination(p => p
        .setPageSize(30)
        .setPage(1))

    .facets(f => f
        .addBrandFacet()
        .addBrandFacet(["HP", "Lenovo"])
    )
    .filters((filters: FilterBuilder) => filters
        .addVariantAssortmentFilter(137, true)
        .addVariantAssortmentFilter([137], true)
        .addProductAssortmentFilter([137], true)
        .addProductAssortmentFilter(137, true)
        .addProductDataFilter("size", f => f.addEqualsCondition(new StringDataValue("XL"))))

    .postFilters((filters: FilterBuilder) => filters
        .addProductAssortmentFilter(137)
        .addProductAssortmentFilter([137], true))

    .sorting(s => s
        .sortByProductAttribute("DisplayName", "Ascending", (n: ProductSortingBuilder) => n
            .sortByProductRelevance()));

searcher.searchProducts(productSearchBuilder.build());

const contentSearchBuilder = new ContentSearchBuilder(settings)
    .filters(filters => filters.addProductAssortmentFilter(137))
    .setTerm("")
    .filters(filters => filters.addProductAssortmentFilter(137));

const searchTermPredictionBuilder = new SearchTermPredictionBuilder(settings)
    .filters(filters => filters.addProductAssortmentFilter(137))
    .setTerm("")
    .addEntityType("Brand", "Content")
    .filters(filters => filters.addProductAssortmentFilter(137));

searcher.searchTermPrediction(searchTermPredictionBuilder.build());

const searchCollectionBuilder = new SearchCollectionBuilder(settings)
    .filters(filters => filters.addProductAssortmentFilter(137))
    .addRequest(productSearchBuilder.build())
    .addBuilder(contentSearchBuilder)
    .addBuilder(searchTermPredictionBuilder);

searcher.batch(searchCollectionBuilder.build());