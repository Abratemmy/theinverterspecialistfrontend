"use client";

import Link from "next/link";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";

import { Product } from "@/types/product";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import formatCurrency from "@/utils/formatCurrency";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const hasDiscount =
        Number(product.discount_price) > 0 &&
        Number(product.discount_price) < Number(product.price);

        console.log("Primary Image:", product);

    return (
        <div
            className="
                group
                relative
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
            {/* Sale Badge */}
            {hasDiscount && (
                <div
                    className="
                        absolute
                        left-4
                        top-4
                        z-20
                        rounded-full
                        bg-primary
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-white
                    "
                >
                    -{product.discountPercentage}%
                </div>
            )}

            {/* Wishlist */}

            <button
                className="
                    absolute
                    right-4
                    top-4
                    z-20
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    shadow-md
                    transition
                    hover:bg-[var(--color-primary)]
                    hover:text-white
                    cursor-pointer
                "
            >
                <Heart size={18} />
            </button>

            {/* Image */}

            <Link
                href={`/products/${product.slug}`}
                className="block"
            >
                <div className="relative h-72 overflow-hidden">
                    <ImageWithFallback
                        src={product.primaryImage}
                        alt={product.name}
                        imageType="product"
                        fill
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                        "
                    />

                    {/* Quick View */}

                    <div
                        className="
                            absolute
                            bottom-4
                            right-4
                            translate-y-6
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:translate-y-0
                            group-hover:opacity-100
                            cursor-pointer
                        "
                    >
                        <button
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-white/90
                                bg-[var(--color-primary)]
                                shadow-lg
                                hover:bg-primary
                                hover:text-white
                                cursor-pointer
                               
                            "
                        >
                            <Eye size={18} />
                        </button>
                    </div>
                </div>
            </Link>

            {/* Content */}

            <div className="p-2">

                {/* Brand */}

                <p className="text-sm font-medium text-[var(--color-text-light)]">
                    {product.brand.name}
                </p>

                {/* Product Name */}

                <Link href={`/products/${product.slug}`}>
                    <h3
                        className="
                            line-clamp-2
                            min-h-[46px]
                            text-md
                            font-semibold
                            transition-colors
                            duration-300
                            group-hover:text-primary
                            text-[var(--color-text)]
                        "
                    >
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}

                {/* <div className="mt-3 flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            size={15}
                            className="fill-yellow-400 text-yellow-400"
                        />
                    ))

                    }

                    <span className="ml-2 text-sm text-muted">
                        (0)
                    </span>
                </div> */}

                {/* Price */}

                <div className="mt-2">

                    {hasDiscount ? (
                        <div className="flex justify-between w-full items-center g-10">
                            <p className="text-2xl font-bold text-primary">
                                {formatCurrency(
                                    product.discount_price
                                )}
                            </p>

                            <p className="text-sm text-muted line-through">
                                {formatCurrency(product.price)}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xl font-bold text-primary">
                            {formatCurrency(product.price)}
                        </p>
                    )}

                </div>

                {/* Stock */}

                <div className="mt-1">

                    {product.stockStatus === "in_stock" && (
                        <span className="text-sm text-primary">
                            In Stock
                        </span>
                    )}

                    {product.stockStatus === "low_stock" && (
                        <span className="text-sm text-orange-500">
                            Low Stock
                        </span>
                    )}

                    {product.stockStatus === "out_of_stock" && (
                        <span className="text-sm text-red-500">
                            Out of Stock
                        </span>
                    )}

                </div>

                {/* Button */}

                <button
                    className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-5
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-[var(--color-primary-dark)]
                        cursor-pointer
                    "
                >
                    <ShoppingCart size={18} />

                    Add To Cart
                </button>

            </div>
        </div>
    );
}