
"use client";

import {
    useEffect,
    useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    ArrowLeft,
    Heart,
    Loader2,
    ShoppingCart,
    Trash2,
    User,
} from "lucide-react";

import api from "@/lib/axios";

import {
    getWishlist,
    removeFromWishlist,
} from "@/services/wishlist.service";

import {
    showError,
    showSuccess,
} from "@/lib/toast";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";


// ========================================================
// TYPES
// ========================================================

interface ProductMedia {

    id: number;

    media_type:
        | "image"
        | "video";

    media_url: string;

    thumbnail_url?:
        string | null;

    alt_text?:
        string | null;

    is_primary?:
        number;

    display_order?:
        number;
}


interface Product {

    id: number;

    name: string;

    slug: string;

    price:
        | string
        | number;

    discount_price?:
        | string
        | number
        | null;

    short_description?:
        string | null;

    status:
        string;

    media?:
        ProductMedia[];
}


interface WishlistItem {

    id: number;

    user_id: number;

    product_id: number;

    created_at: string;

    Product:
        Product;
}


// ========================================================
// IMAGE URL
// ========================================================

const getImageUrl = (
    product: Product
): string | null => {

    const media =
        product.media || [];


    // ----------------------------------------------------
    // Get images only
    // ----------------------------------------------------

    const images =
        media.filter(
            (item) =>
                item.media_type === "image"
        );


    if (
        images.length === 0
    ) {

        return null;

    }


    // ----------------------------------------------------
    // Prefer primary image
    // ----------------------------------------------------

    const primaryImage =
        images.find(
            (item) =>
                Number(
                    item.is_primary
                ) === 1
        );


    const image =
        primaryImage ||
        images.sort(
            (
                a,
                b
            ) =>
                (
                    a.display_order ||
                    0
                ) -
                (
                    b.display_order ||
                    0
                )
        )[0];


    if (
        !image?.media_url
    ) {

        return null;

    }


    const mediaUrl =
        image.media_url;


    // ----------------------------------------------------
    // Already a complete URL
    // ----------------------------------------------------

    if (
        mediaUrl.startsWith(
            "http://"
        ) ||
        mediaUrl.startsWith(
            "https://"
        ) ||
        mediaUrl.startsWith(
            "blob:"
        )
    ) {

        return mediaUrl;

    }


    // ----------------------------------------------------
    // Relative URL
    // ----------------------------------------------------

    const baseURL =
        api.defaults.baseURL ||
        "";


    return `${baseURL}${mediaUrl.startsWith("/") ? "" : "/"}${mediaUrl}`;

};


// ========================================================
// PRICE
// ========================================================

const formatPrice = (
    price:
        | string
        | number
        | null
        | undefined
) => {

    const value =
        Number(price || 0);


    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
        }
    ).format(value);

};


// ========================================================
// COMPONENT
// ========================================================

