"use client";

import Link from "next/link";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    Home,
    Package,
    Tags,
    Store,
    ShoppingCart,
    UserCircle,
    ShoppingBag,
    LogOut,
    User,
    Info,
    BookUser,
    HandPlatter,
} from "lucide-react";


interface MobileMenuProps {
    open: boolean;

    onClose: () => void;

    user: any;

    totalItems: number;

    loggingOut: boolean;

    onLogout: () => void;
}


export default function MobileMenu({
    open,
    onClose,
    user,
    totalItems,
    loggingOut,
    onLogout,
}: MobileMenuProps) {


    const mobileNav = [
        {
            id: 1,
            name: "Home",
            link: '/',
            icon: Home

        },
         {
            id: 2,
            name: "Products",
            link: '/products',
            icon: Package 

        },
         {
            id: 3,
            name: "About",
            link: '/about',
            icon: Info

        },
         {
            id: 4,
            name: "Categories",
            link: '/categories',
            icon: Tags

        },
         {
            id: 5,
            name: "Brands",
            link: '/brands',
            icon: Store

        },
        {
            id: 6,
            name: "Services",
            link: '/services',
            icon: HandPlatter

        },
         {
            id: 7,
            name: "Contact",
            link: '/contact',
            icon: BookUser

        },
         {
            id: 8,
            name: "Cart",
            link: '/cart',
            icon: ShoppingCart

        }
    ]
    // ============================================================
    // CLOSE MENU WHEN LINK IS CLICKED
    // ============================================================

    const handleNavigation = () => {

        onClose();

    };


    return (

        <AnimatePresence>

            {open && (

                <>

                    {/* ==================================================
                        BACKDROP
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0.1,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={onClose}
                        className="
                            fixed
                            inset-0
                            top-20
                            z-40
                            bg-[var(--color-primary)]/30
                            lg:hidden
                        "
                    />


                    {/* ==================================================
                        MOBILE MENU
                    ================================================== */}

                    <motion.div
                        initial={{
                            y: "-100%",
                        }}
                        animate={{
                            y: 0,
                        }}
                        exit={{
                            y: "-100%",
                        }}
                        transition={{
                            type: "tween",
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                            absolute
                            left-0
                            right-0
                            top-20
                            z-50
                            max-h-[calc(100vh-5rem)]
                            overflow-y-auto
                            border-t
                            border-gray-200
                            bg-[var(--color-primary-light)]
                            shadow-xl
                            lg:hidden
                        "
                    >

                        {/* ==================================================
                            USER INFORMATION
                        ================================================== */}

                        {user ? (

                            <div
                                className="
                                    border-b
                                    border-gray-400
                                    bg-[var(--color-primary-light)]
                                    px-5
                                    py-5
                                "
                            >

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary/10
                                            text-primary
                                        "
                                    >

                                        <User
                                            size={24}
                                        />

                                    </div>


                                    <div className="
                                        min-w-0
                                    ">

                                        <p className="
                                            truncate
                                            font-semibold
                                            text-gray-900
                                        ">

                                            {user.first_name}{" "}
                                            {user.last_name}

                                        </p>


                                        <p className="
                                            truncate
                                            text-sm
                                            text-gray-500
                                        ">

                                            {user.email}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            <div
                                className="
                                    border-b
                                    border-gray-200
                                    px-5
                                    py-4
                                "
                            >

                                <Link
                                    href="/login"
                                    onClick={handleNavigation}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-[var(--color-primary-dark)]
                                    "
                                >

                                    Login / Register

                                </Link>

                            </div>

                        )}


                        {/* ==================================================
                            HOME
                        ================================================== */}
                        {mobileNav.map((item) => {
                             const Icon = item.icon;
                            return (
                                <Link
                                    key={item.id} 
                                    href={item.link}
                                    onClick={handleNavigation}
                                    className="
                                        flex
                                        group
                                        items-center
                                        gap-4
                                        border-b
                                        border-gray-100
                                        px-5
                                        py-4
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        transition
                                        hover:bg-[var(--color-primary)]
                                        hover:text-white 
                                    "
                                >
                                   
                                   <span className={`
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                        group-hover:text-white
                                        transition-colors duration-300  
                                        
                                        `}
                                    >
                                        <Icon size={18} />
                                    </span>
                                    <span 
                                        className={`${item.name === "Cart" ? "flex items-center justify-between gap-4 w-full " : ""} `}
                                    >
                                        {item.name} 

                                        {item.name==="Cart" && (
                                            <span>
                                                {totalItems > 0 && (

                                            <span className="
                                                rounded-full
                                                bg-primary
                                                px-2.5
                                                py-1
                                                text-xs
                                                font-bold
                                                text-white
                                            ">

                                                {totalItems > 99
                                                    ? "99+"
                                                    : totalItems
                                                }

                                            </span>

                                        )}
                                            </span>
                                        )}

                                    </span>

                                </Link>
                            );
                        })}


                        {/* ==================================================
                            LOGGED IN OPTIONS
                        ================================================== */}

                        {user && (

                            <>

                                {/* ==========================================
                                    MY ACCOUNT
                                ========================================== */}

                                <Link
                                    href="/account"
                                    onClick={handleNavigation}
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        border-b
                                        border-gray-100
                                        px-5
                                        py-4
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        transition
                                        hover:bg-gray-50
                                        hover:text-primary
                                    "
                                >

                                    <span className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                    ">

                                        <UserCircle
                                            size={18}
                                        />

                                    </span>

                                    My Account

                                </Link>


                                {/* ==========================================
                                    MY ORDERS
                                ========================================== */}

                                <Link
                                    href="/orders"
                                    onClick={handleNavigation}
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        border-b
                                        border-gray-100
                                        px-5
                                        py-4
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        transition
                                        hover:bg-gray-50
                                        hover:text-primary
                                    "
                                >

                                    <span className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                    ">

                                        <ShoppingBag
                                            size={18}
                                        />

                                    </span>

                                    My Orders

                                </Link>


                                {/* ==========================================
                                    LOGOUT
                                ========================================== */}

                                <button
                                    type="button"
                                    onClick={onLogout}
                                    disabled={loggingOut}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        gap-4
                                        px-5
                                        py-4
                                        text-left
                                        text-sm
                                        font-medium
                                        text-red-600
                                        transition
                                        hover:bg-red-50
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >

                                    <span className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-red-50
                                    ">

                                        <LogOut
                                            size={18}
                                        />

                                    </span>


                                    {loggingOut
                                        ? "Logging out..."
                                        : "Logout"
                                    }

                                </button>

                            </>

                        )}

                    </motion.div>

                </>

            )}

        </AnimatePresence>

    );

}