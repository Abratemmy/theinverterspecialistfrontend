"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
ArrowLeft,
Check,
MapPin,
Package,
Truck,
Store,
XCircle,
Loader2,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import formatCurrency from "@/utils/formatCurrency";
import { showError } from "@/lib/toast";

// ============================================================
// TYPES
// ============================================================

interface ProductMedia {
id: number;
media_type: "image" | "video";
media_url: string;
thumbnail_url?: string | null;
alt_text?: string | null;
is_primary?: boolean;
display_order?: number;
}

interface Product {
id: number;
name: string;
slug?: string;
media?: ProductMedia[];
}

interface OrderItem {
id: number;
product_id: number;
quantity: number;
unit_price: number | string;
discount: number | string;
total_price: number | string;
product?: Product;
}

interface ShippingAddress {
id: number;
full_name: string;
phone: string;
address_line_1: string;
address_line_2?: string | null;
city: string;
state: string;
country: string;
postal_code?: string | null;
}

interface Order {
id: number;
order_number: string;
fulfillment_method: "shipping" | "pickup";


shipping_address_id?: number | null;

subtotal: number | string;
shipping_fee: number | string;
discount: number | string;
tax: number | string;
total_amount: number | string;

payment_status:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

order_status:
    | "pending"
    | "processing"
    | "packed"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";

notes?: string | null;

created_at: string;
updated_at?: string;

items: OrderItem[];

shippingAddress?: ShippingAddress | null;

}

// ============================================================
// STATUS CONFIGURATION
// ============================================================

const orderStatuses = [
{
key: "pending",
label: "Order Pending",
},
{
key: "processing",
label: "Processing",
},
{
key: "packed",
label: "Packed",
},
{
key: "shipped",
label: "Shipped",
},
{
key: "out_for_delivery",
label: "Out for Delivery",
},
{
key: "delivered",
label: "Delivered",
},
];

// ============================================================
// HELPERS
// ============================================================

const getStatusLabel = (
status: string
) => {

switch (status) {

    case "pending":
        return "Pending";

    case "processing":
        return "Processing";

    case "packed":
        return "Packed";

    case "shipped":
        return "Shipped";

    case "out_for_delivery":
        return "Out for Delivery";

    case "delivered":
        return "Delivered";

    case "cancelled":
        return "Cancelled";

    default:
        return status;
}

};

const getPaymentLabel = (
status: string
) => {

switch (status) {

    case "pending":
        return "Payment Pending";

    case "paid":
        return "Paid";

    case "failed":
        return "Payment Failed";

    case "refunded":
        return "Refunded";

    default:
        return status;
}

};

// ============================================================
// IMAGE URL
// ============================================================

const getImageUrl = (
url?: string | null
) => {

if (!url) {
    return null;
}

// Already a complete URL
if (
    url.startsWith("http://") ||
    url.startsWith("https://")
) {
    return url;
}

const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

return `${apiUrl}${url.startsWith("/") ? "" : "/"}${url}`;

};

// ============================================================
// PAGE
// ============================================================

