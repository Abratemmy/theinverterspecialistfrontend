"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getAdminPayments,
    getAdminPaymentById,
} from "@/services/adminPayment.service";

import type {
    AdminPaymentStatus,
} from "@/types/payment";


// ============================================================
// GET PAYMENTS PARAMETERS
// ============================================================

interface UseAdminPaymentsParams {

    page: number;

    limit: number;

    status: AdminPaymentStatus | "";

    search: string;

}


// ============================================================
// ADMIN PAYMENT HOOK
// ============================================================

export default function useAdminPayment(
    params: UseAdminPaymentsParams
) {

    // ========================================================
    // PAYMENTS LIST
    // ========================================================

    const paymentsQuery =
        useQuery({

            queryKey: [
                "admin-payments",
                params.page,
                params.limit,
                params.status,
                params.search
            ],

            queryFn: () =>
                getAdminPayments({

                    page:
                        params.page,

                    limit:
                        params.limit,

                    status:
                        params.status,

                    search:
                        params.search

                }),

        });


    // ========================================================
    // RETURN
    // ========================================================

    return {

        payments:
            paymentsQuery.data?.data || [],

        pagination:
            paymentsQuery.data?.pagination,

        loading:
            paymentsQuery.isLoading,

        fetching:
            paymentsQuery.isFetching,

        error:
            paymentsQuery.error,

        refetch:
            paymentsQuery.refetch,

    };

}