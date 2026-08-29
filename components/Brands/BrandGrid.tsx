"use client";

import { useMemo, useState } from "react";

import Container from "@/components/common/Container/Container";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import LoadingState from "@/components/common/LoadingState/LoadingState";

import useBrands from "@/hooks/useBrands";

import BrandCard from "@/components/Home/TopBrands/BrandCard";

export default function BrandGrid() {

    const {
        data,
        isLoading,
        error,
    } = useBrands();

    const [search, setSearch] = useState("");

    const brands = data?.data ?? [];


    const filteredBrands = useMemo(() => {

        const value = search.trim().toLowerCase();

        if (!value) {
            return brands;
        }

        return brands.filter((brand) =>
            brand.name
                .toLowerCase()
                .includes(value)
        );

    }, [brands, search]);


    if (isLoading) {
        return (
            <section className="py-section">
                <Container>
                    <LoadingState />
                </Container>
            </section>
        );
    }


    if (error) {
        return (
            <section className="py-section">
                <Container>

                    <EmptyState
                        title="Unable to load brands"
                        description="We couldn't load the brands at the moment. Please try again."
                    />

                </Container>
            </section>
        );
    }


    return (
        <section className="py-section">
            <Container>

                {/* Search */}
                <div
                    className="
                        mb-10
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>
                        <h2 className="text-2xl font-bold">
                            All Brands
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {brands.length}{" "}
                            {brands.length === 1
                                ? "brand"
                                : "brands"}
                        </p>
                    </div>


                    <div className="relative w-full sm:max-w-sm">

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search brands..."
                            className="
                                h-12
                                w-full
                                rounded-xl
                                border
                                border-[var(--color-primary)]
                                bg-background
                                px-4
                                outline-none
                                transition-all

                                placeholder:text-muted-foreground

                                focus:border-primary border-[var(--color-primary-dark)]
                                focus:ring-2
                                focus:ring-primary/10
                            "
                        />

                    </div>

                </div>


                {/* Results */}

                {filteredBrands.length === 0 ? (

                    <div className="py-12">

                        <EmptyState
                            title="No brands found"
                            description={
                                search
                                    ? `We couldn't find a brand matching "${search}".`
                                    : "There are currently no brands available."
                            }
                        />

                        {search && (
                            <div className="mt-4 text-center">

                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="
                                        text-sm
                                        font-medium
                                        text-primary
                                        hover:underline
                                    "
                                >
                                    Clear search
                                </button>

                            </div>
                        )}

                    </div>

                ) : (

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-4

                            sm:grid-cols-3
                            sm:gap-5

                            md:grid-cols-4

                            lg:grid-cols-5

                            xl:grid-cols-6
                        "
                    >

                        {filteredBrands.map((brand) => (

                            <BrandCard
                                key={brand.id}
                                brand={brand}
                            />

                        ))}

                    </div>

                )}

            </Container>
        </section>
    );
}