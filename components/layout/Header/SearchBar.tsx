"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import Container from "@/components/common/Container/Container";

export default function SearchBar() {

    const router = useRouter();


    // ========================================================
    // SEARCH
    // ========================================================

    const [
        search,
        setSearch
    ] = useState("");


    // ========================================================
    // CATEGORY
    // ========================================================

    const [
        category,
        setCategory
    ] = useState("");


    // ========================================================
    // SEARCH
    // ========================================================

    const handleSearch = () => {

        const params =
            new URLSearchParams();


        const searchValue =
            search.trim();


        // ====================================================
        // SEARCH TEXT
        // ====================================================

        if (searchValue) {

            params.set(
                "search",
                searchValue
            );

        }


        // ====================================================
        // CATEGORY
        // ====================================================

        if (category) {

            params.set(
                "category",
                category
            );

        }


        // ====================================================
        // GO TO PRODUCTS PAGE
        // ====================================================

        const query =
            params.toString();


        if (query) {

            router.push(
                `/products?${query}`
            );

        } else {

            router.push(
                "/products"
            );

        }

    };


    // ========================================================
    // ENTER KEY
    // ========================================================

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (
            event.key === "Enter"
        ) {

            handleSearch();

        }

    };


    // ========================================================
    // POPULAR SEARCH
    // ========================================================

    const popularSearches = [

        "Inverter",

        "Solar Panel",

        "Battery",

        "Lithium Battery",

        "Charge Controller",

        "Solar System"

    ];


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <section className="border-b bg-white">

            <Container>

                <div className="py-6">


                    {/* ================================================== */}
                    {/* SEARCH AREA */}
                    {/* ================================================== */}
                    {/* Parent Container: Centers everything and caps the width at 60% on desktop */}
                    <div className="w-full lg:max-w-[90%] mx-auto ">
                        
                        {/* Grid System: Handles the stacking on mobile and side-by-side on desktop */}
                        <div className="grid grid-cols-12 gap-4 items-stretch w-full">

                            {/* INPUT CONTAINER (Full width on mobile, 8 out of 12 columns on desktop) */}
                            <div className="col-span-12 lg:col-span-9 bg-red-500 rounded-lg"> 
                                <div className="flex h-14 items-center rounded-lg border bg-white border-[var(--color-primary)]">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search for products, categories, brands..."
                                        className="h-full w-full rounded-l-lg px-5 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        className="px-5 text-gray-600 hover:text-green-600"
                                    >
                                        <Search size={22} />
                                    </button>
                                </div>
                            </div>

                            {/* SEARCH BUTTON (Full width on mobile, 3 out of 12 columns on desktop) */}
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="col-span-12 h-14 
                                rounded-lg bg-[var(--color-primary)] font-semibold text-white hover:bg-[var(--color-primary-dark)] lg:col-span-3"
                            >
                                Search
                            </button>

                        </div>
                    </div>




                    {/* ================================================== */}
                    {/* POPULAR SEARCHES */}
                    {/* ================================================== */}

                    <div className="
                        mt-5
                        flex
                        flex-wrap
                        items-center
                        justify-center 
                        gap-3
                        text-center
                    ">

                        <span className="
                            font-semibold
                        ">

                            Popular Searches:

                        </span>


                        {popularSearches.map(
                            (item) => (

                                <button
                                    key={item}

                                    type="button"

                                    onClick={() => {

                                        setSearch(
                                            item
                                        );

                                        router.push(
                                            `/products?search=${encodeURIComponent(
                                                item
                                            )}`
                                        );

                                    }}

                                    className="
                                        rounded-md
                                        border
                                        px-4
                                        py-2
                                        text-sm
                                        hover:border-green-600
                                        hover:text-green-600
                                    "
                                >

                                    {item}

                                </button>

                            )
                        )}

                    </div>

                </div>

            </Container>

        </section>

    );

}