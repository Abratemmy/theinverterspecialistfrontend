"use client";

import Link from "next/link";

import SectionHeader from "@/components/common/SectionHeader";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

import {useProducts} from "@/hooks/useProducts";
import Container from "@/components/common/Container/Container";
import { ErrorState, LoadingState } from "@/components/common";

export default function FeaturedProducts() {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useProducts({
        featured: true,
        limit: 4,
    });

    //   if (isError) {
    //         return (
    //             <section className="py-20">
    //                 <Container>
    
                        
    
    //                 </Container>
    //             </section>
    //         );
    //     }

    return (
        <section className="py-10">
            <Container>

                <SectionHeader
                    title="Featured Products"
                    subtitle="Premium solar and power products carefully selected for you."
                    href="/products"
                    actionText="View All"
                />

                {/* Products */}
                {isLoading ? 
                    <div
                        className="
                            flex
                            gap-6
                            overflow-x-auto
                            pb-4
                            scrollbar-hide

                            lg:grid
                            lg:grid-cols-4
                            lg:overflow-visible
                        "
                    >
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                    key={index}
                                    className="
                                        min-w-[85%]
                                        sm:min-w-[48%]
                                        lg:min-w-0
                                    "
                                >
                                    <ProductSkeleton />
                            </div>
                        ))} 
                    </div>
              
                 : (isError ? <ErrorState
                            title="Unable to load products"
                            description="Please try again."
                            onRetry={refetch}
                        /> 
                        : 
                        <div>
                            <div
                                className="
                                    flex
                                    gap-6
                                    overflow-x-auto
                                    pb-4
                                    scrollbar-hide

                                    lg:grid
                                    lg:grid-cols-4
                                    lg:overflow-visible
                                "
                            >

                                {data?.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="
                                                min-w-[85%]
                                                sm:min-w-[48%]
                                                lg:min-w-0
                                            "
                                        >
                                            <ProductCard
                                                product={product}
                                            />
                                        </div>
                                    ))}
                            </div>

                            {/* Mobile View All */}

                            <div className="mt-8 flex justify-center md:hidden">
                                <Link
                                    href="/products"
                                    className="
                                        rounded-xl
                                        border
                                        border-primary
                                        px-6
                                        py-3
                                        font-semibold
                                        text-primary
                                        transition
                                        hover:bg-primary
                                        hover:text-white
                                    "
                                >
                                    View All Products
                                </Link>
                            </div>
                        </div>
                    )
                }

               

            </Container>
        </section>
    );
}