export default function WishlistPage() {

    const router =
        useRouter();


    // ====================================================
    // STATE
    // ====================================================

    const [
        wishlist,
        setWishlist
    ] = useState<WishlistItem[]>(
        []
    );


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        removingId,
        setRemovingId
    ] = useState<number | null>(
        null
    );


    // ====================================================
    // LOAD WISHLIST
    // ====================================================

    useEffect(() => {

        const loadWishlist =
            async () => {

                try {

                    setLoading(true);


                    const response =
                        await getWishlist();


                    console.log(
                        "WISHLIST RESPONSE:",
                        response
                    );


                    const items =
                        response?.data || [];


                    console.log(
                        "WISHLIST ITEMS:",
                        items
                    );


                    if (
                        items.length > 0
                    ) {

                        console.log(
                            "FIRST WISHLIST PRODUCT:",
                            items[0]?.Product
                        );

                        console.log(
                            "FIRST PRODUCT MEDIA:",
                            items[0]?.Product?.media
                        );

                    }


                    setWishlist(
                        items
                    );

                } catch (
                    error
                ) {

                    console.error(
                        "Load wishlist error:",
                        error
                    );


                    showError(
                        "Unable to load your wishlist."
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadWishlist();

    }, []);


    // ====================================================
    // REMOVE FROM WISHLIST
    // ====================================================

    const handleRemove =
        async (
            productId: number
        ) => {

            try {

                setRemovingId(
                    productId
                );


                await removeFromWishlist(
                    productId
                );


                setWishlist(
                    (currentWishlist) =>
                        currentWishlist.filter(
                            (item) =>
                                item.product_id !==
                                productId
                        )
                );


                showSuccess(
                    "Product removed from wishlist."
                );

            } catch (
                error
            ) {

                console.error(
                    "Remove wishlist error:",
                    error
                );


                showError(
                    "Unable to remove product from wishlist."
                );

            } finally {

                setRemovingId(
                    null
                );

            }

        };


    // ====================================================
    // GO TO PRODUCT
    // ====================================================

    const handleProductClick =
        (
            slug: string
        ) => {

            router.push(
                `/products/${slug}`
            );

        };


    // ====================================================
    // LOADING
    // ====================================================

    if (loading) {

        return (

            <main className="min-h-screen">

                <Header />

                <section className="
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                    bg-[var(--color-background)]
                ">

                    <Loader2
                        size={36}
                        className="
                            animate-spin
                            text-primary
                        "
                    />

                </section>

                <Footer />

            </main>

        );

    }


    // ====================================================
    // PAGE
    // ====================================================

    return (

        <main className="min-h-screen">

            <Header />


            <section className="bg-gray-50 py-12 sm:py-16">
                <Container>
                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Wishlist",
                            },
                        ]}
                    />

                    <div className="
                        mt-8
                        mb-8
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <div>

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <Heart
                                    size={30}
                                    className="
                                        fill-primary
                                        text-primary
                                    "
                                />

                                <h1 className="
                                    text-3xl
                                    font-bold
                                    text-[var(--color-text)]
                                ">

                                    My <span className="text-[var(--color-primary)]" >Wishlist</span>

                                </h1>

                            </div>


                            <p className="
                                mt-2
                                text-sm
                                text-[var(--color-text-light)]
                            ">

                                Products you have saved
                                for later.

                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                router.back()
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                self-start
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-gray-700
                                transition
                                hover:border-[var(--color-primary)]
                                hover:text-[var(--color-primary)]
                            "
                        >

                            <ArrowLeft
                                size={17}
                            />

                            Back

                        </button>

                    </div>
                </Container>

                <div className="
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">


                    {/* ============================================
                        HEADER
                    ============================================ */}

                    


                    {/* ============================================
                        EMPTY WISHLIST
                    ============================================ */}

                    {wishlist.length === 0 ? (

                        <div className="
                            flex
                            min-h-[400px]
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            bg-white
                            px-6
                            text-center
                            shadow-sm
                        ">

                            <div className="
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-full
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                            ">

                                <Heart
                                    size={38}
                                />

                            </div>


                            <h2 className="
                                mt-6
                                text-2xl
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Your wishlist is empty

                            </h2>


                            <p className="
                                mt-2
                                max-w-md
                                text-sm
                                leading-6
                                text-[var(--color-text-light)]
                            ">

                                Save products you love
                                and come back to them
                                whenever you are ready.

                            </p>


                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        "/products"
                                    )
                                }
                                className="
                                    mt-6
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[var(--color-primary)]
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[var(--color-primary-dark)]
                                "
                            >

                                <ShoppingCart
                                    size={18}
                                />

                                Browse Products

                            </button>

                        </div>

                    ) : (


                        /* ============================================
                           WISHLIST GRID
                        ============================================ */

                        <div className="
                            grid
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                        ">

                            {wishlist.map(
                                (
                                    item
                                ) => {

                                    const product =
                                        item.Product;


                                    if (
                                        !product
                                    ) {

                                        return null;

                                    }


                                    const imageUrl =
                                        getImageUrl(
                                            product
                                        );


                                    const price =
                                        Number(
                                            product.price
                                        );


                                    const discountPrice =
                                        product.discount_price !==
                                        null &&
                                        product.discount_price !==
                                        undefined
                                            ? Number(
                                                product.discount_price
                                            )
                                            : null;


                                    const hasDiscount =
                                        discountPrice !==
                                        null &&
                                        discountPrice <
                                        price;


                                    return (

                                        <article
                                            key={
                                                item.id
                                            }
                                            className="
                                                group
                                                overflow-hidden
                                                rounded-2xl
                                                bg-white
                                                shadow-sm
                                                transition
                                                hover:-translate-y-1
                                                hover:shadow-lg
                                            "
                                        >


                                            {/* ====================================
                                                IMAGE
                                            ==================================== */}

                                            <div
                                                className="
                                                    relative
                                                    aspect-square
                                                    cursor-pointer
                                                    overflow-hidden
                                                    bg-gray-100
                                                "
                                                onClick={() =>
                                                    handleProductClick(
                                                        product.slug
                                                    )
                                                }
                                            >

                                                {imageUrl ? (

                                                    <Image
                                                        src={
                                                            imageUrl
                                                        }
                                                        alt={
                                                            product.name
                                                        }
                                                        fill
                                                        sizes="
                                                            (max-width: 640px) 100vw,
                                                            (max-width: 1024px) 50vw,
                                                            (max-width: 1280px) 33vw,
                                                            25vw
                                                        "
                                                        className="
                                                            object-cover
                                                            transition
                                                            duration-300
                                                            group-hover:scale-105
                                                        "
                                                    />

                                                ) : (

                                                    <div className="
                                                        flex
                                                        h-full
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        text-gray-300
                                                    ">

                                                        <User
                                                            size={55}
                                                        />

                                                    </div>

                                                )}


                                                {/* DISCOUNT */}

                                                {hasDiscount && (

                                                    <span className="
                                                        absolute
                                                        left-3
                                                        top-3
                                                        rounded-full
                                                        bg-red-500
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        font-bold
                                                        text-white
                                                    ">

                                                        SALE

                                                    </span>

                                                )}


                                                {/* REMOVE */}

                                                <button
                                                    type="button"
                                                    onClick={(
                                                        event
                                                    ) => {

                                                        event.stopPropagation();

                                                        handleRemove(
                                                            product.id
                                                        );

                                                    }}
                                                    disabled={
                                                        removingId ===
                                                        product.id
                                                    }
                                                    className="
                                                        absolute
                                                        right-3
                                                        top-3
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-white
                                                        text-red-500
                                                        shadow-md
                                                        transition
                                                        hover:bg-red-50
                                                        disabled:cursor-not-allowed
                                                        disabled:opacity-50
                                                    "
                                                    aria-label="
                                                        Remove from wishlist
                                                    "
                                                >

                                                    {removingId ===
                                                    product.id ? (

                                                        <Loader2
                                                            size={18}
                                                            className="
                                                                animate-spin
                                                            "
                                                        />

                                                    ) : (

                                                        <Trash2
                                                            size={18}
                                                        />

                                                    )}

                                                </button>

                                            </div>


                                            {/* ====================================
                                                DETAILS
                                            ==================================== */}

                                            <div className="
                                                p-5
                                            ">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleProductClick(
                                                            product.slug
                                                        )
                                                    }
                                                    className="
                                                        line-clamp-2
                                                        w-full
                                                        text-left
                                                        text-base
                                                        font-semibold
                                                        text-[var(--color-text)]
                                                        transition
                                                        hover:text-primary
                                                    "
                                                >

                                                    {
                                                        product.name
                                                    }

                                                </button>


                                                {product.short_description && (

                                                    <p className="
                                                        mt-2
                                                        line-clamp-2
                                                        text-sm
                                                        leading-5
                                                        text-[var(--color-text-light)]
                                                    ">

                                                        {
                                                            product.short_description
                                                        }

                                                    </p>

                                                )}


                                                {/* PRICE */}

                                                <div className="
                                                    mt-4
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    gap-2
                                                ">

                                                    {hasDiscount ? (

                                                        <>

                                                            <span className="
                                                                text-lg
                                                                font-bold
                                                                text-primary
                                                            ">

                                                                {
                                                                    formatPrice(
                                                                        discountPrice
                                                                    )
                                                                }

                                                            </span>


                                                            <span className="
                                                                text-sm
                                                                text-gray-400
                                                                line-through
                                                            ">

                                                                {
                                                                    formatPrice(
                                                                        price
                                                                    )
                                                                }

                                                            </span>

                                                        </>

                                                    ) : (

                                                        <span className="
                                                            text-lg
                                                            font-bold
                                                            text-primary
                                                        ">

                                                            {
                                                                formatPrice(
                                                                    price
                                                                )
                                                            }

                                                        </span>

                                                    )}

                                                </div>


                                                {/* VIEW PRODUCT */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleProductClick(
                                                            product.slug
                                                        )
                                                    }
                                                    className="
                                                        mt-5
                                                        flex
                                                        w-full
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        rounded-xl
                                                        border
                                                        border-primary
                                                        px-4
                                                        py-2.5
                                                        text-sm
                                                        font-semibold
                                                        text-primary
                                                        transition
                                                        hover:bg-primary
                                                        hover:text-white
                                                    "
                                                >

                                                    <ShoppingCart
                                                        size={17}
                                                    />

                                                    View Product

                                                </button>

                                            </div>

                                        </article>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>

            </section>


            <Footer />

        </main>

    );

}
