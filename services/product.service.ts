import api from "@/lib/axios";
import { ProductResponse } from "@/types/product";

export const getProducts = async (
    params?: Record<string, string | number | boolean>
) => {

    const { data } = await api.get<ProductResponse>(
        "/products",
        {
            params,
        }
    );

    return data;

};