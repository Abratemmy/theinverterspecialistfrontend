"use client";

import {
    useEffect
} from "react";

import Link from "next/link";

import {
    AnimatePresence,
    motion
} from "framer-motion";

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
    X,
} from "lucide-react";

import {
    usePathname
} from "next/navigation";
import Image from "next/image";


// ============================================================
// NAVIGATION
// ============================================================

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
    },

];


// ============================================================
// PROPS
// ============================================================

interface AdminMobileMenuProps {

    open: boolean;

    onClose: () => void;

    onLogout: () => void;

    loggingOut?: boolean;

}


// ============================================================
// COMPONENT
// ============================================================

export default function AdminMobileMenu({

    open,

    onClose,

    onLogout,

    loggingOut = false,

}: AdminMobileMenuProps) {

    const pathname =
        usePathname();


    // ========================================================
    // PREVENT BODY SCROLL
    // ========================================================

    useEffect(() => {

        if (!open) {
            return;
        }


        document.body.style.overflow =
            "hidden";


        return () => {

            document.body.style.overflow =
                "";

        };

    }, [open]);


    return (

        <AnimatePresence>

            {open && (

                <>

                    {/* ================================================= */}
                    {/* BACKDROP */}
                    {/* ================================================= */}

                    <motion.div

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: 1
                        }}

                        exit={{
                            opacity: 0
                        }}

                        transition={{
                            duration: 0.2
                        }}

                        onClick={
                            onClose
                        }

                        className="
                            fixed
                            inset-0
                            z-[100]
                            bg-black/60
                            backdrop-blur-sm
                            lg:hidden
                        "

                    />


                    {/* ================================================= */}
                    {/* MENU */}
                    {/* ================================================= */}

                    <motion.aside

                        initial={{
                            x: "-100%"
                        }}

                        animate={{
                            x: 0
                        }}

                        exit={{
                            x: "-100%"
                        }}

                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}

                        className="
                            fixed
                            left-0
                            top-0
                            z-[110]
                            flex
                            h-screen
                            w-[280px]
                            flex-col
                            bg-black
                            text-white
                            shadow-2xl
                            lg:hidden
                        "

                    >

                        {/* ================================================= */}
                        {/* LOGO */}
                        {/* ================================================= */}

                        <div
                            className="
                                flex
                                h-20
                                shrink-0
                                items-center
                                justify-between
                                border-b
                                border-white/10
                                px-5
                            "
                        >

                            <Link
                                href="/admin"
                                onClick={
                                    onClose
                                }
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


                            {/* CLOSE */}

                            <button
                                type="button"
                                onClick={
                                    onClose
                                }
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-white/60
                                    transition
                                    hover:bg-white/10
                                    hover:text-white
                                "
                            >

                                <X
                                    size={20}
                                />

                            </button>

                        </div>


                        {/* ================================================= */}
                        {/* NAVIGATION */}
                        {/* ================================================= */}

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

                                                {
                                                    item.section
                                                }

                                            </div>

                                        );

                                    }


                                    const Icon =
                                        item.icon!;


                                    const isActive =
                                        item.href === "/admin"

                                            ? pathname ===
                                              "/admin"

                                            : pathname ===
                                                  item.href ||
                                              pathname.startsWith(
                                                  `${item.href}/`
                                              );


                                    return (

                                        <Link
                                            key={
                                                item.href
                                            }

                                            href={
                                                item.href!
                                            }

                                            onClick={
                                                onClose
                                            }

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
                                                {
                                                    item.title
                                                }
                                            </span>

                                        </Link>

                                    );

                                }
                            )}

                        </nav>


                        {/* ================================================= */}
                        {/* LOGOUT */}
                        {/* ================================================= */}

                        <div
                            className="
                                shrink-0
                                border-t
                                border-white/10
                                p-3
                            "
                        >

                            <button
                                type="button"

                                onClick={
                                    onLogout
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
                                />

                                {
                                    loggingOut
                                        ? "Logging out..."
                                        : "Logout"
                                }

                            </button>

                        </div>

                    </motion.aside>

                </>

            )}

        </AnimatePresence>

    );

}