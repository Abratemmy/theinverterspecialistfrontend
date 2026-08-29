"use client";

import { getAdminDashboard } from "@/services/adminDashboardService";
import {
    useQuery,
} from "@tanstack/react-query";



export const useAdminDashboard = () => {

    return useQuery({

        queryKey: [
            "admin-dashboard"
        ],

        queryFn:
            getAdminDashboard,

        staleTime:
            1000 * 60 * 2,

        refetchInterval:
            1000 * 60 * 5,

    });

};