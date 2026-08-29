"use client";

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    RefreshCw,
    Search,
    Eye,
    CreditCard,
} from "lucide-react";

import useAdminPayment from "@/hooks/useAdminPayment";
import StatusSelect, {
    type StatusSelectOption,
} from "@/components/admin/StatusSelect";

import type {
    AdminPaymentStatus,
} from "@/types/payment";
import { ErrorState, LoadingState } from "@/components/common";


// ============================================================
// PAYMENT STATUS LABELS
// ============================================================


const paymentStatusLabels: Record<
    AdminPaymentStatus,
    string
> = {

    pending: "Pending",

    successful: "Successful",

    failed: "Failed",

    cancelled: "Cancelled",

    refunded: "Refunded",

};


// ============================================================
// PAYMENT STATUS STYLES
// ============================================================

const paymentStatusStyles: Record<
    AdminPaymentStatus,
    string
> = {

    pending:
        "bg-yellow-50 text-yellow-700 border-yellow-200",

    successful:
        "bg-green-50 text-green-700 border-green-200",

    failed:
        "bg-red-50 text-red-700 border-red-200",

    cancelled:
        "bg-gray-100 text-gray-600 border-gray-200",

    refunded:
        "bg-purple-50 text-purple-700 border-purple-200",

};


const paymentStatusOptions = [

    {
        value: "",
        label: "All Payment Status",
        className:
            "text-gray-700 hover:bg-gray-50",
    },

    {
        value: "pending",
        label: "Pending",
        className:
            "text-yellow-700 hover:bg-yellow-50",
    },

    {
        value: "successful",
        label: "Successful",
        className:
            "text-green-700 hover:bg-green-50",
    },

    {
        value: "failed",
        label: "Failed",
        className:
            "text-red-700 hover:bg-red-50",
    },

    {
        value: "cancelled",
        label: "Cancelled",
        className:
            "text-gray-600 hover:bg-gray-100",
    },

    {
        value: "refunded",
        label: "Refunded",
        className:
            "text-purple-700 hover:bg-purple-50",
    },

] satisfies StatusSelectOption<
    AdminPaymentStatus | ""
>[];

// ============================================================
// PAGE
// ============================================================

