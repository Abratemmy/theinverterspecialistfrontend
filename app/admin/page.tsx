"use client";

import {
    Users,
    Package,
    ShoppingBag,
    Wallet,
    AlertTriangle,
    Clock,
    Truck,
    CheckCircle2,
} from "lucide-react";

import {
    useAdminDashboard,
} from "@/hooks/useAdminDashboard";

import DashboardCard
    from "@/components/admin/DashboardCard/DashboardCard";

import SalesChart
    from "@/components/admin/SalesChart/SalesChart";

import RecentOrders
    from "@/components/admin/RecentOrders/RecentOrders";

import RecentCustomers
    from "@/components/admin/RecentCustomers/RecentCustomers";

import TopProducts
    from "@/components/admin/TopProducts/TopProducts";

import LowStockProducts
    from "@/components/admin/LowStockProducts/LowStockProducts";

import LoadingState
    from "@/components/common/LoadingState/LoadingState";


const formatCurrency = (
    value: number
) => {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }
    ).format(value);

};


export default function AdminDashboardPage() {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useAdminDashboard();


    if (isLoading) {

        return (

            <div className="p-6">

                <LoadingState />

            </div>

        );

    }


    if (isError || !data) {

        return (

            <div className="p-6">

                <div className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-6
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-red-700
                    ">

                        Unable to load dashboard

                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-red-600
                    ">

                        {
                            error instanceof Error
                                ? error.message
                                : "Something went wrong."
                        }

                    </p>


                    <button
                        onClick={() =>
                            refetch()
                        }
                        className="
                            mt-4
                            rounded-lg
                            bg-primary
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                        "
                    >

                        Try Again

                    </button>

                </div>

            </div>

        );

    }


    const summary =
        data.summary;


    return (

        <div className="
            space-y-6
            p-4
            sm:p-6
        ">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div>

                <h1 className="
                    text-2xl
                    font-bold
                    text-[var(--color-text)]
                    sm:text-3xl
                ">

                    Dashboard

                </h1>


                <p className="
                    mt-1
                    text-sm
                    text-[var(--color-text-light)]
                ">

                  {"Welcome back. Here's what's happening with your store."}

                </p>

            </div>


            {/* ================================================= */}
            {/* SUMMARY CARDS */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
            ">

                <DashboardCard
                    title="Total Revenue"
                    value={formatCurrency(
                        summary.total_revenue
                    )}
                    icon={Wallet}
                    description="All paid orders"
                />


                <DashboardCard
                    title="Total Orders"
                    value={summary.total_orders}
                    icon={ShoppingBag}
                    description={`${summary.pending_orders} pending`}
                />


                <DashboardCard
                    title="Customers"
                    value={summary.total_users}
                    icon={Users}
                    description="Registered customers"
                />


                <DashboardCard
                    title="Products"
                    value={summary.total_products}
                    icon={Package}
                    description={`${summary.low_stock_count} low stock`}
                />

            </div>


            {/* ================================================= */}
            {/* ORDER STATUS */}
            {/* ================================================= */}

            {/* <div className="
                grid
                grid-cols-2
                gap-4
                lg:grid-cols-4
            ">

                <DashboardCard
                    title="Pending"
                    value={summary.pending_orders}
                    icon={Clock}
                    compact
                />


                <DashboardCard
                    title="Processing"
                    value={summary.processing_orders}
                    icon={Package}
                    compact
                />


                <DashboardCard
                    title="Shipped"
                    value={summary.shipped_orders}
                    icon={Truck}
                    compact
                />


                <DashboardCard
                    title="Delivered"
                    value={summary.delivered_orders}
                    icon={CheckCircle2}
                    compact
                />

            </div> */}


            {/* ================================================= */}
            {/* SALES CHART */}
            {/* ================================================= */}

            <SalesChart
                data={
                    data.monthly_sales
                }
            />


            {/* ================================================= */}
            {/* ORDERS + CUSTOMERS */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
                mb-4
            ">

                <RecentOrders
                    orders={
                        data.recent_orders
                    }
                />


                <RecentCustomers
                    customers={
                        data.recent_customers
                    }
                />

            </div>


            {/* ================================================= */}
            {/* PRODUCTS */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
            ">

                <TopProducts
                    products={
                        data.top_selling_products
                    }
                />


                <LowStockProducts
                    products={
                        data.low_stock_products
                    }
                />

            </div>

        </div>

    );

}