"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getAllOrders,
    updateOrderStatus,
    GetAdminOrdersParams,
} from "@/services/order.service";

import type {
    Order,
} from "@/types/order";


// ============================================================
// ADMIN ORDERS HOOK
// ============================================================

export default function useAdminOrders(
    params: GetAdminOrdersParams
) {

    const queryClient =
        useQueryClient();


    // ========================================================
    // GET ADMIN ORDERS
    // ========================================================

    const ordersQuery =
        useQuery({

            queryKey: [
                "admin-orders",
                params,
            ],

            queryFn: () =>
                getAllOrders(params),

        });


    // ========================================================
    // UPDATE ORDER STATUS
    // ========================================================

    const updateStatusMutation =
        useMutation({

            mutationFn: ({
                orderId,
                order_status,
            }: {
                orderId: number;

                order_status:
                    Order["order_status"];

            }) =>
                updateOrderStatus(
                    orderId,
                    order_status
                ),


            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: [
                        "admin-orders"
                    ],

                });

            },

        });


    // ========================================================
    // PREFETCH NEXT PAGE
    // ========================================================

    const prefetchNextPage = () => {

        if (
            !ordersQuery.data ||
            params.page === undefined
        ) {

            return;

        }


        if (
            params.page >=
            ordersQuery.data.totalPages
        ) {

            return;

        }


        queryClient.prefetchQuery({

            queryKey: [

                "admin-orders",

                {
                    ...params,

                    page:
                        params.page + 1,

                },

            ],

            queryFn: () =>
                getAllOrders({

                    ...params,

                    page:
                        params.page! + 1,

                }),

        });

    };


    return {

        // ----------------------------------------------------
        // Orders
        // ----------------------------------------------------

        orders:
            ordersQuery.data?.data ?? [],


        total:
            ordersQuery.data?.total ?? 0,


        page:
            ordersQuery.data?.page ?? 1,


        limit:
            ordersQuery.data?.limit ?? 10,


        totalPages:
            ordersQuery.data?.totalPages ?? 0,


        // ----------------------------------------------------
        // Query state
        // ----------------------------------------------------

        loading:
            ordersQuery.isLoading,


        isFetching:
            ordersQuery.isFetching,


        isError:
            ordersQuery.isError,


        error:
            ordersQuery.error,


        refetch:
            ordersQuery.refetch,


        // ----------------------------------------------------
        // Update status
        // ----------------------------------------------------

        updateOrderStatus:
            updateStatusMutation.mutateAsync,


        updatingOrderStatus:
            updateStatusMutation.isPending,


        updateOrderStatusError:
            updateStatusMutation.error,


        // ----------------------------------------------------
        // Pagination
        // ----------------------------------------------------

        prefetchNextPage,

    };

}