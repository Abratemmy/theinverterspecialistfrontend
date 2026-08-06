"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Category } from "@/types/category";
import ImageWithFallback from "@/components/common/ImageWithFallback";

interface Props {
    category: Category;
}

export default function CategoryCard({
    category,
}: Props) {
    return (
        <Link
            href={`/categories/${category.slug}`}
            className="
                group
                block
                overflow-hidden
                rounded-3xl
                bg-card
                shadow-card
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
            "
        >
            {/* Image */}

            <div className="relative h-36 overflow-hidden">
                <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    fill
                    imageType="category"
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                        object-contain
                    "
                />

                {/* Overlay */}

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/20
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:bg-black/70
                        group-hover:opacity-100
                    "
                >
                    <span className="flex items-center gap-2 text-lg font-semibold text-white">
                        View Products
                        <ArrowRight size={20} 
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-2
                        "
                        />
                    </span>
                </div>

            </div>

            {/* Name */}

            <div className="p-2">

                <h3
                    className="
                        text-lg
                        font-semibold
                        transition-colors
                        duration-300
                        text-center
                        group-hover:text-primary
                    "
                >
                    {category.name}
                </h3>

            </div>

        </Link>
    );
}