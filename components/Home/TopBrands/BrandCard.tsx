"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import { Brand } from "@/types/brand";

interface Props {
    brand: Brand;
}

export default function BrandCard({
    brand,
}: Props) {
    return (
        <Link
            href={`/brands/${brand.slug}`}
            className="
                group
                flex
                h-18
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary
                hover:shadow-xl
            "
        >
            <div className="relative h-20 w-32">
                <ImageWithFallback
                    src={brand.logo}
                    alt={brand.name}
                    imageType="brand"
                    fill
                    className="
                        object-contain
                        transition-transform
                        duration-300
                        group-hover:scale-110
                    "
                />
            </div>
{/* 
            <h3
                className="
                    mt-6
                    text-lg
                    font-semibold
                    transition-colors
                    duration-300
                    group-hover:text-primary
                "
            >
                {brand.name}
            </h3>

            <span
                className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:text-primary
                "
            >
                Explore
                <ArrowRight size={15} />
            </span> */}
        </Link>
    );
}