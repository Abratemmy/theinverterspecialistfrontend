import api from "@/lib/axios";

import {
    Brand,
    BrandResponse,
    BrandSingleResponse,
} from "@/types/brand";


/*
|--------------------------------------------------------------------------
| GET ALL BRANDS
|--------------------------------------------------------------------------
*/

export const getBrands = async (): Promise<BrandResponse> => {

    const { data } =
        await api.get<BrandResponse>(
            "/brands"
        );

    return data;
};


/*
|--------------------------------------------------------------------------
| GET BRAND BY SLUG
|--------------------------------------------------------------------------
*/

export const getBrandBySlug = async (
    slug: string
): Promise<Brand> => {

    const { data } =
        await api.get<BrandSingleResponse>(
            `/brands/${slug}`
        );

    return data.data;
};


/*
|--------------------------------------------------------------------------
| CREATE BRAND
|--------------------------------------------------------------------------
*/

export interface CreateBrandData {

    name: string;

    slug: string;

    description?: string;

    logo?: string;

    website?: string;

    status?: "active" | "inactive";

}


export const createBrand = async (
    brandData: CreateBrandData
): Promise<BrandSingleResponse> => {

    const { data } =
        await api.post<BrandSingleResponse>(
            "/admin/brands",
            brandData
        );

    return data;
};


/*
|--------------------------------------------------------------------------
| UPDATE BRAND
|--------------------------------------------------------------------------
*/

export interface UpdateBrandData {

    name?: string;

    slug?: string;

    description?: string;

    logo?: string;

    website?: string;

    status?: "active" | "inactive";

}


export const updateBrand = async (
    id: number,
    brandData: UpdateBrandData
): Promise<BrandSingleResponse> => {

    const { data } =
        await api.put<BrandSingleResponse>(
            `/admin/brands/${id}`,
            brandData
        );

    return data;
};


/*
|--------------------------------------------------------------------------
| DELETE BRAND
|--------------------------------------------------------------------------
*/

export const deleteBrand = async (
    id: number
) => {

    const { data } =
        await api.delete(
            `/admin/brands/${id}`
        );

    return data;
};