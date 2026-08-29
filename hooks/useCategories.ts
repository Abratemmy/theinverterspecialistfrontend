"use client";

import { useQuery } from "@tanstack/react-query";

import {
    getCategories,
    getCategoryBySlug,
} from "@/services/category.service";


// ==========================================================
// GET ALL CATEGORIES
// ==========================================================

export function useCategories() {

    return useQuery({

        queryKey: ["categories"],

        queryFn: getCategories,

        staleTime: 5 * 60 * 1000,

    });

}


// ==========================================================
// GET CATEGORY BY SLUG
// ==========================================================

export function useCategoryBySlug(
    slug: string
) {

    return useQuery({

        queryKey: [
            "category",
            slug
        ],

        queryFn: () =>
            getCategoryBySlug(slug),

        enabled: !!slug,

        staleTime: 5 * 60 * 1000,

    });

}


export default useCategories;