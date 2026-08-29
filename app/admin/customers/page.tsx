"use client";

import {
    useEffect,
    useState
} from "react";

import {
    useRouter
} from "next/navigation";

import {
    Search,
    RefreshCw,
    Eye,
} from "lucide-react";

import toast from "react-hot-toast";

import useCustomers from "@/hooks/useCustomers";

import type {
    UserRole,
    UserStatus,
} from "@/types/customer";

import StatusSelect from "@/components/admin/StatusSelect";
import axios from "axios";

import type {
    StatusSelectOption
} from "@/components/admin/StatusSelect";

import { EmptyState } from "@/components/common";

import Image from "next/image";


// ============================================================
// PAGE
// ============================================================

export default function CustomersPage() {

    const router = useRouter();

    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL;


    // ========================================================
    // ROLE OPTIONS
    // ========================================================

    const roleOptions:
        StatusSelectOption<UserRole>[] = [

        {
            value: "",
            label: "All Customer",
            className:
                "text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
        },

        {
            value: "customer",
            label: "Customer",
            className:
                "text-[var(--color-primary-dark)] hover:bg-[var(--bgcolor-primary)]"
        },

        {
            value: "manager",
            label: "Manager",
            className:
                "text-blue-600 hover:bg-blue-50"
        },

        {
            value: "admin",
            label: "Admin",
            className:
                "text-purple-600 hover:bg-purple-50"
        }

    ];


    // ========================================================
    // STATUS OPTIONS
    // ========================================================

    const statusOptions:
        StatusSelectOption<UserStatus>[] = [

        {
            value: "",
            label: "All Status",
            className:
                "text-[var(--color-primary-dark)] hover:bg-[var(--bgcolor-primary)]"
        },

        {
            value: "active",
            label: "Active",
            className:
                "text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
        },

        {
            value: "inactive",
            label: "Inactive",
            className:
                "text-gray-500 hover:bg-gray-50"
        },

        {
            value: "blocked",
            label: "Blocked",
            className:
                "text-red-600 hover:bg-red-50"
        }

    ];


    // ========================================================
    // FILTERS
    // ========================================================

    const [
        search,
        setSearch
    ] = useState("");


    const [
        roleFilter,
        setRoleFilter
    ] = useState("");


    const [
        statusFilter,
        setStatusFilter
    ] = useState("");


    // ========================================================
    // PAGINATION
    // ========================================================

    const [
        page,
        setPage
    ] = useState(1);


    const [
        limit
    ] = useState(10);


    // ========================================================
    // RESET PAGE WHEN FILTERS CHANGE
    // ========================================================

    useEffect(() => {

        setPage(1);

    }, [
        search,
        roleFilter,
        statusFilter
    ]);


    // ========================================================
    // CUSTOMERS
    // ========================================================

    const {

        customers,

        pagination,

        loadingCustomers,

        fetchingCustomers,

        refetchCustomers,

        updateCustomerRole,

        updatingCustomerRole,

        updateCustomerStatus,

        updatingCustomerStatus,

    } = useCustomers({

        search,

        role:
            roleFilter,

        status:
            statusFilter,

        page,

        limit,

    });


    // ========================================================
    // CHANGE ROLE
    // ========================================================

    const handleRoleChange = async (

        id: number,

        role: UserRole

    ) => {

        try {

            await updateCustomerRole({

                id,

                payload: {
                    role
                }

            });


            toast.success(
                "User role updated successfully."
            );

        }
        catch (error: unknown) {

            if (axios.isAxiosError(error)) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to update user role."

                );

            }
            else {

                toast.error(
                    "Unable to update user role."
                );

            }

        }

    };


    // ========================================================
    // CHANGE STATUS
    // ========================================================

    const handleStatusChange = async (

        id: number,

        status: UserStatus

    ) => {

        try {

            await updateCustomerStatus({

                id,

                payload: {
                    status
                }

            });


            toast.success(
                "User status updated successfully."
            );

        }
         catch (error: unknown) {

            if (axios.isAxiosError(error)) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to update user status."

                );

            }
            else {

                toast.error(
                    "Unable to update user status."
                );

            }

        }

       

    };


    // ========================================================
    // VIEW CUSTOMER
    // ========================================================

    const handleViewCustomer = (
        id: number
    ) => {

        router.push(
            `/admin/customers/${id}`
        );

    };


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {

        refetchCustomers();

    };


    // ========================================================
    // PAGINATION HELPERS
    // ========================================================

    const totalPages =
        pagination?.totalPages ?? 0;


    const currentPage =
        pagination?.page ?? page;


    const totalCustomers =
        pagination?.total ?? 0;


    const startItem =
        totalCustomers === 0
            ? 0
            : ((currentPage - 1) * limit) + 1;


    const endItem =
        Math.min(
            currentPage * limit,
            totalCustomers
        );


    // ========================================================
    // PAGE NUMBERS
    // ========================================================

    const getPageNumbers = () => {

        if (!pagination) {
            return [];
        }


        const pages: number[] = [];


        // --------------------------------------------
        // Show all pages when 7 or fewer
        // --------------------------------------------

        if (totalPages <= 7) {

            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {

                pages.push(i);

            }

            return pages;

        }


        // --------------------------------------------
        // Beginning
        // --------------------------------------------

        if (currentPage <= 4) {

            return [
                1,
                2,
                3,
                4,
                5,
                -1,
                totalPages
            ];

        }


        // --------------------------------------------
        // End
        // --------------------------------------------

        if (
            currentPage >=
            totalPages - 3
        ) {

            return [

                1,

                -1,

                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages

            ];

        }


        // --------------------------------------------
        // Middle
        // --------------------------------------------

        return [

            1,

            -1,

            currentPage - 1,
            currentPage,
            currentPage + 1,

            -1,

            totalPages

        ];

    };


    const pageNumbers =
        getPageNumbers();


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="space-y-6">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="
                flex
                items-center
                justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-semibold
                        text-gray-900
                    ">
                        Customers
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Manage customers and user accounts.
                    </p>

                </div>


                <button

                    type="button"

                    onClick={
                        handleRefresh
                    }

                    disabled={
                        fetchingCustomers
                    }

                    className="
                        flex
                        h-10
                        items-center
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
                        disabled:opacity-50
                    "

                >

                    <RefreshCw

                        size={16}

                        className={
                            fetchingCustomers
                                ? "animate-spin"
                                : ""
                        }

                    />

                    Refresh

                </button>

            </div>


            {/* ================================================= */}
            {/* FILTERS */}
            {/* ================================================= */}

            <div className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                mt-7
            ">

                <div className="
                    grid
                    grid-cols-1
                    gap-3
                    md:grid-cols-4
                ">

                    {/* Search */}

                    <div className="
                        relative
                        md:col-span-2
                    ">

                        <Search

                            size={17}

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

                            value={
                                search
                            }

                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }

                            placeholder="
                                Search name, email or phone...
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
                                focus:border-primary
                            "

                        />

                    </div>


                    {/* Role */}

                    <StatusSelect

                        value={
                            roleFilter
                        }

                        onChange={(value) =>
                            setRoleFilter(
                                value
                            )
                        }

                        options={
                            roleOptions
                        }

                        className="w-full"

                    />


                    {/* Status */}

                    <StatusSelect

                        value={
                            statusFilter
                        }

                        onChange={(value) =>
                            setStatusFilter(
                                value
                            )
                        }

                        options={
                            statusOptions
                        }

                        className="w-full"

                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            <div className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                mt-6
            ">

                <div className="
                    overflow-x-auto
                ">

                    <table className="
                        w-full
                        min-w-[900px]
                    ">

                        <thead>

                            <tr className="
                                border-b
                                border-gray-200
                                bg-gray-50
                            ">

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-[var(--color-text)]
                                ">
                                    Customer
                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-[var(--color-text)]
                                ">
                                    Contact
                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-[var(--color-text)]
                                ">
                                    Role
                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-[var(--color-text)]
                                ">
                                    Status
                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-right
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-[var(--color-text)]
                                ">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {/* Loading */}

                            {loadingCustomers && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="
                                            px-6
                                            py-12
                                            text-center
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        Loading customers...
                                    </td>

                                </tr>

                            )}


                            {/* Empty */}

                            {!loadingCustomers &&
                                customers.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="
                                                px-6
                                                py-12
                                                text-center
                                                text-sm
                                                text-gray-500
                                            "
                                        >

                                            <EmptyState
                                                title="No Customer found"
                                                description="No customer found"
                                            />

                                        </td>

                                    </tr>

                                )}


                            {/* Customers */}

                            {!loadingCustomers &&
                                customers.map(
                                    (customer) => (

                                        <tr

                                            key={
                                                customer.id
                                            }

                                            onClick={() =>
                                                handleViewCustomer(
                                                    customer.id
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

                                            {/* Customer */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    {customer.profile_image ? (

                                                        <Image

                                                            src={
                                                                `${apiUrl}${customer.profile_image}`
                                                            }

                                                            alt={`${customer.first_name} ${customer.last_name}`}

                                                            width={40}

                                                            height={40}

                                                            className="
                                                                h-10
                                                                w-10
                                                                rounded-full
                                                                object-cover
                                                            "

                                                        />

                                                    ) : (

                                                        <div className="
                                                            flex
                                                            h-10
                                                            w-10
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            bg-gray-100
                                                            text-sm
                                                            font-semibold
                                                            text-gray-600
                                                        ">

                                                            {
                                                                customer.first_name
                                                                    ?.charAt(0)
                                                                    .toUpperCase()
                                                            }

                                                        </div>

                                                    )}


                                                    <div>

                                                        <p className="
                                                            text-sm
                                                            font-medium
                                                            text-gray-900
                                                        ">

                                                            {
                                                                customer.first_name
                                                            }{" "}

                                                            {
                                                                customer.last_name
                                                            }

                                                        </p>

                                                        <p className="
                                                            text-xs
                                                            text-gray-500
                                                        ">

                                                            #

                                                            {
                                                                customer.id
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Contact */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-gray-700
                                                ">

                                                    {
                                                        customer.email
                                                    }

                                                </p>

                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-500
                                                ">

                                                    {
                                                        customer.phone ||
                                                        "No phone"
                                                    }

                                                </p>

                                            </td>


                                            {/* Role */}

                                            <td

                                                className="
                                                    px-6
                                                    py-4
                                                "

                                                onClick={(event) =>
                                                    event.stopPropagation()
                                                }

                                            >

                                                <StatusSelect<UserRole>

                                                    value={
                                                        customer.role
                                                    }

                                                    onChange={(
                                                        value
                                                    ) =>
                                                        handleRoleChange(
                                                            customer.id,
                                                            value
                                                        )
                                                    }

                                                    options={
                                                        roleOptions
                                                    }

                                                    disabled={
                                                        updatingCustomerRole
                                                    }

                                                    className="
                                                        min-w-[130px]
                                                    "

                                                />

                                            </td>


                                            {/* Status */}

                                            <td

                                                className="
                                                    px-6
                                                    py-4
                                                "

                                                onClick={(event) =>
                                                    event.stopPropagation()
                                                }

                                            >

                                                <StatusSelect<UserStatus>

                                                    value={
                                                        customer.status
                                                    }

                                                    onChange={(
                                                        value
                                                    ) =>
                                                        handleStatusChange(
                                                            customer.id,
                                                            value
                                                        )
                                                    }

                                                    options={
                                                        statusOptions
                                                    }

                                                    disabled={
                                                        updatingCustomerStatus
                                                    }

                                                    className="
                                                        min-w-[130px]
                                                    "

                                                />

                                            </td>


                                            {/* Action */}

                                            <td className="
                                                px-6
                                                py-4
                                                text-right
                                            ">

                                                <button

                                                    type="button"

                                                    onClick={(
                                                        event
                                                    ) => {

                                                        event.stopPropagation();

                                                        handleViewCustomer(
                                                            customer.id
                                                        );

                                                    }}

                                                    className="
                                                        inline-flex
                                                        h-9
                                                        items-center
                                                        gap-2
                                                        rounded-lg
                                                        border
                                                        border-gray-200
                                                        px-3
                                                        text-sm
                                                        font-medium
                                                        text-gray-700
                                                        hover:bg-gray-50
                                                    "

                                                >

                                                    <Eye
                                                        size={15}
                                                    />

                                                    View

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                        </tbody>

                    </table>

                </div>


                {/* ================================================= */}
                {/* PAGINATION */}
                {/* ================================================= */}

                {!loadingCustomers &&
                    pagination &&
                    pagination.total > 0 && (

                    <div className="
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
                    ">

                        {/* Results */}

                        <p className="
                            text-sm
                            text-gray-500
                        ">

                            Showing{" "}

                            <span className="
                                font-medium
                                text-gray-900
                            ">
                                {startItem}
                            </span>

                            {" "}to{" "}

                            <span className="
                                font-medium
                                text-gray-900
                            ">
                                {endItem}
                            </span>

                            {" "}of{" "}

                            <span className="
                                font-medium
                                text-gray-900
                            ">
                                {totalCustomers}
                            </span>

                            {" "}customers

                        </p>


                        {/* Controls */}

                        <div className="
                            flex
                            items-center
                            gap-1
                        ">

                            {/* Previous */}

                            <button

                                type="button"

                                onClick={() =>
                                    setPage(
                                        (current) =>
                                            Math.max(
                                                current - 1,
                                                1
                                            )
                                    )
                                }

                                disabled={
                                    currentPage <= 1 ||
                                    fetchingCustomers
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


                            {/* Page Numbers */}

                            <div className="
                                flex
                                items-center
                                gap-1
                            ">

                                {pageNumbers.map(
                                    (
                                        pageNumber,
                                        index
                                    ) => {

                                        if (
                                            pageNumber === -1
                                        ) {

                                            return (

                                                <span

                                                    key={
                                                        `ellipsis-${index}`
                                                    }

                                                    className="
                                                        flex
                                                        h-9
                                                        w-9
                                                        items-center
                                                        justify-center
                                                        text-sm
                                                        text-gray-400
                                                    "

                                                >
                                                    ...
                                                </span>

                                            );

                                        }


                                        return (

                                            <button

                                                key={
                                                    pageNumber
                                                }

                                                type="button"

                                                onClick={() =>
                                                    setPage(
                                                        pageNumber
                                                    )
                                                }

                                                disabled={
                                                    fetchingCustomers
                                                }

                                                className={`
                                                    flex
                                                    h-9
                                                    min-w-9
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    px-3
                                                    text-sm
                                                    font-medium
                                                    transition
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                    ${
                                                        pageNumber ===
                                                        currentPage
                                                            ? "bg-[var(--color-primary)] text-white"
                                                            : "text-gray-600 hover:bg-gray-100"
                                                    }
                                                `}

                                            >

                                                {
                                                    pageNumber
                                                }

                                            </button>

                                        );

                                    }
                                )}

                            </div>


                            {/* Next */}

                            <button

                                type="button"

                                onClick={() =>
                                    setPage(
                                        (current) =>
                                            Math.min(
                                                current + 1,
                                                totalPages
                                            )
                                    )
                                }

                                disabled={
                                    currentPage >= totalPages ||
                                    fetchingCustomers
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
