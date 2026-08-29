import type { Product } from "./product";
import type { ShippingAddress } from "./shippingAddress";


export type FulfillmentMethod =
    | "shipping"
    | "pickup";


export type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded";


export type OrderStatus =
    | "pending"
    | "processing"
    | "packed"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";


export interface OrderUser {

    id: number;

    first_name: string;

    last_name: string;

    email?: string;

    phone?: string;

}

export interface OrderItem {

    id: number;

    order_id: number;

    product_id: number;

    quantity: number;

    unit_price:
        number | string;

    discount:
        number | string;

    total_price:
        number | string;

    product?:
        Product;

}


export interface Order {

    id: number;

    order_number: string;

    user_id: number;

    user?:
        OrderUser | null;

    cart_id?: number;

    fulfillment_method?:
        FulfillmentMethod;

    shipping_address_id?:
        number | null;

    subtotal:
        number | string;

    shipping_fee:
        number | string;

    discount:
        number | string;

    tax:
        number | string;

    total_amount:
        number | string;

    payment_status:
        PaymentStatus;

    order_status:
        OrderStatus;

    notes?:
        string | null;

    items?:
        OrderItem[];

    shippingAddress?:
        ShippingAddress | null;

    created_at:
        string;

    updated_at:
        string;

}


export interface CreateOrderPayload {

    shipping_address_id?:
        number | null;

    fulfillment_method:
        FulfillmentMethod;

    notes?:
        string;

}


export interface CreateOrderResponse {

    success: boolean;

    message: string;

    existingOrder?:
        boolean;

    cartChanged?:
        boolean;

    previousOrderId?:
        number | null;

    data:
        Order;

}


export interface OrdersResponse {

    success: boolean;

    count: number;

    data: Order[];

}


export interface OrderResponse {

    success: boolean;

    data: Order;

}


export interface AdminOrdersResponse {

    success: boolean;

    data: Order[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}

