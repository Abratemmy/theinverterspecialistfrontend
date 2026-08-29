"use client";

import {
    Bell,
    Check,
    CreditCard,
    Info,
    LockKeyhole,
    ShoppingBag,
    Tag,
    X,
} from "lucide-react";

import useNotifications from "@/hooks/useNotifications";

import type {
    Notification,
    NotificationType,
} from "@/types/notification";


// ============================================================
// PROPS
// ============================================================

interface AdminNotificationDropdownProps {

    open: boolean;

    onClose: () => void;

}


// ============================================================
// ICON
// ============================================================

const getNotificationIcon = (
    type: NotificationType
) => {

    switch (type) {

        case "order":
            return ShoppingBag;

        case "payment":
            return CreditCard;

        case "promotion":
            return Tag;

        case "security":
            return LockKeyhole;

        case "system":
        default:
            return Info;

    }

};


// ============================================================
// TIME FORMAT
// ============================================================

const formatNotificationTime = (
    date: string
) => {

    const notificationDate =
        new Date(date);

    const now =
        new Date();

    const difference =
        now.getTime() -
        notificationDate.getTime();

    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        );

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours =
        Math.floor(
            minutes / 60
        );

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days =
        Math.floor(
            hours / 24
        );

    if (days < 7) {
        return `${days}d ago`;
    }

    return notificationDate.toLocaleDateString();

};


// ============================================================
// COMPONENT
// ============================================================

export default function AdminNotificationDropdown({

    open,

    onClose,

}: AdminNotificationDropdownProps) {

    const {

        notifications,

        loadingNotifications,

        unreadCount,

        markNotificationAsRead,

        markingNotificationAsRead,

        markAllNotificationsAsRead,

        markingAllNotificationsAsRead,

    } =
        useNotifications();


    // ========================================================
    // HANDLE READ
    // ========================================================

    const handleNotificationClick = async (
        notification: Notification
    ) => {

        if (notification.is_read) {
            return;
        }

        try {

            await markNotificationAsRead(
                notification.id
            );

        }
        catch (error) {

            console.error(
                "Unable to mark notification as read:",
                error
            );

        }

    };


    // ========================================================
    // CLOSED
    // ========================================================

    if (!open) {
        return null;
    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <>

            {/* BACKDROP */}

            <div
                className="
                    fixed
                    inset-0
                    z-40
                "
                onClick={onClose}
            />


            {/* DROPDOWN */}

            <div
                className="
                    absolute
                    right-0
                    top-14
                    z-50
                    w-[380px]
                    max-w-[calc(100vw-2rem)]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-2xl
                "
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-4
                        py-4
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <h3
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                "
                            >
                                Notifications
                            </h3>


                            {unreadCount > 0 && (

                                <span
                                    className="
                                        rounded-full
                                        bg-primary
                                        px-2
                                        py-0.5
                                        text-[10px]
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {unreadCount}
                                </span>

                            )}

                        </div>


                        <p
                            className="
                                mt-0.5
                                text-xs
                                text-gray-500
                            "
                        >
                            Your latest notifications
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                        "
                    >

                        <X size={17} />

                    </button>

                </div>


                {/* MARK ALL */}

                {unreadCount > 0 && (

                    <div
                        className="
                            flex
                            justify-end
                            border-b
                            border-gray-100
                            px-4
                            py-2
                        "
                    >

                        <button
                            type="button"
                            onClick={() =>
                                markAllNotificationsAsRead()
                            }
                            disabled={
                                markingAllNotificationsAsRead
                            }
                            className="
                                text-xs
                                font-medium
                                text-primary
                                hover:underline
                                disabled:opacity-50
                            "
                        >

                            {markingAllNotificationsAsRead
                                ? "Marking..."
                                : "Mark all as read"
                            }

                        </button>

                    </div>

                )}


                {/* BODY */}

                <div
                    className="
                        max-h-[430px]
                        overflow-y-auto
                    "
                >

                    {/* LOADING */}

                    {loadingNotifications && (

                        <div
                            className="
                                px-6
                                py-12
                                text-center
                                text-sm
                                text-gray-500
                            "
                        >
                            Loading notifications...
                        </div>

                    )}


                    {/* EMPTY */}

                    {!loadingNotifications &&
                        notifications.length === 0 && (

                            <div
                                className="
                                    px-6
                                    py-12
                                    text-center
                                "
                            >

                                <div
                                    className="
                                        mx-auto
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gray-100
                                        text-gray-400
                                    "
                                >

                                    <Bell size={20} />

                                </div>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    No notifications
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-gray-400
                                    "
                                >
                                    {"You're all caught up."}
                                </p>

                            </div>

                        )}


                    {/* NOTIFICATIONS */}

                    {!loadingNotifications &&
                        notifications.map(
                            (notification) => {

                                const Icon =
                                    getNotificationIcon(
                                        notification.type
                                    );


                                return (

                                    <button
                                        type="button"
                                        key={
                                            notification.id
                                        }
                                        onClick={() =>
                                            handleNotificationClick(
                                                notification
                                            )
                                        }
                                        disabled={
                                            markingNotificationAsRead
                                        }
                                        className={`
                                            flex
                                            w-full
                                            gap-3
                                            border-b
                                            border-gray-100
                                            px-4
                                            py-4
                                            text-left
                                            transition
                                            hover:bg-gray-50
                                            ${
                                                !notification.is_read
                                                    ? "bg-primary/[0.04]"
                                                    : "bg-white"
                                            }
                                        `}
                                    >

                                        {/* ICON */}

                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-primary/10
                                                text-primary
                                            "
                                        >

                                            <Icon
                                                size={17}
                                            />

                                        </div>


                                        {/* CONTENT */}

                                        <div
                                            className="
                                                min-w-0
                                                flex-1
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-2
                                                "
                                            >

                                                <p
                                                    className={`
                                                        text-sm
                                                        ${
                                                            notification.is_read
                                                                ? "font-medium text-gray-700"
                                                                : "font-semibold text-gray-900"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        notification.title
                                                    }
                                                </p>


                                                {!notification.is_read && (

                                                    <span
                                                        className="
                                                            mt-1
                                                            h-2
                                                            w-2
                                                            shrink-0
                                                            rounded-full
                                                            bg-primary
                                                        "
                                                    />

                                                )}

                                            </div>


                                            <p
                                                className="
                                                    mt-1
                                                    line-clamp-2
                                                    text-xs
                                                    leading-5
                                                    text-gray-500
                                                "
                                            >
                                                {
                                                    notification.message
                                                }
                                            </p>


                                            <p
                                                className="
                                                    mt-2
                                                    text-[10px]
                                                    text-gray-400
                                                "
                                            >
                                                {
                                                    formatNotificationTime(
                                                        notification.created_at
                                                    )
                                                }
                                            </p>

                                        </div>

                                    </button>

                                );

                            }
                        )}

                </div>


                {/* FOOTER */}

                {notifications.length > 0 && (

                    <div
                        className="
                            border-t
                            border-gray-100
                            px-4
                            py-3
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gray-50
                                py-2.5
                                text-xs
                                font-medium
                                text-gray-700
                                transition
                                hover:bg-gray-100
                            "
                        >

                            <Check size={14} />

                            Done

                        </button>

                    </div>

                )}

            </div>

        </>

    );

}