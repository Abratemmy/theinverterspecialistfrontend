"use client";

import Container from "@/components/common/Container/Container";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <section className="border-b bg-white">
            <Container>

                <div className="py-6">

                    <div className="grid grid-cols-12 gap-4">

                        {/* Search */}

                        <div className="col-span-8">

                            <div className="flex h-14 items-center rounded-lg border">

                                <input
                                    type="text"
                                    placeholder="Search for products, categories, brands..."
                                    className="h-full w-full rounded-l-lg px-5 outline-none"
                                />

                                <button className="px-5">

                                    <Search />

                                </button>

                            </div>

                        </div>

                        {/* Category */}

                        <select
                            className="
                            col-span-2
                            h-14
                            rounded-lg
                            border
                            px-4
                        "
                        >
                            <option>
                                All Categories
                            </option>

                        </select>

                        {/* Search Button */}

                        <button
                            className="
                            col-span-2
                            rounded-lg
                            bg-green-600
                            text-white
                            font-semibold
                            hover:bg-green-700
                        "
                        >
                            Search
                        </button>

                    </div>

                    {/* Popular Search */}

                    <div className="mt-5 flex flex-wrap items-center gap-3">

                        <span className="font-semibold">

                            Popular Searches:

                        </span>

                        {[
                            "Inverter",
                            "Solar Panel",
                            "Battery",
                            "Lithium Battery",
                            "Charge Controller",
                            "Solar System",
                        ].map((item) => (

                            <button
                                key={item}
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

                        ))}

                    </div>

                </div>

            </Container>
        </section>
    );
}