export default function OrderDetailsPage() {

const params =
    useParams();

const router =
    useRouter();

const orderId =
    params?.id as string;


// ========================================================
// STATE
// ========================================================

const [
    order,
    setOrder
] = useState<Order | null>(null);

const [
    loading,
    setLoading
] = useState(true);

const [
    cancelling,
    setCancelling
] = useState(false);


// ========================================================
// FETCH ORDER
// ========================================================

useEffect(() => {

    if (!orderId) {
        return;
    }

    const fetchOrder = async () => {

        try {

            setLoading(true);

            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL

            const response =
                await fetch(
                    `${apiUrl}/orders/${orderId}`,
                    {
                        method: "GET",

                        credentials: "include",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result?.message ||
                    "Unable to retrieve order."
                );

            }


            setOrder(
                result.data
            );

        }
        catch (error: any) {

            console.error(
                "Get order error:",
                error
            );

            showError(
                error?.message ||
                "Unable to retrieve this order."
            );

            router.push(
                "/orders"
            );

        }
        finally {

            setLoading(false);

        }

    };


    fetchOrder();

}, [
    orderId,
    router
]);


// ========================================================
// CANCEL ORDER
// ========================================================

const handleCancelOrder = async () => {

    if (!order) {
        return;
    }


    if (
        order.order_status !==
        "pending"
    ) {

        showError(
            "Only pending orders can be cancelled."
        );

        return;
    }


    const confirmed =
        window.confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmed) {
        return;
    }


    try {

        setCancelling(true);


        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            "http://localhost:5000";


        const response =
            await fetch(
                `${apiUrl}/api/orders/${order.id}/cancel`,
                {
                    method: "PATCH",

                    credentials: "include",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result?.message ||
                "Unable to cancel order."
            );

        }


        setOrder(
            (previous) =>
                previous
                    ? {
                        ...previous,

                        order_status:
                            "cancelled"
                    }
                    : previous
        );


    }
    catch (error: any) {

        console.error(
            "Cancel order error:",
            error
        );

        showError(
            error?.message ||
            "Unable to cancel order."
        );

    }
    finally {

        setCancelling(false);

    }

};


// ========================================================
// LOADING
// ========================================================

if (loading) {

    return (

        <main className="min-h-screen">

            <Header />

            <section className="
                flex
                min-h-[70vh]
                items-center
                justify-center
                bg-[var(--color-background)]
            ">

                <Loader2
                    className="
                        h-8
                        w-8
                        animate-spin
                        text-primary
                    "
                />

            </section>

            <Footer />

        </main>

    );

}


// ========================================================
// ORDER NOT FOUND
// ========================================================

if (!order) {

    return (

        <main className="min-h-screen">

            <Header />

            <section className="
                flex
                min-h-[70vh]
                items-center
                justify-center
                bg-[var(--color-background)]
            ">

                <div className="
                    text-center
                ">

                    <Package
                        size={48}
                        className="
                            mx-auto
                            mb-4
                            text-gray-400
                        "
                    />

                    <h1 className="
                        text-2xl
                        font-bold
                        text-[var(--color-text)]
                    ">
                        Order not found
                    </h1>

                    <p className="
                        mt-2
                        text-[var(--color-text-light)]
                    ">
                        We could not find this order.
                    </p>

                    <Link
                        href="/orders"
                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-primary
                            px-5
                            py-3
                            font-semibold
                            text-white
                        "
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back to Orders

                    </Link>

                </div>

            </section>

            <Footer />

        </main>

    );

}


// ========================================================
// CURRENT STATUS INDEX
// ========================================================

const currentStatusIndex =
    orderStatuses.findIndex(
        (item) =>
            item.key ===
            order.order_status
    );


const isCancelled =
    order.order_status ===
    "cancelled";


const canCancel =
    order.order_status ===
    "pending";


