"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createOrder,
    getMyOrders,
    getOrder,
    cancelOrder,
} from "@/services/order.service";

import type {
    CreateOrderPayload,
} from "@/types/order";


// ============================================================
// ORDERS
// ============================================================

export default function useOrder(
    orderId?: number
) {

    const queryClient =
        useQueryClient();


    // ========================================================
    // GET MY ORDERS
    // ========================================================

    const ordersQuery = useQuery({

        queryKey: [
            "orders"
        ],

        queryFn: getMyOrders,

    });


    // ========================================================
    // GET SINGLE ORDER
    // ========================================================

    const orderQuery = useQuery({

        queryKey: [
            "order",
            orderId
        ],

        queryFn: () =>
            getOrder(orderId!),

        enabled:
            !!orderId,

    });


    // ========================================================
    // CREATE ORDER
    // ========================================================

    const createOrderMutation =
        useMutation({

            mutationFn: (
                payload: CreateOrderPayload
            ) =>
                createOrder(
                    payload
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: [
                        "orders"
                    ],

                });

                queryClient.invalidateQueries({

                    queryKey: [
                        "cart"
                    ],

                });

            },

        });


    // ========================================================
    // CANCEL ORDER
    // ========================================================

    const cancelOrderMutation =
        useMutation({

            mutationFn: (
                id: number
            ) =>
                cancelOrder(id),

            onSuccess: (
                response,
                id
            ) => {

                queryClient.invalidateQueries({

                    queryKey: [
                        "orders"
                    ],

                });

                queryClient.invalidateQueries({

                    queryKey: [
                        "order",
                        id
                    ],

                });

            },

        });


    return {

        // ----------------------------------------------------
        // Orders
        // ----------------------------------------------------

        orders:
            ordersQuery.data?.data ?? [],

        loadingOrders:
            ordersQuery.isLoading,

        ordersError:
            ordersQuery.error,

        refetchOrders:
            ordersQuery.refetch,


        // ----------------------------------------------------
        // Single order
        // ----------------------------------------------------

        order:
            orderQuery.data?.data,

        loadingOrder:
            orderQuery.isLoading,

        orderError:
            orderQuery.error,

        refetchOrder:
            orderQuery.refetch,


        // ----------------------------------------------------
        // Create
        // ----------------------------------------------------

        createOrder:
            createOrderMutation.mutateAsync,

        creatingOrder:
            createOrderMutation.isPending,

        createOrderError:
            createOrderMutation.error,


        // ----------------------------------------------------
        // Cancel
        // ----------------------------------------------------

        cancelOrder:
            cancelOrderMutation.mutateAsync,

        cancellingOrder:
            cancelOrderMutation.isPending,

        cancelOrderError:
            cancelOrderMutation.error,

    };

}