"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Mail,
    MailCheck,
} from "lucide-react";

import Container from "@/components/common/Container/Container";

import useAuth from "@/hooks/useAuth";

import { showError } from "@/lib/toast";

import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";


export default function ForgotPasswordPage() {

    const {
        forgotPassword,
        sendingResetLink,
    } = useAuth();


    const [
        email,
        setEmail,
    ] = useState("");


    const [
        submitted,
        setSubmitted,
    ] = useState(false);


    const handleSubmit =
        async (
            e: FormEvent
        ) => {

            e.preventDefault();


            try {

                // ============================================
                // REQUEST RESET LINK
                // ============================================

                await forgotPassword({
                    email,
                });


                // ============================================
                // SHOW CONFIRMATION
                // ============================================
                //
                // The backend always responds with success
                // (whether or not the email exists) so we
                // don't reveal account existence here either.
                // ============================================

                setSubmitted(true);


            } catch (err: any) {

                console.error(
                    "Forgot password error:",
                    err
                );


                showError(

                    err?.response
                        ?.data
                        ?.message ||

                    "Unable to send reset link."

                );

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

                        {/* Heading */}

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
                                {submitted
                                    ? "Check Your Email"
                                    : "Forgot Password"}
                            </h1>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[var(--color-text-light)]
                                "
                            >
                                {submitted
                                    ? "If an account exists for that email, a password reset link is on its way."
                                    : "Enter the email associated with your account and we'll send you a link to reset your password."}
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

                            {submitted ? (

                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        text-center
                                    "
                                >

                                    <div
                                        className="
                                            mb-4
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary/10
                                            text-primary
                                        "
                                    >
                                        <MailCheck
                                            size={26}
                                        />
                                    </div>


                                    <p
                                        className="
                                            text-sm
                                            leading-6
                                            text-[var(--color-text-light)]
                                        "
                                    >
                                        We sent a reset link to{" "}
                                        <span
                                            className="
                                                font-semibold
                                                text-[var(--color-text)]
                                            "
                                        >
                                            {email}
                                        </span>
                                        . The link expires in
                                        15 minutes.
                                    </p>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSubmitted(
                                                false
                                            )
                                        }
                                        disabled={
                                            sendingResetLink
                                        }
                                        className="
                                            mt-6
                                            text-sm
                                            font-semibold
                                            text-primary
                                            hover:underline
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    >
                                        Didn&apos;t get the email?
                                        Try a different address
                                    </button>

                                </div>

                            ) : (

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
                                                required
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


                                    {/* Submit */}

                                    <button
                                        type="submit"
                                        disabled={
                                            sendingResetLink
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

                                        {sendingResetLink ? (

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

                                                Sending Link...
                                            </>

                                        ) : (

                                            <>
                                                Send Reset Link

                                                <ArrowRight
                                                    size={18}
                                                />
                                            </>

                                        )}

                                    </button>

                                </form>

                            )}


                            {/* Back to login */}

                            <div
                                className="
                                    mt-6
                                    border-t
                                    border-gray-100
                                    pt-6
                                    text-center
                                "
                            >

                                <Link
                                    href="/login"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-sm
                                        font-semibold
                                        text-primary
                                        hover:underline
                                    "
                                >
                                    <ArrowLeft
                                        size={16}
                                    />
                                    Back to Sign In
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
