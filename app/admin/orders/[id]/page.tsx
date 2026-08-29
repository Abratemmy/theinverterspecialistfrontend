"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { showError, showSuccess } from "@/lib/toast";
import OrderStatusSelect from "@/components/admin/Orders/OrderStatusSelect";
import { ErrorState, LoadingState } from "@/components/common";

type OrderStatus =
    | "pending"
    | "processing"
    | "packed"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";

type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

export interface OrderProduct {
    id: number;
    name: string;
    slug: string;

    price: string | number;
    discount_price: string | number;

    quantity: number;

    short_description: string;
    description: string;
    additional_information: string;

    featured: boolean;

    brand_id: number;
    category_id: number;

    media: ProductMedia[];
}

export interface OrderItem {
    order_id: number;

    product: OrderProduct;

    quantity: number;

    unit_price: string | number;
    discount_amount: string | number;
    total_price: string | number;
}

interface ShippingAddress {
    id: number;
    user_id: number;
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    state: string;
    country: string;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
}

interface ProductMedia {
    id: number;
    product_id: number;
    media_type: "image" | "video";
    media_url: string;
    thumbnail_url: string | null;
    alt_text: string | null;
    is_primary: boolean;
    display_order: number;
    created_at: string;
}


interface Product {
    id: number;
    name: string;
    slug: string;
    price: string | number;
    discount_price: string | number;
    quantity: number;
    short_description: string;
    description: string;
    additional_information: string;
    featured: boolean;
    brand_id: number;
    category_id: number;
    media: ProductMedia[];
}

interface Order {
    id: number;

    order_number: string;

    user?: User;

    product?: Product

    shippingAddress?: ShippingAddress;

    items: OrderItem[];
    fulfillment_method: "shipping" | "pickup";

    subtotal: number;
    shipping_fee: number;
    discount: number;
    tax: number;
    total_amount: number;

    payment_status: PaymentStatus;
    order_status: OrderStatus;

    created_at: string;
    updated_at: string;
}

