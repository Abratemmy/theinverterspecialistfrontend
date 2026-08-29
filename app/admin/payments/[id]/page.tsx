"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    ArrowLeft,
    CreditCard,
    User,
    ShoppingBag,
    CalendarDays,
    Hash,
    ExternalLink,
} from "lucide-react";

import type {
    AdminPaymentStatus,
} from "@/types/payment";


// ============================================================
// TYPES
// ============================================================

interface PaymentOrder {

    id: number;

    order_number: string;

    user_id: number;

    payment_status: string;

    order_status: string;

    subtotal: number | string;

    shipping_fee: number | string;

    discount: number | string;

    tax: number | string;

    total_amount: number | string;

}


interface PaymentUser {

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    phone?: string;

}


interface AdminPayment {

    id: number;

    order_id: number;

    user_id: number;

    payment_reference: string;

    gateway: string;

    payment_method: string;

    amount: number | string;

    currency: string;

    status: AdminPaymentStatus;

    gateway_transaction_id?: string;

    gateway_response?: string;

    paid_at?: string;

    created_at?: string;

    updated_at?: string;

    order?: PaymentOrder;

    user?: PaymentUser;

}


interface PaymentResponse {

    success: boolean;

    message: string;

    data: AdminPayment;

}


// ============================================================
// STATUS LABELS
// ============================================================

const paymentStatusLabels: Record<
    AdminPaymentStatus,
    string
> = {

    pending:
        "Pending",

    successful:
        "Successful",

    failed:
        "Failed",

    cancelled:
        "Cancelled",

    refunded:
        "Refunded",

};


// ============================================================
// STATUS STYLE
// ============================================================

const getPaymentStatusStyle = (
    status: AdminPaymentStatus
) => {

    switch (status) {

        case "successful":

            return `
                border-green-200
                bg-green-50
                text-green-700
            `;

        case "pending":

            return `
                border-yellow-200
                bg-yellow-50
                text-yellow-700
            `;

        case "failed":

            return `
                border-red-200
                bg-red-50
                text-red-700
            `;

        case "cancelled":

            return `
                border-gray-200
                bg-gray-50
                text-gray-600
            `;

        case "refunded":

            return `
                border-purple-200
                bg-purple-50
                text-purple-700
            `;

        default:

            return `
                border-gray-200
                bg-gray-50
                text-gray-600
            `;

    }

};


// ============================================================
// FORMAT MONEY
// ============================================================

const formatMoney = (
    amount: number | string
) => {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 2,
        }
    ).format(
        Number(amount)
    );

};


// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (
    date?: string
) => {

    if (!date) {
        return "N/A";
    }

    return new Date(
        date
    ).toLocaleString(
        "en-NG",
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    );

};


// ============================================================
// PAGE
// ============================================================

