"use client";

import { useMemo, useState } from "react";

import Container from "@/components/common/Container/Container";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import LoadingState from "@/components/common/LoadingState/LoadingState";

import {useCategories} from "@/hooks/useCategories";

import CategoryCard from "../Home/Categories/CategoryCard";

export default function CategoryGrid() {

    const { data, isLoading, error } =
        useCategories();

    const [search, setSearch] =
        useState("");

    const categories =
        data?.data ?? [];

    const filtered =
        useMemo(() => {

            return categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }, [categories, search]);

    if (isLoading)
        return <LoadingState />;

    if (error)
        return (
            <EmptyState
                title="Unable to load categories"
                description="Please try again."
            />
        );
    

    return (

        <section className="py-2">

            <Container>

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
                            All Categories
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {categories.length}{" "}
                            {categories.length === 1
                                ? "category"
                                : "categories"}
                        </p>
                    </div>


                    <div className="relative w-full sm:max-w-sm">

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search categories..."
                            className="
                                h-12
                                w-full max-w-md
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


                {filtered.length === 0 ? (
                    <section className="py-section">
                        <Container>
                            <EmptyState
                                title="No Category Found"
                                description={`No category matches "${search}". Please try another keyword.`}
                            />
                        </Container>
                    </section>
                ):(
                    <div
                    className="
                        grid
                        gap-8

                        sm:grid-cols-2

                        lg:grid-cols-3

                        xl:grid-cols-4
                    "
                >

                    {filtered.map((category) => (

                        <CategoryCard
                            key={category.id}
                            category={category}
                        />

                    ))}

                    </div>
                )}
                

            </Container>

        </section>

    );
}