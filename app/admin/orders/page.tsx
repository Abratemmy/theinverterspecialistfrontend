"use client";

import {
    useState,
} from "react";

import {
    Search,
    ChevronLeft,
    ChevronRight,
    Package,
    RefreshCw,
} from "lucide-react";

import {
    useRouter,
} from "next/navigation";

import useAdminOrders from "@/hooks/useAdminOrders";
import {
    showError,
    showSuccess,
} from "@/lib/toast";

import type {
    Order,
    OrderStatus,
    PaymentStatus,
} from "@/types/order";

import LoadingState from "@/components/common/LoadingState/LoadingState";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import ErrorState from "@/components/common/ErrorState/ErrorState";
import OrderStatusSelect from "@/components/admin/Orders/OrderStatusSelect";
import StatusSelect from "@/components/admin/StatusSelect";



// ============================================================
// STATUS OPTIONS
// ============================================================

const orderStatusOptions: {
    value: OrderStatus | "";
    label: string;
}[] = [

    {
        value: "",
        label: "All Orders",
    },

    {
        value: "pending",
        label: "Pending",
    },

    {
        value: "processing",
        label: "Processing",
    },

    {
        value: "packed",
        label: "Packed",
    },

    {
        value: "shipped",
        label: "Shipped",
    },

    {
        value: "out_for_delivery",
        label: "Out for Delivery",
    },

    {
        value: "delivered",
        label: "Delivered",
    },

    {
        value: "cancelled",
        label: "Cancelled",
    },

];


// ============================================================
// PAYMENT STATUS OPTIONS
// ============================================================

const paymentStatusOptions: {
    value: PaymentStatus | "";
    label: string;
}[] = [

    {
        value: "",
        label: "All Payments",
    },

    {
        value: "pending",
        label: "Pending",
    },

    {
        value: "paid",
        label: "Paid",
    },

    {
        value: "failed",
        label: "Failed",
    },

    {
        value: "refunded",
        label: "Refunded",
    },

];

// ============================================================
// PAYMENT STATUS BADGE
// ============================================================

