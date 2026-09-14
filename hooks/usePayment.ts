"use client";

import {
    useMutation,
} from "@tanstack/react-query";

import {
    initializePayment,
    verifyPayment,
    createBankTransferPayment
} from "@/services/payment.service";

import type {
    InitializePaymentPayload,
} from "@/types/payment";


export default function usePayment() {

    // ============================================================
    // INITIALIZE PAYMENT
    // ============================================================

    const initializeMutation = useMutation({

        mutationFn: (
            payload: InitializePaymentPayload
        ) => initializePayment(payload),

    });


    // ============================================================
    // VERIFY PAYMENT
    // ============================================================

    const verifyMutation = useMutation({

        mutationFn: (
            reference: string
        ) => verifyPayment(reference),

    });

    const bankTransferMutation = useMutation({
        mutationFn: (payload: { order_id: number }) =>
            createBankTransferPayment(payload),
    });


    // ============================================================
    // RETURN
    // ============================================================

    return {

        // --------------------------------------------------------
        // Initialize
        // --------------------------------------------------------

        initializePayment: initializeMutation.mutateAsync,

        initializingPayment: initializeMutation.isPending,

        initializePaymentError: initializeMutation.error,


        // --------------------------------------------------------
        // Verify
        // --------------------------------------------------------

        verifyPayment: verifyMutation.mutateAsync,

        verifyingPayment: verifyMutation.isPending,

        verifyPaymentError: verifyMutation.error,
        
        createBankTransferPayment:
        bankTransferMutation.mutateAsync,

        creatingBankTransferPayment:
            bankTransferMutation.isPending,

        createBankTransferPaymentError:
            bankTransferMutation.error,

    };

};
