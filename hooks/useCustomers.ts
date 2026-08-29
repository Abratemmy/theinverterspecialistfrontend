"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getCustomers,
    getCustomerById,
    updateCustomerRole,
    updateCustomerStatus,
} from "@/services/customer.service";

import type {
    UpdateCustomerRolePayload,
    UpdateCustomerStatusPayload,
} from "@/types/customer";


// ============================================================
// QUERY KEY
// ============================================================

export const customersQueryKey =
    ["admin-customers"];


// ============================================================
// HOOK
// ============================================================

export default function useCustomers(
    filters?: {
        search?: string;
        role?: string;
        status?: string;
        page?: number;
        limit?: number;
    }
) {

    const queryClient =
        useQueryClient();


    // ========================================================
    // GET CUSTOMERS
    // ========================================================

    const customersQuery =
        useQuery({

            queryKey: [
                ...customersQueryKey,
                filters
            ],

            queryFn: () =>
                getCustomers(filters),

            placeholderData:
                (previousData) =>
                    previousData,

        });


    // ========================================================
    // UPDATE ROLE
    // ========================================================

    const updateRoleMutation =
        useMutation({

            mutationFn: ({
                id,
                payload,
            }: {
                id: number;

                payload:
                    UpdateCustomerRolePayload;
            }) =>
                updateCustomerRole(
                    id,
                    payload
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        customersQueryKey,

                });

            },

        });


    // ========================================================
    // UPDATE STATUS
    // ========================================================

    const updateStatusMutation =
        useMutation({

            mutationFn: ({
                id,
                payload,
            }: {
                id: number;

                payload:
                    UpdateCustomerStatusPayload;
            }) =>
                updateCustomerStatus(
                    id,
                    payload
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        customersQueryKey,

                });

            },

        });


    // ========================================================
    // GET SINGLE CUSTOMER
    // ========================================================

    const getSingleCustomer =
        async (
            id: number
        ) => {

            return getCustomerById(id);

        };


    // ========================================================
    // RETURN
    // ========================================================

    return {

        // ----------------------------------------------------
        // Customers
        // ----------------------------------------------------

        customers:
            customersQuery.data?.data ?? [],

        pagination:
            customersQuery.data?.pagination ?? null,

        loadingCustomers:
            customersQuery.isLoading,

        fetchingCustomers:
            customersQuery.isFetching,

        customersError:
            customersQuery.error,

        refetchCustomers:
            customersQuery.refetch,


        // ----------------------------------------------------
        // Single customer
        // ----------------------------------------------------

        getCustomerById:
            getSingleCustomer,


        // ----------------------------------------------------
        // Role
        // ----------------------------------------------------

        updateCustomerRole:
            updateRoleMutation.mutateAsync,

        updatingCustomerRole:
            updateRoleMutation.isPending,

        updateCustomerRoleError:
            updateRoleMutation.error,


        // ----------------------------------------------------
        // Status
        // ----------------------------------------------------

        updateCustomerStatus:
            updateStatusMutation.mutateAsync,

        updatingCustomerStatus:
            updateStatusMutation.isPending,

        updateCustomerStatusError:
            updateStatusMutation.error,

    };

}