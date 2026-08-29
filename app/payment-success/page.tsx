"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    CheckCircle2,
    Loader2,
    AlertCircle,
    ShoppingBag,
} from "lucide-react";

import Container from "@/components/common/Container/Container";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";

import api from "@/lib/axios";

type PaymentState =
    | "verifying"
    | "success"
    | "failed"
    | "error";

interface OrderData {
    id: number;
    order_number: string;
    total_amount: number | string;
    payment_status: string;
    order_status: string;
}

interface PaymentData {
    reference: string;
    status: string;
    amount: number | string;
}

interface VerificationResponse {
    success: boolean;
    message?: string;

    data?: {
        order?: OrderData;
        payment?: PaymentData;
    };
}

// interface VerificationResponse {
//     success: boolean;
//     message?: string;
//     data?: {
//         order?: {
//             id: number;
//             order_number: string;
//             total_amount: number | string;
//             payment_status: string;
//             order_status: string;
//         };
//         payment?: {
//             reference: string;
//             status: string;
//             amount: number | string;
//         };
//     };
// }

export default function PaymentSuccessPage() {

    const searchParams =
        useSearchParams();


    const reference =
        searchParams.get(
            "reference"
        ) ||
        searchParams.get(
            "trxref"
        );


    const [state, setState] =
        useState<PaymentState>(
            "verifying"
        );


    const [message, setMessage] =
        useState(
            "Verifying your payment..."
        );


    const [order, setOrder] =
        useState<OrderData | null>(null);

    const [paymentAmount, setPaymentAmount] =
        useState<number | string | null>(null);


    // ============================================================
    // VERIFY PAYMENT
    // ============================================================

    useEffect(() => {

        if (!reference) {

            setState("error");

            setMessage(
                "No payment reference was provided."
            );

            return;

        }


        let cancelled = false;


        const verifyPayment =
            async () => {

                try {

                    setState(
                        "verifying"
                    );

                    setMessage(
                        "Verifying your payment..."
                    );


                    const response =
                        await api.get<VerificationResponse>(
                            `/payments/verify/${encodeURIComponent(
                                reference
                            )}`
                        );


                    if (
                        cancelled
                    ) {
                        return;
                    }


                    if (response.data.success) {

                        setOrder(
                            response.data.data?.order ||
                            null
                        );

                        setPaymentAmount(
                            response.data.data?.payment?.amount ||
                            response.data.data?.order?.total_amount ||
                            null
                        );

                        setState("success");

                        setMessage(
                            response.data.message ||
                            "Payment verified successfully."
                        );
                    } else {

                        setState(
                            "failed"
                        );

                        setMessage(
                            response.data.message ||
                            "Payment could not be verified."
                        );

                    }

                }
                catch (error: any) {

                    if (
                        cancelled
                    ) {
                        return;
                    }


                    console.error(
                        "PAYMENT VERIFICATION ERROR:",
                        error
                    );


                    setState(
                        "error"
                    );


                    setMessage(
                        error?.response?.data?.message ||
                        "We could not verify your payment. Please contact support if money was deducted from your account."
                    );

                }

            };


        verifyPayment();


        return () => {

            cancelled = true;

        };

    }, [reference]);


    // ============================================================
    // VERIFYING
    // ============================================================

    if (
        state === "verifying"
    ) {

        return (

            <main className="min-h-screen">

                <Header />

                <section className="py-20">

                    <Container>

                        <div className="mx-auto max-w-xl rounded-3xl border bg-card p-10 text-center shadow-sm">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">

                                <Loader2
                                    size={40}
                                    className="animate-spin text-primary"
                                />

                            </div>


                            <h1 className="mt-6 text-2xl font-bold">

                                Verifying Payment

                            </h1>


                            <p className="mt-3 text-muted-foreground">

                                Please wait while we confirm your payment with Paystack.

                            </p>


                            {reference && (

                                <p className="mt-5 break-all rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">

                                    Reference:{" "}
                                    {reference}

                                </p>

                            )}

                        </div>

                    </Container>

                </section>

                <Footer />

            </main>

        );

    }


    // ============================================================
    // SUCCESS
    // ============================================================

    if (
        state === "success"
    ) {

        return (

            <main className="min-h-screen">

                <Header />

                <section className="py-16 sm:py-20">

                    <Container>

                        <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12">

                            {/* SUCCESS ICON */}

                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                                <CheckCircle2
                                    size={52}
                                    className="text-green-600"
                                />

                            </div>


                            {/* TITLE */}

                            <h1 className="mt-7 text-3xl font-bold sm:text-4xl">

                                Payment Successful!

                            </h1>


                            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">

                                Thank you for your order. Your payment has been successfully verified and your order is now being processed.

                            </p>


                            {/* ORDER */}

                            {order && (

                                <div className="mt-8 rounded-2xl border bg-muted/40 p-5 text-left">

                                    <div className="flex items-center gap-3">

                                        <ShoppingBag
                                            size={20}
                                            className="text-primary"
                                        />

                                        <h2 className="font-semibold">

                                            Order Details

                                        </h2>

                                    </div>


                                    <div className="mt-5 space-y-3 text-sm">

                                        <div className="flex justify-between gap-4">

                                            <span className="text-muted-foreground">

                                                Order Number

                                            </span>

                                            <span className="font-semibold">

                                                {
                                                    order.order_number
                                                }

                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-muted-foreground">

                                                Amount Paid

                                            </span>

                                            <span className="font-semibold">

                                                ₦
                                                {Number(
                                                    paymentAmount || 0
                                                ).toLocaleString(
                                                    "en-NG"
                                                )}

                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-muted-foreground">

                                                Payment Status

                                            </span>

                                            <span className="font-semibold capitalize text-green-600">

                                                {
                                                    order.payment_status
                                                }

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* REFERENCE */}

                            {reference && (

                                <div className="mt-5 rounded-xl border px-4 py-3 text-left">

                                    <p className="text-xs text-muted-foreground">

                                        Payment Reference

                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium">

                                        {reference}

                                    </p>

                                </div>

                            )}


                            {/* ACTIONS */}

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                                {order?.id && (

                                    <Link
                                        href={`/orders`}
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-primary
                                            px-6
                                            py-3
                                            text-sm
                                            font-semibold
                                            text-primary-foreground
                                            transition
                                            hover:opacity-90
                                        "
                                    >

                                        View Order

                                    </Link>

                                )}


                                <Link
                                    href="/products"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        px-6
                                        py-3
                                        text-sm
                                        font-semibold
                                        transition
                                        hover:bg-muted
                                    "
                                >

                                    Continue Shopping

                                </Link>

                            </div>

                        </div>

                    </Container>

                </section>

                <Footer />

            </main>

        );

    }


    // ============================================================
    // FAILED / ERROR
    // ============================================================

    return (

        <main className="min-h-screen">

            <Header />

            <section className="py-16 sm:py-20">

                <Container>

                    <div className="mx-auto max-w-xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                            <AlertCircle
                                size={44}
                                className="text-red-600"
                            />

                        </div>


                        <h1 className="mt-6 text-2xl font-bold">

                            Payment Could Not Be Verified

                        </h1>


                        <p className="mt-3 text-muted-foreground">

                            {message}

                        </p>


                        {reference && (

                            <div className="mt-6 rounded-xl bg-muted p-4 text-left">

                                <p className="text-xs text-muted-foreground">

                                    Payment Reference

                                </p>

                                <p className="mt-1 break-all text-sm font-medium">

                                    {reference}

                                </p>

                            </div>

                        )}


                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                            <Link
                                href="/cart"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-primary
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-primary-foreground
                                    transition
                                    hover:opacity-90
                                "
                            >

                                Return to Cart

                            </Link>


                            <Link
                                href="/"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    transition
                                    hover:bg-muted
                                "
                            >

                                Go Home

                            </Link>

                        </div>

                    </div>

                </Container>

            </section>

            <Footer />

        </main>

    );

}