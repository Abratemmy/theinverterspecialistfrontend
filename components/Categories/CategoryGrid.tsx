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
    
    if (filtered.length === 0) {
        return (
            <section className="py-section">
                <Container>
                    <div className="mb-12">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search category..."
                            className="
                                h-14
                                w-full
                                rounded-xl
                                border
                                px-5
                                outline-none
                                focus:border-primary
                            "
                        />
                    </div>

                    <EmptyState
                        title="No Category Found"
                        description={`No category matches "${search}". Please try another keyword.`}
                    />
                </Container>
            </section>
        );
    }

    return (

        <section className="py-section">

            <Container>

                <div className="mb-12">

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search category..."
                        className="
                            h-14
                            w-full
                            rounded-xl
                            border
                            px-5
                            outline-none

                            focus:border-primary
                        "
                    />

                </div>

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

            </Container>

        </section>

    );
}