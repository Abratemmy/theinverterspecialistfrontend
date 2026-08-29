"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    type AddToCartPayload,
} from "@/services/cart.service";

export default function useCart() {
    const queryClient = useQueryClient();

    /* ============================================================
       GET CART
    ============================================================ */

    const cartQuery = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,

        staleTime: 0,

        refetchOnWindowFocus: true,
    });

    /* ============================================================
       ADD TO CART
    ============================================================ */

    const addMutation = useMutation({
        mutationFn: (
            payload: AddToCartPayload
        ) => addToCart(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            await queryClient.refetchQueries({
                queryKey: ["cart"],
            });
        },
    });

    /* ============================================================
       UPDATE CART ITEM
    ============================================================ */

    const updateMutation = useMutation({
        mutationFn: ({
            itemId,
            quantity,
        }: {
            itemId: number;
            quantity: number;
        }) =>
            updateCartItem(
                itemId,
                quantity
            ),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            await queryClient.refetchQueries({
                queryKey: ["cart"],
            });
        },
    });

    /* ============================================================
       REMOVE CART ITEM
    ============================================================ */

    const removeMutation = useMutation({
        mutationFn: (
            itemId: number
        ) =>
            removeCartItem(itemId),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            await queryClient.refetchQueries({
                queryKey: ["cart"],
            });
        },
    });

    /* ============================================================
       CLEAR CART
    ============================================================ */

    const clearMutation = useMutation({
        mutationFn: clearCart,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            await queryClient.refetchQueries({
                queryKey: ["cart"],
            });
        },
    });

    /* ============================================================
       RETURN
    ============================================================ */

    return {
        /* Cart */

        cart:
            cartQuery.data ?? null,

        loading:
            cartQuery.isLoading,

        isFetching:
            cartQuery.isFetching,

        error:
            cartQuery.error,

        refetchCart:
            cartQuery.refetch,

        /* Add */

        addToCart:
            addMutation.mutate,

        addToCartAsync:
            addMutation.mutateAsync,

        adding:
            addMutation.isPending,

        addError:
            addMutation.error,

        /* Update */

        updateCartItem:
            updateMutation.mutate,

        updateCartItemAsync:
            updateMutation.mutateAsync,

        updating:
            updateMutation.isPending,

        updateError:
            updateMutation.error,

        /* Remove */

        removeCartItem:
            removeMutation.mutate,

        removeCartItemAsync:
            removeMutation.mutateAsync,

        removing:
            removeMutation.isPending,

        removeError:
            removeMutation.error,

        /* Clear */

        clearCart:
            clearMutation.mutate,

        clearCartAsync:
            clearMutation.mutateAsync,

        clearing:
            clearMutation.isPending,

        clearError:
            clearMutation.error,
    };
}