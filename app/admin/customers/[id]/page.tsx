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
    Calendar,
    Clock,
    Mail,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";

import toast from "react-hot-toast";

import Image from "next/image";

import useCustomers from "@/hooks/useCustomers";

import type {
    Customer,
    UserRole,
    UserStatus,
} from "@/types/customer";

import StatusSelect from "@/components/admin/StatusSelect";

import type {
    StatusSelectOption,
} from "@/components/admin/StatusSelect";


// ============================================================
// PAGE
// ============================================================

export default function CustomerDetailPage() {

    const router =
        useRouter();

    const params =
        useParams();

    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL;


    // ========================================================
    // CUSTOMER ID
    // ========================================================

    const customerId =
        Number(params.id);


    // ========================================================
    // STATE
    // ========================================================

    const [
        customer,
        setCustomer
    ] = useState<Customer | null>(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    // ========================================================
    // HOOK
    // ========================================================

    const {

        getCustomerById,

        updateCustomerRole,

        updatingCustomerRole,

        updateCustomerStatus,

        updatingCustomerStatus,

    } = useCustomers();


    // ========================================================
    // OPTIONS
    // ========================================================

    const roleOptions:
        StatusSelectOption<UserRole>[] = [

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


    const statusOptions:
        StatusSelectOption<UserStatus>[] = [

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
    // FETCH CUSTOMER
    // ========================================================

    useEffect(() => {

        if (
            !customerId ||
            Number.isNaN(customerId)
        ) {

            return;

        }


        const fetchCustomer =
            async () => {

                try {

                    setLoading(true);


                    const response =
                        await getCustomerById(
                            customerId
                        );


                    setCustomer(
                        response.data
                    );

                }
                catch (error: any) {

                    console.error(
                        "Failed to fetch customer:",
                        error
                    );


                    toast.error(

                        error?.response?.data?.message ||

                        "Unable to load customer."

                    );

                    setCustomer(null);

                }
                finally {

                    setLoading(false);

                }

            };


        fetchCustomer();

    }, [
        customerId
    ]);


    // ========================================================
    // CHANGE ROLE
    // ========================================================

    const handleRoleChange = async (
        role: UserRole
    ) => {

        if (!customer) {
            return;
        }


        try {

            await updateCustomerRole({

                id:
                    customer.id,

                payload: {
                    role
                }

            });


            setCustomer(
                (current) =>
                    current
                        ? {
                            ...current,
                            role
                        }
                        : current
            );


            toast.success(
                "User role updated successfully."
            );

        }
        catch (error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update user role."

            );

        }

    };


    // ========================================================
    // CHANGE STATUS
    // ========================================================

    const handleStatusChange = async (
        status: UserStatus
    ) => {

        if (!customer) {
            return;
        }


        try {

            await updateCustomerStatus({

                id:
                    customer.id,

                payload: {
                    status
                }

            });


            setCustomer(
                (current) =>
                    current
                        ? {
                            ...current,
                            status
                        }
                        : current
            );


            toast.success(
                "User status updated successfully."
            );

        }
        catch (error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to update user status."

            );

        }

    };


    // ========================================================
    // FORMAT DATE
    // ========================================================

    const formatDate = (
        date: string | null
    ) => {

        if (!date) {
            return "Never";
        }


        return new Date(
            date
        ).toLocaleDateString(
            "en-NG",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ========================================================
    // FORMAT DATE TIME
    // ========================================================

    const formatDateTime = (
        date: string | null
    ) => {

        if (!date) {
            return "Never";
        }


        return new Date(
            date
        ).toLocaleString(
            "en-NG",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="space-y-6">

                <div className="
                    h-8
                    w-48
                    animate-pulse
                    rounded-lg
                    bg-gray-200
                " />

                <div className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                ">

                    <div className="
                        h-20
                        w-20
                        animate-pulse
                        rounded-full
                        bg-gray-200
                    " />

                    <div className="
                        mt-5
                        h-5
                        w-48
                        animate-pulse
                        rounded
                        bg-gray-200
                    " />

                    <div className="
                        mt-3
                        h-4
                        w-64
                        animate-pulse
                        rounded
                        bg-gray-100
                    " />

                </div>

            </div>

        );

    }


    // ========================================================
    // NOT FOUND
    // ========================================================

    if (!customer) {

        return (

            <div className="
                flex
                min-h-[400px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-8
                text-center
            ">

                <div className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-500
                ">

                    <User
                        size={24}
                    />

                </div>


                <h2 className="
                    mt-4
                    text-lg
                    font-semibold
                    text-gray-900
                ">
                    Customer not found
                </h2>


                <p className="
                    mt-1
                    text-sm
                    text-gray-500
                ">
                    The customer you are looking for does not exist.
                </p>


                <button

                    type="button"

                    onClick={() =>
                        router.push(
                            "/admin/customers"
                        )
                    }

                    className="
                        mt-5
                        rounded-xl
                        bg-[var(--color-primary)]
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                    "

                >

                    Back to Customers

                </button>

            </div>

        );

    }


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
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
                mb-8
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <button

                        type="button"

                        onClick={() =>
                            router.push(
                                "/admin/customers"
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
                            transition
                            hover:bg-gray-50
                        "

                    >

                        <ArrowLeft
                            size={18}
                        />

                    </button>


                    <div>

                        <h1 className="
                            text-2xl
                            font-semibold
                            text-gray-900
                        ">
                            Customer Details
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            View and manage customer information.
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* PROFILE CARD */}
            {/* ================================================= */}

            <div className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                mb-5
            ">

                <div className="
                    p-6
                    sm:p-8
                ">

                    <div className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <div className="
                            flex
                            items-center
                            gap-5
                        ">

                            {/* Profile image */}

                            {customer.profile_image ? (

                                <Image

                                    src={
                                        `${apiUrl}${customer.profile_image}`
                                    }

                                    alt={`${customer.first_name} ${customer.last_name}`}

                                    width={88}

                                    height={88}

                                    className="
                                        h-[88px]
                                        w-[88px]
                                        rounded-full
                                        object-cover
                                    "

                                />

                            ) : (

                                <div className="
                                    flex
                                    h-[88px]
                                    w-[88px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gray-100
                                    text-2xl
                                    font-semibold
                                    text-gray-600
                                ">

                                    {
                                        customer.first_name
                                            ?.charAt(0)
                                            .toUpperCase()
                                    }

                                    {
                                        customer.last_name
                                            ?.charAt(0)
                                            .toUpperCase()
                                    }

                                </div>

                            )}


                            <div>

                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-gray-900
                                ">

                                    {
                                        customer.first_name
                                    }{" "}

                                    {
                                        customer.last_name
                                    }

                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                ">

                                    Customer #

                                    {
                                        customer.id
                                    }

                                </p>


                                <p className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                ">

                                    Member since{" "}

                                    {
                                        formatDate(
                                            customer.created_at
                                        )
                                    }

                                </p>

                            </div>

                        </div>


                        {/* Status */}

                        <div>

                            <p className="
                                mb-2
                                text-xs
                                font-medium
                                uppercase
                                tracking-wide
                                text-gray-500
                            ">
                                Account Status
                            </p>


                            <StatusSelect<UserStatus>

                                value={
                                    customer.status
                                }

                                onChange={
                                    handleStatusChange
                                }

                                options={
                                    statusOptions
                                }

                                disabled={
                                    updatingCustomerStatus
                                }

                                className="
                                    min-w-[140px]
                                "

                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* INFORMATION GRID */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                lg:grid-cols-2
                mb-5
            ">

                {/* ================================================= */}
                {/* CONTACT INFORMATION */}
                {/* ================================================= */}

                <div className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                        border-b
                        border-gray-100
                        pb-4
                    ">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-100
                            text-gray-600
                        ">

                            <User
                                size={18}
                            />

                        </div>


                        <div>

                            <h3 className="
                                text-base
                                font-semibold
                                text-gray-900
                            ">
                                Personal Information
                            </h3>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Customer contact details
                            </p>

                        </div>

                    </div>


                    <div className="
                        mt-5
                        space-y-5
                    ">

                        {/* Email */}

                        <div className="
                            flex
                            items-start
                            gap-3
                        ">

                            <Mail
                                size={17}
                                className="
                                    mt-0.5
                                    text-gray-400
                                "
                            />

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-500
                                ">
                                    Email Address
                                </p>

                                <p className="
                                    mt-1
                                    text-sm
                                    font-medium
                                    text-gray-900
                                ">
                                    {
                                        customer.email
                                    }
                                </p>

                            </div>

                        </div>


                        {/* Phone */}

                        <div className="
                            flex
                            items-start
                            gap-3
                        ">

                            <Phone
                                size={17}
                                className="
                                    mt-0.5
                                    text-gray-400
                                "
                            />

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-500
                                ">
                                    Phone Number
                                </p>

                                <p className="
                                    mt-1
                                    text-sm
                                    font-medium
                                    text-gray-900
                                ">
                                    {
                                        customer.phone ||
                                        "No phone number"
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* ACCOUNT INFORMATION */}
                {/* ================================================= */}

                <div className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                        border-b
                        border-gray-100
                        pb-4
                    ">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-100
                            text-gray-600
                        ">

                            <ShieldCheck
                                size={18}
                            />

                        </div>


                        <div>

                            <h3 className="
                                text-base
                                font-semibold
                                text-gray-900
                            ">
                                Account Information
                            </h3>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Account permissions and activity
                            </p>

                        </div>

                    </div>


                    <div className="
                        mt-5
                        space-y-5
                    ">

                        {/* Role */}

                        <div>

                            <p className="
                                mb-2
                                text-xs
                                text-gray-500
                            ">
                                User Role
                            </p>


                            <StatusSelect<UserRole>

                                value={
                                    customer.role
                                }

                                onChange={
                                    handleRoleChange
                                }

                                options={
                                    roleOptions
                                }

                                disabled={
                                    updatingCustomerRole
                                }

                                className="
                                    w-full
                                    max-w-[180px]
                                "

                            />

                        </div>


                        {/* Customer ID */}

                        <div>

                            <p className="
                                text-xs
                                text-gray-500
                            ">
                                Customer ID
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                font-medium
                                text-gray-900
                            ">
                                #{customer.id}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* ACTIVITY */}
            {/* ================================================= */}

            <div className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-gray-100
                    pb-4
                ">

                    <div className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-gray-100
                        text-gray-600
                    ">

                        <Clock
                            size={18}
                        />

                    </div>


                    <div>

                        <h3 className="
                            text-base
                            font-semibold
                            text-gray-900
                        ">
                            Account Activity
                        </h3>

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Customer account dates
                        </p>

                    </div>

                </div>


                <div className="
                    mt-5
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-3
                ">

                    {/* Created */}

                    <div className="
                        rounded-xl
                        bg-gray-50
                        p-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-gray-500
                        ">

                            <Calendar
                                size={16}
                            />

                            <span className="
                                text-xs
                                font-medium
                            ">
                                Account Created
                            </span>

                        </div>


                        <p className="
                            mt-2
                            text-sm
                            font-semibold
                            text-gray-900
                        ">

                            {
                                formatDateTime(
                                    customer.created_at
                                )
                            }

                        </p>

                    </div>


                    {/* Last login */}

                    <div className="
                        rounded-xl
                        bg-gray-50
                        p-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-gray-500
                        ">

                            <Clock
                                size={16}
                            />

                            <span className="
                                text-xs
                                font-medium
                            ">
                                Last Login
                            </span>

                        </div>


                        <p className="
                            mt-2
                            text-sm
                            font-semibold
                            text-gray-900
                        ">

                            {
                                formatDateTime(
                                    customer.last_login
                                )
                            }

                        </p>

                    </div>


                    {/* Updated */}

                    <div className="
                        rounded-xl
                        bg-gray-50
                        p-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-gray-500
                        ">

                            <Calendar
                                size={16}
                            />

                            <span className="
                                text-xs
                                font-medium
                            ">
                                Last Updated
                            </span>

                        </div>


                        <p className="
                            mt-2
                            text-sm
                            font-semibold
                            text-gray-900
                        ">

                            {
                                formatDateTime(
                                    customer.updated_at
                                )
                            }

                        </p>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* FUTURE ORDERS SECTION */}
            {/* ================================================= */}

            
        </div>

    );

}
