"use client";

import {useEffect, useState,} from "react";

import { useRouter} from "next/navigation";

import {
    Search,
    RefreshCw,
    Eye,
    Mail,
} from "lucide-react";

import toast from "react-hot-toast";

import useContactMessages from "@/hooks/useContactMessages";

import type {ContactMessageStatus} from "@/types/contactMessage";

import StatusSelect from "@/components/admin/StatusSelect";

import type { StatusSelectOption,} from "@/components/admin/StatusSelect";

import {
    EmptyState,
} from "@/components/common";


// ============================================================
// PAGE
// ============================================================

export default function ContactMessagesPage() {

    const router =
        useRouter();


    // ========================================================
    // FILTERS
    // ========================================================

    const [
        search,
        setSearch
    ] = useState("");


    const [
        statusFilter,
        setStatusFilter
    ] = useState("");


    const [
        page,
        setPage
    ] = useState(1);


    const limit = 10;


    // ========================================================
    // STATUS OPTIONS
    // ========================================================

    const statusOptions:
        StatusSelectOption<ContactMessageStatus | "">[] = [

        {
            value: "",
            label: "All Messages",
            className:
                "text-[var(--color-primary-dark)] hover:bg-[var(--bgcolor-primary)]"
        },

        {
            value: "new",
            label: "New",
            className:
                "text-orange-600 hover:bg-orange-50"
        },

        {
            value: "read",
            label: "Read",
            className:
                "text-blue-600 hover:bg-blue-50"
        },

        {
            value: "replied",
            label: "Replied",
            className:
                "text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
        },

        {
            value: "closed",
            label: "Closed",
            className:
                "text-gray-500 hover:bg-gray-50"
        }

    ];


    // ========================================================
    // GET MESSAGES
    // ========================================================

    const {

        messages,

        pagination,

        loadingMessages,

        fetchingMessages,

        refetchMessages,

        updateContactMessageStatus,

        updatingContactMessageStatus,

    } = useContactMessages({

        search,

        status:
            statusFilter,

        page,

        limit,

    });


    // ========================================================
    // RESET PAGE WHEN FILTER CHANGES
    // ========================================================

    useEffect(() => {

        setPage(1);

    }, [
        search,
        statusFilter
    ]);


    // ========================================================
    // CHANGE STATUS
    // ========================================================

    const handleStatusChange = async (

        id: number,

        status: ContactMessageStatus

    ) => {

        try {

            await updateContactMessageStatus({

                id,

                payload: {
                    status
                }

            });


            toast.success(
                "Message status updated successfully."
            );

        }
        catch (error: unknown) {

            const message =
                (
                    error &&
                    typeof error === "object" &&
                    "response" in error
                )
                    ? (
                        error as {
                            response?: {
                                data?: {
                                    message?: string
                                }
                            }
                        }
                    ).response?.data?.message
                    : undefined;


            toast.error(

                message ||

                "Unable to update message status."

            );

        }

    };


    // ========================================================
    // VIEW MESSAGE
    // ========================================================

    const handleViewMessage = (
        id: number
    ) => {

        router.push(
            `/admin/contact-messages/${id}`
        );

    };


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {

        refetchMessages();

    };


    // ========================================================
    // PAGE CHANGE
    // ========================================================

    const handlePageChange = (
        newPage: number
    ) => {

        if (
            newPage < 1 ||
            newPage >
                (pagination?.totalPages || 1)
        ) {

            return;

        }


        setPage(
            newPage
        );

    };


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
                mb-5
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-semibold
                        text-gray-900
                    ">
                        Contact Messages
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Manage messages submitted through your website.
                    </p>

                </div>


                <button

                    type="button"

                    onClick={
                        handleRefresh
                    }

                    disabled={
                        fetchingMessages
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
                            fetchingMessages
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
                mb-6
            ">

                <div className="
                    grid
                    grid-cols-1
                    gap-3
                    md:grid-cols-3
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

                            onChange={(
                                event
                            ) =>
                                setSearch(
                                    event.target.value
                                )
                            }

                            placeholder="
                                Search name, email, phone or subject...
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


                    {/* Status */}

                    <StatusSelect<ContactMessageStatus | "">

                        value={
                            statusFilter
                        }

                        onChange={(
                            value
                        ) =>
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
            {/* SUMMARY */}
            {/* ================================================= */}

            {!loadingMessages &&
                pagination && (

                    <div className="
                        flex
                        items-center
                        justify-between
                        text-sm
                        text-gray-500
                        mb-3
                    ">

                        <p>

                            Showing{" "}

                            <span className="
                                font-medium
                                text-gray-700
                            ">

                                {
                                    pagination.total === 0
                                        ? 0
                                        : (
                                            (
                                                pagination.page -
                                                1
                                            ) *
                                            pagination.limit
                                        ) + 1
                                }

                            </span>

                            {" "}to{" "}

                            <span className="
                                font-medium
                                text-gray-700
                            ">

                                {
                                    Math.min(
                                        pagination.page *
                                        pagination.limit,

                                        pagination.total
                                    )
                                }

                            </span>

                            {" "}of{" "}

                            <span className="
                                font-medium
                                text-gray-700
                            ">

                                {
                                    pagination.total
                                }

                            </span>

                            {" "}messages

                        </p>

                    </div>

                )}


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            <div className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
            ">

                <div className="
                    overflow-x-auto
                ">

                    <table className="
                        w-full
                        min-w-[1000px]
                    ">

                        {/* ================================================= */}
                        {/* HEADER */}
                        {/* ================================================= */}

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
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Sender
                                </th>


                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Subject
                                </th>


                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Message
                                </th>


                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Status
                                </th>


                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Date
                                </th>


                                <th className="
                                    px-6
                                    py-4
                                    text-right
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-500
                                ">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        {/* ================================================= */}
                        {/* BODY */}
                        {/* ================================================= */}

                        <tbody>

                            {/* Loading */}

                            {loadingMessages && (

                                <tr>

                                    <td

                                        colSpan={6}

                                        className="
                                            px-6
                                            py-12
                                            text-center
                                            text-sm
                                            text-gray-500
                                        "

                                    >

                                        Loading contact messages...

                                    </td>

                                </tr>

                            )}


                            {/* Empty */}

                            {!loadingMessages &&
                                messages.length === 0 && (

                                    <tr>

                                        <td

                                            colSpan={6}

                                            className="
                                                px-6
                                                py-12
                                            "

                                        >

                                            <EmptyState

                                                title="
                                                    No contact messages found
                                                "

                                                description="
                                                    Messages submitted through the contact form will appear here.
                                                "

                                            />

                                        </td>

                                    </tr>

                                )}


                            {/* Messages */}

                            {!loadingMessages &&
                                messages.map(
                                    (
                                        contactMessage
                                    ) => (

                                        <tr

                                            key={
                                                contactMessage.id
                                            }

                                            onClick={() =>
                                                handleViewMessage(
                                                    contactMessage.id
                                                )
                                            }

                                            className="
                                                cursor-pointer
                                                border-b
                                                border-gray-200
                                                transition
                                                odd:bg-gray-50
                                                even:bg-gray-100
                                                hover:bg-gray-200
                                            "

                                        >

                                            {/* Sender */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-white
                                                        text-gray-500
                                                        shadow-sm
                                                    ">

                                                        <Mail
                                                            size={17}
                                                        />

                                                    </div>


                                                    <div>

                                                        <p className="
                                                            text-sm
                                                            font-medium
                                                            text-gray-900
                                                        ">

                                                            {
                                                                contactMessage.full_name
                                                            }

                                                        </p>


                                                        <p className="
                                                            mt-1
                                                            text-xs
                                                            text-gray-500
                                                        ">

                                                            {
                                                                contactMessage.email
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Subject */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <p className="
                                                    max-w-[220px]
                                                    truncate
                                                    text-sm
                                                    font-medium
                                                    text-gray-800
                                                ">

                                                    {
                                                        contactMessage.subject
                                                    }

                                                </p>


                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-500
                                                ">

                                                    #

                                                    {
                                                        contactMessage.id
                                                    }

                                                </p>

                                            </td>


                                            {/* Message */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <p className="
                                                    max-w-[280px]
                                                    truncate
                                                    text-sm
                                                    text-gray-600
                                                ">

                                                    {
                                                        contactMessage.message
                                                    }

                                                </p>

                                            </td>


                                            {/* Status */}

                                            <td

                                                className="
                                                    px-6
                                                    py-4
                                                "

                                                onClick={(
                                                    event
                                                ) =>
                                                    event.stopPropagation()
                                                }

                                            >

                                                <StatusSelect<ContactMessageStatus>

                                                    value={
                                                        contactMessage.status
                                                    }

                                                    onChange={(
                                                        value
                                                    ) =>
                                                        handleStatusChange(

                                                            contactMessage.id,

                                                            value

                                                        )
                                                    }

                                                    options={
                                                        statusOptions.filter(
                                                            (
                                                                option
                                                            ) =>
                                                                option.value !== ""
                                                        ) as StatusSelectOption<ContactMessageStatus>[]
                                                    }

                                                    disabled={
                                                        updatingContactMessageStatus
                                                    }

                                                    className="
                                                        min-w-[130px]
                                                    "

                                                />

                                            </td>


                                            {/* Date */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-gray-700
                                                ">

                                                    {
                                                        new Date(
                                                            contactMessage.created_at
                                                        ).toLocaleDateString(
                                                            "en-NG",
                                                            {
                                                                day:
                                                                    "2-digit",

                                                                month:
                                                                    "short",

                                                                year:
                                                                    "numeric"
                                                            }
                                                        )
                                                    }

                                                </p>

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

                                                        handleViewMessage(
                                                            contactMessage.id
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
                                                        bg-white
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

                {!loadingMessages &&
                    pagination &&
                    pagination.totalPages > 0 && (

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

                            <p className="
                                text-sm
                                text-gray-500
                            ">

                                Page{" "}

                                <span className="
                                    font-medium
                                    text-gray-700
                                ">

                                    {
                                        pagination.page
                                    }

                                </span>

                                {" "}of{" "}

                                <span className="
                                    font-medium
                                    text-gray-700
                                ">

                                    {
                                        pagination.totalPages
                                    }

                                </span>

                            </p>


                            <div className="
                                flex
                                items-center
                                gap-2
                            ">

                                <button

                                    type="button"

                                    onClick={() =>
                                        handlePageChange(
                                            pagination.page - 1
                                        )
                                    }

                                    disabled={
                                        pagination.page === 1
                                    }

                                    className="
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
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


                                {/* Page numbers */}

                                <div className="
                                    hidden
                                    items-center
                                    gap-1
                                    sm:flex
                                ">

                                    {Array.from(
                                        {
                                            length:
                                                pagination.totalPages
                                        },
                                        (
                                            _,
                                            index
                                        ) =>
                                            index + 1
                                    )
                                        .map(
                                            (
                                                pageNumber
                                            ) => (

                                                <button

                                                    key={
                                                        pageNumber
                                                    }

                                                    type="button"

                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageNumber
                                                        )
                                                    }

                                                    className={`
                                                        h-9
                                                        min-w-9
                                                        rounded-lg
                                                        px-3
                                                        text-sm
                                                        font-medium
                                                        transition
                                                        ${
                                                            pagination.page ===
                                                            pageNumber
                                                                ? "bg-[var(--color-primary)] text-white"
                                                                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                                        }
                                                    `}

                                                >

                                                    {
                                                        pageNumber
                                                    }

                                                </button>

                                            )
                                        )}

                                </div>


                                <button

                                    type="button"

                                    onClick={() =>
                                        handlePageChange(
                                            pagination.page + 1
                                        )
                                    }

                                    disabled={
                                        pagination.page ===
                                        pagination.totalPages
                                    }

                                    className="
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
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