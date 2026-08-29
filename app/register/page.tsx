"use client";

import Link from "next/link";
import {
    FormEvent,
    useState,
} from "react";

import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    User,
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


export default function RegisterPage() {

    const router = useRouter();

    const searchParams =
        useSearchParams();

    const {
        register,
        registering,
    } = useAuth();


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
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);


    const [
        form,
        setForm,
    ] = useState({

        first_name: "",

        last_name: "",

        email: "",

        phone: "",

        password: "",

        confirm_password: "",

    });


    const handleChange = (
        field: keyof typeof form,
        value: string
    ) => {

        setForm(
            (previous) => ({
                ...previous,
                [field]: value,
            })
        );

    };


    const handleSubmit =
        async (
            event: FormEvent
        ) => {

            event.preventDefault();


            if (!form.first_name.trim()) {

                showError(
                    "Please enter your first name."
                );

                return;
            }


            if (!form.last_name.trim()) {

                showError(
                    "Please enter your last name."
                );

                return;
            }


            if (!form.email.trim()) {

                showError(
                    "Please enter your email address."
                );

                return;
            }


            if (
                !form.password ||
                !form.confirm_password
            ) {

                showError(
                    "Please enter your password."
                );

                return;
            }


            if (
                form.password !==
                form.confirm_password
            ) {

                showError(
                    "Passwords do not match."
                );

                return;
            }


            try {

                const response =
                    await register(form);


                showSuccess(
                    response.message ||
                    "Account created successfully."
                );


                /*
                 * The backend should create every
                 * new account as a customer.
                 *
                 * We deliberately do not send
                 * a role from the frontend.
                 */

                router.push(
                    redirect
                );

                router.refresh();


            } catch (error: any) {

                console.error(
                    "Registration error:",
                    error
                );


                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Unable to create your account.";


                showError(
                    message
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
                        max-w-2xl
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
                                mt-3
                                text-3xl
                                font-bold
                                text-[var(--color-text)]
                            "
                        >
                            Create Your Account
                        </h1>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-[var(--color-text-light)]
                            "
                        >
                            Create an account to
                            continue with your order.
                        </p>

                    </div>


                    {/* Form Card */}

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

                            <div
                                className="
                                    grid
                                    gap-5
                                    sm:grid-cols-2
                                "
                            >

                                {/* First name */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        First Name
                                    </label>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <User
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type="text"
                                            value={
                                                form.first_name
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    "first_name",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="First name"
                                            autoComplete="given-name"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                py-3
                                                pl-11
                                                pr-4
                                                outline-none
                                                transition
                                                focus:border-[var(--color-primary)]
                                                focus:ring-1
                                                focus:ring-[var(--color-primary)]/10
                                            "
                                        />

                                    </div>

                                </div>


                                {/* Last name */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        Last Name
                                    </label>


                                    <input
                                        type="text"
                                        value={
                                            form.last_name
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleChange(
                                                "last_name",
                                                event.target.value
                                            )
                                        }
                                        placeholder="Last name"
                                        autoComplete="family-name"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            py-3
                                            px-4
                                            outline-none
                                            transition
                                            focus:border-[var(--color-primary)]
                                            focus:ring-1
                                            focus:ring-[var(--color-primary)]/10
                                        "
                                    />

                                </div>


                                {/* Email */}

                                <div>

                                    <label
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
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type="email"
                                            value={
                                                form.email
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    "email",
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
                                                pl-11
                                                pr-4
                                                outline-none
                                                transition
                                                focus:border-[var(--color-primary)]
                                                focus:ring-1
                                                focus:ring-[var(--color-primary)]/10
                                            "
                                        />

                                    </div>

                                </div>


                                {/* Phone */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        Phone Number
                                        <span
                                            className="
                                                ml-1
                                                text-xs
                                                font-normal
                                                text-gray-400
                                            "
                                        >
                                            (Optional)
                                        </span>
                                    </label>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <Phone
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type="tel"
                                            value={
                                                form.phone
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    "phone",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="08012345678"
                                            autoComplete="tel"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                py-3
                                                pl-11
                                                pr-4
                                                outline-none
                                                transition
                                                focus:border-[var(--color-primary)]
                                                focus:ring-1
                                                focus:ring-[var(--color-primary)]/10
                                            "
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        Password
                                    </label>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <Lock
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                form.password
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    "password",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Create a password"
                                            autoComplete="new-password"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                py-3
                                                pl-11
                                                pr-11
                                                outline-none
                                                transition
                                               focus:border-[var(--color-primary)]
                                                focus:ring-1
                                                focus:ring-[var(--color-primary)]/10
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
                                            "
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

                                <div>

                                    <label
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
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                form.confirm_password
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleChange(
                                                    "confirm_password",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Confirm password"
                                            autoComplete="new-password"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                py-3
                                                pl-11
                                                pr-11
                                                outline-none
                                                transition
                                                focus:border-[var(--color-primary)]
                                                focus:ring-1
                                                focus:ring-[var(--color-primary)]/10
                                            "
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="
                                                absolute
                                                right-3
                                                top-1/2
                                                -translate-y-1/2
                                                p-2
                                                text-gray-400
                                            "
                                        >
                                            {showConfirmPassword ? (
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

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={
                                    registering
                                }
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
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >

                                {registering ? (

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

                                        Creating Account...
                                    </>

                                ) : (

                                    <>
                                        Create Account

                                        <ArrowRight
                                            size={18}
                                        />
                                    </>

                                )}

                            </button>

                        </form>


                        {/* Login */}

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
                                Already have an account?
                            </p>


                            <Link
                                href={`/login?redirect=${encodeURIComponent(
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
                                Sign in
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