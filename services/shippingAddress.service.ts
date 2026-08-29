import api from "@/lib/axios";

import type {
    ShippingAddress,
    CreateShippingAddressPayload,
    UpdateShippingAddressPayload,
    ShippingAddressResponse,
    ShippingAddressesResponse,
} from "@/types/shippingAddress";


// ============================================================
// GET ALL SHIPPING ADDRESSES
// ============================================================

export const getShippingAddresses =
    async (): Promise<ShippingAddress[]> => {

        const { data } =
            await api.get<ShippingAddressesResponse>(
                "/shipping-addresses"
            );

        return data.data;
    };


// ============================================================
// GET SINGLE SHIPPING ADDRESS
// ============================================================

export const getShippingAddress =
    async (
        id: number
    ): Promise<ShippingAddress> => {

        const { data } =
            await api.get<ShippingAddressResponse>(
                `/shipping-addresses/${id}`
            );

        return data.data;
    };


// ============================================================
// CREATE SHIPPING ADDRESS
// ============================================================

export const createShippingAddress =
    async (
        payload: CreateShippingAddressPayload
    ): Promise<ShippingAddress> => {

        const { data } =
            await api.post<ShippingAddressResponse>(
                "/shipping-addresses",
                payload
            );

        return data.data;
    };


// ============================================================
// UPDATE SHIPPING ADDRESS
// ============================================================

export const updateShippingAddress =
    async (
        id: number,
        payload: UpdateShippingAddressPayload
    ): Promise<ShippingAddress> => {

        const { data } =
            await api.put<ShippingAddressResponse>(
                `/shipping-addresses/${id}`,
                payload
            );

        return data.data;
    };


// ============================================================
// DELETE SHIPPING ADDRESS
// ============================================================

export const deleteShippingAddress =
    async (
        id: number
    ): Promise<boolean> => {

        await api.delete(
            `/shipping-addresses/${id}`
        );

        return true;
    };


// ============================================================
// SET DEFAULT SHIPPING ADDRESS
// ============================================================

export const setDefaultShippingAddress =
    async (
        id: number
    ): Promise<ShippingAddress> => {

        const { data } =
            await api.patch<ShippingAddressResponse>(
                `/shipping-addresses/${id}/default`
            );

        return data.data;
    };