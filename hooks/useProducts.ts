import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";

interface Params {
    featured?: boolean;
    category?: number;
    brand?: number;
    search?: string;
    limit?: number;
    page?: number;
}

export default function useProducts(
    params?: Params
) {

    return useQuery({

        queryKey: ["products", params],

        queryFn: () => getProducts(params),

    });

}