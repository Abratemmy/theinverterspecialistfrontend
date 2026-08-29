"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Heart,
    Eye,
    ShoppingCart,
     Loader2,
} from "lucide-react";

import { Product } from "@/types/product";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import formatCurrency from "@/utils/formatCurrency";
import {
    addToWishlist,
    removeFromWishlist,
} from "@/services/wishlist.service";

import useCart from "@/hooks/useCart";
import { showSuccess, showError } from "@/lib/toast";
import { useRouter } from 'next/navigation'; 
import api from "@/lib/axios";

interface Props {
    product: Product;
}

export default function ProductCard({
    product,
}: Props) {

     const router = useRouter();
    // ============================================================
    // CART
    // ============================================================
    const {
        addToCartAsync,
        adding,
    } = useCart();

    // const { showToast } = useToast();


    // ============================================================
    // DISCOUNT
    // ============================================================

    const price = Number(product.price);

    const discountPrice =
        product.discount_price !== null &&
        product.discount_price !== undefined
            ? Number(product.discount_price)
            : null;

    const hasDiscount =
        Number.isFinite(price) &&
        price > 0 &&
        discountPrice !== null &&
        Number.isFinite(discountPrice) &&
        discountPrice > 0 &&
        discountPrice < price;

    const discountPercentage = hasDiscount
        ? Math.round(
            ((price - discountPrice) / price) * 100
        )
        : 0;

    // ============================================================
    // STOCK
    // ============================================================

    const isOutOfStock =
        product.stockStatus === "out_of_stock";

        console.log("productsssss", product)
    
    // ============================================================
    // Product image
    // ============================================================

    const productImage = product.media?.find(
        (media) => media.media_type === "image"
    );

    // ============================================================
    // ADD TO CART
    // ============================================================

    const handleAddToCart = async () => {

        if (isOutOfStock) {

            showError(
                "This product is currently out of stock."
            );

            return;
        }

        try {

            const result =
                await addToCartAsync({
                    product_id: product.id,
                    quantity: 1,
                });


            // ----------------------------------------------------
            // Display backend message
            // ----------------------------------------------------

            showSuccess(
                result?.message ||
                "Product added to cart successfully."
            );

        } catch (error: any) {

            console.error(
                "Add to cart error:",
                error
            );


            // ----------------------------------------------------
            // Backend error
            // ----------------------------------------------------

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to add product to cart.";


            showError(message);

        }

    };

    // ============================================================
    // wishlist
    // ============================================================
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [wishlistLoading, setWishlistLoading] = useState(false);

    // ============================================================
    // ADD TO WISHLIST
    // ============================================================
    interface UserData {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone?: string | null;
        role: string;
        profile_image?: string | null;
        status: string;
    }
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {

        const getCurrentUser = async () => {

            try {

                const response =
                    await api.get("/auth/me");

                const currentUser =
                    response.data?.data;

                if (currentUser) {

                    setUser(currentUser);

                }

            } catch (error: unknown) {

                // User is simply not logged in.
                // Don't show an error here because
                // guests are allowed to browse products.

                console.log(
                    "No authenticated user."
                );

            }

        };


        getCurrentUser();

    }, []);
    const handleWishlist = async () => {

        // User must be logged in
        if (!user) {

            showError(
                "Please login before adding to wishlist."
            );

            return;
        }

        try {

            setWishlistLoading(true);


            if (isWishlisted) {

                await removeFromWishlist(
                    product.id
                );

                setIsWishlisted(false);

                showSuccess(
                    "Removed from wishlist."
                );

            } else {

                await addToWishlist(
                    product.id
                );

                setIsWishlisted(true);

                showSuccess(
                    "Added to wishlist."
                );

            }

        } catch (error: unknown) {

            console.error(
                "Wishlist error:",
                error
            );


            showError(
                error?.response?.data?.message ||
                "Unable to update wishlist."
            );

        } finally {

            setWishlistLoading(false);

        }

    };


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

            {/* ================================================== */}
            {/* SALE BADGE */}
            {/* ================================================== */}

            {hasDiscount && discountPercentage > 0 && (
                <span
                    className="
                        absolute
                        left-3
                        top-3
                        z-20
                        rounded-full
                        bg-[var(--color-primary)]
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-white
                        shadow-md
                    "
                >
                    -{discountPercentage}%
                </span>
            )}


            {/* ================================================== */}
            {/* WISHLIST */}
            {/* ================================================== */}

            <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="
                    absolute
                    right-3
                    top-3
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-md
                    transition
                    hover:scale-105
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
                aria-label={
                    isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                }
            >

                {wishlistLoading ? (

                    <Loader2
                        size={19}
                        className="animate-spin"
                    />

                ) : (

                    <Heart
                        size={20}
                        className={
                            isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                        }
                    />

                )}

            </button>


            {/* ================================================== */}
            {/* IMAGE */}
            {/* ================================================== */}

            <Link
                href={`/products/${product.slug}`}
                className="block"
            >

                <div className="relative h-72 overflow-hidden">

                    <ImageWithFallback
                        src={productImage?.media_url}
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


                    {/* ================================================== */}
                    {/* QUICK VIEW */}
                    {/* ================================================== */}

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
                        "
                    >

                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                 router.push(`/products/${product.slug}`); 
                            }}
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-[var(--color-primary)]
                                text-white/90
                                shadow-lg
                                transition
                                hover:bg-primary
                                hover:text-white
                                cursor-pointer
                            "
                            aria-label="Quick view"
                        >
                            <Eye size={18} />
                        </button>

                    </div>

                </div>

            </Link>


            {/* ================================================== */}
            {/* CONTENT */}
            {/* ================================================== */}

            <div className="p-2">


                {/* ================================================== */}
                {/* BRAND */}
                {/* ================================================== */}

                <p className="
                    text-sm
                    font-medium
                    text-[var(--color-text-light)]
                ">
                    {product.brand?.name}
                </p>


                {/* ================================================== */}
                {/* PRODUCT NAME */}
                {/* ================================================== */}

                <Link
                    href={`/products/${product.slug}`}
                >

                    <h3
                        className="
                            line-clamp-2
                            min-h-[46px]
                            text-md
                            font-semibold
                            text-[var(--color-text)]
                            transition-colors
                            duration-300
                            group-hover:text-primary
                        "
                    >
                        {product.name}
                    </h3>

                </Link>


                {/* ================================================== */}
                {/* PRICE */}
                {/* ================================================== */}

                <div className="mt-2">

                    {hasDiscount ? (

                        <div className="
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-4
                        ">

                            <p className="
                                text-2xl
                                font-bold
                                text-primary
                            ">
                                {formatCurrency(
                                    product.discount_price
                                )}
                            </p>


                            <p className="
                                text-sm
                                text-muted
                                line-through
                            ">
                                {formatCurrency(
                                    product.price
                                )}
                            </p>

                        </div>

                    ) : (

                        <p className="
                            text-xl
                            font-bold
                            text-primary
                        ">
                            {formatCurrency(
                                product.price
                            )}
                        </p>

                    )}

                </div>


                {/* ================================================== */}
                {/* STOCK */}
                {/* ================================================== */}

                <div className="mt-1">

                    {product.stockStatus ===
                        "in_stock" && (

                        <span className="
                            text-sm
                            text-primary
                        ">
                            In Stock
                        </span>

                    )}


                    {product.stockStatus ===
                        "low_stock" && (

                        <span className="
                            text-sm
                            text-orange-500
                        ">
                            Low Stock
                        </span>

                    )}


                    {product.stockStatus ===
                        "out_of_stock" && (

                        <span className="
                            text-sm
                            text-red-500
                        ">
                            Out of Stock
                        </span>

                    )}

                </div>


                {/* ================================================== */}
                {/* ADD TO CART */}
                {/* ================================================== */}

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={
                        adding || isOutOfStock
                    }
                    className={`
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-5
                        py-3
                        font-semibold
                        text-white
                        transition
                        ${
                            isOutOfStock
                                ? `
                                    cursor-not-allowed
                                    bg-gray-400
                                `
                                : `
                                    cursor-pointer
                                    bg-primary
                                    hover:bg-[var(--color-primary-dark)]
                                `
                        }
                        ${
                            adding
                                ? `
                                    cursor-not-allowed
                                    opacity-70
                                `
                                : ""
                        }
                    `}
                >

                    {adding ? (

                        <>
                            <span
                                className="
                                    h-5
                                    w-5
                                    animate-spin
                                    rounded-full
                                    border-2
                                    border-white
                                    border-t-transparent
                                "
                            />

                            Adding...

                        </>

                    ) : isOutOfStock ? (

                        <>
                            <ShoppingCart size={18} />

                            Out of Stock
                        </>

                    ) : (

                        <>
                            <ShoppingCart size={18} />

                            Add To Cart
                        </>

                    )}

                </button>

            </div>

        </div>
    );
}