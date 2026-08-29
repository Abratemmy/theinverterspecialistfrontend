"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getAdminPaymentById,
} from "@/services/adminPayment.service";


export default function useAdminPaymentDetails(
    paymentId: number | string
) {

    const paymentQuery =
        useQuery({

            queryKey: [
                "admin-payment",
                paymentId
            ],

            queryFn: async () => {

                const response =
                    await getAdminPaymentById(
                        paymentId
                    );

                return response.data;

            },

            enabled:
                Boolean(paymentId),

        });


    return {

        payment:
            paymentQuery.data,

        loading:
            paymentQuery.isLoading,

        fetching:
            paymentQuery.isFetching,

        error:
            paymentQuery.error,

        refetch:
            paymentQuery.refetch,

    };

}