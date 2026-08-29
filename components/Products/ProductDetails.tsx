"use client";

import { useState } from "react";
import {
    Heart,
    ShoppingCart,
    Check,
    AlertCircle,
} from "lucide-react";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import type { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";
import useCart from "@/hooks/useCart";
import { showSuccess, showError } from "@/lib/toast";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({
    product,
}: ProductDetailProps) {

    // =========================================================
    // PRODUCT IMAGES
    // =========================================================

    const images =
        product.media?.filter(
            (media) =>
                media.media_type === "image"
        ) ?? [];

    const primaryImage =
        images.find(
            (image) => image.is_primary
        ) ?? images[0];

    // =========================================================
    // SELECTED IMAGE
    // =========================================================

    const [
        selectedImage,
        setSelectedImage,
    ] = useState<string | null>(
        primaryImage?.media_url ??
        product.primaryImage ??
        null
    );

    // =========================================================
    // QUANTITY
    // =========================================================

    const [quantity, setQuantity] =
        useState(1);

    // =========================================================
    // CART
    // =========================================================

    const {
        addToCartAsync,
        adding,
    } = useCart();

    // =========================================================
    // PRICE
    // =========================================================

    const price =
        Number(product.price) || 0;

    const discountPrice =
        Number(product.discount_price) || 0;

    const hasDiscount =
        discountPrice > 0 &&
        discountPrice < price;

    const sellingPrice =
        hasDiscount
            ? discountPrice
            : price;

    // =========================================================
    // STOCK
    // =========================================================

    const stockQuantity =
        Number(product.quantity) || 0;

    const isOutOfStock =
        product.stockStatus ===
            "out_of_stock" ||
        stockQuantity <= 0;

    // =========================================================
    // IMAGE SELECT
    // =========================================================

    const handleImageSelect = (
        imageUrl: string
    ) => {
        setSelectedImage(imageUrl);
    };

    // =========================================================
    // QUANTITY CHANGE
    // =========================================================

    const handleQuantityChange = (
        newQuantity: number
    ) => {

        const safeQuantity =
            Math.max(
                1,
                Math.min(
                    Number(newQuantity) || 1,
                    stockQuantity || 1
                )
            );

        setQuantity(
            safeQuantity
        );
    };

    // =========================================================
    // ADD TO CART
    // =========================================================

    const handleAddToCart = async () => {

        // -----------------------------------------------------
        // STOCK CHECK
        // -----------------------------------------------------

        if (isOutOfStock) {

            showError(
                "This product is currently out of stock."
            );

            return;
        }

        // -----------------------------------------------------
        // QUANTITY CHECK
        // -----------------------------------------------------

        if (
            quantity < 1
        ) {

            showError(
                "Please select a valid quantity."
            );

            return;
        }

        // -----------------------------------------------------
        // STOCK LIMIT CHECK
        // -----------------------------------------------------

        if (
            quantity >
            stockQuantity
        ) {

            showError(
                `Only ${stockQuantity} item(s) available in stock.`
            );

            return;
        }

        try {

            console.log(
                "Adding product to cart:",
                {
                    product_id:
                        product.id,

                    quantity,
                }
            );

            // IMPORTANT:
            // Use addToCartAsync, NOT addToCart.
            //
            // addToCartAsync returns a Promise,
            // therefore try/catch can catch backend
            // errors correctly.

            const response =
                await addToCartAsync({

                    product_id:
                        Number(product.id),

                    quantity:
                        Number(quantity),

                });

            console.log(
                "Add to cart response:",
                response
            );

            // -------------------------------------------------
            // SUCCESS MESSAGE
            // -------------------------------------------------

            const successMessage =
                response?.message ||
                response?.data?.message ||
                "Product added to cart successfully.";

            showSuccess(
                successMessage
            );

        } catch (error: any) {

            console.error(
                "Add to cart error:",
                error
            );

            // -------------------------------------------------
            // BACKEND ERROR
            // -------------------------------------------------

            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Unable to add product to cart.";

            showError(
                backendMessage
            );
        }
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <section className="pb-20">

            <div
                className="
                    grid
                    gap-10
                    lg:grid-cols-2
                    lg:gap-16
                "
            >

                {/* =====================================================
                    PRODUCT IMAGE GALLERY
                ====================================================== */}

                <div>

                    {/* MAIN IMAGE */}

                    <div
                        className="
                            relative
                            aspect-square
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-200
                            bg-gray-50
                        "
                    >

                        <ImageWithFallback
                            key={selectedImage}
                            src={selectedImage}
                            alt={product.name}
                            imageType="product"
                            fill
                            priority
                            className="
                                object-contain
                                p-6
                                transition-opacity
                                duration-300
                            "
                        />

                    </div>

                    {/* THUMBNAILS */}

                    {images.length > 0 && (

                        <div
                            className="
                                mt-4
                                flex
                                gap-3
                                overflow-x-auto
                                pb-2
                            "
                        >

                            {images.map(
                                (image) => {

                                    const isSelected =
                                        selectedImage ===
                                        image.media_url;

                                    return (

                                        <button
                                            key={
                                                image.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleImageSelect(
                                                    image.media_url
                                                )
                                            }
                                            aria-label={
                                                `View ${product.name} image`
                                            }
                                            aria-pressed={
                                                isSelected
                                            }
                                            className={`
                                                relative
                                                h-20
                                                w-20
                                                shrink-0
                                                overflow-hidden
                                                rounded-xl
                                                border-2
                                                bg-gray-50
                                                transition-all
                                                duration-200

                                                ${
                                                    isSelected
                                                        ? `
                                                            border-primary
                                                            ring-2
                                                            ring-primary/20
                                                        `
                                                        : `
                                                            border-gray-200
                                                            hover:border-primary/50
                                                        `
                                                }
                                            `}
                                        >

                                            <ImageWithFallback
                                                src={
                                                    image.media_url
                                                }
                                                alt={
                                                    image.alt_text ??
                                                    product.name
                                                }
                                                imageType="product"
                                                fill
                                                className="
                                                    object-contain
                                                    p-2
                                                "
                                            />

                                        </button>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>

                {/* =====================================================
                    PRODUCT INFORMATION
                ====================================================== */}

                <div>

                    {/* BRAND */}

                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-primary
                        "
                    >
                        {product.brand?.name ??
                            "Product"}
                    </p>

                    {/* PRODUCT NAME */}

                    <h1
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {product.name}
                    </h1>

                    {/* SHORT DESCRIPTION */}

                    {product.short_description && (

                        <p
                            className="
                                mt-5
                                leading-7
                                text-muted-foreground
                            "
                        >
                            {
                                product.short_description
                            }
                        </p>
                    )}

                    {/* PRICE */}

                    <div
                        className="
                            mt-8
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >

                        <span
                            className="
                                text-3xl
                                font-bold
                            "
                        >
                            ₦
                            {sellingPrice.toLocaleString()}
                        </span>

                        {hasDiscount && (

                            <>
                                <span
                                    className="
                                        text-lg
                                        text-muted-foreground
                                        line-through
                                    "
                                >
                                    ₦
                                    {price.toLocaleString()}
                                </span>

                                {product.discountPercentage !==
                                    undefined && (

                                    <span
                                        className="
                                            rounded-full
                                            bg-red-100
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-red-600
                                        "
                                    >
                                        -
                                        {
                                            product.discountPercentage
                                        }%
                                    </span>
                                )}

                            </>
                        )}

                    </div>

                    {/* STOCK */}

                    <div className="mt-5">

                        {product.stockStatus ===
                            "in_stock" && (

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-green-600
                                "
                            >
                                <Check
                                    size={17}
                                />

                                In stock
                            </div>
                        )}

                        {product.stockStatus ===
                            "low_stock" && (

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-orange-600
                                "
                            >
                                <AlertCircle
                                    size={17}
                                />

                                Only{" "}
                                {
                                    product.quantity
                                }{" "}
                                left
                            </div>
                        )}

                        {isOutOfStock && (

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-red-600
                                "
                            >
                                <AlertCircle
                                    size={17}
                                />

                                Out of stock
                            </div>
                        )}

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================== */}

                    <div className="mt-8">

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-3
                            "
                        >

                            {/* QUANTITY */}

                            {!isOutOfStock && (

                                <QuantitySelector
                                    quantity={
                                        quantity
                                    }
                                    maxQuantity={
                                        stockQuantity
                                    }
                                    onChange={
                                        handleQuantityChange
                                    }
                                    disabled={
                                        adding
                                    }
                                />
                            )}

                            {/* ADD TO CART */}

                            <button
                                type="button"
                                onClick={
                                    handleAddToCart
                                }
                                disabled={
                                    isOutOfStock ||
                                    adding
                                }
                                className="
                                    flex
                                    h-12
                                    min-w-[180px]
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-primary
                                    px-6
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-primary-dark
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                <ShoppingCart
                                    size={19}
                                />

                                {adding
                                    ? "Adding..."
                                    : "Add to Cart"}

                            </button>

                            {/* WISHLIST */}

                            <button
                                type="button"
                                className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    transition
                                    hover:border-primary
                                    hover:text-primary
                                "
                                aria-label="Add to wishlist"
                            >

                                <Heart
                                    size={20}
                                />

                            </button>

                        </div>

                    </div>

                    {/* PRODUCT META */}

                    <div
                        className="
                            mt-8
                            divide-y
                            rounded-2xl
                            border
                        "
                    >

                        {/* CATEGORY */}

                        <div
                            className="
                                flex
                                justify-between
                                gap-4
                                px-5
                                py-4
                                text-sm
                            "
                        >

                            <span
                                className="
                                    text-muted-foreground
                                "
                            >
                                Category
                            </span>

                            <span className="font-medium">
                                {
                                    product.category?.name ??
                                    "N/A"
                                }
                            </span>

                        </div>

                        {/* BRAND */}

                        <div
                            className="
                                flex
                                justify-between
                                gap-4
                                px-5
                                py-4
                                text-sm
                            "
                        >

                            <span
                                className="
                                    text-muted-foreground
                                "
                            >
                                Brand
                            </span>

                            <span className="font-medium">
                                {
                                    product.brand?.name ??
                                    "N/A"
                                }
                            </span>

                        </div>

                        {/* AVAILABILITY */}

                        <div
                            className="
                                flex
                                justify-between
                                gap-4
                                px-5
                                py-4
                                text-sm
                            "
                        >

                            <span
                                className="
                                    text-muted-foreground
                                "
                            >
                                Availability
                            </span>

                            <span className="font-medium">
                                {stockQuantity > 0
                                    ? "Available"
                                    : "Unavailable"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
                PRODUCT DESCRIPTION
            ====================================================== */}

            {product.description && (

                <div
                    className="
                        mt-16
                        border-t
                        pt-12
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                        "
                    >
                        Product Description
                    </h2>

                    <div
                        className="
                            mt-5
                            max-w-4xl
                            whitespace-pre-line
                            leading-8
                            text-muted-foreground
                        "
                    >
                        {
                            product.description
                        }
                    </div>

                </div>
            )}

            {/* =====================================================
                PRODUCT SPECIFICATIONS
            ====================================================== */}

            {product.specifications?.length >
                0 && (

                <div className="mt-12">

                    <h2
                        className="
                            text-2xl
                            font-bold
                        "
                    >
                        Specifications
                    </h2>

                    <div
                        className="
                            mt-5
                            overflow-hidden
                            rounded-2xl
                            border
                        "
                    >

                        {product.specifications.map(
                            (
                                specification,
                                index
                            ) => (

                                <div
                                    key={
                                        specification.id
                                    }
                                    className={`
                                        grid
                                        gap-2
                                        px-5
                                        py-4
                                        text-sm
                                        sm:grid-cols-2

                                        ${
                                            index !==
                                            product
                                                .specifications
                                                .length -
                                            1
                                                ? "border-b"
                                                : ""
                                        }
                                    `}
                                >

                                    <span className="font-medium">
                                        {
                                            specification.specification_name
                                        }
                                    </span>

                                    <span
                                        className="
                                            text-muted-foreground
                                        "
                                    >
                                        {
                                            specification.specification_value
                                        }
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                </div>
            )}

        </section>
    );
}
