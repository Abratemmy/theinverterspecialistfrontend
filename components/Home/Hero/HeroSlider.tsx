"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { HERO_SLIDES } from "@/constants/hero";

export default function HeroSlider() {
    const autoplay = Autoplay({
        delay: 5000,
        stopOnInteraction: false,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
        },
        [autoplay]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi]
    );

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);

        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div className="relative">

            {/* Slider */}

            <div
                ref={emblaRef}
                className="overflow-hidden rounded-3xl shadow-2xl"
            >
                <div className="flex">

                    {HERO_SLIDES.map((slide) => (

                        <div
                            key={slide.id}
                            className="min-w-0 flex-[0_0_100%]"
                        >
                            <div className="relative h-[320px] sm:h-[450px] lg:h-[600px]">

                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority
                                    className="object-cover"
                                />

                            </div>
                        </div>

                    ))}

                </div>
            </div>

            {/* Previous */}

            <button
                onClick={scrollPrev}
                className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                rounded-full
                bg-white
                p-3
                shadow-lg
                transition
                hover:bg-green-600
                hover:text-white
                "
            >
                <ChevronLeft size={22} />
            </button>

            {/* Next */}

            <button
                onClick={scrollNext}
                className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                rounded-full
                bg-white
                p-3
                shadow-lg
                transition
                hover:bg-green-600
                hover:text-white
                "
            >
                <ChevronRight size={22} />
            </button>

            {/* Dots */}

            <div className="mt-6 flex justify-center gap-3">

                {HERO_SLIDES.map((_, index) => (

                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            selectedIndex === index
                                ? "w-10 bg-green-600"
                                : "w-3 bg-gray-300 hover:bg-green-300"
                        }`}
                    />

                ))}

            </div>

        </div>
    );
}