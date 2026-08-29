"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Truck,
    Store,
    Plus,
    Loader2,
} from "lucide-react";

import useCart from "@/hooks/useCart";
import useShippingAddress from "@/hooks/useShippingAddress";

import type {
    FulfillmentMethod,
} from "@/types/order";

import formatCurrency from "@/utils/formatCurrency";
import { showError } from "@/lib/toast";
import useOrder from "@/hooks/useOrders";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import usePayment from "@/hooks/usePayment";

export default function CheckoutPage() {

    const router = useRouter();

    // ============================================================
    // CART
    // ============================================================

    const {
        cart,
        loading: cartLoading,
    } = useCart();


    // ============================================================
    // SHIPPING ADDRESSES
    // ============================================================

    const {
        addresses,
        loading: addressesLoading,
    } = useShippingAddress();


    // ============================================================
    // STATE
    // ============================================================

    const [
        fulfillmentMethod,
        setFulfillmentMethod
    ] = useState<FulfillmentMethod>(
        "shipping"
    );

    const [
        selectedAddressId,
        setSelectedAddressId
    ] = useState<number | null>(null);

    // ============================================================
    // VAT
    // ============================================================

    const VAT_RATE = 0.075;

    const subtotal = Number(cart?.grand_total ?? 0);

    const vatAmount = Math.round(subtotal * VAT_RATE);

    const totalWithVat = subtotal + vatAmount;

    // ============================================================
    //CREATING ORDERS
    // ============================================================
    const {
        createOrder,
        creatingOrder,
    } = useOrder();

    // ============================================================
    // Payment
    // ============================================================

    const {
        initializePayment,
        initializingPayment,
    } = usePayment();

    // ============================================================
    // SELECT DEFAULT ADDRESS
    // ============================================================
    useEffect(() => {

        if (!addresses?.length) {
            return;
        }

        const defaultAddress =
            addresses.find(
                (address) =>
                    address.is_default
            );

        if (defaultAddress) {

            setSelectedAddressId(
                defaultAddress.id
            );

            return;
        }

        // If there is no default address,
        // select the first address.

        if (!selectedAddressId) {

            setSelectedAddressId(
                addresses[0].id
            );

        }

    }, [
        addresses,
        selectedAddressId
    ]);


    // ============================================================
    // CHECKOUT

    const handleContinue = async () => {

        // ========================================================
        // EMPTY CART
        // ========================================================

        if (
            !cart ||
            cart.items.length === 0
        ) {

            showError(
                "Your cart is empty."
            );

            router.push("/cart");

            return;
        }


        // ========================================================
        // SHIPPING ADDRESS
        // ========================================================

        if (
            fulfillmentMethod === "shipping" &&
            !selectedAddressId
        ) {

            showError(
                "Please select a shipping address."
            );

            return;
        }


        try {

            // ====================================================
            // CREATE ORDER
            // ====================================================

            const response =
                await createOrder({

                    fulfillment_method:
                        fulfillmentMethod,

                    shipping_address_id:
                        fulfillmentMethod === "shipping"
                            ? selectedAddressId
                            : null,

                });


            // ====================================================
            // SAVE ORDER
            // ====================================================

            const order =
                response.data;


            if (!order?.id) {

                showError(
                    "Unable to create your order."
                );

                return;
            }


            // ====================================================
            // EXISTING PENDING ORDER
            // ====================================================

            if (
                response.message
                    ?.toLowerCase()
                    .includes("pending order")
            ) {

                showError(
                    response.message
                );

            }


            // ====================================================
            // INITIALIZE PAYMENT
            // ====================================================

            const paymentResult =
                await initializePayment({

                    order_id:
                        order.id,

                });


            // ====================================================
            // GET PAYSTACK URL
            // ====================================================

            const authorizationUrl =
                paymentResult.data
                    ?.authorizationUrl;


            if (!authorizationUrl) {

                showError(
                    "Unable to initialize payment."
                );

                return;
            }


            // ====================================================
            // REDIRECT TO PAYSTACK
            // ====================================================

            window.location.href =
                authorizationUrl;


        } catch (error: any) {

            console.error(
                "Checkout error:",
                error
            );


            console.log(
                "Backend response:",
                error?.response?.data
            );


            const backendData =
                error?.response?.data;


            // ====================================================
            // VALIDATION ERRORS
            // ====================================================

            const validationMessage =
                backendData?.errors
                    ?.map(
                        (item: any) =>
                            item.msg
                    )
                    ?.join(", ");


            // ====================================================
            // ERROR MESSAGE
            // ====================================================

            const message =
                validationMessage ||
                backendData?.message ||
                error?.message ||
                "Unable to continue to payment.";


            showError(
                message
            );

        }

    };



    // ============================================================
    // LOADING
    // ============================================================

    if (
        cartLoading ||
        addressesLoading
    ) {

        return (

            <main className="min-h-screen">

                <div className="
                    mx-auto
                    flex
                    min-h-[60vh]
                    max-w-7xl
                    items-center
                    justify-center
                ">

                    <Loader2
                        className="
                            h-8
                            w-8
                            animate-spin
                            text-primary
                        "
                    />

                </div>

            </main>

        );

    }


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <main>
            <Header />
            <section className="
                min-h-screen
                bg-[var(--color-background)]
                py-10
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    {/* ================================================== */}
                    {/* PAGE TITLE */}
                    {/* ================================================== */}

                    <div className="mb-8">

                        <h1 className="
                            text-3xl
                            font-bold
                            text-[var(--color-text)]
                        ">
                            Checkout
                        </h1>

                        <p className="
                            mt-2
                            text-[var(--color-text-light)]
                        ">
                            Choose how you would like to receive
                            your order.
                        </p>

                    </div>


                    {/* ================================================== */}
                    {/* MAIN GRID */}
                    {/* ================================================== */}

                    <div className="
                        grid
                        gap-8
                        lg:grid-cols-[1fr_380px]
                    ">


                        {/* ================================================== */}
                        {/* LEFT */}
                        {/* ================================================== */}

                        <div className="space-y-6">


                            {/* ================================================== */}
                            {/* DELIVERY METHOD */}
                            {/* ================================================== */}

                            <section className="
                                rounded-2xl
                                bg-white
                                p-6
                                shadow-sm
                            ">

                                <h2 className="
                                    mb-5
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Delivery Method
                                </h2>


                                <div className="
                                    grid
                                    gap-4
                                    sm:grid-cols-2
                                ">


                                    {/* SHIPPING */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFulfillmentMethod(
                                                "shipping"
                                            )
                                        }
                                        className={`
                                            rounded-2xl
                                            border
                                            p-5
                                            text-left
                                            transition
                                            ${
                                                fulfillmentMethod ===
                                                "shipping"
                                                    ? `
                                                        border-primary
                                                        bg-primary/5
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

                                        <div className="
                                            flex
                                            items-start
                                            justify-between
                                        ">

                                            <div className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-primary/10
                                                text-primary
                                            ">

                                                <Truck
                                                    size={24}
                                                />

                                            </div>


                                            <span
                                                className={`
                                                    h-5
                                                    w-5
                                                    rounded-full
                                                    border-2
                                                    ${
                                                        fulfillmentMethod ===
                                                        "shipping"
                                                            ? `
                                                                border-primary
                                                                bg-primary
                                                                ring-4
                                                                ring-primary/10
                                                            `
                                                            : `
                                                                border-gray-300
                                                            `
                                                    }
                                                `}
                                            />

                                        </div>


                                        <h3 className="
                                            mt-4
                                            font-semibold
                                            text-[var(--color-text)]
                                        ">
                                            Ship to my address
                                        </h3>
                                        <p className="
                                            mt-1.5
                                            text-sm
                                            text-[var(--color-text-light)]"><strong>NOTE: </strong>Free shipping of goods above <strong> ₦700,000 </strong> to Lagos address only <br />
                                        Shipping fees will be communicated to our esteem customers outside <strong> Lagos </strong> and good below <strong> ₦700,000 </strong>
                                        </p>

                                    </button>


                                    {/* PICKUP */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFulfillmentMethod(
                                                "pickup"
                                            )
                                        }
                                        className={`
                                            rounded-2xl
                                            border
                                            p-5
                                            text-left
                                            transition
                                            ${
                                                fulfillmentMethod ===
                                                "pickup"
                                                    ? `
                                                        border-primary
                                                        bg-primary/5
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

                                        <div className="
                                            flex
                                            items-start
                                            justify-between
                                        ">

                                            <div className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-primary/10
                                                text-primary
                                            ">

                                                <Store
                                                    size={24}
                                                />

                                            </div>


                                            <span
                                                className={`
                                                    h-5
                                                    w-5
                                                    rounded-full
                                                    border-2
                                                    ${
                                                        fulfillmentMethod ===
                                                        "pickup"
                                                            ? `
                                                                border-primary
                                                                bg-primary
                                                                ring-4
                                                                ring-primary/10
                                                            `
                                                            : `
                                                                border-gray-300
                                                            `
                                                    }
                                                `}
                                            />

                                        </div>


                                        <h3 className="
                                            mt-4
                                            font-semibold
                                            text-[var(--color-text)]
                                        ">
                                            Pickup
                                        </h3>


                                        <p className="
                                            mt-1
                                            text-sm
                                            text-[var(--color-text-light)]
                                        ">
                                            Pick up your order from
                                            our designated location.
                                        </p>

                                    </button>

                                </div>

                            </section>


                            {/* ================================================== */}
                            {/* SHIPPING ADDRESS */}
                            {/* ================================================== */}

                            {fulfillmentMethod ===
                                "shipping" && (

                                <section className="
                                    rounded-2xl
                                    bg-white
                                    p-6
                                    shadow-sm
                                ">

                                    <div className="
                                        mb-5
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    ">

                                        <div>

                                            <h2 className="
                                                text-xl
                                                font-semibold
                                                text-[var(--color-text)]
                                            ">
                                                Shipping Address
                                            </h2>

                                            <p className="
                                                mt-1
                                                text-sm
                                                text-[var(--color-text-light)]
                                            ">
                                                Select where you want
                                                your order delivered.
                                            </p>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    "/shipping-addresses/new?redirect=/checkout"
                                                )
                                            }
                                            className="
                                                flex
                                                shrink-0
                                                items-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-primary
                                                px-4
                                                py-2
                                                text-sm
                                                font-semibold
                                                text-primary
                                                transition
                                                hover:bg-primary
                                                hover:text-white
                                            "
                                        >

                                            <Plus
                                                size={17}
                                            />

                                            Add Address

                                        </button>

                                    </div>


                                    {addresses &&
                                    addresses.length > 0 ? (

                                        <div className="
                                            space-y-3
                                        ">

                                            {addresses.map(
                                                (address) => {

                                                    const selected =
                                                        selectedAddressId ===
                                                        address.id;

                                                    return (

                                                        <button
                                                            key={
                                                                address.id
                                                            }
                                                            type="button"
                                                            onClick={() =>
                                                                setSelectedAddressId(
                                                                    address.id
                                                                )
                                                            }
                                                            className={`
                                                                w-full
                                                                rounded-2xl
                                                                border
                                                                p-4
                                                                text-left
                                                                transition
                                                                ${
                                                                    selected
                                                                        ? `
                                                                            border-primary
                                                                            bg-primary/5
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

                                                            <div className="
                                                                flex
                                                                gap-4
                                                            ">

                                                                <div className="
                                                                    flex
                                                                    h-10
                                                                    w-10
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    rounded-full
                                                                    bg-primary/10
                                                                    text-primary
                                                                ">

                                                                    <MapPin
                                                                        size={19}
                                                                    />

                                                                </div>


                                                                <div className="
                                                                    min-w-0
                                                                    flex-1
                                                                ">

                                                                    <div className="
                                                                        flex
                                                                        flex-wrap
                                                                        items-center
                                                                        gap-2
                                                                    ">

                                                                        <p className="
                                                                            font-semibold
                                                                            text-[var(--color-text)]
                                                                        ">
                                                                            {
                                                                                address.full_name
                                                                            }
                                                                        </p>


                                                                        {address.is_default && (

                                                                            <span className="
                                                                                rounded-full
                                                                                bg-primary/10
                                                                                px-2
                                                                                py-1
                                                                                text-xs
                                                                                font-medium
                                                                                text-primary
                                                                            ">
                                                                                Default
                                                                            </span>

                                                                        )}

                                                                    </div>


                                                                    <p className="
                                                                        mt-1
                                                                        text-sm
                                                                        text-[var(--color-text-light)]
                                                                    ">
                                                                        {
                                                                            address.phone
                                                                        }
                                                                    </p>


                                                                    <p className="
                                                                        mt-2
                                                                        text-sm
                                                                        leading-6
                                                                        text-[var(--color-text-light)]
                                                                    ">

                                                                        {
                                                                            address.address_line_1
                                                                        }

                                                                        {address.address_line_2 &&
                                                                            `, ${address.address_line_2}`}

                                                                        {`, ${address.city}, ${address.state}`}

                                                                        {address.postal_code &&
                                                                            ` ${address.postal_code}`}

                                                                        {`, ${address.country}`}

                                                                    </p>

                                                                </div>


                                                                <div className="
                                                                    flex
                                                                    shrink-0
                                                                    items-start
                                                                ">

                                                                    <span
                                                                        className={`
                                                                            h-5
                                                                            w-5
                                                                            rounded-full
                                                                            border-2
                                                                            ${
                                                                                selected
                                                                                    ? `
                                                                                        border-primary
                                                                                        bg-primary
                                                                                        ring-4
                                                                                        ring-primary/10
                                                                                    `
                                                                                    : `
                                                                                        border-gray-300
                                                                                    `
                                                                            }
                                                                        `}
                                                                    />

                                                                </div>

                                                            </div>

                                                        </button>

                                                    );

                                                }
                                            )}

                                        </div>

                                    ) : (

                                        <div className="
                                            rounded-2xl
                                            border
                                            border-dashed
                                            border-gray-300
                                            p-8
                                            text-center
                                        ">

                                            <MapPin
                                                className="
                                                    mx-auto
                                                    mb-3
                                                    text-gray-400
                                                "
                                                size={32}
                                            />

                                            <h3 className="
                                                font-semibold
                                                text-[var(--color-text)]
                                            ">
                                                No shipping address
                                            </h3>

                                            <p className="
                                                mt-1
                                                text-sm
                                                text-[var(--color-text-light)]
                                            ">
                                                Add a shipping address
                                                to continue.
                                            </p>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.push(
                                                        "/shipping-addresses/new?redirect=/checkout"
                                                    )
                                                }
                                                className="
                                                    mt-5
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-primary
                                                    px-5
                                                    py-3
                                                    font-semibold
                                                    text-white
                                                    transition
                                                    hover:bg-[var(--color-primary-dark)]
                                                "
                                            >

                                                <Plus
                                                    size={18}
                                                />

                                                Add Shipping Address

                                            </button>

                                        </div>

                                    )}

                                </section>

                            )}


                            {/* ================================================== */}
                            {/* PICKUP INFORMATION */}
                            {/* ================================================== */}

                            {fulfillmentMethod ===
                                "pickup" && (

                                <section className="
                                    rounded-2xl
                                    bg-white
                                    p-6
                                    shadow-sm
                                ">

                                    <div className="
                                        flex
                                        gap-4
                                    ">

                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-primary/10
                                            text-primary
                                        ">

                                            <Store
                                                size={24}
                                            />

                                        </div>


                                        <div>

                                            <h2 className="
                                                text-xl
                                                font-semibold
                                                text-[var(--color-text)]
                                            ">
                                                Pickup Order
                                            </h2>

                                            <p className="
                                                mt-2
                                                text-sm
                                                leading-6
                                                text-[var(--color-text-light)]
                                            ">
                                                Your order will be
                                                prepared for pickup at
                                                our office loaction
                                            </p>

                                        </div>

                                    </div>

                                </section>

                            )}

                        </div>


                        {/* ================================================== */}
                        {/* ORDER SUMMARY */}
                        {/* ================================================== */}

                        <aside>

                            <div className="
                                sticky
                                top-6
                                rounded-2xl
                                bg-white
                                p-6
                                shadow-sm
                            ">

                                <h2 className="
                                    mb-5
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Order Summary
                                </h2>


                                {/* ITEMS */}

                                <div className="
                                    max-h-80
                                    space-y-4
                                    overflow-y-auto
                                ">

                                    {cart?.items.map(
                                        (item) => (

                                        <div
                                            key={
                                                item.id
                                            }
                                            className="
                                                flex
                                                gap-3
                                            "
                                        >

                                            <div className="
                                                min-w-0
                                                flex-1
                                            ">

                                                <p className="
                                                    line-clamp-2
                                                    text-sm
                                                    font-medium
                                                    text-[var(--color-text)]
                                                ">
                                                    {
                                                        item.product?.name
                                                    }
                                                </p>

                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-[var(--color-text-light)]
                                                ">
                                                    Qty: {
                                                        item.quantity
                                                    }
                                                </p>

                                            </div>


                                            <p className="
                                                shrink-0
                                                text-sm
                                                font-semibold
                                                text-[var(--color-text)]
                                            ">
                                                {formatCurrency(
                                                    item.total_price
                                                )}
                                            </p>

                                        </div>

                                    ))}

                                </div>


                                <div className="
                                    my-5
                                    border-t
                                    border-gray-200
                                " />

                                {/* SUBTOTAL */}

                                <div className="
                                    flex
                                    justify-between
                                    text-sm
                                ">

                                    <span className="
                                        text-[var(--color-text-light)]
                                    ">
                                        Subtotal
                                    </span>

                                    <span className="
                                        font-medium
                                        text-[var(--color-text)]
                                    ">
                                        {formatCurrency(
                                            subtotal
                                        )}
                                    </span>

                                </div>


                                {/* VAT */}

                                <div className="
                                    mt-3
                                    flex
                                    justify-between
                                    text-sm
                                ">

                                    <span className="
                                        text-[var(--color-text-light)]
                                    ">
                                        VAT (7.5%)
                                    </span>

                                    <span className="
                                        font-medium
                                        text-[var(--color-text)]
                                    ">
                                        {formatCurrency(
                                            vatAmount
                                        )}
                                    </span>

                                </div>


                                {/* SHIPPING */}

                                <div className="
                                    mt-3
                                    flex
                                    justify-between
                                    text-sm
                                ">

                                    <span className="
                                        text-[var(--color-text-light)]
                                    ">
                                        Shipping
                                    </span>

                                    <span className="
                                        font-medium
                                        text-[var(--color-text)]
                                    ">
                                        {fulfillmentMethod === "shipping"
                                            ? "-"
                                            : "Free"}
                                    </span>

                                </div>


                                {/* TOTAL */}

                                <div className="
                                    mt-5
                                    flex
                                    items-center
                                    justify-between
                                    border-t
                                    border-gray-200
                                    pt-5
                                ">

                                    <span className="
                                        text-lg
                                        font-semibold
                                        text-[var(--color-text)]
                                    ">
                                        Total
                                    </span>

                                    <span className="
                                        text-2xl
                                        font-bold
                                        text-primary
                                    ">
                                        {formatCurrency(
                                            totalWithVat
                                        )}
                                    </span>

                                </div>


                                {/* CONTINUE */}
                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    disabled={
                                        creatingOrder ||
                                        !cart ||
                                        cart.items.length === 0 ||
                                        (
                                            fulfillmentMethod === "shipping" &&
                                            !selectedAddressId
                                        )
                                    }
                                    className="
                                        mt-6
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-4
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-[var(--color-primary-dark)]
                                        disabled:cursor-not-allowed
                                        disabled:bg-gray-400
                                    "
                                >
                                    {creatingOrder ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className="animate-spin"
                                            />

                                            Creating Order...
                                        </>
                                    ) : (
                                        "Continue to Payment"
                                    )}
                                </button>


                                {/* BACK TO CART */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            "/cart"
                                        )
                                    }
                                    className="
                                        mt-3
                                        w-full
                                        py-2
                                        text-sm
                                        font-medium
                                        text-[var(--color-text-light)]
                                        transition
                                        hover:text-primary
                                    "
                                >
                                    ← Back to Cart
                                </button>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>
            <Footer />
        </main>

    );
}