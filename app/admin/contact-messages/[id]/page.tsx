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
    Mail,
    Phone,
    User,
    Calendar,
    Send,
    Trash2,
    MessageSquare,
} from "lucide-react";

import toast from "react-hot-toast";

import useContactMessages from "@/hooks/useContactMessages";
import DeleteModal from "@/components/common/DeleteModal";

import type {
    ContactMessageStatus,
} from "@/types/contactMessage";

import StatusSelect from "@/components/admin/StatusSelect";

import type {
    StatusSelectOption,
} from "@/components/admin/StatusSelect";
import { showError, showSuccess } from "@/lib/toast";


// ============================================================
// STATUS OPTIONS
// ============================================================

const statusOptions:
    StatusSelectOption<ContactMessageStatus>[] = [

    {
        value: "new",
        label: "New",
        className:
            "text-orange-600 hover:bg-orange-50",
    },

    {
        value: "read",
        label: "Read",
        className:
            "text-blue-600 hover:bg-blue-50",
    },

    {
        value: "replied",
        label: "Replied",
        className:
            "text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]",
    },

    {
        value: "closed",
        label: "Closed",
        className:
            "text-gray-500 hover:bg-gray-50",
    },

];


// ============================================================
// ERROR HELPER
// ============================================================

const getErrorMessage = (
    error: unknown
): string | undefined => {

    if (
        error &&
        typeof error === "object" &&
        "response" in error
    ) {

        const response =
            (
                error as {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                }
            ).response;


        return response?.data?.message;

    }


    if (
        error &&
        typeof error === "object" &&
        "message" in error
    ) {

        return (
            error as {
                message?: string;
            }
        ).message;

    }


    return undefined;

};


// ============================================================
// PAGE
// ============================================================

