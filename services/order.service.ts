import api from "@/lib/axios";

import type {
    CreateOrderPayload,
    CreateOrderResponse,
    OrdersResponse,
    OrderResponse,
    Order
} from "@/types/order";

// ============================================================
// GET ALL ORDERS - ADMIN
// ============================================================

export interface GetAdminOrdersParams {

    page?: number;

    limit?: number;

    search?: string;

    status?: Order["order_status"] | "";

    payment_status?:
        | Order["payment_status"]
        | "";

}

export interface AdminOrdersResponse {

    success: boolean;

    data: Order[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}

export const getAllOrders = async (
    params?: GetAdminOrdersParams
): Promise<AdminOrdersResponse> => {

    const {
        data
    } =
        await api.get<AdminOrdersResponse>(
            "/admin/orders",
            {
                params
            }
        );


    return data;

};

/* ============================================================
   GET MY ORDERS
============================================================ */

export const getMyOrders = async (): Promise<Order[]> => {

    console.log(
        "GETTING MY ORDERS..."
    );


    const response = await api.get<{
        success: boolean;
        count: number;
        data: Order[];
    }>("/orders");


    console.log(
        "MY ORDERS RESPONSE:",
        response.data
    );


    return response.data.data;

};
// ============================================================
// GET SINGLE ORDER - ADMIN
// ============================================================

export const getAdminOrder = async (
    orderId: number
): Promise<Order> => {

    const {
        data
    } =
        await api.get<OrderResponse>(
            `/admin/orders/${orderId}`
        );


    return data.data;

};

// ============================================================
// UPDATE ORDER STATUS - ADMIN
// ============================================================

export const updateOrderStatus = async (
    orderId: number,
    order_status: Order["order_status"]
): Promise<Order> => {

    const {
        data
    } =
        await api.patch<OrderResponse>(
            `/admin/orders/${orderId}/status`,
            {
                order_status
            }
        );


    return data.data;

};

/* ============================================================
   GET SINGLE ORDER
============================================================ */

export const getOrder = async (
    orderId: number
): Promise<Order> => {

    console.log(
        "GET ORDER:",
        orderId
    );


    const response = await api.get<{
        success: boolean;
        data: Order;
    }>(
        `/orders/${orderId}`
    );


    console.log(
        "ORDER RESPONSE:",
        response.data
    );


    return response.data.data;

};


// ============================================================
// CREATE ORDER
// ============================================================

export const createOrder = async (
    payload: CreateOrderPayload
) => {

    const { data } =
        await api.post<CreateOrderResponse>(
            "/orders",
            payload
        );

    return data;
};


// ============================================================
// CANCEL ORDER
// ============================================================

export const cancelOrder = async (
    orderId: number
) => {

    const { data } =
        await api.patch<OrderResponse>(
            `/orders/${orderId}/cancel`
        );

    return data;
};

