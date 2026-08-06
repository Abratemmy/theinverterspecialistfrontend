import { useQuery } from "@tanstack/react-query";

import { categoryService } from "@/services/category.service";

export function useCategories() {

    return useQuery({

        queryKey: ["categories"],

        queryFn: categoryService.getCategories,

        staleTime: 5 * 60 * 1000,
        // The staleTime means categories won't be refetched on every page visit for 5 minutes, 
        // which is appropriate because categories don't change frequently.
    });

}