"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-hot-toast";
import { logout } from "@/services/auth.service";

import {
    LayoutDashboard,
    Package,
    Tags,
    Award,
    ShoppingBag,
    Users,
    MessageSquare,
    CreditCard,
    LogOut,
    Store,
} from "lucide-react";
import { showError, showSuccess } from "@/lib/toast";
import Image from "next/image";

const navigation = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },

    {
        section: "SHOP",
    },

    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },

    {
        title: "Categories",
        href: "/admin/categories",
        icon: Tags,
    },

    {
        title: "Brands",
        href: "/admin/brands",
        icon: Award,
    },

    {
        section: "SALES",
    },

    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
    },

    {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
    },

    {
        section: "CUSTOMERS",
    },

    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },

    {
        title: "Contact Messages",
        href: "/admin/contact-messages",
        icon: MessageSquare,
    }
];

export default function AdminSidebar() {

    const pathname = usePathname();
     const router =
        useRouter();


    const [
        loggingOut,
        setLoggingOut
    ] = useState(false);

    const handleLogout = async () => {

        if (loggingOut) {
            return;
        }


        try {

            setLoggingOut(true);


            await logout();


            showSuccess(
                "Logged out successfully."
            );


            router.replace(
                "/"
            );

            router.refresh();

        }
        catch (error: unknown) {

            console.error(
                "Logout error:",
                error
            );


            showError(
                "Unable to logout. Please try again."
            );

        }
        finally {

            setLoggingOut(false);

        }

    };

    return (

        <aside
            className="
                fixed
                left-0
                top-0
                z-50
                hidden
                h-screen
                w-64
                border-r
                bg-black
                text-white
                lg:flex
                lg:flex-col
            "
        >

            {/* LOGO */}

            <div
                className="
                    flex
                    h-20
                    items-center
                    border-b
                    border-white/10
                    px-6
                "
            >

                <Link
                    href="/admin"
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <Image
                        src="/images/logo.jpeg"
                        alt="Ebton Greener Energy Co."
                        width={180}
                        height={60}
                        priority
                    />

                    

                </Link>

            </div>


            {/* NAVIGATION */}

            <nav
                className="
                    flex-1
                    overflow-y-auto
                    px-3
                    py-5
                "
            >

                {navigation.map(
                    (item, index) => {

                        if (
                            item.section
                        ) {

                            return (

                                <div
                                    key={`${item.section}-${index}`}
                                    className="
                                        mb-2
                                        mt-6
                                        px-3
                                        text-[10px]
                                        font-semibold
                                        tracking-[0.15em]
                                        text-white/35
                                    "
                                >

                                    {item.section}

                                </div>

                            );

                        }


                        const Icon =
                            item.icon!;

                        /*
                         * A child route should keep
                         * its parent navigation item active.
                         *
                         * Example:
                         * /admin/products/solar-panel
                         *
                         * keeps Products active.
                         */

                        const isActive =
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname === item.href ||
                                  pathname.startsWith(
                                      `${item.href}/`
                                  );

                        return (

                            <Link
                                key={item.href}
                                href={item.href!}
                                className={`
                                    group
                                    mb-1
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-sm
                                    font-medium
                                    transition-all
                                    ${
                                        isActive
                                            ? `
                                                bg-primary
                                                text-white
                                              `
                                            : `
                                                text-white/60
                                                hover:bg-white/5
                                                hover:text-white
                                              `
                                    }
                                `}
                            >

                                <Icon
                                    size={19}
                                    className="
                                        shrink-0
                                    "
                                />

                                <span>
                                    {item.title}
                                </span>

                            </Link>

                        );

                    }
                )}

            </nav>


            {/* LOGOUT */}

            <div
                className="
                    border-t
                    border-white/10
                    p-3
                "
            >

                <button
                    type="button"

                    onClick={
                        handleLogout
                    }

                    disabled={
                        loggingOut
                    }

                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-white/60
                        transition
                        hover:bg-red-500/10
                        hover:text-red-400
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    <LogOut
                        size={19}
                        className={
                            loggingOut
                                ? "animate-pulse"
                                : ""
                        }
                    />

                    {loggingOut
                        ? "Logging out..."
                        : "Logout"
                    }

                </button>

            </div>

        </aside>
    );
}