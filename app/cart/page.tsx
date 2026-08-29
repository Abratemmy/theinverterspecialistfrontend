"use client";

import Link from "next/link";

import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";

import useCart from "@/hooks/useCart";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import { useRouter } from "next/navigation";
import { showError } from "@/lib/toast";
import useAuth from "@/hooks/useAuth";

export default function CartPage() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading } = useAuth();

    const {
        cart,
        loading,
        error,
        updateCartItem,
        updatingCartItem,
        removeCartItem,
        removingCartItem,
        clearCart,
        clearingCart,
    } = useCart();


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (
            <main className="min-h-screen py-12">
                <Container>

                    <div className="animate-pulse space-y-6">

                        <div className="h-8 w-40 rounded bg-muted" />

                        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

                            <div className="h-64 rounded-2xl bg-muted" />

                            <div className="h-64 rounded-2xl bg-muted" />

                        </div>

                    </div>

                </Container>
            </main>
        );
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error) {

        return (
            <section>
                <Header />
                <main className="min-h-screen py-12">
                    <Container>

                        <div className="rounded-2xl border bg-card p-10 text-center">

                            <h1 className="text-xl font-semibold">
                                Unable to load your cart
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Please refresh the page and try again.
                            </p>

                        </div>

                    </Container>
                </main>
                <Footer />
            </section>
        );
    }


    // ============================================================
    // EMPTY CART
    // ============================================================

    if (!cart || cart.items.length === 0) {

        return (
            <section>
                <Header />
            <main className="min-h-screen py-12">

                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Cart",
                            },
                        ]}
                    />

                    <div className="mt-10 flex min-h-[400px] flex-col items-center justify-center rounded-3xl border bg-card px-6 text-center">

                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle
                                    cx="9"
                                    cy="21"
                                    r="1"
                                />

                                <circle
                                    cx="20"
                                    cy="21"
                                    r="1"
                                />

                                <path
                                    d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"
                                />
                            </svg>

                        </div>

                        <h1 className="mt-6 text-2xl font-bold">
                            Your cart is empty
                        </h1>

                        <p className="mt-2 max-w-md text-muted-foreground">
                            You haven't added anything to your cart yet.
                            Browse our products and find the right solution
                            for your energy needs.
                        </p>

                        <Link
                            href="/products"
                            className="
                                mt-6
                                inline-flex
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-primary-foreground
                                transition
                                hover:opacity-90
                            "
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </Container>

            </main>
            <Footer />
            </section>
        );
    }


    // ============================================================
    // UPDATE QUANTITY
    // ============================================================

    const handleQuantityChange = async (
        itemId: number,
        quantity: number
    ) => {

        console.log(
            "================================="
        );

        console.log(
            "HANDLE QUANTITY CHANGE"
        );

        console.log(
            "itemId:",
            itemId
        );

        console.log(
            "quantity:",
            quantity
        );

        console.log(
            "================================="
        );


        if (quantity < 1) {
            return;
        }


        try {

            await updateCartItem({
                itemId,
                quantity,
            });


        } catch (error: any) {

            console.error(
                "HANDLE QUANTITY ERROR:",
                error
            );


            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to update cart quantity.";


            showError(message);

        }

    };


    const handleProceedToCheckout = () => {
        // ------------------------------------------------------------
        // Make sure cart is not empty
        // ------------------------------------------------------------

        if (!cart || cart.items.length === 0) {
            showError("Your cart is empty.");
            return;
        }

        // ------------------------------------------------------------
        // User must be logged in before checkout
        // ------------------------------------------------------------

        if (!isAuthenticated) {
            showError(
                "You need to sign in before you can continue."
            );

            router.push(
                `/login?returnUrl=${encodeURIComponent("/checkout")}`
            );

            return;
        }

        // ------------------------------------------------------------
        // Logged-in user → Checkout / Order page
        // ------------------------------------------------------------

        router.push("/checkout");
    };

    // ============================================================
    // PAGE
    // ============================================================

    return (
        <main className="">
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
                                label: "Cart",
                            },
                        ]}
                    />


                    {/* ================================================= */}
                    {/* HEADER */}
                    {/* ================================================= */}

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <h1 className="text-3xl font-bold sm:text-4xl">
                                Shopping <span className="text-[var(--color-primary)]">Cart</span>
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground font-bold">
                                {cart.total_items}{" "}
                                {cart.total_items === 1
                                    ? "item"
                                    : "items"}{" "}
                                in your cart
                            </p>

                        </div>


                        <button
                            type="button"
                            disabled={clearingCart}
                            onClick={() => clearCart()}
                            className="
                                self-start
                                text-sm
                                font-medium
                                text-destructive
                                transition
                                hover:underline
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                sm:self-auto
                            "
                        >
                            {clearingCart
                                ? "Clearing..."
                                : "Clear Cart"}
                        </button>

                    </div>


                    {/* ================================================= */}
                    {/* CONTENT */}
                    {/* ================================================= */}

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">


                        {/* ================================================= */}
                        {/* CART ITEMS */}
                        {/* ================================================= */}

                        <div className="space-y-4">

                            {cart.items.map((item) => {

                                const product =
                                    item.product;

                                const image =
                                    product?.primaryImage ||
                                    product?.media?.find(
                                        (media) =>
                                            media.media_type ===
                                            "image" &&
                                            media.is_primary
                                    )?.media_url ||
                                    "/placeholder-product.jpg";


                                const price =
                                    Number(item.unit_price);


                                const total =
                                    Number(item.total_price);


                                return (
                                    <div
                                        key={item.id}
                                        className="
                                            rounded-2xl
                                            border
                                            bg-card
                                            p-2
                                            mb-4
                                            shadow-sm
                                        "
                                    >

                                        <div className="flex gap-4">


                                            {/* IMAGE */}

                                            <Link
                                                href={
                                                    product?.slug
                                                        ? `/products/${product.slug}`
                                                        : "#"
                                                }
                                                className="
                                                    relative
                                                    h-28
                                                    w-28
                                                    shrink-0
                                                    overflow-hidden
                                                    rounded-xl
                                                    bg-muted
                                                    sm:h-32
                                                    sm:w-32
                                                "
                                            >

                                                <img
                                                    src={image}
                                                    alt={
                                                        product?.name ||
                                                        "Product"
                                                    }
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-contain
                                                        p-3
                                                    "
                                                />

                                            </Link>


                                            {/* DETAILS */}

                                            <div className="min-w-0 flex-1">

                                                <div className="flex justify-between gap-4">

                                                    <div>

                                                        {product?.brand?.name && (
                                                            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]">
                                                                {
                                                                    product.brand.name
                                                                }
                                                            </p>
                                                        )}

                                                        <Link
                                                            href={
                                                                product?.slug
                                                                    ? `/products/${product.slug}`
                                                                    : "#"
                                                            }
                                                            className="
                                                                mt-1
                                                                block
                                                                line-clamp-2
                                                                text-md
                                                                font-semibold
                                                                font-bold
                                                                transition
                                                                text-[var(--color-primary)]
                                                                hover:text-primary
                                                                sm:text-base
                                                            "
                                                        >
                                                            {
                                                                product?.name ||
                                                                "Product"
                                                            }
                                                        </Link>

                                                    </div>


                                                    {/* REMOVE */}

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            removingCartItem
                                                        }
                                                        onClick={() =>
                                                            removeCartItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="
                                                            shrink-0
                                                            text-muted-foreground
                                                            transition
                                                            hover:text-destructive
                                                            disabled:opacity-50
                                                        "
                                                        aria-label="Remove product"
                                                    >

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="19"
                                                            height="19"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M3 6h18" />
                                                            <path d="M8 6V4h8v2" />
                                                            <path d="M19 6l-1 14H6L5 6" />
                                                            <path d="M10 11v5" />
                                                            <path d="M14 11v5" />
                                                        </svg>

                                                    </button>

                                                </div>


                                                {/* PRICE */}

                                                <div className="mt-3">

                                                    <p className="text-sm text-muted-foreground">
                                                        ₦
                                                        {price.toLocaleString(
                                                            "en-NG"
                                                        )}{" "}
                                                        each
                                                    </p>

                                                </div>


                                                {/* BOTTOM */}

                                                <div className="mt-4 flex items-center justify-between gap-4">


                                                    {/* QUANTITY */}

                                                    <div
                                                        className="
                                                            flex
                                                            items-center
                                                            rounded-lg
                                                            border
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                updatingCartItem ||
                                                                item.quantity <= 1
                                                            }
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                h-9
                                                                w-9
                                                                items-center
                                                                justify-center
                                                                text-lg
                                                                transition
                                                                hover:bg-muted
                                                                disabled:opacity-40
                                                            "
                                                        >
                                                            −
                                                        </button>


                                                        <span className="w-9 text-center text-sm font-semibold">
                                                            {
                                                                item.quantity
                                                            }
                                                        </span>


                                                        <button
                                                            type="button"
                                                            disabled={
                                                                updatingCartItem
                                                            }
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                h-9
                                                                w-9
                                                                items-center
                                                                justify-center
                                                                text-lg
                                                                transition
                                                                hover:bg-muted
                                                                disabled:opacity-40
                                                            "
                                                        >
                                                            +
                                                        </button>

                                                    </div>


                                                    {/* TOTAL */}

                                                    <p className="text-base font-bold sm:text-lg">
                                                        ₦
                                                        {total.toLocaleString(
                                                            "en-NG"
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );

                            })}

                        </div>


                        {/* ================================================= */}
                        {/* ORDER SUMMARY */}
                        {/* ================================================= */}

                        <aside className="lg:sticky lg:top-24 lg:h-fit">

                            <div className="rounded-2xl border bg-card p-6 shadow-sm">

                                <h2 className="text-lg font-bold">
                                    Order Summary
                                </h2>


                                <div className="mt-6 space-y-4 text-sm">

                                    <div className="flex justify-between gap-4">

                                        <span className="text-muted-foreground">
                                            Subtotal
                                        </span>

                                        <span className="font-medium">
                                            ₦
                                            {Number(
                                                cart.subtotal
                                            ).toLocaleString(
                                                "en-NG"
                                            )}
                                        </span>

                                    </div>


                                    {/* {Number(cart.discount) > 0 && (
                                        <div className="flex justify-between gap-4">

                                            <span className="text-muted-foreground">
                                                Discount
                                            </span>

                                            <span className="font-medium text-green-600">
                                                -₦
                                                {Number(
                                                    cart.discount
                                                ).toLocaleString(
                                                    "en-NG"
                                                )}
                                            </span>

                                        </div>
                                    )} */}


                                    <div className="border-t pt-4">

                                        <div className="flex justify-between gap-4">

                                            <span className="font-semibold">
                                                Total
                                            </span>

                                            <span className="text-xl font-bold">
                                                ₦
                                                {Number(
                                                    cart.grand_total
                                                ).toLocaleString(
                                                    "en-NG"
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    onClick={handleProceedToCheckout}
                                    className="
                                        mt-6
                                        w-full
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3.5
                                        text-sm
                                        font-semibold
                                        text-primary-foreground
                                        transition
                                        hover:opacity-90
                                    "
                                >
                                    Proceed to Checkout
                                </button>


                                <Link
                                    href="/products"
                                    className="
                                        mt-3
                                        block
                                        text-center
                                        text-sm
                                        font-medium
                                        text-muted-foreground
                                        transition
                                        hover:text-foreground
                                    "
                                >
                                    Continue Shopping
                                </Link>

                            </div>

                        </aside>

                    </div>

                </Container>
            </section>

            <Footer />

        </main>
    );
}