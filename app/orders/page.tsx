"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronDown,
    ChevronUp,
    Package,
} from "lucide-react";

import api from "@/lib/axios";

import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";


// ============================================================
// TYPES
// ============================================================

interface ProductMedia {
    id: number;

    media_type:
        | "image"
        | "video";

    media_url: string;

    thumbnail_url:
        | string
        | null;

    alt_text:
        | string
        | null;

    is_primary:
        | boolean
        | number;

    display_order:
        | number
        | null;
}


interface Product {
    id: number;

    name: string;

    slug: string;

    price:
        | number
        | string;

    discount_price:
        | number
        | string
        | null;

    media:
        ProductMedia[];
}


interface OrderItem {
    id: number;

    order_id: number;

    product_id: number;

    quantity: number;

    unit_price:
        | number
        | string;

    discount:
        | number
        | string;

    total_price:
        | number
        | string;

    product:
        | Product
        | null;
}


interface Order {

    id: number;

    order_number: string;

    user_id: number;

    cart_id:
        | number
        | null;

    fulfillment_method:
        | "shipping"
        | "pickup";

    shipping_address_id:
        | number
        | null;

    subtotal:
        | number
        | string;

    shipping_fee:
        | number
        | string;

    discount:
        | number
        | string;

    tax:
        | number
        | string;

    total_amount:
        | number
        | string;

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

    notes?:
        | string
        | null;

    created_at: string;

    updated_at: string;

    items:
        OrderItem[];
}


// ============================================================
// HELPERS
// ============================================================

const formatCurrency = (
    amount:
        | number
        | string
) => {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",

            currency: "NGN",

            maximumFractionDigits: 0
        }
    ).format(
        Number(amount)
    );

};


const formatDate = (
    date: string
) => {

    return new Intl.DateTimeFormat(
        "en-NG",
        {
            day: "numeric",

            month: "short",

            year: "numeric",

            hour: "numeric",

            minute: "2-digit"
        }
    ).format(
        new Date(date)
    );

};


// ============================================================
// STATUS
// ============================================================

const orderStatuses = [

    "pending",

    "processing",

    "packed",

    "shipped",

    "out_for_delivery",

    "delivered"

] as const;


const getStatusLabel = (
    status: string
) => {

    switch (status) {

        case "pending":
            return "Order Pending";

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

        case "paid":
            return "Paid";

        case "pending":
            return "Payment Pending";

        case "failed":
            return "Payment Failed";

        case "refunded":
            return "Refunded";

        default:
            return status;

    }

};


const getStatusIndex = (
    status: string
) => {

    return orderStatuses.indexOf(
        status as typeof orderStatuses[number]
    );

};


// ============================================================
// PRODUCT IMAGE
// ============================================================

const getProductImage = (
    product:
        | Product
        | null
) => {

    if (
        !product ||
        !product.media ||
        product.media.length === 0
    ) {

        return null;

    }


    const primaryImage =
        product.media.find(
            (media) =>
                media.media_type ===
                    "image" &&
                Boolean(
                    media.is_primary
                )
        );


    if (primaryImage) {

        return primaryImage.media_url;

    }


    const firstImage =
        product.media.find(
            (media) =>
                media.media_type ===
                "image"
        );


    return firstImage?.media_url || null;

};


// ============================================================
// ORDER PROGRESS
// ============================================================

