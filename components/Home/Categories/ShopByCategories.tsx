"use client";

import Link from "next/link";

import Container from "@/components/common/Container/Container";
import SectionHeader from "@/components/common/SectionHeader";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import ErrorState from "@/components/common/ErrorState/ErrorState";

import { ROUTES } from "@/constants/routes";

import { useCategories } from "@/hooks/useCategories";

import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";

export default function ShopByCategory() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useCategories();

    if (isLoading) {
        return (
            <section className="py-5">
                <Container>

                    <SectionHeader
                        title="Shop by Category"
                        subtitle="Browse our product categories."
                    />

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CategorySkeleton key={index} />
                        ))}
                    </div>

                </Container>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-5">
                <Container>

                    <ErrorState
                        title="Unable to load categories"
                        description="Please try again."
                        onRetry={refetch}
                    />

                </Container>
            </section>
        );
    }

    if (!data || data.data.length === 0) {
        return (
            <section className="py-20">
                <Container>

                    <EmptyState
                        title="No Categories Found"
                        description="Please check back later."
                    />

                </Container>
            </section>
        );
    }

    const categories = data.data;

    const desktopCategories = categories.slice(0, 6);

    return (
        <section className="py-10">
            <Container>

                <SectionHeader
                    title="Shop by Category"
                    subtitle="Browse products by category."
                    href={ROUTES.CATEGORIES}
                    actionText="View All"
                />

                {/* Desktop */}

                <div className="hidden gap-4 lg:grid lg:grid-cols-6">
                    {desktopCategories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>

                {/* Mobile & Tablet */}

                <div
                    className="
                        flex
                        gap-3
                        overflow-x-auto
                        no-scrollbar
                        lg:hidden
                    "
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="min-w-[230px] sm:min-w-[260px]"
                        >
                            <CategoryCard
                                category={category}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile View All */}

                {/* {showViewAll && (
                    <div className="mt-8 text-center lg:hidden">
                        <Link
                            href={ROUTES.CATEGORIES}
                            className="btn-outline"
                        >
                            View All Categories
                        </Link>
                    </div>
                )} */}

            </Container>
        </section>
    );
}