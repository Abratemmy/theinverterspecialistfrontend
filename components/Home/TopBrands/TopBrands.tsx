"use client";

import Link from "next/link";

import SectionHeader from "@/components/common/SectionHeader";
import LoadingState from "@/components/common/LoadingState/LoadingState";
import EmptyState from "@/components/common/EmptyState/EmptyState";

import useBrands from "@/hooks/useBrands";
import { ROUTES } from "@/constants/routes";

import BrandCarousel from "./BrandCarousel";
import Container from "@/components/common/Container/Container";

export default function TopBrands() {
    const {
        brands,
        loading,
        error,
        // refetch,
    } = useBrands();

    if (loading) return <LoadingState />;

    if (error) return <EmptyState 
            title="Unable to load categories"
            description="Please try again."
            // onRetry={refetch}
    />;

    const showViewAll = brands.length > 6;

    return (
        <section className="py-12">
            <Container>

                <SectionHeader
                    title="Our Trusted Brands"
                    subtitle="We partner with globally recognized manufacturers to deliver reliable solar and power solutions."
                    href={ROUTES.BRANDS}
                    actionText="View All"
                />

                

                <BrandCarousel
                    brands={
                        showViewAll
                            ? brands
                            : brands
                    }
                />

            </Container>
        </section>
    );
}