import api from "@/lib/axios";

import type {
    CustomersResponse,
    CustomerResponse,
    UpdateCustomerRolePayload,
    UpdateCustomerRoleResponse,
    UpdateCustomerStatusPayload,
    UpdateCustomerStatusResponse,
} from "@/types/customer";


// ============================================================
// GET CUSTOMERS
// ============================================================

export const getCustomers =
    async (
        params?: {
            search?: string;
            role?: string;
            status?: string;
            page?: number;
            limit?: number;
        }
    ): Promise<CustomersResponse> => {

        const response =
            await api.get(
                "/admin/customers",
                {
                    params
                }
            );

        return response.data;

    };


// ============================================================
// GET SINGLE CUSTOMER
// ============================================================

export const getCustomerById =
    async (
        id: number
    ): Promise<CustomerResponse> => {

        const response =
            await api.get(
                `/admin/customers/${id}`
            );

        return response.data;

    };


// ============================================================
// UPDATE CUSTOMER ROLE
// ============================================================

export const updateCustomerRole =
    async (
        id: number,
        payload: UpdateCustomerRolePayload
    ): Promise<UpdateCustomerRoleResponse> => {

        const response =
            await api.patch(

                `/admin/customers/${id}/role`,

                payload

            );

        return response.data;

    };


// ============================================================
// UPDATE CUSTOMER STATUS
// ============================================================

export const updateCustomerStatus =
    async (
        id: number,
        payload: UpdateCustomerStatusPayload
    ): Promise<UpdateCustomerStatusResponse> => {

        const response =
            await api.patch(

                `/admin/customers/${id}/status`,

                payload

            );

        return response.data;

    };