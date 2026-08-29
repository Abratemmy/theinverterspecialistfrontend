"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getShippingAddresses,
    getShippingAddress,
    createShippingAddress,
    updateShippingAddress,
    deleteShippingAddress,
    setDefaultShippingAddress,
} from "@/services/shippingAddress.service";

import type {
    CreateShippingAddressPayload,
    UpdateShippingAddressPayload,
} from "@/types/shippingAddress";


export default function useShippingAddresses() {

    const queryClient = useQueryClient();


    // ============================================================
    // GET ALL ADDRESSES
    // ============================================================

    const addressesQuery = useQuery({

        queryKey: ["shipping-addresses"],

        queryFn: getShippingAddresses,

        staleTime: 30 * 1000,

    });


    // ============================================================
    // GET SINGLE ADDRESS
    // ============================================================

    const getAddress = async (
        id: number
    ) => {

        return await getShippingAddress(id);

    };


    // ============================================================
    // CREATE ADDRESS
    // ============================================================

    const createMutation = useMutation({

        mutationFn: (
            payload: CreateShippingAddressPayload
        ) =>
            createShippingAddress(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["shipping-addresses"],
            });

        },

    });


    // ============================================================
    // UPDATE ADDRESS
    // ============================================================

    const updateMutation = useMutation({

        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: UpdateShippingAddressPayload;
        }) =>
            updateShippingAddress(
                id,
                payload
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["shipping-addresses"],
            });

        },

    });


    // ============================================================
    // DELETE ADDRESS
    // ============================================================

    const deleteMutation = useMutation({

        mutationFn: (
            id: number
        ) =>
            deleteShippingAddress(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["shipping-addresses"],
            });

        },

    });


    // ============================================================
    // SET DEFAULT ADDRESS
    // ============================================================

    const defaultMutation = useMutation({

        mutationFn: (
            id: number
        ) =>
            setDefaultShippingAddress(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["shipping-addresses"],
            });

        },

    });


    // ============================================================
    // RETURN
    // ============================================================

    return {

        // --------------------------------------------------------
        // Addresses
        // --------------------------------------------------------

        addresses:
            addressesQuery.data ?? [],

        loading:
            addressesQuery.isLoading,

        error:
            addressesQuery.error,

        refetch:
            addressesQuery.refetch,


        // --------------------------------------------------------
        // Get single address
        // --------------------------------------------------------

        getAddress,


        // --------------------------------------------------------
        // Create
        // --------------------------------------------------------

        createAddress:
            createMutation.mutateAsync,

        creatingAddress:
            createMutation.isPending,

        createError:
            createMutation.error,


        // --------------------------------------------------------
        // Update
        // --------------------------------------------------------

        updateAddress:
            updateMutation.mutateAsync,

        updatingAddress:
            updateMutation.isPending,

        updateError:
            updateMutation.error,


        // --------------------------------------------------------
        // Delete
        // --------------------------------------------------------

        deleteAddress:
            deleteMutation.mutateAsync,

        deletingAddress:
            deleteMutation.isPending,

        deleteError:
            deleteMutation.error,


        // --------------------------------------------------------
        // Default
        // --------------------------------------------------------

        setDefaultAddress:
            defaultMutation.mutateAsync,

        settingDefaultAddress:
            defaultMutation.isPending,

        defaultError:
            defaultMutation.error,

    };

}