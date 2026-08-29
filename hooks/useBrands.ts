import { useQuery } from "@tanstack/react-query";

import {
    getBrands,
    getBrandBySlug,
} from "@/services/brandService";


export function useBrands() {

    return useQuery({

        queryKey: ["brands"],

        queryFn: getBrands,

        staleTime: 5 * 60 * 1000,

    });

}


export function useBrandBySlug(
    slug: string
) {

    return useQuery({

        queryKey: ["brand", slug],

        queryFn: () =>
            getBrandBySlug(slug),

        enabled: !!slug,

        staleTime: 5 * 60 * 1000,

    });

}


export default useBrands;