const OrderProgress = ({
    status
}: {
    status: string;
}) => {

    // ========================================================
    // CANCELLED
    // ========================================================

    if (
        status ===
        "cancelled"
    ) {

        return (

            <div
                style={{
                    marginTop: 20,

                    padding: 16,

                    borderRadius: 10,

                    background:
                        "#fff1f2",

                    border:
                        "1px solid #fecdd3",

                    color:
                        "#be123c"
                }}
            >

                <strong>
                    Order Cancelled
                </strong>


                <div
                    style={{
                        marginTop: 5,

                        fontSize: 14
                    }}
                >
                    This order has been cancelled.
                </div>

            </div>

        );

    }


    const currentIndex =
        getStatusIndex(
            status
        );


    // ========================================================
    // SAFETY
    // ========================================================

    if (
        currentIndex === -1
    ) {

        return null;

    }


    return (

        <div
            style={{
                marginTop: 25,

                overflowX: "auto",

                paddingBottom: 5
            }}
        >

            <div
                style={{
                    display: "flex",

                    alignItems:
                        "flex-start",

                    minWidth:
                        650
                }}
            >

                {orderStatuses.map(
                    (
                        orderStatus,
                        index
                    ) => {

                        const completed =
                            index <=
                            currentIndex;

                        const isCurrent =
                            index ===
                            currentIndex;


                        return (

                            <div
                                key={
                                    orderStatus
                                }
                                style={{
                                    flex: 1,

                                    textAlign:
                                        "center"
                                }}
                            >

                                <div
                                    style={{
                                        display:
                                            "flex",

                                        alignItems:
                                            "center"
                                    }}
                                >

                                    <div
                                        style={{
                                            width: 28,

                                            height: 28,

                                            minWidth: 28,

                                            borderRadius:
                                                "50%",

                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            margin:
                                                "0 auto",

                                            background:
                                                completed
                                                    ? "#0f766e"
                                                    : "#e5e7eb",

                                            color:
                                                completed
                                                    ? "#fff"
                                                    : "#6b7280",

                                            fontSize: 13,

                                            fontWeight: 600,

                                            border:
                                                isCurrent
                                                    ? "3px solid #99f6e4"
                                                    : "none"
                                        }}
                                    >

                                        {completed
                                            ? "✓"
                                            : index + 1}

                                    </div>


                                    {index <
                                        orderStatuses.length - 1 && (

                                        <div
                                            style={{
                                                flex: 1,

                                                height: 3,

                                                background:
                                                    index <
                                                    currentIndex
                                                        ? "#0f766e"
                                                        : "#e5e7eb",

                                                marginTop:
                                                    -28
                                            }}
                                        />

                                    )}

                                </div>


                                <div
                                    style={{
                                        marginTop: 8,

                                        fontSize: 11,

                                        color:
                                            completed
                                                ? "#0f766e"
                                                : "#6b7280",

                                        fontWeight:
                                            isCurrent
                                                ? 700
                                                : 400
                                    }}
                                >

                                    {getStatusLabel(
                                        orderStatus
                                    )}

                                </div>

                            </div>

                        );

                    }
                )}

            </div>

        </div>

    );

};


// ============================================================
// ORDER ITEMS
// ============================================================

