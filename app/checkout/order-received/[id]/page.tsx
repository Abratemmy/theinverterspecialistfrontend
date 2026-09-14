"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    CheckCircle2,
    Copy,
    Building2,
    Package,
    MapPin,
    Loader2,
    ArrowRight,
    ShoppingBag,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";

import formatCurrency from "@/utils/formatCurrency";


// ============================================================
// TYPES
// ============================================================

interface ProductMedia {
    id: number;
    media_type: string;
    media_url: string;
    thumbnail_url?: string | null;
    alt_text?: string | null;
    is_primary?: boolean;
    display_order?: number;
}


interface OrderProduct {
    id: number;
    name: string;
    price?: number | string;
    discount_price?: number | string | null;
    media?: ProductMedia[];
}


interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;

    product: OrderProduct;

    quantity: number;

    unit_price: number | string;

    discount_amount?:
        | number
        | string;

    total_price:
        | number
        | string;
}


interface ShippingAddress {
    id: number;

    full_name: string;

    phone: string;

    address_line_1: string;

    address_line_2?: string | null;

    city: string;

    state: string;

    postal_code?: string | null;

    country: string;
}


interface Order {
    id: number;

    order_number: string;

    user_id: number;

    cart_id?: number | null;

    fulfillment_method:
        | "shipping"
        | "pickup";

    shipping_address_id?:
        number | null;

    shipping_fee:
        number | string;

    subtotal:
        number | string;

    discount:
        number | string;

    tax:
        number | string;

    total_amount:
        number | string;

    payment_status:
        string;

    order_status:
        string;

    created_at:
        string;

    updated_at?:
        string;

    items: OrderItem[];

    shippingAddress?:
        ShippingAddress | null;
}


interface OrderResponse {
    success: boolean;

    message: string;

    data: Order;
}


// ============================================================
// BANK DETAILS
// ============================================================

const bankDetails = [

    {
        bankName:
            "UNITED BANK FOR AFRICA (UBA)",

        accountName:
            "Ebton Greener Energy co.",

        accountNumber:
            "1026270424",
    },

];


// ============================================================
// PAGE
// ============================================================

