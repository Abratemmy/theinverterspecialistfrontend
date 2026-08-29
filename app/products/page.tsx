"use client";

import { useState, useEffect } from "react";

import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";

import ProductCard from "@/components/Home/FeaturedProducts/ProductCard";

import LoadingState from "@/components/common/LoadingState/LoadingState";
import EmptyState from "@/components/common/EmptyState/EmptyState";

import {useProducts} from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import useBrands from "@/hooks/useBrands";

import ProductFilters from "@/components/Products/ProductFilters";
import ProductPagination from "@/components/Products/ProductPagination";
import MobileFilterDrawer from "@/components/Products/MobileFilterDrawer";
import {
    useSearchParams,
    useRouter
} from "next/navigation";

import type {
    GetProductsParams,
} from "@/services/product.service";
import { Header } from "@/components/layout/Header";


export default function ProductsPage() {

    const searchParams =
    useSearchParams();

    const router =
        useRouter();


    const urlSearch =
        searchParams.get("search") || "";

    const urlCategory =
        searchParams.get("category") || "";

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const [page, setPage] =
        useState(1);

    const [category, setCategory] =
        useState<number | undefined>();

    const [brand, setBrand] =
        useState<number | undefined>();

    const [minPrice, setMinPrice] =
        useState<number | undefined>();

    const [maxPrice, setMaxPrice] =
        useState<number | undefined>();

    const [search, setSearch] =
        useState("");

    const [sort, setSort] =
        useState<GetProductsParams["sort"]>(
            "newest"
        );

    const [
        mobileFiltersOpen,
        setMobileFiltersOpen,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

    const {
        data: categoryData,
    } = useCategories();


    const categories =
        categoryData?.data ?? [];


    /*
    |--------------------------------------------------------------------------
    | Brands
    |--------------------------------------------------------------------------
    */

    const {
        data: brandData,
    } = useBrands();


    const brands =
        brandData?.data ?? [];


    /*
    |--------------------------------------------------------------------------
    | Products
    |--------------------------------------------------------------------------
    */

    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useProducts({

        page,

        limit: 8,

        brand,

        minPrice,

        maxPrice,

         search:
        urlSearch || undefined,

        category,
            
        sort,

    });


    const products =
        data?.products ?? [];


    const total =
        data?.total ?? 0;


    const totalPages =
        data?.totalPages ?? 0;


    /*
    |--------------------------------------------------------------------------
    | Selected filter labels
    |--------------------------------------------------------------------------
    */

    const selectedCategory =
        categories.find(
            (item) =>
                item.id === category
        );


    const selectedBrand =
        brands.find(
            (item) =>
                item.id === brand
        );


    /*
    |--------------------------------------------------------------------------
    | Has filters?
    |--------------------------------------------------------------------------
    */

    const hasFilters =
        category !== undefined ||
        brand !== undefined ||
        minPrice !== undefined ||
        maxPrice !== undefined ||
        search.trim() !== "";


    /*
    |--------------------------------------------------------------------------
    | Clear filters
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {

        setCategory(undefined);

        setBrand(undefined);

        setMinPrice(undefined);

        setMaxPrice(undefined);

        setSearch("");

        setPage(1);
    };


    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const changePage = (
        newPage: number
    ) => {

        if (
            newPage < 1 ||
            newPage > totalPages
        ) {
            return;
        }


        setPage(newPage);


        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <main>
            <Header showSearch />

            {/* =====================================================
                HERO
            ====================================================== */}

            <section
                className="
                    bg-gray-50
                    py-10
                    sm:py-14
                "
            >

                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Products",
                            },
                        ]}
                    />


                    <div
                        className="
                            mt-8
                            max-w-3xl
                        "
                    >

                        <span
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                                text-primary
                            "
                        >
                            Our Products
                        </span>


                        <h1
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            Solar & Power
                            <span className="text-primary">
                                {" "}Solutions
                            </span>
                        </h1>


                        <p
                            className="
                                mt-4
                                max-w-2xl
                                text-muted-foreground
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            Explore our complete collection of
                            quality solar panels, inverters,
                            batteries and power accessories.
                        </p>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                CATALOGUE
            ====================================================== */}

            <section className="py-section">

                <Container>

                    {/* Top */}

                    <div
                        className="
                            mb-8
                            flex
                            flex-col
                            gap-4

                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                "
                            >
                                All Products
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                {total}{" "}
                                {total === 1
                                    ? "product"
                                    : "products"}
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                gap-3
                            "
                        >

                            {/* Mobile filter */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileFiltersOpen(
                                        true
                                    )
                                }
                                className="
                                    flex
                                    h-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    px-5
                                    text-sm
                                    font-medium
                                    transition

                                    hover:border-primary
                                    hover:text-primary

                                    lg:hidden
                                "
                            >
                                Filters
                            </button>


                            {/* Sort */}

                            <select
                                value={
                                    sort ?? "newest"
                                }
                                onChange={(
                                    event
                                ) => {

                                    setSort(
                                        event.target
                                            .value as GetProductsParams["sort"]
                                    );

                                    setPage(1);

                                }}
                                className="
                                    h-11
                                    rounded-xl
                                    border
                                    bg-background
                                    px-4
                                    text-sm
                                    outline-none
                                    transition

                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/10
                                "
                            >

                                <option value="newest">
                                    Newest
                                </option>

                                <option value="featured">
                                    Featured
                                </option>

                                <option value="price_asc">
                                    Price: Low to High
                                </option>

                                <option value="price_desc">
                                    Price: High to Low
                                </option>

                                <option value="name">
                                    Name: A-Z
                                </option>

                                <option value="oldest">
                                    Oldest
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIVE FILTERS
                    ================================================== */}

                    {hasFilters && (

                        <div
                            className="
                                mb-8
                                flex
                                flex-wrap
                                items-center
                                gap-2
                            "
                        >

                            <span
                                className="
                                    mr-2
                                    text-sm
                                    font-medium
                                "
                            >
                                Active filters:
                            </span>


                            {selectedCategory && (

                                <button
                                    type="button"
                                    onClick={() => {

                                        setCategory(
                                            undefined
                                        );

                                        setPage(1);
                                    }}
                                    className="
                                        rounded-full
                                        bg-primary/10
                                        px-4
                                        py-2
                                        text-sm
                                        text-primary
                                    "
                                >
                                    {selectedCategory.name}
                                    {" ×"}
                                </button>

                            )}


                            {selectedBrand && (

                                <button
                                    type="button"
                                    onClick={() => {

                                        setBrand(
                                            undefined
                                        );

                                        setPage(1);
                                    }}
                                    className="
                                        rounded-full
                                        bg-primary/10
                                        px-4
                                        py-2
                                        text-sm
                                        text-primary
                                    "
                                >
                                    {selectedBrand.name}
                                    {" ×"}
                                </button>

                            )}


                            {(minPrice !== undefined ||
                                maxPrice !== undefined) && (

                                <button
                                    type="button"
                                    onClick={() => {

                                        setMinPrice(
                                            undefined
                                        );

                                        setMaxPrice(
                                            undefined
                                        );

                                        setPage(1);
                                    }}
                                    className="
                                        rounded-full
                                        bg-primary/10
                                        px-4
                                        py-2
                                        text-sm
                                        text-primary
                                    "
                                >
                                    Price Range ×
                                </button>

                            )}


                            {search.trim() && (

                                <button
                                    type="button"
                                    onClick={() => {

                                        setSearch("");

                                        setPage(1);
                                    }}
                                    className="
                                        rounded-full
                                        bg-primary/10
                                        px-4
                                        py-2
                                        text-sm
                                        text-primary
                                    "
                                >
                                    Search: {search} ×
                                </button>

                            )}


                            <button
                                type="button"
                                onClick={
                                    clearFilters
                                }
                                className="
                                    ml-2
                                    text-sm
                                    font-medium
                                    text-muted-foreground
                                    hover:text-primary
                                "
                            >
                                Clear all
                            </button>

                        </div>

                    )}


                    {/* =================================================
                        CONTENT
                    ================================================== */}

                    <div
                        className="
                            grid
                            gap-8
                            lg:grid-cols-[250px_minmax(0,1fr)]
                        "
                    >

                        {/* SIDEBAR */}

                        <aside
                            className="
                                hidden
                                lg:block
                            "
                        >

                            <ProductFilters

                                categories={
                                    categories
                                }

                                brands={
                                    brands
                                }

                                selectedCategory={
                                    category
                                }

                                selectedBrand={
                                    brand
                                }

                                minPrice={
                                    minPrice
                                }

                                maxPrice={
                                    maxPrice
                                }

                                onCategoryChange={(
                                    value
                                ) => {

                                    setCategory(
                                        value
                                    );

                                    setPage(1);
                                }}

                                onBrandChange={(
                                    value
                                ) => {

                                    setBrand(
                                        value
                                    );

                                    setPage(1);
                                }}

                                onPriceChange={(
                                    min,
                                    max
                                ) => {

                                    setMinPrice(
                                        min
                                    );

                                    setMaxPrice(
                                        max
                                    );

                                    setPage(1);
                                }}

                                onClear={
                                    clearFilters
                                }

                            />

                        </aside>


                        {/* PRODUCTS */}

                        <div className="min-w-0">

                            <div
                                className="
                                    mb-5
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Showing{" "}
                                    {products.length}{" "}
                                    of{" "}
                                    {total}
                                </p>


                                {isFetching &&
                                    !isLoading && (

                                        <span
                                            className="
                                                text-xs
                                                text-primary
                                            "
                                        >
                                            Updating...
                                        </span>

                                    )}

                            </div>


                            {isLoading ? (

                                <LoadingState />

                            ) : error ? (

                                <EmptyState
                                    title="Unable to load products"
                                    description="Something went wrong while loading products. Please try again."
                                />

                            ) : products.length === 0 ? (

                                <EmptyState
                                    title="No products found"
                                    description="Try changing your filters or search criteria."
                                />

                            ) : (

                                <>

                                    <div
                                        className={`
                                            grid
                                            grid-cols-2
                                            gap-4

                                            sm:gap-6

                                            lg:grid-cols-3

                                            xl:grid-cols-4

                                            transition-opacity
                                            duration-200

                                            ${
                                                isFetching
                                                    ? "opacity-60"
                                                    : "opacity-100"
                                            }
                                        `}
                                    >

                                        {products.map(
                                            (product) => (

                                                <ProductCard
                                                    key={
                                                        product.id
                                                    }
                                                    product={
                                                        product
                                                    }
                                                />

                                            )
                                        )}

                                    </div>


                                    {totalPages > 1 && (

                                        <ProductPagination
                                            currentPage={
                                                page
                                            }

                                            totalPages={
                                                totalPages
                                            }

                                            onPageChange={
                                                changePage
                                            }
                                        />

                                    )}

                                </>

                            )}

                        </div>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                MOBILE DRAWER
            ====================================================== */}

            {mobileFiltersOpen && (

                <MobileFilterDrawer

                    categories={
                        categories
                    }

                    brands={
                        brands
                    }

                    selectedCategory={
                        category
                    }

                    selectedBrand={
                        brand
                    }

                    minPrice={
                        minPrice
                    }

                    maxPrice={
                        maxPrice
                    }

                    onCategoryChange={(
                        value
                    ) => {

                        setCategory(
                            value
                        );

                        setPage(1);
                    }}

                    onBrandChange={(
                        value
                    ) => {

                        setBrand(
                            value
                        );

                        setPage(1);
                    }}

                    onPriceChange={(
                        min,
                        max
                    ) => {

                        setMinPrice(
                            min
                        );

                        setMaxPrice(
                            max
                        );

                        setPage(1);
                    }}

                    onClear={
                        clearFilters
                    }

                    onClose={() =>
                        setMobileFiltersOpen(
                            false
                        )
                    }

                />

            )}

        </main>
    );
}