const OrderItems = ({
    order
}: {
    order: Order;
}) => {

    const [
        open,
        setOpen
    ] = useState(false);


    const items =
        order.items || [];


    return (

        <div
            style={{
                marginTop: 18,

                border:
                    "1px solid #e5e7eb",

                borderRadius: 12,

                overflow: "hidden"
            }}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <button
                type="button"
                onClick={() =>
                    setOpen(
                        !open
                    )
                }
                style={{
                    width: "100%",

                    display: "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "space-between",

                    gap: 15,

                    padding:
                        "14px 16px",

                    background:
                        "#fafafa",

                    border: "none",

                    cursor: "pointer",

                    textAlign: "left"
                }}
            >

                <div
                    style={{
                        display:
                            "flex",

                        alignItems:
                            "center",

                        gap: 10
                    }}
                >

                    <Package
                        size={18}
                        color="#0f766e"
                    />


                    <div>

                        <div
                            style={{
                                fontSize: 14,

                                fontWeight: 600,

                                color:
                                    "#111827"
                            }}
                        >
                            Items in this order
                        </div>


                        <div
                            style={{
                                marginTop: 2,

                                fontSize: 12,

                                color:
                                    "#6b7280"
                            }}
                        >

                            {items.length}

                            {" "}

                            {items.length === 1
                                ? "product"
                                : "products"}

                        </div>

                    </div>

                </div>


                {open
                    ? (
                        <ChevronUp
                            size={20}
                            color="#6b7280"
                        />
                    )
                    : (
                        <ChevronDown
                            size={20}
                            color="#6b7280"
                        />
                    )}

            </button>


            {/* ==================================================
                ITEMS
            ================================================== */}

            {open && (

                <div
                    style={{
                        padding:
                            "0 16px"
                    }}
                >

                    {items.length === 0 ? (

                        <div
                            style={{
                                padding:
                                    "20px 0",

                                color:
                                    "#6b7280",

                                fontSize: 14
                            }}
                        >
                            No item information is available
                            for this order.
                        </div>

                    ) : (

                        items.map(
                            (
                                item,
                                index
                            ) => {

                                const image =
                                    getProductImage(
                                        item.product
                                    );


                                return (

                                    <div
                                        key={
                                            item.id
                                        }
                                        style={{
                                            display:
                                                "flex",

                                            gap: 14,

                                            padding:
                                                "16px 0",

                                            borderBottom:
                                                index <
                                                items.length - 1
                                                    ? "1px solid #eeeeee"
                                                    : "none"
                                        }}
                                    >

                                        {/* PRODUCT IMAGE */}

                                        <div
                                            style={{
                                                width: 70,

                                                height: 70,

                                                minWidth: 70,

                                                borderRadius: 10,

                                                overflow:
                                                    "hidden",

                                                background:
                                                    "#f3f4f6",

                                                display:
                                                    "flex",

                                                alignItems:
                                                    "center",

                                                justifyContent:
                                                    "center"
                                            }}
                                        >

                                            {image ? (

                                                <img
                                                    src={
                                                        image
                                                    }
                                                    alt={
                                                        item.product?.name ||
                                                        "Product"
                                                    }
                                                    style={{
                                                        width:
                                                            "100%",

                                                        height:
                                                            "100%",

                                                        objectFit:
                                                            "cover"
                                                    }}
                                                />

                                            ) : (

                                                <Package
                                                    size={25}
                                                    color="#9ca3af"
                                                />

                                            )}

                                        </div>


                                        {/* PRODUCT DETAILS */}

                                        <div
                                            style={{
                                                flex: 1,

                                                minWidth: 0
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,

                                                    fontWeight: 600,

                                                    color:
                                                        "#111827",

                                                    lineHeight:
                                                        1.4
                                                }}
                                            >

                                                {item.product?.name ||
                                                    "Product"}

                                            </div>


                                            <div
                                                style={{
                                                    marginTop: 5,

                                                    fontSize: 13,

                                                    color:
                                                        "#6b7280"
                                                }}
                                            >

                                                Quantity:

                                                {" "}

                                                {item.quantity}

                                            </div>


                                            <div
                                                style={{
                                                    marginTop: 4,

                                                    fontSize: 13,

                                                    color:
                                                        "#6b7280"
                                                }}
                                            >

                                                Unit price:

                                                {" "}

                                                {formatCurrency(
                                                    item.unit_price
                                                )}

                                            </div>

                                        </div>


                                        {/* TOTAL */}

                                        <div
                                            style={{
                                                flexShrink: 0,

                                                textAlign:
                                                    "right"
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,

                                                    fontWeight: 700,

                                                    color:
                                                        "#111827"
                                                }}
                                            >

                                                {formatCurrency(
                                                    item.total_price
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                );

                            }
                        )

                    )}

                </div>

            )}

        </div>

    );

};


// ============================================================
// MAIN PAGE
// ============================================================

export default function OrdersPage() {

    const [
        orders,
        setOrders
    ] = useState<Order[]>([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    // ========================================================
    // GET ORDERS
    // ========================================================

    useEffect(() => {

        const fetchOrders =
            async () => {

                try {

                    setLoading(
                        true
                    );

                    setError("");


                    const response =
                        await api.get(
                            "/orders"
                        );


                    console.log(
                        "MY ORDERS:",
                        response.data
                    );


                    if (
                        response.data?.success
                    ) {

                        setOrders(
                            response.data.data ||
                            []
                        );

                    } else {

                        setError(
                            response.data?.message ||
                            "Unable to load your orders."
                        );

                    }

                }
                catch (
                    error: any
                ) {

                    console.error(
                        "GET ORDERS ERROR:",
                        error
                    );


                    if (
                        error?.response?.status ===
                        401
                    ) {

                        setError(
                            "Please login to view your orders."
                        );

                    } else {

                        setError(
                            error?.response?.data?.message ||
                            "Unable to load your orders."
                        );

                    }

                }
                finally {

                    setLoading(
                        false
                    );

                }

            };


        fetchOrders();

    }, []);


    // ========================================================
    // LOADING
    // ========================================================

    if (
        loading
    ) {

        return (

            <section>

                <Header />

                <main
                    style={{
                        maxWidth: 1100,

                        margin:
                            "0 auto",

                        padding:
                            "50px 20px"
                    }}
                >

                    <h1
                        style={{
                            fontSize: 28,

                            fontWeight: 700,

                            marginBottom: 30
                        }}
                    >
                        My Orders
                    </h1>


                    <div
                        style={{
                            textAlign:
                                "center",

                            padding: 60,

                            color:
                                "#6b7280"
                        }}
                    >
                        Loading your orders...
                    </div>

                </main>

                <Footer />

            </section>

        );

    }


    // ========================================================
    // ERROR
    // ========================================================

    if (
        error
    ) {

        return (

            <section>

                <Header />

                <main
                    style={{
                        maxWidth: 1100,

                        margin:
                            "0 auto",

                        padding:
                            "50px 20px"
                    }}
                >

                    <h1
                        style={{
                            fontSize: 28,

                            fontWeight: 700,

                            marginBottom: 30
                        }}
                    >
                        My Orders
                    </h1>


                    <div
                        style={{
                            padding: 20,

                            borderRadius: 10,

                            background:
                                "#fff1f2",

                            border:
                                "1px solid #fecdd3",

                            color:
                                "#be123c"
                        }}
                    >
                        {error}
                    </div>

                </main>

                <Footer />

            </section>

        );

    }


    // ========================================================
    // NO ORDERS
    // ========================================================

    if (
        orders.length === 0
    ) {

        return (

            <section>

                <Header />

                <main
                    style={{
                        maxWidth: 1100,

                        margin:
                            "0 auto",

                        padding:
                            "50px 20px"
                    }}
                >

                    <h1
                        style={{
                            fontSize: 28,

                            fontWeight: 700,

                            marginBottom: 30
                        }}
                    >
                        My Orders
                    </h1>


                    <div
                        style={{
                            textAlign:
                                "center",

                            padding:
                                "70px 20px",

                            border:
                                "1px solid #e5e7eb",

                            borderRadius: 12
                        }}
                    >

                        <div
                            style={{
                                fontSize: 50,

                                marginBottom: 15
                            }}
                        >
                            📦
                        </div>


                        <h2
                            style={{
                                fontSize: 20,

                                fontWeight: 600,

                                marginBottom: 8
                            }}
                        >
                            No orders yet
                        </h2>


                        <p
                            style={{
                                color:
                                    "#6b7280",

                                marginBottom: 25
                            }}
                        >
                            You have not placed any orders yet.
                        </p>


                        <Link
                            href="/products"
                            style={{
                                display:
                                    "inline-block",

                                padding:
                                    "12px 20px",

                                borderRadius:
                                    8,

                                background:
                                    "#0f766e",

                                color:
                                    "#ffffff",

                                textDecoration:
                                    "none",

                                fontWeight:
                                    600
                            }}
                        >
                            Start Shopping
                        </Link>

                    </div>

                </main>

                <Footer />

            </section>

        );

    }


    // ========================================================
    // ORDERS
    // ========================================================

    return (

        <section>

            <Header />

            <main
                style={{
                    maxWidth: 1100,

                    margin:
                        "0 auto",

                    padding:
                        "45px 20px 80px"
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    style={{
                        marginBottom: 30
                    }}
                >

                    <h1
                        style={{
                            fontSize: 30,

                            fontWeight: 700,

                            marginBottom: 8
                        }}
                    >
                        My Orders
                    </h1>


                    <p
                        style={{
                            color:
                                "#6b7280",

                            margin: 0
                        }}
                    >
                        Track and manage your orders.
                    </p>

                </div>


                {/* =================================================
                    ORDER LIST
                ================================================= */}

                <div
                    style={{
                        display:
                            "flex",

                        flexDirection:
                            "column",

                        gap: 20
                    }}
                >

                    {orders.map(
                        (order) => (

                            <div
                                key={
                                    order.id
                                }
                                style={{
                                    border:
                                        "1px solid #e5e7eb",

                                    borderRadius:
                                        14,

                                    background:
                                        "#ffffff",

                                    padding:
                                        22,

                                    boxShadow:
                                        "0 2px 8px rgba(0,0,0,0.04)"
                                }}
                            >

                                {/* =================================
                                    ORDER HEADER
                                ================================= */}

                                <div
                                    style={{
                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "flex-start",

                                        gap: 20,

                                        flexWrap:
                                            "wrap"
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                fontSize:
                                                    13,

                                                color:
                                                    "#6b7280",

                                                marginBottom:
                                                    5
                                            }}
                                        >
                                            Order Number
                                        </div>


                                        <div
                                            style={{
                                                fontSize:
                                                    17,

                                                fontWeight:
                                                    700
                                            }}
                                        >

                                            #
                                            {
                                                order.order_number
                                            }

                                        </div>


                                        <div
                                            style={{
                                                marginTop:
                                                    6,

                                                fontSize:
                                                    13,

                                                color:
                                                    "#6b7280"
                                            }}
                                        >

                                            {
                                                formatDate(
                                                    order.created_at
                                                )
                                            }

                                        </div>

                                    </div>


                                    {/* =================================
                                        PAYMENT STATUS
                                    ================================= */}

                                    <div
                                        style={{
                                            display:
                                                "flex",

                                            flexDirection:
                                                "column",

                                            alignItems:
                                                "flex-end",

                                            gap: 7
                                        }}
                                    >

                                        <span
                                            style={{
                                                display:
                                                    "inline-block",

                                                padding:
                                                    "6px 11px",

                                                borderRadius:
                                                    20,

                                                fontSize:
                                                    12,

                                                fontWeight:
                                                    600,

                                                background:
                                                    order.payment_status ===
                                                    "paid"
                                                        ? "#dcfce7"
                                                        : order.payment_status ===
                                                          "failed"
                                                            ? "#fee2e2"
                                                            : "#fef3c7",

                                                color:
                                                    order.payment_status ===
                                                    "paid"
                                                        ? "#166534"
                                                        : order.payment_status ===
                                                          "failed"
                                                            ? "#991b1b"
                                                            : "#92400e"
                                            }}
                                        >

                                            {
                                                getPaymentLabel(
                                                    order.payment_status
                                                )
                                            }

                                        </span>


                                        <span
                                            style={{
                                                fontSize:
                                                    13,

                                                color:
                                                    "#6b7280"
                                            }}
                                        >

                                            {
                                                order.fulfillment_method ===
                                                "pickup"
                                                    ? "Pickup"
                                                    : "Delivery"
                                            }

                                        </span>

                                    </div>

                                </div>


                                {/* =================================
                                    ORDER ITEMS
                                ================================= */}

                                <OrderItems
                                    order={
                                        order
                                    }
                                />


                                {/* =================================
                                    ORDER AMOUNT
                                ================================= */}

                                {/* <div
                                    style={{
                                        marginTop:
                                            18,

                                        padding:
                                            "15px 0",

                                        borderTop:
                                            "1px solid #f0f0f0",

                                        borderBottom:
                                            "1px solid #f0f0f0",

                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center"
                                    }}
                                >

                                    <span
                                        style={{
                                            color:
                                                "#6b7280",

                                            fontSize:
                                                14
                                        }}
                                    >
                                        Total Amount
                                    </span>


                                    <strong
                                        style={{
                                            fontSize:
                                                19
                                        }}
                                    >

                                        {
                                            formatCurrency(
                                                order.total_amount
                                            )
                                        }

                                    </strong>

                                </div> */}

                                <div className="mt-6 border-t border-gray-200 pt-5 space-y-3">

                                {/* AMOUNT */}
                                <div className="flex items-center justify-between gap-4">

                                    <span className="text-sm text-gray-500">
                                        Amount
                                    </span>

                                    <span className="text-sm font-medium text-gray-700">
                                        ₦
                                        {Number(
                                            order.subtotal || 0
                                        ).toLocaleString("en-NG")}
                                    </span>

                                </div>


                                {/* VAT */}
                                <div className="flex items-center justify-between gap-4">

                                    <span className="text-sm text-gray-500">
                                        VAT (7.5%)
                                    </span>

                                    <span className="text-sm font-medium text-gray-700">
                                        ₦
                                        {Number(
                                            order.tax || 0
                                        ).toLocaleString("en-NG")}
                                    </span>

                                </div>


                                {/* TOTAL */}
                                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-3">

                                    <span className="text-base font-semibold text-gray-600">
                                        Total Amount
                                    </span>

                                    <span className="text-xl font-bold text-[var(--color-text)]">
                                        ₦
                                        {Number(
                                            order.total_amount || 0
                                        ).toLocaleString("en-NG")}
                                    </span>

                                </div>

                            </div>


                                {/* =================================
                                    ORDER STATUS

                                    Hide the progress timeline
                                    for cancelled orders.
                                ================================= */}

                                {order.order_status !==
                                    "cancelled" && (

                                    <OrderProgress
                                        status={
                                            order.order_status
                                        }
                                    />

                                )}


                                {/* =================================
                                    CURRENT STATUS
                                ================================= */}

                                <div
                                    style={{
                                        marginTop:
                                            25,

                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",

                                        gap: 15,

                                        flexWrap:
                                            "wrap"
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                fontSize:
                                                    12,

                                                color:
                                                    "#6b7280",

                                                marginBottom:
                                                    4
                                            }}
                                        >
                                            Current Status
                                        </div>


                                        <strong
                                            style={{
                                                fontSize:
                                                    15
                                            }}
                                        >

                                            {
                                                getStatusLabel(
                                                    order.order_status
                                                )
                                            }

                                        </strong>

                                    </div>


                                    <Link
                                        href={
                                            `/orders/${order.id}`
                                        }
                                        style={{
                                            display:
                                                "inline-block",

                                            padding:
                                                "10px 17px",

                                            borderRadius:
                                                8,

                                            border:
                                                "1px solid #d1d5db",

                                            color:
                                                "#374151",

                                            textDecoration:
                                                "none",

                                            fontSize:
                                                14,

                                            fontWeight:
                                                600
                                        }}
                                    >
                                        View Order
                                    </Link>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </main>

            <Footer />

        </section>

    );

}