export default function OrderReceivedPage() {

    const router = useRouter();

    const params =
        useParams();

    const id =
        params?.id as string;


    // ============================================================
    // STATE
    // ============================================================

    const [
        order,
        setOrder,
    ] = useState<Order | null>(null);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    const [
        copied,
        setCopied,
    ] = useState("");


    // ============================================================
    // FETCH ORDER
    // ============================================================

    useEffect(() => {

        if (!id) {
            return;
        }


        const fetchOrder =
            async () => {

                try {

                    setLoading(true);

                    setError("");


                    const API_URL =
                        process.env
                            .NEXT_PUBLIC_API_URL;


                    if (!API_URL) {

                        throw new Error(
                            "API URL is not configured."
                        );

                    }


                    const response =
                        await fetch(
                            `${API_URL}/orders/${id}`,
                            {
                                method:
                                    "GET",

                                credentials:
                                    "include",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },
                            }
                        );


                    const result:
                        OrderResponse =
                        await response.json();


                    if (
                        !response.ok ||
                        !result.success
                    ) {

                        throw new Error(
                            result.message ||
                            "Unable to fetch order."
                        );

                    }


                    setOrder(
                        result.data
                    );

                } catch (error) {

                    console.error(
                        "Order received error:",
                        error
                    );


                    setError(
                        error instanceof Error
                            ? error.message
                            : "Unable to load your order."
                    );

                } finally {

                    setLoading(false);

                }

            };


        fetchOrder();

    }, [id]);


    // ============================================================
    // COPY
    // ============================================================

    const handleCopy = async (
        value: string,
        key: string
    ) => {

        try {

            await navigator.clipboard.writeText(
                value
            );

            setCopied(key);


            setTimeout(() => {

                setCopied("");

            }, 2000);

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }
    };


    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (
        date: string
    ) => {

        return new Intl.DateTimeFormat(
            "en-NG",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        ).format(
            new Date(date)
        );

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <main className="min-h-screen">

                <Header />

                <div className="
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                ">

                    <Loader2
                        size={32}
                        className="
                            animate-spin
                            text-primary
                        "
                    />

                </div>

                <Footer />

            </main>

        );

    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error || !order) {

        return (

            <main className="min-h-screen">

                <Header />

                <section className="
                    flex
                    min-h-[65vh]
                    items-center
                    justify-center
                    bg-[var(--color-background)]
                    px-4
                ">

                    <div className="
                        w-full
                        max-w-lg
                        rounded-2xl
                        bg-white
                        p-8
                        text-center
                        shadow-sm
                    ">

                        <div className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-red-50
                            text-red-500
                        ">

                            <Package
                                size={30}
                            />

                        </div>


                        <h1 className="
                            mt-5
                            text-2xl
                            font-bold
                            text-[var(--color-text)]
                        ">
                            Unable to load order
                        </h1>


                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-[var(--color-text-light)]
                        ">
                            {error ||
                                "The order could not be found."
                            }
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/orders"
                                )
                            }
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
                                transition
                                hover:bg-[var(--color-primary-dark)]
                            "
                        >
                            View My Orders

                            <ArrowRight
                                size={18}
                            />

                        </button>

                    </div>

                </section>

                <Footer />

            </main>

        );

    }


    // ============================================================
    // CALCULATIONS
    // ============================================================

    const subtotal =
        Number(order.subtotal || 0);

    const discount =
        Number(order.discount || 0);

    const tax =
        Number(order.tax || 0);

    const shippingFee =
        Number(order.shipping_fee || 0);

    const total =
        Number(order.total_amount || 0);


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
                    max-w-6xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">


                    {/* ================================================== */}
                    {/* SUCCESS MESSAGE */}
                    {/* ================================================== */}

                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                        sm:p-8
                    ">

                        <div className="
                            flex
                            flex-col
                            items-center
                            text-center
                        ">

                            <div className="
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-full
                                bg-green-50
                                text-green-600
                            ">

                                <CheckCircle2
                                    size={44}
                                />

                            </div>

                            <h1 className="
                                mt-6
                                text-3xl
                                font-bold
                                text-[var(--color-text)]
                            ">
                                Order received
                            </h1>


                            <p className="
                                mt-2
                                max-w-xl
                                text-[var(--color-text-light)]
                            ">
                                Thank you. Your order has
                                been received.
                            </p>


                            <div className="
                                mt-6
                                rounded-xl
                                bg-primary/5
                                px-5
                                py-3
                            ">

                                <p className="
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">
                                    Order number
                                </p>


                                <p className="
                                    mt-1
                                    font-bold
                                    text-primary
                                ">
                                    {order.order_number}
                                </p>

                            </div>

                        </div>


                        {/* ================================================== */}
                        {/* ORDER META */}
                        {/* ================================================== */}

                        <div className="
                            mt-8
                            grid
                            gap-4
                            border-t
                            border-gray-100
                            pt-8
                            sm:grid-cols-3
                        ">

                            <div className="
                                rounded-xl
                                bg-gray-50
                                p-4
                            ">

                                <p className="
                                    text-xs
                                    text-[var(--color-text-light)]
                                ">
                                    Date
                                </p>

                                <p className="
                                    mt-1
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    {formatDate(
                                        order.created_at
                                    )}
                                </p>

                            </div>


                            <div className="
                                rounded-xl
                                bg-gray-50
                                p-4
                            ">

                                <p className="
                                    text-xs
                                    text-[var(--color-text-light)]
                                ">
                                    Total
                                </p>

                                <p className="
                                    mt-1
                                    font-semibold
                                    text-primary
                                ">
                                    {formatCurrency(
                                        total
                                    )}
                                </p>

                            </div>


                            <div className="
                                rounded-xl
                                bg-gray-50
                                p-4
                            ">

                                <p className="
                                    text-xs
                                    text-[var(--color-text-light)]
                                ">
                                    Payment method
                                </p>

                                <p className="
                                    mt-1
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Direct bank transfer
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================================================== */}
                    {/* BANK DETAILS */}
                    {/* ================================================== */}

                    <section className="
                        mt-6
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                        sm:p-8
                    ">

                        <div className="
                            flex
                            items-start
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

                                <Building2
                                    size={24}
                                />

                            </div>


                            <div>

                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Our bank details
                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-[var(--color-text-light)]
                                ">
                                    Please transfer the exact
                                    order amount shown above.
                                    Your order will be processed
                                    after your payment has been
                                    confirmed.
                                </p>

                            </div>

                        </div>


                        <div className="
                            mt-6
                            grid
                            gap-4
                            md:grid-cols-2
                        ">

                            {bankDetails.map(
                                (bank) => (

                                    <div
                                        key={
                                            bank.accountNumber
                                        }
                                        className="
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            p-5
                                        "
                                    >

                                        <p className="
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-wide
                                            text-[var(--color-text-light)]
                                        ">
                                            Bank
                                        </p>


                                        <p className="
                                            mt-1
                                            font-bold
                                            text-[var(--color-text)]
                                        ">
                                            {bank.bankName}
                                        </p>


                                        <div className="
                                            mt-5
                                            space-y-3
                                        ">

                                            <div>

                                                <p className="
                                                    text-xs
                                                    text-[var(--color-text-light)]
                                                ">
                                                    Account Name
                                                </p>

                                                <p className="
                                                    mt-1
                                                    font-semibold
                                                    text-[var(--color-text)]
                                                ">
                                                    {
                                                        bank.accountName
                                                    }
                                                </p>

                                            </div>


                                            <div>

                                                <p className="
                                                    text-xs
                                                    text-[var(--color-text-light)]
                                                ">
                                                    Account Number
                                                </p>


                                                <div className="
                                                    mt-1
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                    rounded-xl
                                                    bg-white
                                                    p-3
                                                ">

                                                    <p className="
                                                        font-bold
                                                        tracking-wide
                                                        text-[var(--color-text)]
                                                    ">
                                                        {
                                                            bank.accountNumber
                                                        }
                                                    </p>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleCopy(
                                                                bank.accountNumber,
                                                                bank.accountNumber
                                                            )
                                                        }
                                                        className="
                                                            flex
                                                            shrink-0
                                                            items-center
                                                            gap-1.5
                                                            rounded-lg
                                                            px-2
                                                            py-1.5
                                                            text-xs
                                                            font-medium
                                                            text-primary
                                                            transition
                                                            hover:bg-primary/10
                                                        "
                                                    >

                                                        <Copy
                                                            size={15}
                                                        />

                                                        {copied ===
                                                        bank.accountNumber
                                                            ? "Copied"
                                                            : "Copy"
                                                        }

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        <div className="
                            mt-5
                            rounded-xl
                            border
                            border-yellow-200
                            bg-yellow-50
                            p-4
                        ">

                            <p className="
                                text-sm
                                leading-6
                                text-yellow-800
                            ">
                                <strong>Important:</strong>{" "}
                                Please use your order number{" "}
                                <strong>
                                    {order.order_number}
                                </strong>{" "}
                                as the payment narration/reference
                                where your bank allows it.
                            </p>

                        </div>

                    </section>


                    {/* ================================================== */}
                    {/* ORDER DETAILS */}
                    {/* ================================================== */}

                    <section className="
                        mt-6
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                        sm:p-8
                    ">

                        <div className="
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

                                <ShoppingBag
                                    size={22}
                                />

                            </div>


                            <div>

                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    Order details
                                </h2>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">
                                    Items included in your order.
                                </p>

                            </div>

                        </div>


                        {/* ================================================== */}
                        {/* DESKTOP TABLE */}
                        {/* ================================================== */}

                        <div className="
                            mt-6
                            hidden
                            overflow-hidden
                            rounded-xl
                            border
                            border-gray-200
                            md:block
                        ">

                            <table className="
                                w-full
                                text-sm
                            ">

                                <thead>

                                    <tr className="
                                        border-b
                                        border-gray-200
                                        bg-gray-50
                                    ">

                                        <th className="
                                            px-4
                                            py-3
                                            text-left
                                            font-semibold
                                            text-[var(--color-text)]
                                        ">
                                            Product
                                        </th>

                                        <th className="
                                            px-4
                                            py-3
                                            text-center
                                            font-semibold
                                            text-[var(--color-text)]
                                        ">
                                            Quantity
                                        </th>

                                        <th className="
                                            px-4
                                            py-3
                                            text-right
                                            font-semibold
                                            text-[var(--color-text)]
                                        ">
                                            Total
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {order.items?.map(
                                        (item) => {

                                            const primaryImage =
                                                item.product?.media
                                                    ?.find(
                                                        (media) =>
                                                            media.is_primary
                                                    )
                                                    ?.media_url ||
                                                item.product?.media?.[0]
                                                    ?.media_url;


                                            return (

                                                <tr
                                                    key={item.id}
                                                    className="
                                                        border-b
                                                        border-gray-100
                                                        last:border-0
                                                    "
                                                >

                                                    <td className="
                                                        px-4
                                                        py-4
                                                    ">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-4
                                                        ">

                                                            <div className="
                                                                h-16
                                                                w-16
                                                                shrink-0
                                                                overflow-hidden
                                                                rounded-xl
                                                                bg-gray-100
                                                            ">

                                                                {primaryImage ? (

                                                                    <img
                                                                        src={
                                                                            primaryImage
                                                                        }
                                                                        alt={
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
                                                                            size={22}
                                                                        />

                                                                    </div>

                                                                )}

                                                            </div>


                                                            <div>

                                                                <p className="
                                                                    font-semibold
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
                                                                    {formatCurrency(
                                                                        Number(
                                                                            item.unit_price
                                                                        )
                                                                    )}{" "}
                                                                    each
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td className="
                                                        px-4
                                                        py-4
                                                        text-center
                                                        text-[var(--color-text-light)]
                                                    ">
                                                        {item.quantity}
                                                    </td>


                                                    <td className="
                                                        px-4
                                                        py-4
                                                        text-right
                                                        font-semibold
                                                        text-[var(--color-text)]
                                                    ">
                                                        {formatCurrency(
                                                            Number(
                                                                item.total_price
                                                            )
                                                        )}
                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* ================================================== */}
                        {/* MOBILE ITEMS */}
                        {/* ================================================== */}

                        <div className="
                            mt-6
                            space-y-4
                            md:hidden
                        ">

                            {order.items?.map(
                                (item) => {

                                    const primaryImage =
                                        item.product?.media
                                            ?.find(
                                                (media) =>
                                                    media.is_primary
                                            )
                                            ?.media_url ||
                                        item.product?.media?.[0]
                                            ?.media_url;


                                    return (

                                        <div
                                            key={item.id}
                                            className="
                                                flex
                                                gap-3
                                                rounded-xl
                                                border
                                                border-gray-200
                                                p-3
                                            "
                                        >

                                            <div className="
                                                h-16
                                                w-16
                                                shrink-0
                                                overflow-hidden
                                                rounded-xl
                                                bg-gray-100
                                            ">

                                                {primaryImage ? (

                                                    <img
                                                        src={
                                                            primaryImage
                                                        }
                                                        alt={
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
                                                            size={20}
                                                        />

                                                    </div>

                                                )}

                                            </div>


                                            <div className="
                                                min-w-0
                                                flex-1
                                            ">

                                                <p className="
                                                    line-clamp-2
                                                    font-semibold
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
                                                    Qty:{" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </p>


                                                <p className="
                                                    mt-2
                                                    font-semibold
                                                    text-primary
                                                ">
                                                    {formatCurrency(
                                                        Number(
                                                            item.total_price
                                                        )
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>


                        {/* ================================================== */}
                        {/* TOTALS */}
                        {/* ================================================== */}

                        <div className="
                            mt-6
                            ml-auto
                            max-w-md
                            space-y-3
                            border-t
                            border-gray-200
                            pt-5
                        ">

                            <div className="
                                flex
                                justify-between
                                gap-4
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


                            {discount > 0 && (

                                <div className="
                                    flex
                                    justify-between
                                    gap-4
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
                                        -
                                        {formatCurrency(
                                            discount
                                        )}
                                    </span>

                                </div>

                            )}


                            <div className="
                                flex
                                justify-between
                                gap-4
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
                                    {shippingFee > 0
                                        ? formatCurrency(
                                            shippingFee
                                        )
                                        : "Free"
                                    }
                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                gap-4
                                text-sm
                            ">

                                <span className="
                                    text-[var(--color-text-light)]
                                ">
                                    VAT
                                </span>

                                <span className="
                                    font-medium
                                    text-[var(--color-text)]
                                ">
                                    {formatCurrency(
                                        tax
                                    )}
                                </span>

                            </div>


                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-gray-200
                                pt-4
                            ">

                                <span className="
                                    text-lg
                                    font-bold
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
                                        total
                                    )}
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* ================================================== */}
                    {/* BILLING / SHIPPING ADDRESS */}
                    {/* ================================================== */}

                    {order.shippingAddress && (

                        <section className="
                            mt-6
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                            sm:p-8
                        ">

                            <div className="
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

                                    <MapPin
                                        size={22}
                                    />

                                </div>


                                <div>

                                    <h2 className="
                                        text-xl
                                        font-semibold
                                        text-[var(--color-text)]
                                    ">
                                        Billing address
                                    </h2>

                                </div>

                            </div>


                            <div className="
                                mt-5
                                rounded-xl
                                bg-gray-50
                                p-5
                            ">

                                <p className="
                                    font-semibold
                                    text-[var(--color-text)]
                                ">
                                    {
                                        order.shippingAddress
                                            .full_name
                                    }
                                </p>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">
                                    {
                                        order.shippingAddress
                                            .phone
                                    }
                                </p>


                                <p className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-[var(--color-text-light)]
                                ">

                                    {
                                        order.shippingAddress
                                            .address_line_1
                                    }

                                    {order.shippingAddress
                                        .address_line_2 &&
                                        `, ${order.shippingAddress.address_line_2}`
                                    }

                                    {`, ${order.shippingAddress.city}, ${order.shippingAddress.state}`}

                                    {order.shippingAddress
                                        .postal_code &&
                                        ` ${order.shippingAddress.postal_code}`
                                    }

                                    {`, ${order.shippingAddress.country}`}

                                </p>

                            </div>

                        </section>

                    )}


                    {/* ================================================== */}
                    {/* ACTIONS */}
                    {/* ================================================== */}

                    <div className="
                        mt-8
                        flex
                        flex-col
                        justify-center
                        gap-3
                        sm:flex-row
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/"
                                )
                            }
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                px-6
                                py-3
                                font-semibold
                                text-[var(--color-text)]
                                transition
                                hover:border-primary
                                hover:text-primary
                            "
                        >
                            <ShoppingBag
                                size={18}
                            />

                            Continue Shopping

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/orders"
                                )
                            }
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-primary
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-[var(--color-primary-dark)]
                            "
                        >
                            View My Orders

                            <ArrowRight
                                size={18}
                            />

                        </button>

                    </div>


                    {/* ================================================== */}
                    {/* PAYMENT NOTICE */}
                    {/* ================================================== */}

                    <div className="
                        mt-6
                        rounded-2xl
                        border
                        border-primary/20
                        bg-primary/5
                        p-5
                        text-center
                    ">

                        <p className="
                            text-sm
                            leading-6
                            text-[var(--color-text-light)]
                        ">
                            Your order is currently awaiting
                            payment confirmation. Once your
                            bank transfer has been confirmed,
                            your payment status will be updated
                            and your order will proceed for
                            processing.
                        </p>

                    </div>

                </div>

            </section>


            <Footer />

        </main>
    );
}