import api from "./api";

import {
    Product,
    ProductResponse,
    ProductSingleResponse,
    InactiveProductResponse,
    CreateProductData,
    UpdateProductData,
} from "@/types/product";


// ============================================================
// GET PRODUCTS PARAMS
// ============================================================

export interface GetProductsParams {

    page?: number;

    limit?: number;

    search?: string;

    category?: number;

    brand?: number;

    featured?: boolean;

    minPrice?: number;

    maxPrice?: number;

    sort?:
        | "newest"
        | "oldest"
        | "price_asc"
        | "price_desc"
        | "name"
        | "featured";

}


// ============================================================
// INACTIVE PRODUCTS PARAMS
// ============================================================

export interface InactiveProductsParams {

    page?: number;

    limit?: number;

    search?: string;

}


// ============================================================
// GET PRODUCTS
// ============================================================

export const getProducts = async (
    params?: GetProductsParams
): Promise<ProductResponse> => {

    const { data } =
        await api.get<ProductResponse>(
            "/products",
            {
                params
            }
        );

    return data;

};


// ============================================================
// GET PRODUCT BY SLUG
// ============================================================

export const getProductBySlug = async (
    slug: string
): Promise<Product> => {

    const { data } =
        await api.get<ProductSingleResponse>(
            `/products/${slug}`
        );

    return data.data;

};


// ============================================================
// CREATE PRODUCT
// ============================================================

export const createProduct = async (
    productData: CreateProductData
): Promise<Product> => {

    const { data } =
        await api.post<ProductSingleResponse>(
            "/admin/products",
            productData
        );

    return data.data;

};


// ============================================================
// UPDATE PRODUCT
// ============================================================

export const updateProduct = async (
    id: number,
    productData: UpdateProductData
): Promise<Product> => {

    const { data } =
        await api.put<ProductSingleResponse>(
            `/admin/products/${id}`,
            productData
        );

    return data.data;

};


// ============================================================
// DELETE PRODUCT
// ============================================================

export const deleteProduct = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/admin/products/${id}`
    );

};


// ============================================================
// GET INACTIVE PRODUCTS
// ============================================================

export const getInactiveProducts = async (
    params: InactiveProductsParams = {}
): Promise<InactiveProductResponse> => {

    const { data } =
        await api.get<InactiveProductResponse>(
            "/admin/products/inactive",
            {
                params
            }
        );

    return data;

};


// ============================================================
// RESTORE PRODUCT
// ============================================================

export const restoreProduct = async (
    id: number
): Promise<Product> => {

    const { data } =
        await api.patch<ProductSingleResponse>(
            `/admin/products/${id}/restore`
        );

    return data.data;

};


// ============================================================
// PERMANENTLY DELETE PRODUCT
// ============================================================

export const permanentDeleteProduct = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/admin/products/${id}/permanent`
    );

};