export default function PaymentsPage() {

    const router =
        useRouter();


    // ========================================================
    // STATE
    // ========================================================

    const [
        page,
        setPage
    ] = useState(1);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        paymentStatus,
        setPaymentStatus
    ] = useState<
        AdminPaymentStatus | ""
    >("");


    const limit = 10;


    // ========================================================
    // PAYMENT QUERY
    // ========================================================

    const {
        payments,
        pagination,
        loading,
        fetching,
        error,
        refetch,
    } = useAdminPayment({

        page,

        limit,

        status:
            paymentStatus,

        search,

    });


    // ========================================================
    // SEARCH
    // ========================================================

    const handleSearchChange = (
        value: string
    ) => {

        setSearch(value);

        setPage(1);

    };


    // ========================================================
    // STATUS FILTER
    // ========================================================

    const handleStatusChange = (
        value:
            AdminPaymentStatus | ""
    ) => {

        setPaymentStatus(value);

        setPage(1);

    };


    // ========================================================
    // VIEW PAYMENT
    // ========================================================

    const handleViewPayment = (
        paymentId: number
    ) => {

        router.push(
            `/admin/payments/${paymentId}`
        );

    };


    // ========================================================
    // FORMAT CURRENCY
    // ========================================================

    const formatCurrency = (
        amount:
            number | string
    ) => {

        return new Intl.NumberFormat(
            "en-NG",
            {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
            }
        ).format(
            Number(amount)
        );

    };


    // ========================================================
    // FORMAT DATE
    // ========================================================

    const formatDate = (
        date: string
    ) => {

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


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="space-y-6">

                <div>

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Payments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage and monitor customer payments.
                    </p>

                </div>


                <LoadingState text="loading payment.." />

            </div>

        );

    }


    // ========================================================
    // ERROR
    // ========================================================

    if (error) {

        return (

            <div className="space-y-6">

                <div>

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Payments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage and monitor customer payments.
                    </p>

                </div>

                

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                    <ErrorState description={error.message} />
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="
                            mt-4
                            rounded-lg
                            bg-primary
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                        "
                    >
                        Try Again
                    </button>
                </div>
                

            </div>

        );

    }


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <div className="space-y-6">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">

                <div>

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Payments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage and monitor customer payments.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() => refetch()}
                    disabled={fetching}
                    className="
                        inline-flex
                        h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    <RefreshCw
                        size={17}
                        className={
                            fetching
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh

                </button>

            </div>


            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px]">

                    {/* SEARCH */}

                    <div className="relative">

                        <Search
                            size={18}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                handleSearchChange(
                                    event.target.value
                                )
                            }
                            placeholder="
                                Search payment reference or order number...
                            "
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                pl-10
                                pr-3
                                text-sm
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />

                    </div>


                    {/* STATUS */}

                 <StatusSelect
                    value={paymentStatus}
                    onChange={handleStatusChange}
                    options={paymentStatusOptions}
                    className="w-full"
                />

                </div>

            </div>


            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                mt-6">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="border-b border-gray-200 bg-gray-50">

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Payment
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Order
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Method
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[var(--color-text)]">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {payments.length === 0 ? (

                                <tr className="">

                                    <td
                                        colSpan={7}
                                        className="px-5 py-16 text-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="
                                                mb-3
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-gray-100
                                                text-gray-400
                                            ">

                                                <CreditCard
                                                    size={22}
                                                />

                                            </div>

                                            <p className="text-sm font-medium text-gray-700">
                                                No payments found
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Try changing your search or filter.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                payments.map(
                                    (payment) => {

                                        const status =
                                            payment.status;


                                        const customerName =
                                            payment.user
                                                ? `${payment.user.first_name} ${payment.user.last_name}`
                                                : "Unknown";


                                        return (

                                            <tr
                                                key={
                                                    payment.id
                                                }
                                                onClick={() =>
                                                    handleViewPayment(
                                                        payment.id
                                                    )
                                                }
                                                className="
                                                    cursor-pointer
                                                    border-b
                                                    border-gray-100
                                                    transition
                                                    odd:bg-[var(--color-primary-light)]
                                                    even:bg-[var(--color-background)]
                                                    hover:bg-gray-100
                                                "
                                            >

                                                {/* PAYMENT */}

                                                <td className="px-5 py-4">

                                                    <div>

                                                        <p className="text-sm font-medium text-gray-900">

                                                            {
                                                                payment.payment_reference
                                                            }

                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">

                                                            {
                                                                formatDate(
                                                                    payment.created_at
                                                                )
                                                            }

                                                        </p>

                                                    </div>

                                                </td>


                                                {/* CUSTOMER */}

                                                <td className="px-5 py-4">

                                                    <div>

                                                        <p className="text-sm font-medium text-gray-900">
                                                            {
                                                                customerName
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">

                                                            {
                                                                payment.user?.email ||
                                                                "—"
                                                            }

                                                        </p>

                                                    </div>

                                                </td>


                                                {/* ORDER */}

                                                <td className="px-5 py-4">

                                                    <span className="text-sm font-medium text-gray-700">

                                                        {
                                                            payment.order?.order_number ||
                                                            `Order #${payment.order_id}`
                                                        }

                                                    </span>

                                                </td>


                                                {/* AMOUNT */}

                                                <td className="px-5 py-4">

                                                    <span className="text-sm font-semibold text-gray-900">

                                                        {
                                                            formatCurrency(
                                                                payment.amount
                                                            )
                                                        }

                                                    </span>

                                                </td>


                                                {/* METHOD */}

                                                <td className="px-5 py-4">

                                                    <span className="text-sm capitalize text-gray-600">

                                                        {
                                                            payment.payment_method
                                                                ?.replace(
                                                                    "_",
                                                                    " "
                                                                )
                                                        }

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td className="px-5 py-4">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            items-center
                                                            rounded-full
                                                            border
                                                            px-3
                                                            py-1
                                                            text-xs
                                                            font-medium
                                                            ${paymentStatusStyles[status]}
                                                        `}
                                                    >

                                                        {
                                                            paymentStatusLabels[
                                                                status
                                                            ]
                                                        }

                                                    </span>

                                                </td>


                                                {/* ACTION */}

                                                <td
                                                    className="px-5 py-4 text-right"
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleViewPayment(
                                                                payment.id
                                                            )
                                                        }
                                                        className="
                                                            inline-flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            text-gray-500
                                                            transition
                                                            hover:bg-gray-100
                                                            hover:text-gray-900
                                                        "
                                                        title="View payment"
                                                    >

                                                        <Eye
                                                            size={17}
                                                        />

                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* ==================================================
                    PAGINATION
                ================================================== */}

                {pagination &&
                    pagination.totalPages > 0 && (

                    <div className="
                        flex
                        flex-col
                        gap-3
                        border-t
                        border-gray-200
                        px-5
                        py-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <p className="text-sm text-gray-500">

                            Showing page{" "}

                            <span className="font-medium text-gray-700">
                                {
                                    pagination.page
                                }
                            </span>

                            {" "}of{" "}

                            <span className="font-medium text-gray-700">
                                {
                                    pagination.totalPages
                                }
                            </span>

                            {" "}·{" "}

                            <span className="font-medium text-gray-700">
                                {
                                    pagination.total
                                }
                            </span>

                            {" "}payments

                        </p>


                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                disabled={
                                    page <= 1
                                }
                                onClick={() =>
                                    setPage(
                                        (current) =>
                                            Math.max(
                                                1,
                                                current - 1
                                            )
                                    )
                                }
                                className="
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                            >
                                Previous
                            </button>


                            <button
                                type="button"
                                disabled={
                                    page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    setPage(
                                        (current) =>
                                            Math.min(
                                                pagination.totalPages,
                                                current + 1
                                            )
                                    )
                                }
                                className="
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                            >
                                Next
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}