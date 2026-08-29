import type { Product } from "./product";

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;

    quantity: number;

    unit_price: number | string;

    discount_amount: number | string;

    total_price: number | string;

    product?: Product;
}

export interface CartResponse {
    cart_id?: number;

    total_items: number;

    subtotal: number;

    discount: number;

    grand_total: number;

    items: CartItem[];
}

export interface AddToCartPayload {
    product_id: number;
    quantity: number;
}

export interface UpdateCartPayload {
    quantity: number;
}

export interface AddToCartResponse {
    success: boolean;

    message: string;

    data: CartItem;

    guestToken?: string | null;
}