// ========================================================
// PAGE
// ========================================================

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
                {/* BACK */}
                {/* ================================================== */}

                <Link
                    href="/orders"
                    className="
                        mb-6
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-[var(--color-text-light)]
                        transition
                        hover:text-primary
                    "
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back to My Orders

                </Link>


                {/* ================================================== */}
                {/* HEADER */}
                {/* ================================================== */}

                <div className="
                    mb-8
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                ">

                    <div>

                        <p className="
                            text-sm
                            text-[var(--color-text-light)]
                        ">
                            Order Details
                        </p>

                        <h1 className="
                            mt-1
                            text-3xl
                            font-bold
                            text-[var(--color-text)]
                        ">
                            #{order.order_number}
                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            text-[var(--color-text-light)]
                        ">

                            Placed on{" "}

                            {new Date(
                                order.created_at
                            ).toLocaleString(
                                "en-NG",
                                {
                                    dateStyle:
                                        "medium",

                                    timeStyle:
                                        "short"
                                }
                            )}

                        </p>

                    </div>


                    <div className="
                        flex
                        flex-wrap
                        gap-2
                    ">

                        <span className={`
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            ${
                                order.payment_status ===
                                "paid"
                                    ? `
                                        bg-green-100
                                        text-green-700
                                    `
                                    : order.payment_status ===
                                      "failed"
                                        ? `
                                            bg-red-100
                                            text-red-700
                                        `
                                        : `
                                            bg-yellow-100
                                            text-yellow-700
                                        `
                            }
                        `}>

                            {getPaymentLabel(
                                order.payment_status
                            )}

                        </span>


                        <span className={`
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            ${
                                isCancelled
                                    ? `
                                        bg-red-100
                                        text-red-700
                                    `
                                    : `
                                        bg-primary/10
                                        text-primary
                                    `
                            }
                        `}>

                            {getStatusLabel(
                                order.order_status
                            )}

                        </span>

                    </div>

                </div>


                {/* ================================================== */}
                {/* CANCELLED NOTICE */}
                {/* ================================================== */}

                {isCancelled && (

                    <div className="
                        mb-6
                        flex
                        items-start
                        gap-4
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        p-5
                    ">

                        <XCircle
                            className="
                                mt-0.5
                                shrink-0
                                text-red-600
                            "
                            size={24}
                        />

                        <div>

                            <h2 className="
                                font-semibold
                                text-red-800
                            ">
                                Order Cancelled
                            </h2>

                            <p className="
                                mt-1
                                text-sm
                                text-red-700
                            ">
                                This order has been
                                cancelled and will not
                                be processed.
                            </p>

                        </div>

                    </div>

                )}


                {/* ================================================== */}
                {/* DELIVERY STATUS */}
                {/* ================================================== */}

                {!isCancelled && (

                    <section className="
                        mb-8
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                    ">

                        <div className="
                            mb-6
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            ">

                                <Truck
                                    size={22}
                                />

                            </div>

                            <div>

                                <h2 className="
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Order Status
                                </h2>

                                <p className="
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">
                                    Track the progress of
                                    your order.
                                </p>

                            </div>

                        </div>


                        {/* DESKTOP TIMELINE */}

                        <div className="
                            hidden
                            md:block
                        ">

                            <div className="
                                flex
                                items-start
                            ">

                                {orderStatuses.map(
                                    (
                                        status,
                                        index
                                    ) => {

                                        const completed =
                                            index <
                                            currentStatusIndex;

                                        const active =
                                            index ===
                                            currentStatusIndex;

                                        const reached =
                                            completed ||
                                            active;


                                        return (

                                            <div
                                                key={
                                                    status.key
                                                }
                                                className="
                                                    flex-1
                                                "
                                            >

                                                <div className="
                                                    flex
                                                    items-center
                                                ">

                                                    <div
                                                        className={`
                                                            flex
                                                            h-9
                                                            w-9
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            text-sm
                                                            font-semibold
                                                            ${
                                                                reached
                                                                    ? `
                                                                        bg-primary
                                                                        text-white
                                                                    `
                                                                    : `
                                                                        bg-gray-200
                                                                        text-gray-500
                                                                    `
                                                            }
                                                        `}
                                                    >

                                                        {completed ? (

                                                            <Check
                                                                size={17}
                                                            />

                                                        ) : (

                                                            index + 1

                                                        )}

                                                    </div>


                                                    {index <
                                                        orderStatuses.length -
                                                            1 && (

                                                        <div
                                                            className={`
                                                                h-1
                                                                flex-1
                                                                ${
                                                                    index <
                                                                    currentStatusIndex
                                                                        ? `
                                                                            bg-primary
                                                                        `
                                                                        : `
                                                                            bg-gray-200
                                                                        `
                                                                }
                                                            `}
                                                        />

                                                    )}

                                                </div>


                                                <p className={`
                                                    mt-3
                                                    pr-2
                                                    text-xs
                                                    font-medium
                                                    ${
                                                        active
                                                            ? `
                                                                text-primary
                                                            `
                                                            : `
                                                                text-[var(--color-text-light)]
                                                            `
                                                    }
                                                `}>

                                                    {
                                                        status.label
                                                    }

                                                </p>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>


                        {/* MOBILE STATUS */}

                        <div className="
                            space-y-3
                            md:hidden
                        ">

                            {orderStatuses.map(
                                (
                                    status,
                                    index
                                ) => {

                                    const completed =
                                        index <
                                        currentStatusIndex;

                                    const active =
                                        index ===
                                        currentStatusIndex;


                                    return (

                                        <div
                                            key={
                                                status.key
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <div
                                                className={`
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    ${
                                                        completed ||
                                                        active
                                                            ? `
                                                                bg-primary
                                                                text-white
                                                            `
                                                            : `
                                                                bg-gray-200
                                                                text-gray-500
                                                            `
                                                    }
                                                `}
                                            >

                                                {completed ? (

                                                    <Check
                                                        size={16}
                                                    />

                                                ) : (

                                                    index + 1

                                                )}

                                            </div>


                                            <span className={`
                                                text-sm
                                                ${
                                                    active
                                                        ? `
                                                            font-semibold
                                                            text-primary
                                                        `
                                                        : `
                                                            text-[var(--color-text-light)]
                                                        `
                                                }
                                            `}>

                                                {
                                                    status.label
                                                }

                                            </span>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    </section>

                )}


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
                        {/* ORDER ITEMS */}
                        {/* ================================================== */}

                        <section className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                        ">

                            <div className="
                                mb-6
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
                                        Items Ordered
                                    </h2>

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-[var(--color-text-light)]
                                    ">

                                        {
                                            order.items?.length ||
                                            0
                                        }{" "}

                                        {order.items?.length ===
                                        1
                                            ? "item"
                                            : "items"}{" "}
                                        in this order

                                    </p>

                                </div>

                                <Package
                                    className="
                                        text-primary
                                    "
                                    size={24}
                                />

                            </div>


                            <div className="
                                divide-y
                                divide-gray-200
                            ">

                                {order.items?.map(
                                    (
                                        item
                                    ) => {

                                        const primaryMedia =
                                            item.product?.media
                                                ?.filter(
                                                    (
                                                        media
                                                    ) =>
                                                        media.media_type ===
                                                        "image"
                                                )
                                                ?.sort(
                                                    (
                                                        a,
                                                        b
                                                    ) =>
                                                        Number(
                                                            Boolean(
                                                                b.is_primary
                                                            )
                                                        ) -
                                                        Number(
                                                            Boolean(
                                                                a.is_primary
                                                            )
                                                        )
                                                )[0];


                                        const imageUrl =
                                            getImageUrl(
                                                primaryMedia?.media_url
                                            );


                                        return (

                                            <div
                                                key={
                                                    item.id
                                                }
                                                className="
                                                    flex
                                                    gap-4
                                                    py-5
                                                "
                                            >

                                                {/* PRODUCT IMAGE */}

                                                <div className="
                                                    h-24
                                                    w-24
                                                    shrink-0
                                                    overflow-hidden
                                                    rounded-xl
                                                    border
                                                    border-gray-200
                                                    bg-gray-50
                                                ">

                                                    {imageUrl ? (

                                                        <img
                                                            src={
                                                                imageUrl
                                                            }
                                                            alt={
                                                                primaryMedia?.alt_text ||
                                                                item.product?.name ||
                                                                "Product"
                                                            }
                                                            className="
                                                                h-full
                                                                w-full
                                                                object-cover
                                                            "
                                                        />

                                                    ) : (

                                                        <div className="
                                                            flex
                                                            h-full
                                                            w-full
                                                            items-center
                                                            justify-center
                                                            text-gray-400
                                                        ">

                                                            <Package
                                                                size={30}
                                                            />

                                                        </div>

                                                    )}

                                                </div>


                                                {/* PRODUCT DETAILS */}

                                                <div className="
                                                    min-w-0
                                                    flex-1
                                                ">

                                                    <h3 className="
                                                        font-semibold
                                                        text-[var(--color-text)]
                                                    ">

                                                        {
                                                            item.product?.name ||
                                                            "Product"
                                                        }

                                                    </h3>


                                                    <p className="
                                                        mt-1
                                                        text-sm
                                                        text-[var(--color-text-light)]
                                                    ">

                                                        Quantity:{" "}

                                                        <span className="
                                                            font-medium
                                                        ">
                                                            {
                                                                item.quantity
                                                            }
                                                        </span>

                                                    </p>


                                                    <p className="
                                                        mt-1
                                                        text-sm
                                                        text-[var(--color-text-light)]
                                                    ">

                                                        Unit price:{" "}

                                                        <span className="
                                                            font-medium
                                                        ">

                                                            {formatCurrency(
                                                                Number(
                                                                    item.unit_price
                                                                )
                                                            )}

                                                        </span>

                                                    </p>


                                                    {Number(
                                                        item.discount
                                                    ) > 0 && (

                                                        <p className="
                                                            mt-1
                                                            text-sm
                                                            text-green-600
                                                        ">

                                                            Discount:{" "}

                                                            {formatCurrency(
                                                                Number(
                                                                    item.discount
                                                                )
                                                            )}

                                                        </p>

                                                    )}

                                                </div>


                                                {/* ITEM TOTAL */}

                                                <div className="
                                                    shrink-0
                                                    text-right
                                                ">

                                                    <p className="
                                                        font-bold
                                                        text-[var(--color-text)]
                                                    ">

                                                        {formatCurrency(
                                                            Number(
                                                                item.total_price
                                                            )
                                                        )}

                                                    </p>

                                                    <p className="
                                                        mt-1
                                                        text-xs
                                                        text-[var(--color-text-light)]
                                                    ">
                                                        Item total
                                                    </p>

                                                </div>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </section>


                        {/* ================================================== */}
                        {/* DELIVERY / PICKUP */}
                        {/* ================================================== */}

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
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                ">

                                    {order.fulfillment_method ===
                                    "pickup" ? (

                                        <Store
                                            size={22}
                                        />

                                    ) : (

                                        <MapPin
                                            size={22}
                                        />

                                    )}

                                </div>


                                <div className="
                                    min-w-0
                                ">

                                    <h2 className="
                                        text-xl
                                        font-semibold
                                        text-[var(--color-text)]
                                    ">

                                        {order.fulfillment_method ===
                                        "pickup"
                                            ? "Pickup Information"
                                            : "Shipping Address"}

                                    </h2>


                                    {order.fulfillment_method ===
                                    "shipping" &&
                                    order.shippingAddress ? (

                                        <div className="
                                            mt-4
                                            space-y-1
                                            text-sm
                                            leading-6
                                            text-[var(--color-text-light)]
                                        ">

                                            <p className="
                                                font-semibold
                                                text-[var(--color-text)]
                                            ">

                                                {
                                                    order
                                                        .shippingAddress
                                                        .full_name
                                                }

                                            </p>


                                            <p>

                                                {
                                                    order
                                                        .shippingAddress
                                                        .phone
                                                }

                                            </p>


                                            <p>

                                                {
                                                    order
                                                        .shippingAddress
                                                        .address_line_1
                                                }

                                                {order
                                                    .shippingAddress
                                                    .address_line_2 &&
                                                    `, ${order.shippingAddress.address_line_2}`}

                                            </p>


                                            <p>

                                                {
                                                    order
                                                        .shippingAddress
                                                        .city
                                                }
                                                ,{" "}

                                                {
                                                    order
                                                        .shippingAddress
                                                        .state
                                                }

                                                {order
                                                    .shippingAddress
                                                    .postal_code &&
                                                    ` ${order.shippingAddress.postal_code}`}

                                            </p>


                                            <p>

                                                {
                                                    order
                                                        .shippingAddress
                                                        .country
                                                }

                                            </p>

                                        </div>

                                    ) : (

                                        <p className="
                                            mt-3
                                            text-sm
                                            leading-6
                                            text-[var(--color-text-light)]
                                        ">

                                            Your order will be
                                            available for pickup
                                            at our designated
                                            pickup location.

                                        </p>

                                    )}

                                </div>

                            </div>

                        </section>


                        {/* ================================================== */}
                        {/* NOTES */}
                        {/* ================================================== */}

                        {order.notes && (

                            <section className="
                                rounded-2xl
                                bg-white
                                p-6
                                shadow-sm
                            ">

                                <h2 className="
                                    text-lg
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Order Notes
                                </h2>

                                <p className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-[var(--color-text-light)]
                                ">
                                    {order.notes}
                                </p>

                            </section>

                        )}

                    </div>


                    {/* ================================================== */}
                    {/* RIGHT SUMMARY */}
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
                                        Number(
                                            order.subtotal
                                        )
                                    )}

                                </span>

                            </div>


                            {/* DISCOUNT */}

                            {Number(
                                order.discount
                            ) > 0 && (

                                <div className="
                                    mt-3
                                    flex
                                    justify-between
                                    text-sm
                                ">

                                    <span className="
                                        text-[var(--color-text-light)]
                                    ">
                                        Discount
                                    </span>

                                    <span className="
                                        font-medium
                                        text-green-600
                                    ">

                                        -{" "}

                                        {formatCurrency(
                                            Number(
                                                order.discount
                                            )
                                        )}

                                    </span>

                                </div>

                            )}


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

                                    {Number(
                                        order.shipping_fee
                                    ) > 0
                                        ? formatCurrency(
                                            Number(
                                                order.shipping_fee
                                            )
                                        )
                                        : "Free"}

                                </span>

                            </div>


                            {/* TAX */}

                            {Number(
                                order.tax
                            ) > 0 && (

                                <div className="
                                    mt-3
                                    flex
                                    justify-between
                                    text-sm
                                ">

                                    <span className="
                                        text-[var(--color-text-light)]
                                    ">
                                        Tax
                                    </span>

                                    <span className="
                                        font-medium
                                        text-[var(--color-text)]
                                    ">

                                        {formatCurrency(
                                            Number(
                                                order.tax
                                            )
                                        )}

                                    </span>

                                </div>

                            )}


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
                                        Number(
                                            order.total_amount
                                        )
                                    )}

                                </span>

                            </div>


                            {/* PAYMENT */}

                            <div className="
                                mt-5
                                rounded-xl
                                bg-gray-50
                                p-4
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                ">

                                    <span className="
                                        text-sm
                                        text-[var(--color-text-light)]
                                    ">
                                        Payment
                                    </span>

                                    <span className="
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    ">

                                        {
                                            getPaymentLabel(
                                                order.payment_status
                                            )
                                        }

                                    </span>

                                </div>


                                <div className="
                                    mt-3
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                ">

                                    <span className="
                                        text-sm
                                        text-[var(--color-text-light)]
                                    ">
                                        Delivery
                                    </span>

                                    <span className="
                                        text-sm
                                        font-semibold
                                        capitalize
                                        text-[var(--color-text)]
                                    ">

                                        {
                                            order.fulfillment_method
                                        }

                                    </span>

                                </div>

                            </div>


                            {/* CANCEL */}

                            {canCancel && (

                                <button
                                    type="button"
                                    onClick={
                                        handleCancelOrder
                                    }
                                    disabled={
                                        cancelling
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
                                        border-red-300
                                        px-5
                                        py-3
                                        font-semibold
                                        text-red-600
                                        transition
                                        hover:bg-red-50
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >

                                    {cancelling ? (

                                        <>

                                            <Loader2
                                                size={18}
                                                className="
                                                    animate-spin
                                                "
                                            />

                                            Cancelling...

                                        </>

                                    ) : (

                                        <>

                                            <XCircle
                                                size={18}
                                            />

                                            Cancel Order

                                        </>

                                    )}

                                </button>

                            )}


                            {/* BACK */}

                            <Link
                                href="/orders"
                                className="
                                    mt-3
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-gray-200
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                    transition
                                    hover:border-primary
                                    hover:text-primary
                                "
                            >

                                <ArrowLeft
                                    size={17}
                                />

                                Back to My Orders

                            </Link>

                        </div>

                    </aside>

                </div>

            </div>

        </section>


        <Footer />

    </main>

);

}
