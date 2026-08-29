"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    getInactiveProducts,
    restoreProduct,
    permanentDeleteProduct,
} from "@/services/product.service";

import {
    CreateProductData,
    UpdateProductData,
} from "@/types/product";


// ============================================================
// GET PRODUCTS
// ============================================================

export function useProducts(
    params?: {
        page?: number;
        limit?: number;
        search?: string;
        category?: number | string;
        brand?: number | string;
        featured?: boolean;
        minPrice?: number | string;
        maxPrice?: number | string;
        sort?: string;
    }
) {

    return useQuery({

        queryKey: [
            "products",
            params,
        ],

        queryFn: () =>
            getProducts(params),

        staleTime:
            5 * 60 * 1000,

    });

}


// ============================================================
// GET PRODUCT BY SLUG
// ============================================================

export function useProductBySlug(
    slug: string
) {

    return useQuery({

        queryKey: [
            "product",
            slug,
        ],

        queryFn: () =>
            getProductBySlug(slug),

        enabled:
            !!slug,

        staleTime:
            5 * 60 * 1000,

    });

}


// ============================================================
// CREATE PRODUCT
// ============================================================

export function useCreateProduct() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            (
                data: CreateProductData
            ) =>
                createProduct(data),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

        },

    });

}


// ============================================================
// UPDATE PRODUCT
// ============================================================

export function useUpdateProduct() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            ({
                id,
                data,
            }: {
                id: number;

                data: UpdateProductData;
            }) =>
                updateProduct(
                    id,
                    data
                ),

        onSuccess: (
            updatedProduct
        ) => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "product",
                    updatedProduct.slug,
                ],
            });

        },

    });

}


// ============================================================
// DELETE PRODUCT
// ============================================================

export function useDeleteProduct() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            (
                id: number
            ) =>
                deleteProduct(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "inactive-products",
                ],
            });

        },

    });

}


// ============================================================
// GET INACTIVE PRODUCTS
// ============================================================

export function useInactiveProducts() {

    return useQuery({

        queryKey: [
            "inactive-products",
        ],

        queryFn:
            getInactiveProducts,

        staleTime:
            5 * 60 * 1000,

    });

}


// ============================================================
// RESTORE PRODUCT
// ============================================================

export function useRestoreProduct() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            (
                id: number
            ) =>
                restoreProduct(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "inactive-products",
                ],
            });

        },

    });

}


// ============================================================
// PERMANENT DELETE
// ============================================================

export function usePermanentDeleteProduct() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            (
                id: number
            ) =>
                permanentDeleteProduct(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    "inactive-products",
                ],
            });

        },

    });

}