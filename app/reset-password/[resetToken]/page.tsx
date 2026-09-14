"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Lock,
} from "lucide-react";

import Container from "@/components/common/Container/Container";

import useAuth from "@/hooks/useAuth";

import { showError, showSuccess } from "@/lib/toast";

import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";


export default function ResetPasswordPage() {

    const router = useRouter();

    const params =
    useParams<{ resetToken: string }>();

    const token =
        typeof params?.resetToken === "string"
            ? params.resetToken
            : "";


    const {
        resetPassword,
        resettingPassword,
    } = useAuth();


    const [
        password,
        setPassword,
    ] = useState("");


    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    const [
        success,
        setSuccess,
    ] = useState(false);


    const handleSubmit =
        async (
            e: FormEvent
        ) => {

            e.preventDefault();

            // ================================================
            // MISSING TOKEN
            // ================================================

            if (!token) {

                showError(
                    "This reset link is invalid. Please request a new one."
                );

                return;

            }
            // ================================================
            // PASSWORD LENGTH
            // ================================================

            if (password.length < 6) {

                showError(
                    "Password must be at least 6 characters long."
                );

                return;

            }

            // ================================================
            // PASSWORDS MATCH
            // ================================================

            if (password !== confirmPassword) {

                showError(
                    "Passwords do not match."
                );

                return;

            }


            try {

                // ============================================
                // RESET PASSWORD
                // ============================================

                await resetPassword({
                    token,
                    password,
                });

                showSuccess("Password reset successfully")
                setSuccess(true);


            } catch (err: any) {

                console.error(
                    "Reset password error:",
                    err
                );


                showError(

                    err?.response
                        ?.data
                        ?.message ||

                    "Unable to reset your password. The link may have expired."

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
                                {success
                                    ? "Password Reset"
                                    : "Set New Password"}
                            </h1>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[var(--color-text-light)]
                                "
                            >
                                {success
                                    ? "Your password has been updated successfully."
                                    : "Choose a new password for your account."}
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

                            {success ? (

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
                                        <CheckCircle2
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
                                        You can now sign in
                                        with your new password.
                                    </p>


                                    <Link
                                        href="/login"
                                        className="
                                            mt-6
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
                                        "
                                    >
                                        Go to Sign In

                                        <ArrowRight
                                            size={18}
                                        />
                                    </Link>

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

                                    {/* New password */}

                                    <div className="pb-3">

                                        <label
                                            htmlFor="password"
                                            className="
                                                mb-2
                                                block
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            New Password
                                        </label>


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
                                                onChange={(event) =>
                                                    setPassword(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Enter new password"
                                                autoComplete="new-password"
                                                required
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


                                    {/* Confirm password */}

                                    <div className="pb-5">

                                        <label
                                            htmlFor="confirm-password"
                                            className="
                                                mb-2
                                                block
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            Confirm Password
                                        </label>


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
                                                id="confirm-password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={
                                                    confirmPassword
                                                }
                                                onChange={(event) =>
                                                    setConfirmPassword(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Re-enter new password"
                                                autoComplete="new-password"
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
                                            resettingPassword
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

                                        {resettingPassword ? (

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

                                                Resetting...
                                            </>

                                        ) : (

                                            <>
                                                Reset Password

                                                <ArrowRight
                                                    size={18}
                                                />
                                            </>

                                        )}

                                    </button>

                                </form>

                            )}


                            {/* Back to login */}

                            {!success && (

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
                                            text-sm
                                            font-semibold
                                            text-primary
                                            hover:underline
                                        "
                                    >
                                        Back to Sign In
                                    </Link>

                                </div>

                            )}

                        </div>

                    </div>

                </Container>

            </section>
            <Footer />
        </main>
    );
}
