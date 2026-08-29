import api from "./api";

import {
    Category,
    CategoryResponse,
    CategorySingleResponse,
} from "@/types/category";


// ==========================================================
// GET ALL CATEGORIES
// ==========================================================

export const getCategories = async (): Promise<CategoryResponse> => {

    const { data } =
        await api.get<CategoryResponse>(
            "/categories"
        );

    return data;

};


// ==========================================================
// GET CATEGORY BY SLUG
// ==========================================================

export const getCategoryBySlug = async (
    slug: string
): Promise<Category> => {

    const { data } =
        await api.get<CategorySingleResponse>(
            `/categories/${slug}`
        );

    return data.data;

};


// ==========================================================
// CREATE CATEGORY
// ==========================================================

export interface CreateCategoryData {

    name: string;

    description?: string;

    image?: string;

}


export const createCategory = async (
    data: CreateCategoryData
) => {

    const response =
        await api.post(
            "/admin/categories",
            data
        );

    return response.data;

};


// ==========================================================
// UPDATE CATEGORY
// ==========================================================

export interface UpdateCategoryData {

    name: string;

    description?: string;

    image?: string;

}


export const updateCategory = async (
    id: number,
    data: UpdateCategoryData
) => {

    const response =
        await api.put(
            `/admin/categories/${id}`,
            data
        );

    return response.data;

};


// ==========================================================
// DELETE CATEGORY
// ==========================================================

export const deleteCategory = async (
    id: number
) => {

    const response =
        await api.delete(
            `/admin/categories/${id}`
        );

    return response.data;

};