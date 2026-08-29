// ============================================================
// ADDRESS TYPE
// ============================================================

export type AddressType =
    | "home"
    | "office"
    | "other";


// ============================================================
// FULFILLMENT METHOD
// ============================================================

export type FulfillmentMethod =
    | "shipping"
    | "pickup";


// ============================================================
// SHIPPING ADDRESS
// ============================================================

export interface ShippingAddress {

    id: number;

    user_id: number;

    full_name: string;

    phone: string;

    address_line_1: string;

    address_line_2?: string | null;

    city: string;

    state: string;

    country: string;

    postal_code?: string | null;

    address_type: AddressType;

    is_default: boolean;

    created_at?: string;

    updated_at?: string;
}


// ============================================================
// CREATE SHIPPING ADDRESS
// ============================================================

export interface CreateShippingAddressPayload {

    full_name: string;

    phone: string;

    address_line_1: string;

    address_line_2?: string;

    city: string;

    state: string;

    country?: string;

    postal_code?: string;

    address_type?: AddressType;

    is_default?: boolean;
}


// ============================================================
// UPDATE SHIPPING ADDRESS
// ============================================================

export interface UpdateShippingAddressPayload {

    full_name?: string;

    phone?: string;

    address_line_1?: string;

    address_line_2?: string;

    city?: string;

    state?: string;

    country?: string;

    postal_code?: string;

    address_type?: AddressType;

    is_default?: boolean;
}


// ============================================================
// SHIPPING ADDRESS API RESPONSE
// ============================================================

export interface ShippingAddressResponse {

    success: boolean;

    data: ShippingAddress;
}


// ============================================================
// SHIPPING ADDRESSES API RESPONSE
// ============================================================

export interface ShippingAddressesResponse {

    success: boolean;

    data: ShippingAddress[];
}


// ============================================================
// CHECKOUT FULFILLMENT SELECTION
// ============================================================

export interface FulfillmentSelection {

    method: FulfillmentMethod;

    shipping_address_id?: number | null;
}