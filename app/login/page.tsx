"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
} from "lucide-react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";

import Container from "@/components/common/Container/Container";

import useAuth from "@/hooks/useAuth";

import {
    showError,
    showSuccess,
} from "@/lib/toast";

import {
    getSafeRedirect,
} from "@/utils/authRedirect";
import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";


export default function LoginPage() {

    const router = useRouter();

    const searchParams =
        useSearchParams();

    const {
        login,
        loggingIn,
    } = useAuth();

      const [
        loading,
        setLoading
    ] =
        useState(false);


    const [
        error,
        setError
    ] =
        useState("");


    const redirect =
        getSafeRedirect(
            searchParams.get("redirect"),
            "/"
        );


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    const [
        email,
        setEmail,
    ] = useState("");


    const [
        password,
        setPassword,
    ] = useState("");


    const handleSubmit =
           async (
               e: FormEvent
           ) => {
   
               e.preventDefault();
   
               setError("");
   
               setLoading(true);
   
   
               try {
   
                   // ============================================
                   // LOGIN
                   // ============================================
   
                   await login({
   
                       email,
   
                       password
   
                   });
   
   
                   // ============================================
                   // Tell Navbar / cart to refresh
                   // ============================================
   
                   window.dispatchEvent(
                       new Event(
                           "auth-changed"
                       )
                   );
   
   
                   window.dispatchEvent(
                       new Event(
                           "cart-changed"
                       )
                   );
   
   
                   // ============================================
                   // Return to previous page
                   // ============================================
   
                   router.push(
                       redirect
                   );
   
   
                   router.refresh();
   
   
               } catch (err: any) {
   
                   console.error(
                       "Login error:",
                       err
                   );
   
   
                   showError(
   
                       err?.response
                           ?.data
                           ?.message ||
   
                       "Unable to login."
   
                   );
   
               } finally {
   
                   setLoading(false);
   
               }
   
           };


    return (
        <main>
            <Header />
            <section
                className="
                    min-h-screen
                    bg-gray-50
                    py-5
                    sm:py-16
                "
            >

                <Container>

                    <div
                        className="
                            mx-auto
                            max-w-md
                        "
                    >

                        {/* Logo / heading */}

                        <div
                            className="
                                mb-8
                                text-center
                            "
                        >

                            <h1
                                className="
                                    mt-8
                                    text-3xl
                                    font-bold
                                    text-[var(--color-text)]
                                "
                            >
                                Welcome Back
                            </h1>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[var(--color-text-light)]
                                "
                            >
                                Sign in to continue to
                                your account.
                            </p>

                        </div>


                        {/* Card */}

                        <div
                            className="
                                rounded-3xl
                                bg-white
                                p-6
                                shadow-card
                                sm:p-8
                            "
                        >

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="
                                    space-y-5
                                "
                            >

                                {/* Email */}

                                <div className="pb-3">

                                    <label
                                        htmlFor="email"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        Email Address
                                    </label>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <Mail
                                            size={19}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                py-3
                                                pl-12
                                                pr-4
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                            "
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div className="pb-5">

                                    <div
                                        className="
                                            mb-2
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <label
                                            htmlFor="password"
                                            className="
                                                block
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            Password
                                        </label>


                                        <Link
                                            href="/forgot-password"
                                            className="
                                                text-xs
                                                font-medium
                                                text-primary
                                                hover:underline
                                            "
                                        >
                                            Forgot Password?
                                        </Link>

                                    </div>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <Lock
                                            size={19}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                password
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                py-3
                                                pl-12
                                                pr-12
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                            "
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="
                                                absolute
                                                right-3
                                                top-1/2
                                                -translate-y-1/2
                                                p-2
                                                text-gray-400
                                                hover:text-gray-700
                                                cursor-pointer
                                            "
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff
                                                    size={18}
                                                />
                                            ) : (
                                                <Eye
                                                    size={18}
                                                />
                                            )}
                                        </button>

                                    </div>

                                </div>


                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={
                                        loggingIn
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-primary
                                        px-5
                                        py-3.5
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-[var(--color-primary-dark)]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                       
                                    "
                                >

                                    {loggingIn ? (

                                        <>
                                            <span
                                                className="
                                                    h-5
                                                    w-5
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-white
                                                    border-t-transparent
                                                "
                                            />

                                            Signing In...
                                        </>

                                    ) : (

                                        <>
                                            Sign In

                                            <ArrowRight
                                                size={18}
                                            />
                                        </>

                                    )}

                                </button>

                            </form>


                            {/* Register */}

                            <div
                                className="
                                    mt-2
                                    border-t
                                    border-gray-100
                                    pt-6
                                    text-center
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-[var(--color-text-light)]
                                    "
                                >
                                    Don't have an account?
                                </p>


                                <Link
                                    href={`/register?redirect=${encodeURIComponent(
                                        redirect
                                    )}`}
                                    className="
                                        mt-2
                                        inline-block
                                        text-sm
                                        font-semibold
                                        text-primary
                                        hover:underline
                                    "
                                >
                                    Create an account
                                </Link>

                            </div>

                        </div>

                    </div>

                </Container>

            </section>
            <Footer />
        </main>
    );
}