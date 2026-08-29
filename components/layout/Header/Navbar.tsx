"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ShoppingCart,
    User,
    Menu,
    X,
    LogOut,
    UserCircle,
    ShoppingBag,
    Heart
} from "lucide-react";

import Logo from "./Logo";
import NavLinks from "../Header/NavLinks";
import Container from "@/components/common/Container/Container";

import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import { showError, showSuccess } from "@/lib/toast";
import MobileMenu from "./MobileMenu";
import {getWishlist} from "@/services/wishlist.service";

export default function Navbar() {

    
    // ============================================================
    // CART
    // ============================================================

    const {
        cart,
        loading,
    } = useCart();

    const totalItems =
        cart?.total_items ?? 0;


    // ============================================================
    // AUTH
    // ============================================================

    const {
        user,
        logout,
        loggingOut,
    } = useAuth();


    // ============================================================
    // USER MENU
    // ============================================================

    const [
        userMenuOpen,
        setUserMenuOpen
    ] = useState(false);


    // ============================================================
    // MOBILE MENU
    // ============================================================

    const [
        mobileMenuOpen,
        setMobileMenuOpen
    ] = useState(false);

    // ============================================================
    // LOGOUT
    // ============================================================

    const handleLogout = async () => {

        try {

            await logout();

            setUserMenuOpen(false);

            setMobileMenuOpen(false);

            showSuccess(
                "You have been logged out successfully."
            );

            setTimeout(() => {

                window.location.href = "/";

            }, 2000);

        } catch (error: any) {

            console.error(
                "Logout error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to logout. Please try again.";

            showError(message);

        }

    };

    const [ wishlistCount, setWishlistCount ] = useState(0);
    console.log("wishlist", wishlistCount)

    useEffect(() => {

        const loadWishlist = async () => {

            // User isn't logged in
            if (!user) {

                setWishlistCount(0);

                return;

            }


            try {

                const response =
                    await getWishlist();

                const wishlist =
                    response?.data || [];

                setWishlistCount(
                    wishlist.length
                );

            } catch (error: unknown) {

                console.error(
                    "Load wishlist error:",
                    error
                );

                setWishlistCount(0);

            }

        };


        loadWishlist();

    }, [user]);

    return (

        <header
            className="
                sticky
                top-0
                z-50
                border-b
                bg-black
                shadow-sm
            "
        >

            <Container>

                <div
                    className="
                        flex
                        h-20
                        items-center
                        justify-between
                    "
                >

                    {/* ================================================== */}
                    {/* LOGO */}
                    {/* ================================================== */}

                    <Logo />


                    {/* ================================================== */}
                    {/* DESKTOP MENU */}
                    {/* ================================================== */}

                    <div className="
                        hidden
                        lg:block
                    ">

                        <NavLinks />

                    </div>


                    {/* ================================================== */}
                    {/* RIGHT SIDE */}
                    {/* ================================================== */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            sm:gap-5
                        "
                    >

                        {/* ================================================== */}
                        {/* CART */}
                        {/* ================================================== */}

                        <Link
                            href="/cart"
                            className="
                                relative
                                flex
                                items-center
                                justify-center
                            "
                            aria-label="Shopping cart"
                        >

                            <ShoppingCart
                                size={32}
                                className="
                                    text-[var(--color-text-light)]
                                "
                            />


                            {totalItems > 0 && (

                                <span
                                    className="
                                        absolute
                                        -right-2
                                        -top-2
                                        flex
                                        h-5
                                        min-w-5
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[var(--color-primary)]
                                        px-1
                                        text-[10px]
                                        font-bold
                                        text-white
                                        ring-2
                                        ring-white
                                    "
                                >

                                    {totalItems > 99
                                        ? "99+"
                                        : totalItems
                                    }

                                </span>

                            )}

                        </Link>

                        {/* ================================================== */}
                        {/* WISHLIST */}
                        {/* ================================================== */}

                        {user ? (

                            <Link
                                href="/wishlist"
                                className="
                                    relative
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-700
                                    transition
                                    hover:text-primary
                                "
                                aria-label="Wishlist"
                            >

                                <Heart
                                    size={32}
                                    className="
                                    text-[var(--color-text-light)]
                                "
                                />


                                {wishlistCount > 0 && (

                                    <span
                                        className="
                                            absolute
                                            -right-2
                                            -top-2
                                            flex
                                            h-5
                                            min-w-5
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[var(--color-primary)]
                                            px-1
                                            text-[10px]
                                            font-bold
                                            text-white
                                        "
                                    >

                                        {wishlistCount}

                                    </span>

                                )}

                            </Link>

                        ) : (

                            <button
                                type="button"
                                onClick={() =>
                                    showError(
                                        "Please login to view your wishlist."
                                    )
                                }
                                className="
                                    relative
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-700
                                    transition
                                    hover:text-primary
                                "
                                aria-label="Wishlist"
                            >

                                <Heart
                                    size={22}
                                />

                            </button>

                        )}


                        {/* ================================================== */}
                        {/* DESKTOP USER */}
                        {/* ================================================== */}

                        <div className="
                            hidden
                            lg:block
                        ">

                            {!user ? (

                                <Link
                                    href="/login"
                                    aria-label="Login"
                                >

                                    <User
                                        size={32}
                                        className="
                                            text-[var(--color-text-light)]
                                        "
                                    />

                                </Link>

                            ) : (

                                <div className="relative">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setUserMenuOpen(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            rounded-full
                                            transition
                                            hover:bg-gray-100
                                        "
                                        aria-label="Account menu"
                                    >

                                        <User
                                            size={32}
                                            className="
                                                text-[var(--color-text-light)]
                                            "
                                        />

                                    </button>


                                    {/* ================================================== */}
                                    {/* ACCOUNT DROPDOWN */}
                                    {/* ================================================== */}

                                    {userMenuOpen && (

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                top-12
                                                z-50
                                                w-64
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-gray-100
                                                bg-white
                                                shadow-xl
                                            "
                                        >

                                            {/* USER INFORMATION */}

                                            <div
                                                className="
                                                    border-b
                                                    border-gray-100
                                                    px-4
                                                    py-4
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-semibold
                                                        text-gray-900
                                                    "
                                                >

                                                    {user.first_name}{" "}
                                                    {user.last_name}

                                                </p>


                                                <p
                                                    className="
                                                        mt-1
                                                        truncate
                                                        text-sm
                                                        text-gray-500
                                                    "
                                                >

                                                    {user.email}

                                                </p>

                                            </div>


                                            {/* ACCOUNT */}

                                            <Link
                                                href="/account"
                                                onClick={() =>
                                                    setUserMenuOpen(false)
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    text-gray-700
                                                    transition
                                                    hover:bg-gray-50
                                                "
                                            >

                                                <UserCircle
                                                    size={18}
                                                />

                                                My Account

                                            </Link>


                                            {/* ORDERS */}

                                            <Link
                                                href="/orders"
                                                onClick={() =>
                                                    setUserMenuOpen(false)
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    text-gray-700
                                                    transition
                                                    hover:bg-gray-50
                                                "
                                            >

                                                <ShoppingBag
                                                    size={18}
                                                />

                                                My Orders

                                            </Link>

                                            {/* dashboard */}
                                            {(user.role === "admin" || user.role === "manager") && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() =>
                                                        setUserMenuOpen(false)
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-700
                                                        transition
                                                        hover:bg-gray-50
                                                    "
                                                >

                                                    <UserCircle
                                                        size={18}
                                                    />

                                                    Go To Dashboard

                                                </Link>
                                            )}


                                            {/* LOGOUT */}

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                disabled={loggingOut}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    border-t
                                                    border-gray-100
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    text-red-600
                                                    transition
                                                    hover:bg-red-50
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                                            >

                                                <LogOut
                                                    size={18}
                                                />

                                                {loggingOut
                                                    ? "Logging out..."
                                                    : "Logout"
                                                }

                                            </button>

                                        </div>

                                    )}

                                </div>

                            )}

                        </div>


                        {/* ================================================== */}
                        {/* MOBILE MENU BUTTON */}
                        {/* ================================================== */}

                        <button
                            type="button"
                            onClick={() =>
                                setMobileMenuOpen(
                                    (previous) =>
                                        !previous
                                )
                            }
                            className="
                                flex
                                cursor-pointer
                                items-center
                                justify-center
                                lg:hidden
                            "
                            aria-label={
                                mobileMenuOpen
                                    ? "Close menu"
                                    : "Open menu"
                            }
                            aria-expanded={
                                mobileMenuOpen
                            }
                        >

                            {mobileMenuOpen ? (

                                <X
                                    size={32}
                                    className="
                                        text-[var(--color-text-light)]
                                    "
                                />

                            ) : (

                                <Menu
                                    size={32}
                                    className="
                                        text-[var(--color-text-light)]
                                    "
                                />

                            )}

                        </button>

                    </div>

                </div>

            </Container>


            {/* ================================================== */}
            {/* MOBILE MENU BUTTON */}
            {/* ================================================== */}

            <MobileMenu
                open={mobileMenuOpen}
                onClose={() =>
                    setMobileMenuOpen(false)
                }
                user={user}
                totalItems={totalItems}
                loggingOut={loggingOut}
                onLogout={handleLogout}
            />

        </header>

    );

}