export default function PaymentDetailsPage() {

    const params =
        useParams();

    const router =
        useRouter();


    const paymentId =
        params.id;


    const [
        payment,
        setPayment
    ] = useState<
        AdminPayment | null
    >(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState<string | null>(
        null
    );


    // ========================================================
    // FETCH PAYMENT
    // ========================================================

    useEffect(() => {

        if (!paymentId) {
            return;
        }


        const fetchPayment =
            async () => {

                try {

                    setLoading(true);

                    setError(null);


                    const response =
                        await fetch(
                            `http://localhost:5000/api/admin/payments/${paymentId}`,
                            {
                                method:
                                    "GET",

                                credentials:
                                    "include",
                            }
                        );


                    const result =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "Failed to fetch payment."
                        );

                    }


                    const data =
                        result as PaymentResponse;


                    if (!data.success) {

                        throw new Error(
                            data.message ||
                            "Failed to fetch payment."
                        );

                    }


                    setPayment(
                        data.data
                    );

                }
                catch (error) {

                    console.error(
                        "FETCH PAYMENT ERROR:",
                        error
                    );


                    setError(
                        error instanceof Error
                            ? error.message
                            : "Failed to fetch payment."
                    );

                }
                finally {

                    setLoading(false);

                }

            };


        fetchPayment();

    }, [paymentId]);


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <main className="p-6">

                <div className="
                    h-8
                    w-48
                    animate-pulse
                    rounded-lg
                    bg-gray-200
                " />

                <div className="
                    mt-6
                    h-64
                    animate-pulse
                    rounded-2xl
                    bg-gray-100
                " />

            </main>

        );

    }


    // ========================================================
    // ERROR
    // ========================================================

    if (error || !payment) {

        return (

            <main className="p-6">

                <button
                    type="button"
                    onClick={() =>
                        router.back()
                    }
                    className="
                        mb-6
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-gray-900
                    "
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back

                </button>


                <div className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-6
                    text-sm
                    text-red-700
                ">

                    {error ||
                        "Payment not found."}

                </div>

            </main>

        );

    }


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <main className="
            space-y-6
            p-6
        ">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
                mb-7
            ">

                <div>

                    <button
                        type="button"
                        onClick={() =>
                            router.back()
                        }
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-gray-500
                            hover:text-gray-900
                        "
                    >

                        <ArrowLeft
                            size={17}
                        />

                        Back to Payments

                    </button>


                    <h1 className="
                        text-2xl
                        font-semibold
                        text-gray-900
                    ">
                        Payment Details
                    </h1>


                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        View payment and transaction information.
                    </p>

                </div>


                {/* STATUS */}

                <span className={`
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                    font-medium
                    ${getPaymentStatusStyle(
                        payment.status
                    )}
                `}>

                    <span className="
                        h-2
                        w-2
                        rounded-full
                        bg-current
                    " />

                    {
                        paymentStatusLabels[
                            payment.status
                        ]
                    }

                </span>

            </div>


            {/* ==================================================
                PAYMENT SUMMARY
            ================================================== */}

            <section className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
            ">

                <div className="
                    mb-6
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-gray-100
                    ">

                        <CreditCard
                            size={20}
                            className="text-gray-700"
                        />

                    </div>


                    <div>

                        <h2 className="
                            text-base
                            font-semibold
                            text-gray-900
                        ">
                            Payment Information
                        </h2>

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Main payment details
                        </p>

                    </div>

                </div>


                <div className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">

                    <div>

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Amount
                        </p>

                        <p className="
                            mt-1
                            text-lg
                            font-semibold
                            text-gray-900
                        ">
                            {
                                formatMoney(
                                    payment.amount
                                )
                            }
                        </p>

                    </div>


                    <div>

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Payment Method
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                            capitalize
                            text-gray-900
                        ">
                            {
                                payment.payment_method
                                    ?.replace(
                                        /_/g,
                                        " "
                                    )
                            }
                        </p>

                    </div>


                    <div>

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Gateway
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                            capitalize
                            text-gray-900
                        ">
                            {
                                payment.gateway
                            }
                        </p>

                    </div>


                    <div>

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Currency
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                            text-gray-900
                        ">
                            {
                                payment.currency
                            }
                        </p>

                    </div>

                </div>

            </section>


            {/* ==================================================
                REFERENCE INFORMATION
            ================================================== */}

            <section className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
            ">

                <h2 className="
                    mb-5
                    text-base
                    font-semibold
                    text-gray-900
                ">
                    Transaction Information
                </h2>


                <div className="
                    grid
                    gap-5
                    md:grid-cols-2
                ">

                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <Hash
                            size={18}
                            className="mt-0.5 text-gray-400"
                        />

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Payment Reference
                            </p>

                            <p className="
                                mt-1
                                break-all
                                text-sm
                                font-medium
                                text-gray-900
                            ">
                                {
                                    payment.payment_reference
                                }
                            </p>

                        </div>

                    </div>


                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <Hash
                            size={18}
                            className="mt-0.5 text-gray-400"
                        />

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Gateway Transaction ID
                            </p>

                            <p className="
                                mt-1
                                break-all
                                text-sm
                                font-medium
                                text-gray-900
                            ">
                                {
                                    payment.gateway_transaction_id ||
                                    "N/A"
                                }
                            </p>

                        </div>

                    </div>


                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <CalendarDays
                            size={18}
                            className="mt-0.5 text-gray-400"
                        />

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Created
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-900
                            ">
                                {
                                    formatDate(
                                        payment.created_at
                                    )
                                }
                            </p>

                        </div>

                    </div>


                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <CalendarDays
                            size={18}
                            className="mt-0.5 text-gray-400"
                        />

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Paid At
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-900
                            ">
                                {
                                    formatDate(
                                        payment.paid_at
                                    )
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                CUSTOMER + ORDER
            ================================================== */}

            <div className="
                grid
                gap-6
                lg:grid-cols-2
            ">

                {/* CUSTOMER */}

                <section className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                ">

                    <div className="
                        mb-5
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-100
                        ">

                            <User
                                size={19}
                                className="text-gray-700"
                            />

                        </div>


                        <h2 className="
                            text-base
                            font-semibold
                            text-gray-900
                        ">
                            Customer
                        </h2>

                    </div>


                    <div className="space-y-4">

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Name
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                font-medium
                                text-gray-900
                            ">
                                {
                                    payment.user
                                        ? `${payment.user.first_name} ${payment.user.last_name}`
                                        : "N/A"
                                }
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Email
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-900
                            ">
                                {
                                    payment.user?.email ||
                                    "N/A"
                                }
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Phone
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-900
                            ">
                                {
                                    payment.user?.phone ||
                                    "N/A"
                                }
                            </p>

                        </div>

                    </div>

                </section>


                {/* ORDER */}

                <section className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                ">

                    <div className="
                        mb-5
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-100
                        ">

                            <ShoppingBag
                                size={19}
                                className="text-gray-700"
                            />

                        </div>


                        <h2 className="
                            text-base
                            font-semibold
                            text-gray-900
                        ">
                            Order
                        </h2>

                    </div>


                    <div className="space-y-4">

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Order Number
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                font-medium
                                text-gray-900
                            ">
                                {
                                    payment.order
                                        ?.order_number ||
                                    "N/A"
                                }
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Order Status
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                font-medium
                                capitalize
                                text-gray-900
                            ">
                                {
                                    payment.order
                                        ?.order_status
                                            ?.replace(
                                                /_/g,
                                                " "
                                            ) ||
                                    "N/A"
                                }
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Order Total
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                font-semibold
                                text-gray-900
                            ">
                                {
                                    payment.order
                                        ? formatMoney(
                                            payment.order
                                                .total_amount
                                        )
                                        : "N/A"
                                }
                            </p>

                        </div>


                        {payment.order && (

                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        `/admin/orders/${payment.order!.id}`
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-primary
                                    hover:underline
                                "
                            >

                                View Order

                                <ExternalLink
                                    size={15}
                                />

                            </button>

                        )}

                    </div>

                </section>

            </div>


            {/* ==================================================
                ORDER BREAKDOWN
            ================================================== */}

            {payment.order && (

                <section className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                ">

                    <h2 className="
                        mb-5
                        text-base
                        font-semibold
                        text-gray-900
                    ">
                        Order Breakdown
                    </h2>


                    <div className="
                        ml-auto
                        max-w-md
                        space-y-3
                    ">

                        <div className="
                            flex
                            justify-between
                            text-sm
                        ">

                            <span className="text-gray-500">
                                Subtotal
                            </span>

                            <span className="font-medium">
                                {
                                    formatMoney(
                                        payment.order
                                            .subtotal
                                    )
                                }
                            </span>

                        </div>


                        <div className="
                            flex
                            justify-between
                            text-sm
                        ">

                            <span className="text-gray-500">
                                Shipping
                            </span>

                            <span className="font-medium">
                                {
                                    formatMoney(
                                        payment.order
                                            .shipping_fee
                                    )
                                }
                            </span>

                        </div>


                        <div className="
                            flex
                            justify-between
                            text-sm
                        ">

                            <span className="text-gray-500">
                                Discount
                            </span>

                            <span className="font-medium">
                                -
                                {
                                    formatMoney(
                                        payment.order
                                            .discount
                                    )
                                }
                            </span>

                        </div>


                        <div className="
                            flex
                            justify-between
                            text-sm
                        ">

                            <span className="text-gray-500">
                                Tax
                            </span>

                            <span className="font-medium">
                                {
                                    formatMoney(
                                        payment.order
                                            .tax
                                    )
                                }
                            </span>

                        </div>


                        <div className="
                            my-3
                            border-t
                            border-gray-200
                        " />


                        <div className="
                            flex
                            justify-between
                        ">

                            <span className="
                                font-semibold
                                text-gray-900
                            ">
                                Total
                            </span>

                            <span className="
                                text-lg
                                font-bold
                                text-gray-900
                            ">
                                {
                                    formatMoney(
                                        payment.order
                                            .total_amount
                                    )
                                }
                            </span>

                        </div>

                    </div>

                </section>

            )}

        </main>

    );

}