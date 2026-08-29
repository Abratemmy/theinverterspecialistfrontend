"use client";

import SectionHeader from "@/components/common/SectionHeader";
import LoadingState from "@/components/common/LoadingState/LoadingState";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Container from "@/components/common/Container/Container";

import useBrands from "@/hooks/useBrands";
import { ROUTES } from "@/constants/routes";

import BrandCarousel from "./BrandCarousel";

export default function TopBrands() {

    const {
        data,
        isLoading,
        error,
    } = useBrands();


    const brands = data?.data ?? [];


    return (
        <section className="py-12">

            <Container>

                <SectionHeader
                    title="Our Trusted Brands"
                    subtitle="We partner with globally recognized manufacturers to deliver reliable solar and power solutions."
                    href={ROUTES.BRANDS}
                    actionText="View All"
                />


                {isLoading ? (

                    <LoadingState />

                ) : error ? (

                    <EmptyState
                        title="Unable to load top brands"
                        description="Please try again."
                    />

                ) : (

                    <BrandCarousel
                        brands={brands}
                    />

                )}

            </Container>

        </section>
    );
}