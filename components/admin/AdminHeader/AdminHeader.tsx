"use client";

import {
    Bell,
    Menu,
    Search,
} from "lucide-react";

import {
    useState,
} from "react";

import AdminNotificationDropdown
    from "@/components/admin/AdminNotificationDropdown";

import useNotifications
    from "@/hooks/useNotifications";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";


export default function AdminHeader() {

    const [
        notificationsOpen,
        setNotificationsOpen
    ] = useState(false);

    const {
        user
    } = useAuth();

    console.log("ÜSER", user)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const {
        unreadCount
    } =
        useNotifications();


    return (

        <header
            className="
                sticky
                top-0
                z-40
                flex
                h-20
                items-center
                justify-between
                border-b
                bg-background/95
                px-4
                backdrop-blur
                sm:px-6
                lg:px-8
            "
        >

            {/* MOBILE MENU */}

            <button
                type="button"
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    lg:hidden
                "
            >

                <Menu
                    size={21}
                />

            </button>


            {/* Left */}
            <Link href="/"
             className="uppercase
             text-[var(--color-primary)]
             font-bold
             text-sm
             hover:bg-[var(--color-primary)]
             hover:text-[var(--color-primary-dark)]
             border
             border-[var(--color-primary)]
             px-6
             py-2
             "
            >
                Go To Homepage
            </Link>

            

            {/* Right */}
            
<div
                className="
                    flex
                    items-center
                    gap-3
                "
            >

                {/* NOTIFICATIONS */}

                <div
                    className="
                        relative
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            setNotificationsOpen(
                                (previous) =>
                                    !previous
                            )
                        }
                        className="
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            transition
                            hover:bg-muted
                        "
                    >

                        <Bell
                            size={19}
                        />


                        {/* UNREAD BADGE */}

                        {unreadCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -right-1
                                    -top-1
                                    flex
                                    min-h-5
                                    min-w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    px-1
                                    text-[10px]
                                    font-bold
                                    text-white
                                    ring-2
                                    ring-background
                                "
                            >

                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount
                                }

                            </span>

                        )}

                    </button>


                    <AdminNotificationDropdown

                        open={
                            notificationsOpen
                        }

                        onClose={() =>
                            setNotificationsOpen(
                                false
                            )
                        }

                    />

                </div>


                {/* ADMIN */}

                <div
                    className="
                        hidden
                        items-center
                        gap-3
                        border-l
                        pl-4
                        sm:flex
                    "
                >

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/10
                            font-semibold
                            text-primary
                        "
                    >
                        {user?.profile_image ? (

                            <Image
                                src={`${apiUrl}${user.profile_image}`}
                                alt={`${user.first_name} ${user.last_name}`}
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

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-primary/10
                                    font-semibold
                                    text-primary
                                "
                            >
                                {user?.first_name
                                    ?.charAt(0)
                                    .toUpperCase() || "A"}
                            </div>

                        )}
                    </div>

                    <div>

                        <p className="text-sm font-semibold">

                            {user
                                ? `${user.first_name} ${user.last_name}`
                                : "Administrator"}

                        </p>

                        <p className="text-xs text-muted-foreground">

                            {user?.role
                                ? user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)
                                : "Admin"}

                        </p>

                    </div>

                </div>

            </div>
        </header>

    );

}