const statusLabels: Record<OrderStatus, string> = {
    pending: "Pending",
    processing: "Processing",
    packed: "Packed",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const paymentLabels: Record<PaymentStatus, string> = {
    pending: "Pending",
    paid: "Paid",
    failed: "Failed",
    refunded: "Refunded",
};

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const orderId = params.id;

    const [order, setOrder] = useState<Order | null>(
        null
    );

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const getProductImage = (
        media: ProductMedia[]
    ) => {
        const primaryImage = media.find(
            (item) =>
                item.media_type === "image" &&
                item.is_primary
        );

        if (primaryImage) {
            return primaryImage.media_url;
        }

        const firstImage = media.find(
            (item) => item.media_type === "image"
        );

        return firstImage?.media_url || null;
    };

    // status changed
    const handleOrderStatusChange = async (
        status: OrderStatus
    ) => {
        if (!order) return;

        // Payment must be completed first
        if (order.payment_status !== "paid") {
            showError(
                "You can't perform this action because payment has not been made."
            );

            return;
        }

        // Don't make an unnecessary API request
        if (status === order.order_status) {
            return;
        }

        try {
            const response = await fetch(
                `${apiUrl}/admin/orders/${order.id}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        order_status: status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to update order status"
                );
            }

            // Update the order displayed on the page
            setOrder((prev) =>
                prev
                    ? {
                        ...prev,
                        order_status: status,
                    }
                    : prev
            );

            showSuccess(
                "Order status updated successfully."
            );
        } catch (error) {
            console.error(
                "UPDATE ORDER STATUS ERROR:",
                error
            );

            showError(
                error instanceof Error
                    ? error.message
                    : "Failed to update order status."
            );
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${apiUrl}/admin/orders/${orderId}`,
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            "Failed to fetch order"
                    );
                }

                setOrder(data.data);
            } catch (error) {
                console.error(
                    "FETCH ORDER ERROR:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load order details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <LoadingState
                text="Loading order details"
                />
        );
    }

    if (error || !order) {
        return (
            <div className="space-y-4">
                <button
                    onClick={() =>
                        router.push("/admin/orders")
                    }
                    className="
                        rounded-lg
                        border
                        px-4
                        py-2
                        text-sm
                        hover:bg-gray-50
                    "
                >
                    ← Back to Orders
                </button>

                <ErrorState
                    description={error}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-7">

                <div className="flex items-center gap-3">

                    <button
                        onClick={() =>
                            router.push(
                                "/admin/orders"
                            )
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            text-gray-600
                            hover:bg-gray-50
                        "
                    >
                        ←
                    </button>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            Order #{order.order_number}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Placed{" "}
                            {new Date(
                                order.created_at
                            ).toLocaleString()}
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium">
                        {
                            statusLabels[
                                order.order_status
                            ]
                        }
                    </span>

                    <span
                        className={`
                            rounded-full
                            px-3
                            py-1.5
                            text-sm
                            font-medium
                            ${
                                order.payment_status ===
                                "paid"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-yellow-50 text-yellow-700"
                            }
                        `}
                    >
                        {
                            paymentLabels[
                                order.payment_status
                            ]
                        }
                    </span>

                </div>

            </div>


            {/* Main grid */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Left */}
                <div className="space-y-6 lg:col-span-2">

                    {/* Customer */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6">

                        <h2 className="mb-5 text-base font-semibold text-gray-900">
                            Customer Information
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">

                            <div>
                                <p className="text-xs text-gray-500">
                                    Name
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {
                                        order.user
                                            ?.first_name
                                    }{" "}
                                    {
                                        order.user
                                            ?.last_name
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Email
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {
                                        order.user
                                            ?.email
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Phone
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {order.user
                                        ?.phone ||
                                        "N/A"}
                                </p>
                            </div>

                        </div>

                    </section>


                    {/* Shipping */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6">

                        <div className="mb-5 flex items-center justify-between">

                            <h2 className="text-base font-semibold text-gray-900">
                                {order.fulfillment_method === "shipping"
                                    ? "Shipping Address"
                                    : "Pickup Information"}
                            </h2>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                                {order.fulfillment_method}
                            </span>

                        </div>

                        {order.fulfillment_method === "shipping" &&
                        order.shippingAddress ? (
                            <div className="space-y-1 text-sm text-gray-600">

                                <p className="font-medium text-gray-900">
                                    {order.shippingAddress.full_name}
                                </p>

                                <p>
                                    {order.shippingAddress.address_line_1}
                                </p>

                                {order.shippingAddress.address_line_2 && (
                                    <p>
                                        {order.shippingAddress.address_line_2}
                                    </p>
                                )}

                                <p>
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.state}
                                </p>

                                <p>
                                    {order.shippingAddress.country}
                                </p>

                                <p className="pt-2">
                                    {order.shippingAddress.phone}
                                </p>

                            </div>
                        ) : (
                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Customer will pick up this order.
                                </p>
                            </div>
                        )}

                    </section>


                    {/* Order Items */}
                    <section className="rounded-2xl border border-gray-200 bg-white">

    <div className="border-b border-gray-200 p-6">

        <h2 className="text-base font-semibold text-gray-900">
            Order Items
        </h2>

    </div>

    <div className="divide-y divide-gray-100">

        {order.items.map((item) => {

            const productImage =
                getProductImage(
                    item.product.media
                );

            return (
                <div
                    key={`${item.order_id}-${item.product.id}`}
                    className="
                        flex
                        gap-4
                        p-6
                    "
                >

                    {/* Product Image */}
                    <div
                        className="
                            h-24
                            w-24
                            flex-shrink-0
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                        "
                    >

                        {productImage ? (
                            <img
                                src={productImage}
                                alt={
                                    item.product
                                        .name
                                }
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    items-center
                                    justify-center
                                    text-xs
                                    text-gray-400
                                "
                            >
                                No image
                            </div>
                        )}

                    </div>


                    {/* Product Information */}
                    <div
                        className="
                            flex
                            flex-1
                            items-start
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <h3
                                className="
                                    text-sm
                                    font-medium
                                    text-gray-900
                                "
                            >
                                {item.product.name}
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Qty:{" "}
                                {item.quantity}
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                "
                            >
                                ₦
                                {Number(
                                    item.unit_price
                                ).toLocaleString()}{" "}
                                each
                            </p>

                        </div>


                        {/* Total */}
                        <p
                            className="
                                text-sm
                                font-semibold
                                text-gray-900
                            "
                        >
                            ₦
                            {Number(
                                item.total_price
                            ).toLocaleString()}
                        </p>

                    </div>

                </div>
            );
        })}

    </div>

</section>

                </div>


                {/* Right */}
                <div className="space-y-6">

                    {/* Summary */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6">

                        <h2 className="mb-5 text-base font-semibold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span>
                                    ₦
                                    {Number(
                                        order.subtotal
                                    ).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Shipping
                                </span>

                                <span>
                                    ₦
                                    {Number(
                                        order.shipping_fee
                                    ).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Discount
                                </span>

                                <span className="text-green-600">
                                    -₦
                                    {Number(
                                        order.discount
                                    ).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Tax
                                </span>

                                <span>
                                    ₦
                                    {Number(
                                        order.tax
                                    ).toLocaleString()}
                                </span>
                            </div>

                            <div className="border-t border-gray-200 pt-4">

                                <div className="flex justify-between">

                                    <span className="font-semibold">
                                        Total
                                    </span>

                                    <span className="text-lg font-bold">
                                        ₦
                                        {Number(
                                            order.total_amount
                                        ).toLocaleString()}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* Payment */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6">

                        <h2 className="mb-4 text-base font-semibold">
                            Payment
                        </h2>

                        <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                                Payment Status
                            </span>

                            <span
                                className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-medium
                                    ${
                                        order.payment_status ===
                                        "paid"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-yellow-50 text-yellow-700"
                                    }
                                `}
                            >
                                {
                                    paymentLabels[
                                        order.payment_status
                                    ]
                                }
                            </span>

                        </div>

                    </section>


                    {/* Order status */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6">

                        <div className="mb-5 flex items-center justify-between gap-4">

                            <div>
                                <h2 className="text-base font-semibold text-gray-900">
                                    Order Status
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Update the status of this order
                                </p>
                            </div>

                            <OrderStatusSelect
                                value={order.order_status}
                                paymentStatus={order.payment_status}
                                onChange={handleOrderStatusChange}
                                disabled={
                                    order.payment_status !== "paid"
                                }
                            />

                        </div>


                        {/* Payment warning */}
                        {order.payment_status !== "paid" && (
                            <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
                                <p className="text-xs leading-5 text-yellow-700">
                                    Order status cannot be changed until
                                    payment has been completed.
                                </p>
                            </div>
                        )}

                    </section>

                </div>

            </div>

        </div>
    );
}