function PaymentStatusBadge({
    status,
}: {
    status: PaymentStatus;
}) {

    const styles: Record<
        PaymentStatus,
        string
    > = {

        pending:
            "bg-yellow-100 text-yellow-700",

        paid:
            "bg-green-100 text-green-700",

        failed:
            "bg-red-100 text-red-700",

        refunded:
            "bg-gray-100 text-gray-700",

    };


    const labels: Record<
        PaymentStatus,
        string
    > = {

        pending:
            "Pending",

        paid:
            "Paid",

        failed:
            "Failed",

        refunded:
            "Refunded",

    };


    return (

        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${styles[status]}
            `}
        >

            {labels[status]}

        </span>

    );

}

// ============================================================
// PAGE
// ============================================================

export default function AdminOrdersPage() {

    const router =
        useRouter();


    // ========================================================
    // FILTER STATE
    // ========================================================

    const [
        searchInput,
        setSearchInput,
    ] = useState("");


    const [
        search,
        setSearch,
    ] = useState("");


    const [
        orderStatus,
        setOrderStatus,
    ] = useState<
        OrderStatus | ""
    >("");


    const [
        paymentStatus,
        setPaymentStatus,
    ] = useState<
        PaymentStatus | ""
    >("");

    console.log("PAYMET", paymentStatus)
    const [
        page,
        setPage,
    ] = useState(1);


    const limit = 3;


    // ========================================================
    // ADMIN ORDERS
    // ========================================================

    const {

        orders,

        total,

        totalPages,

        loading,

        isFetching,

        isError,

        error,

        refetch,

        updateOrderStatus,

        updatingOrderStatus,

    } =
        useAdminOrders({

            page,

            limit,

            search,

            status:
                orderStatus,

            payment_status:
                paymentStatus,

        });


    // ========================================================
    // SEARCH
    // ========================================================

    const handleSearch = () => {

        setPage(1);

        setSearch(
            searchInput.trim()
        );

    };


    // ========================================================
    // ENTER SEARCH
    // ========================================================

    const handleSearchKeyDown = (
        event:
            React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (
            event.key === "Enter"
        ) {

            handleSearch();

        }

    };


    // ========================================================
    // STATUS FILTER
    // ========================================================

    const handleOrderStatusChange = (
        value: OrderStatus | ""
    ) => {

        setOrderStatus(value);

        setPage(1);

    };


    const handleStatusChange = async (
        orderId: number,
        status: OrderStatus
    ) => {

        try {

            await updateOrderStatus({

                orderId,

                order_status:
                    status,

            });


            showSuccess(
                "Order status updated successfully."
            );

        }
        catch (error: any) {

            showError(
                error?.response?.data?.message ||
                "Failed to update order status."
            );

        }

    };

    // ========================================================
    // PAYMENT FILTER
    // ========================================================

    const handlePaymentStatusChange = (
        value: PaymentStatus | ""
    ) => {

        setPaymentStatus(value);

        setPage(1);

    };


    // ========================================================
    // VIEW ORDER
    // ========================================================

    const handleViewOrder = (
        order: Order
    ) => {

        router.push(
            `/admin/orders/${order.id}`
        );

    };


    // ========================================================
    // PAGE LOADING
    // ========================================================

    if (loading) {

        return (

            <LoadingState />

        );

    }


    // ========================================================
    // ERROR
    // ========================================================

    if (isError) {

        return (

            <ErrorState

                description={
                    error instanceof Error
                        ? error.message
                        : "Failed to load orders."
                }

                onRetry={() =>
                    refetch()
                }

            />

        );

    }


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <div className="space-y-6">


            {/* ================================================== */}
            {/* HEADER */}
            {/* ================================================== */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                        "
                    >
                        Orders
                    </h1>


                    <p
                        className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Manage customer orders
                        and order status.
                    </p>

                </div>


                {/* TOTAL */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-2.5
                    "
                >

                    <Package
                        size={18}
                        className="text-primary"
                    />

                    <span
                        className="
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Total Orders
                    </span>

                    <span
                        className="
                            font-semibold
                        "
                    >
                        {total}
                    </span>

                </div>

            </div>


            {/* ================================================== */}
            {/* FILTERS */}
            {/* ================================================== */}

            <div
                className="
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-4
                    shadow-sm
                    mt-5
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        lg:flex-row
                        lg:items-center
                    "
                >


                    {/* SEARCH */}

                    <div
                        className="
                            flex
                            flex-1
                            items-center
                            gap-2
                            rounded-xl
                            border border-gray-200
                            bg-white
                            px-3
                        "
                    >

                        <Search
                            size={18}
                            className="
                                shrink-0
                                text-muted-foreground
                            "
                        />


                        <input
                            type="text"
                            value={searchInput}
                            onChange={(event) =>
                                setSearchInput(
                                    event.target.value
                                )
                            }
                            onKeyDown={
                                handleSearchKeyDown
                            }
                            placeholder="
                                Search order number...
                            "
                            className="
                                h-11
                                w-full
                                bg-transparent
                                text-sm
                                outline-none
                                placeholder:text-muted-foreground
                            "
                        />


                        <button
                            type="button"
                            onClick={
                                handleSearch
                            }
                            className="
                                rounded-lg
                                bg-primary
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-white
                                transition
                                hover:opacity-90
                            "
                        >
                            Search
                        </button>

                    </div>


                    {/* ORDER STATUS */}

                    <StatusSelect
                        value={orderStatus}
                        onChange={(value) =>
                            handleOrderStatusChange(
                                value as OrderStatus | ""
                            )
                        }
                        options={orderStatusOptions}
                    />
                    

                    {/* PAYMENT STATUS */}

                        <StatusSelect
                            value={paymentStatus}
                            onChange={(value) =>
                                handlePaymentStatusChange(
                                    value as PaymentStatus | ""
                                )
                            }
                            options={paymentStatusOptions}
                        />


                    {/* REFRESH */}

                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            transition
                            hover:bg-muted/30
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                        title="Refresh orders"
                    >
                        <RefreshCw
                            size={17}
                            className={
                                isFetching
                                    ? "animate-spin"
                                    : ""
                            }
                        />
                    </button>

                </div>

            </div>


            {/* ================================================== */}
            {/* EMPTY */}
            {/* ================================================== */}

            {orders.length === 0 ? (

                <EmptyState
                    title="No orders found"
                    description={
                        search ||
                        orderStatus ||
                        paymentStatus
                            ? "No orders match your current filters."
                            : "There are no orders yet."
                    }
                />

            ) : (

                <>

                    {/* ========================================== */}
                    {/* TABLE */}
                    {/* ========================================== */}

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            mt-6
                        "
                    >

                        <div
                            className="
                                overflow-x-auto
                            "
                        >

                            <table
                                className="
                                    w-full
                                    min-w-[1050px]
                                "
                            >

                                <thead>

                                    <tr
                                        className="
                                            border-b
                                            border-gray-200
                                            bg-gray-50
                                        "
                                    >

                                        {/* ORDER */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Order
                                        </th>


                                        {/* CUSTOMER */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Customer
                                        </th>


                                        {/* FULFILLMENT */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Fulfillment
                                        </th>


                                        {/* TOTAL */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Total
                                        </th>


                                        {/* PAYMENT */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Payment
                                        </th>

                                        {/* CREATED */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Created
                                        </th>


                                        {/* ACTION */}

                                        <th
                                            className="
                                                px-6
                                                py-4
                                                text-right
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-muted-foreground
                                            "
                                        >
                                            Order Change Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {orders.map(
                                        (order) => (
                                            <tr
                                                key={
                                                    order.id
                                                }
                                                 onClick={() =>handleViewOrder(order)}
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

                                                {/* ORDER */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-4
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            font-medium
                                                        "
                                                    >
                                                        {
                                                            order.order_number
                                                        }
                                                    </p>


                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xs
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        #
                                                        {
                                                            order.id
                                                        }
                                                    </p>

                                                </td>


                                                {/* CUSTOMER */}
                                                <td
                                                    className="
                                                        px-6
                                                        py-4
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                font-medium
                                                            "
                                                        >
                                                            {order.user
                                                                ? `${order.user.first_name} ${order.user.last_name}`
                                                                : `Customer #${order.user_id}`
                                                            }
                                                        </p>


                                                        {order.user?.email && (

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    text-xs
                                                                    text-muted-foreground
                                                                "
                                                            >
                                                                {order.user.email}
                                                            </p>

                                                        )}

                                                    </div>

                                                </td>


                                                {/* FULFILLMENT */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-4
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-sm
                                                            capitalize
                                                        "
                                                    >
                                                        {
                                                            order.fulfillment_method
                                                                ?.replace(
                                                                    "_",
                                                                    " "
                                                                ) ||
                                                            "—"
                                                        }
                                                    </span>

                                                </td>


                                                {/* TOTAL */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-4
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            font-semibold
                                                        "
                                                    >

                                                        ₦
                                                        {Number(
                                                            order.total_amount
                                                        ).toLocaleString(
                                                            "en-NG",
                                                            {
                                                                minimumFractionDigits:
                                                                    2,
                                                            }
                                                        )}

                                                    </span>

                                                </td>


                                                {/* PAYMENT */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-4
                                                    "
                                                >

                                                    <PaymentStatusBadge
                                                        status={
                                                            order.payment_status
                                                        }
                                                    />

                                                </td>

                                                {/* CREATED */}

                                                <td
                                                    className="
                                                        px-6
                                                        py-4
                                                        text-sm
                                                        text-muted-foreground
                                                    "
                                                >

                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString(
                                                        "en-NG",
                                                        {
                                                            day:
                                                                "numeric",
                                                            month:
                                                                "short",
                                                            year:
                                                                "numeric",
                                                        }
                                                    )}

                                                </td>

                                                {/* CHANGE STATUS */}

                                                <td
                                                    className="px-6 py-4"
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                >
                                                    <OrderStatusSelect
                                                        value={order.order_status}
                                                        paymentStatus={order.payment_status}
                                                        onChange={(status) =>
                                                            handleStatusChange(
                                                                order.id,
                                                                status
                                                            )
                                                        }
                                                        disabled={
                                                            updatingOrderStatus 
                                                        }
                                                    />
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                         {/* ========================================== */}
                    {/* PAGINATION */}
                    {/* ========================================== */}

                        {totalPages > 1 && (

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-4
                                    border-t
                                    border-gray-200
                                    px-6
                                    py-4
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >

                                    Showing{" "}

                                    <span
                                        className="
                                            font-medium
                                            text-foreground
                                        "
                                    >
                                        {
                                            (
                                                (page - 1) *
                                                limit
                                            ) + 1
                                        }
                                    </span>

                                    {" "}to{" "}

                                    <span
                                        className="
                                            font-medium
                                            text-foreground
                                        "
                                    >
                                        {
                                            Math.min(
                                                page *
                                                limit,
                                                total
                                            )
                                        }
                                    </span>

                                    {" "}of{" "}

                                    <span
                                        className="
                                            font-medium
                                            text-foreground
                                        "
                                    >
                                        {total}
                                    </span>

                                    {" "}orders

                                </p>


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    {/* PREVIOUS */}

                                    <button
                                        type="button"
                                        disabled={
                                            page <= 1
                                        }
                                        onClick={() =>
                                            setPage(
                                                (current) =>
                                                    current -
                                                    1
                                            )
                                        }
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            transition
                                            hover:bg-muted/30
                                            disabled:cursor-not-allowed
                                            disabled:opacity-40
                                        "
                                    >

                                        <ChevronLeft
                                            size={17}
                                        />

                                    </button>


                                    {/* PAGE */}

                                    <span
                                        className="
                                            px-3
                                            text-sm
                                            font-medium
                                        "
                                    >

                                        Page {page} of{" "}
                                        {totalPages}

                                    </span>


                                    {/* NEXT */}

                                    <button
                                        type="button"
                                        disabled={
                                            page >=
                                            totalPages
                                        }
                                        onClick={() =>
                                            setPage(
                                                (current) =>
                                                    current +
                                                    1
                                            )
                                        }
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            transition
                                            hover:bg-muted/30
                                            disabled:cursor-not-allowed
                                            disabled:opacity-40
                                        "
                                    >

                                        <ChevronRight
                                            size={17}
                                        />

                                    </button>

                                </div>

                            </div>

                        )}

                    </div>


                   

                </>

            )}

        </div>

    );

}