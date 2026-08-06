import api from "./api";
import { CategoryResponse } from "@/types/category";

export const categoryService = {

    getCategories: async () => {

        const { data } =
            await api.get<CategoryResponse>("/categories");

        return data;

    },

    getCategoryBySlug: async (slug: string) => {

        const { data } =
            await api.get(`/categories/${slug}`);

        return data;

    },

};