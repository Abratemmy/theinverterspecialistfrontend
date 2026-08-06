"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { useCallback } from "react";

import { Brand } from "@/types/brand";

import BrandCard from "./BrandCard";
import CarouselButton from "./CarouselButton";

interface Props {
    brands: Brand[];
}

export default function BrandCarousel({
    brands,
}: Props) {

    const [emblaRef, emblaApi] =
        useEmblaCarousel(
            {
                loop: true,
                align: "start",
            },
            [
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                }),
            ]
        );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    return (
        <div
            className="
                flex
                items-center
                gap-6
            "
        >
            <CarouselButton
                direction="left"
                onClick={scrollPrev}
            />

            <div
                className="overflow-hidden flex-1"
                ref={emblaRef}
            >
                <div className="flex">

                    {brands.map((brand) => (

                        <div
                            key={brand.id}
                            className="
                                min-w-0
                                flex-[0_0_50%]

                                sm:flex-[0_0_33%]

                                md:flex-[0_0_25%]

                                lg:flex-[0_0_20%]

                                xl:flex-[0_0_16.66%]

                                px-3
                            "
                        >
                            <BrandCard
                                brand={brand}
                            />
                        </div>

                    ))}

                </div>
            </div>

            <CarouselButton
                direction="right"
                onClick={scrollNext}
            />
        </div>
    );
}