export default function ContactMessageDetailPage() {

    const router =
        useRouter();

    const params =
        useParams();


    // ========================================================
    // MESSAGE ID
    // ========================================================

    const messageId =
        Number(
            params.id
        );


    // ========================================================
    // STATE
    // ========================================================

    const [
        message,
        setMessage
    ] = useState<
        Awaited<
            ReturnType<
                typeof useContactMessages
            >
        >["messages"][number] | null
    >(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        reply,
        setReply
    ] = useState("");

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    // ========================================================
    // HOOK
    // ========================================================

    const {

        getContactMessageById,

        updateContactMessageStatus,

        updatingContactMessageStatus,

        replyToContactMessage,

        replyingToContactMessage,

        deleteContactMessage,

        deletingContactMessage,

    } = useContactMessages();


    // ========================================================
    // FETCH MESSAGE
    // ========================================================

    useEffect(() => {

        if (
            !messageId ||
            Number.isNaN(messageId)
        ) {

            return;

        }


        const fetchMessage =
            async () => {

                try {

                    setLoading(true);


                    const response =
                        await getContactMessageById(
                            messageId
                        );


                    setMessage(
                        response.data
                    );


                    setReply(
                        response.data.admin_reply || ""
                    );

                }
                catch (error: unknown) {

                    toast.error(

                        getErrorMessage(error) ||

                        "Unable to load contact message."

                    );

                    router.push(
                        "/admin/contact-messages"
                    );

                }
                finally {

                    setLoading(false);

                }

            };


        fetchMessage();

    }, [
        messageId,
        // router,
        
    ]);


    // ========================================================
    // CHANGE STATUS
    // ========================================================

    const handleStatusChange = async (
        status: ContactMessageStatus
    ) => {

        if (!message) {
            return;
        }


        try {

            await updateContactMessageStatus({

                id:
                    message.id,

                payload: {
                    status
                }

            });


            setMessage(
                previous =>
                    previous
                        ? {
                            ...previous,
                            status
                        }
                        : previous
            );


            toast.success(
                "Message status updated successfully."
            );

        }
        catch (error: unknown) {

            toast.error(

                getErrorMessage(error) ||

                "Unable to update message status."

            );

        }

    };


    // ========================================================
    // REPLY
    // ========================================================

    const handleReply = async () => {

        if (!message) {
            return;
        }


        if (!reply.trim()) {

            toast.error(
                "Please enter a reply."
            );

            return;

        }


        try {

            const response =
                await replyToContactMessage({

                    id:
                        message.id,

                    payload: {

                        admin_reply:
                            reply.trim()

                    }

                });


            setMessage(
                response.data
            );


            setReply(
                response.data.admin_reply || ""
            );


            toast.success(
                "Reply saved successfully."
            );

        }
        catch (error: unknown) {

            toast.error(

                getErrorMessage(error) ||

                "Unable to save reply."

            );

        }

    };


    // ========================================================
    // DELETE
    // ========================================================

    const handleDelete = async () => {

    if (!message) {
        return;
    }

    try {

        await deleteContactMessage(
            message.id
        );


        showSuccess(
            "Contact message deleted successfully."
        );


        setDeleteModalOpen(false);


        router.push(
            "/admin/contact-messages"
        );

    }
    catch (error: unknown) {

        showError(

            getErrorMessage(error) ||

            "Unable to delete contact message."

        );

    }

};


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="
                flex
                min-h-[400px]
                items-center
                justify-center
            ">

                <div className="
                    text-sm
                    text-gray-500
                ">

                    Loading message...

                </div>

            </div>

        );

    }


    // ========================================================
    // NOT FOUND
    // ========================================================

    if (!message) {

        return (

            <div className="
                flex
                min-h-[400px]
                flex-col
                items-center
                justify-center
                gap-4
            ">

                <MessageSquare
                    size={40}
                    className="text-gray-300"
                />

                <p className="
                    text-sm
                    text-gray-500
                ">

                    Contact message not found.

                </p>


                <button

                    type="button"

                    onClick={() =>
                        router.push(
                            "/admin/contact-messages"
                        )
                    }

                    className="
                        rounded-lg
                        bg-[var(--color-primary)]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        hover:opacity-90
                    "

                >

                    Back to Messages

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
                                "/admin/contact-messages"
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

                            Contact Message

                        </h1>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">

                            Message #{message.id}

                        </p>

                    </div>

                </div>


                {/* Delete */}

                <button

                    type="button"

                    onClick={() =>
                        setDeleteModalOpen(true)
                    }
                    disabled={
                        deletingContactMessage
                    }

                    className="
                        inline-flex
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        bg-white
                        px-4
                        text-sm
                        font-medium
                        text-red-600
                        transition
                        hover:bg-red-50
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "

                >

                    <Trash2
                        size={16}
                    />

                    {
                        deletingContactMessage
                            ? "Deleting..."
                            : "Delete"
                    }

                </button>

                <DeleteModal

                    open={
                        deleteModalOpen
                    }

                    title="Delete Contact Message"

                    message="
                        Are you sure you want to permanently delete this contact message
                    "

                    itemName={
                        message
                            ? message.subject
                            : undefined
                    }

                    loading={
                        deletingContactMessage
                    }

                    onClose={() => {

                        if (
                            !deletingContactMessage
                        ) {

                            setDeleteModalOpen(false);

                        }

                    }}

                    onConfirm={
                        handleDelete
                    }

                />

            </div>


            {/* ================================================= */}
            {/* MAIN GRID */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                lg:grid-cols-3
            ">

                {/* ================================================= */}
                {/* MESSAGE */}
                {/* ================================================= */}

                <div className="
                    space-y-6
                    lg:col-span-2
                ">

                    {/* Message Card */}

                    <div className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                    ">

                        {/* Subject */}

                        <div className="
                            border-b
                            border-gray-200
                            px-6
                            py-5
                        ">

                            <p className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-wide
                                text-gray-400
                            ">

                                Subject

                            </p>


                            <h2 className="
                                mt-1
                                text-lg
                                font-semibold
                                text-gray-900
                            ">

                                {
                                    message.subject
                                }

                            </h2>

                        </div>


                        {/* Message */}

                        <div className="
                            px-6
                            py-6
                        ">

                            <p className="
                                whitespace-pre-wrap
                                text-sm
                                leading-7
                                text-gray-700
                            ">

                                {
                                    message.message
                                }

                            </p>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* REPLY CARD */}
                    {/* ================================================= */}

                    <div className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-6
                    ">

                        <div className="
                            mb-4
                            flex
                            items-center
                            gap-2
                        ">

                            <MessageSquare
                                size={18}
                                className="text-gray-500"
                            />


                            <h2 className="
                                text-base
                                font-semibold
                                text-gray-900
                            ">

                                Admin Reply

                            </h2>

                        </div>


                        <textarea

                            value={
                                reply
                            }

                            onChange={(
                                event
                            ) =>
                                setReply(
                                    event.target.value
                                )
                            }

                            placeholder="
                                Write your reply to the customer...
                            "

                            rows={7}

                            className="
                                w-full
                                resize-y
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-3
                                text-sm
                                leading-6
                                text-gray-700
                                outline-none
                                transition
                                focus:border-[var(--color-primary)]
                                focus:ring-1
                                focus:ring-[var(--color-primary)]
                            "

                        />


                        <div className="
                            mt-4
                            flex
                            justify-end
                        ">

                            <button

                                type="button"

                                onClick={
                                    handleReply
                                }

                                disabled={
                                    replyingToContactMessage
                                }

                                className="
                                    inline-flex
                                    h-10
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[var(--color-primary)]
                                    px-5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:opacity-90
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "

                            >

                                <Send
                                    size={16}
                                />

                                {
                                    replyingToContactMessage
                                        ? "Saving..."
                                        : "Save Reply"
                                }

                            </button>

                        </div>


                        {/* Previous Reply */}

                        {message.admin_reply && (

                            <div className="
                                mt-6
                                rounded-xl
                                bg-gray-50
                                p-4
                            ">

                                <p className="
                                    mb-2
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-gray-400
                                ">

                                    Saved Reply

                                </p>


                                <p className="
                                    whitespace-pre-wrap
                                    text-sm
                                    leading-6
                                    text-gray-700
                                ">

                                    {
                                        message.admin_reply
                                    }

                                </p>


                                {message.replied_at && (

                                    <p className="
                                        mt-3
                                        text-xs
                                        text-gray-400
                                    ">

                                        Replied on{" "}

                                        {
                                            new Date(
                                                message.replied_at
                                            ).toLocaleString(
                                                "en-NG"
                                            )
                                        }

                                    </p>

                                )}

                            </div>

                        )}

                    </div>

                </div>


                {/* ================================================= */}
                {/* SIDEBAR */}
                {/* ================================================= */}

                <div className="
                    space-y-6
                ">

                    {/* ================================================= */}
                    {/* SENDER */}
                    {/* ================================================= */}

                    <div className="
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

                            Sender Information

                        </h2>


                        <div className="
                            space-y-5
                        ">

                            {/* Name */}

                            <div className="
                                flex
                                items-start
                                gap-3
                            ">

                                <User
                                    size={17}
                                    className="
                                        mt-0.5
                                        shrink-0
                                        text-gray-400
                                    "
                                />


                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-400
                                    ">

                                        Full Name

                                    </p>


                                    <p className="
                                        mt-1
                                        text-sm
                                        font-medium
                                        text-gray-800
                                    ">

                                        {
                                            message.full_name
                                        }

                                    </p>

                                </div>

                            </div>


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
                                        shrink-0
                                        text-gray-400
                                    "
                                />


                                <div className="
                                    min-w-0
                                ">

                                    <p className="
                                        text-xs
                                        text-gray-400
                                    ">

                                        Email

                                    </p>


                                    <a

                                        href={`mailto:${message.email}`}

                                        className="
                                            mt-1
                                            block
                                            truncate
                                            text-sm
                                            font-medium
                                            text-[var(--color-primary)]
                                            hover:underline
                                        "

                                    >

                                        {
                                            message.email
                                        }

                                    </a>

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
                                        shrink-0
                                        text-gray-400
                                    "
                                />


                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-400
                                    ">

                                        Phone

                                    </p>


                                    {message.phone ? (

                                        <a

                                            href={`tel:${message.phone}`}

                                            className="
                                                mt-1
                                                block
                                                text-sm
                                                font-medium
                                                text-gray-800
                                                hover:text-[var(--color-primary)]
                                            "

                                        >

                                            {
                                                message.phone
                                            }

                                        </a>

                                    ) : (

                                        <p className="
                                            mt-1
                                            text-sm
                                            text-gray-500
                                        ">

                                            Not provided

                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* STATUS */}
                    {/* ================================================= */}

                    <div className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-6
                    ">

                        <h2 className="
                            mb-4
                            text-base
                            font-semibold
                            text-gray-900
                        ">

                            Message Status

                        </h2>


                        <StatusSelect<ContactMessageStatus>

                            value={
                                message.status
                            }

                            onChange={
                                handleStatusChange
                            }

                            options={
                                statusOptions
                            }

                            disabled={
                                updatingContactMessageStatus
                            }

                            className="w-full"

                        />

                    </div>


                    {/* ================================================= */}
                    {/* DATE */}
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
                            items-start
                            gap-3
                        ">

                            <Calendar
                                size={18}
                                className="
                                    mt-0.5
                                    text-gray-400
                                "
                            />


                            <div>

                                <p className="
                                    text-xs
                                    text-gray-400
                                ">

                                    Received

                                </p>


                                <p className="
                                    mt-1
                                    text-sm
                                    font-medium
                                    text-gray-800
                                ">

                                    {
                                        new Date(
                                            message.created_at
                                        ).toLocaleString(
                                            "en-NG",
                                            {
                                                day:
                                                    "2-digit",

                                                month:
                                                    "long",

                                                year:
                                                    "numeric",

                                                hour:
                                                    "2-digit",

                                                minute:
                                                    "2-digit"
                                            }
                                        )
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}