import api from "@/lib/axios";

/* ============================================================
   TYPES
============================================================ */

export interface CartProduct {
    id: number;
    name: string;
    slug: string;
    price: number | string;
    discount_price?: number | string | null;
    quantity: number;
    primaryImage?: string | null;
    media?: any[];
    brand?: {
        id?: number;
        name: string;
    };
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    unit_price: number | string;
    discount_amount: number | string;
    total_price: number | string;
    product: CartProduct;
}

export interface CartResponse {
    cart_id: number;
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
    itemId: number;
    quantity: number;
}

/* ============================================================
   GET CART
============================================================ */

export const getCart = async (): Promise<CartResponse> => {
    try {
        const response = await api.get<{
            success: boolean;
            data: CartResponse;
        }>("/cart");

        console.log("=================================");
        console.log("GET CART");
        console.log("Response:", response.data);
        console.log("=================================");

        return response.data.data;
    } catch (error: any) {
        console.error("GET CART ERROR:", error);
        console.error(
            "GET CART ERROR RESPONSE:",
            error?.response?.data
        );

        throw error;
    }
};

/* ============================================================
   ADD TO CART
============================================================ */

export const addToCart = async (
    payload: AddToCartPayload
) => {
    try {
        const productId = Number(payload.product_id);
        const quantity = Number(payload.quantity);

        console.log("=================================");
        console.log("FRONTEND ADD TO CART");
        console.log("productId:", productId);
        console.log("quantity:", quantity);
        console.log("=================================");

        /* -----------------------------------------------
           Validate product ID
        ------------------------------------------------ */

        if (
            !Number.isInteger(productId) ||
            productId <= 0
        ) {
            throw new Error(
                "Invalid product ID."
            );
        }

        /* -----------------------------------------------
           Validate quantity
        ------------------------------------------------ */

        if (
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            throw new Error(
                "Quantity must be a whole number greater than 0."
            );
        }

        /* -----------------------------------------------
           Send request
           
           IMPORTANT:
           Axios should send the guest cookie automatically.
        ------------------------------------------------ */

        console.log(
            ">>> ABOUT TO SEND POST /cart"
        );

        const response = await api.post(
            "/cart",
            {
                product_id: productId,
                quantity,
            }
        );

        console.log(
            "<<< ADD TO CART SUCCESS"
        );

        console.log(
            "ADD TO CART RESPONSE:",
            response.data
        );

        return response.data;

    } catch (error: any) {
        console.error(
            "<<< ADD TO CART FAILED"
        );

        console.error(
            "ADD TO CART ERROR:",
            error
        );

        console.error(
            "ADD TO CART ERROR RESPONSE:",
            error?.response?.data
        );

        console.error(
            "ADD TO CART ERROR STATUS:",
            error?.response?.status
        );

        throw error;
    }
};

/* ============================================================
   UPDATE CART ITEM
============================================================ */

export const updateCartItem = async (
    itemId: number,
    quantity: number
) => {
    try {
        /* -----------------------------------------------
           Convert values to numbers
        ------------------------------------------------ */

        const numericItemId = Number(itemId);
        const numericQuantity = Number(quantity);

        console.log("=================================");
        console.log("FRONTEND UPDATE CART");
        console.log("itemId:", itemId);
        console.log("quantity:", quantity);
        console.log(
            "numericItemId:",
            numericItemId
        );
        console.log(
            "numericQuantity:",
            numericQuantity
        );
        console.log("=================================");

        /* -----------------------------------------------
           Validate item ID
        ------------------------------------------------ */

        if (
            !Number.isInteger(numericItemId) ||
            numericItemId <= 0
        ) {
            throw new Error(
                "Invalid cart item ID."
            );
        }

        /* -----------------------------------------------
           Validate quantity
        ------------------------------------------------ */

        if (
            !Number.isInteger(numericQuantity) ||
            numericQuantity <= 0
        ) {
            throw new Error(
                "Invalid cart quantity."
            );
        }

        /* -----------------------------------------------
           Request body
        ------------------------------------------------ */

        const body = {
            quantity: numericQuantity,
        };

        console.log(
            "UPDATE CART URL:",
            `/cart/${numericItemId}`
        );

        console.log(
            "UPDATE CART BODY:",
            body
        );

        /* -----------------------------------------------
           SEND PUT REQUEST
           
           No guest token header is required here.
           The browser sends the guest_cart_token cookie
           through Axios.
        ------------------------------------------------ */

        console.log(
            ">>> ABOUT TO SEND PUT REQUEST"
        );

        const response = await api.put(
            `/cart/${numericItemId}`,
            body
        );

        console.log(
            "<<< PUT REQUEST SUCCESS"
        );

        console.log(
            "UPDATE CART RESPONSE:",
            response.data
        );

        return response.data;

    } catch (error: any) {
        console.error(
            "<<< PUT REQUEST FAILED"
        );

        console.error(
            "UPDATE CART ERROR:",
            error
        );

        console.error(
            "UPDATE CART ERROR RESPONSE:",
            error?.response?.data
        );

        console.error(
            "UPDATE CART ERROR STATUS:",
            error?.response?.status
        );

        throw error;
    }
};

/* ============================================================
   REMOVE CART ITEM
============================================================ */

export const removeCartItem = async (
    itemId: number
) => {
    try {
        const numericItemId = Number(itemId);

        console.log("=================================");
        console.log("FRONTEND REMOVE CART ITEM");
        console.log(
            "itemId:",
            numericItemId
        );
        console.log("=================================");

        if (
            !Number.isInteger(numericItemId) ||
            numericItemId <= 0
        ) {
            throw new Error(
                "Invalid cart item ID."
            );
        }

        console.log(
            ">>> ABOUT TO SEND DELETE REQUEST"
        );

        const response = await api.delete(
            `/cart/${numericItemId}`
        );

        console.log(
            "<<< DELETE REQUEST SUCCESS"
        );

        console.log(
            "REMOVE CART RESPONSE:",
            response.data
        );

        return response.data;

    } catch (error: any) {
        console.error(
            "<<< REMOVE CART ITEM FAILED"
        );

        console.error(
            "REMOVE CART ERROR:",
            error
        );

        console.error(
            "REMOVE CART ERROR RESPONSE:",
            error?.response?.data
        );

        throw error;
    }
};

/* ============================================================
   CLEAR CART
============================================================ */

export const clearCart = async () => {
    try {
        console.log(
            "================================="
        );

        console.log(
            "FRONTEND CLEAR CART"
        );

        console.log(
            "================================="
        );

        const response = await api.delete(
            "/cart"
        );

        console.log(
            "CLEAR CART RESPONSE:",
            response.data
        );

        return response.data;

    } catch (error: any) {
        console.error(
            "CLEAR CART ERROR:",
            error
        );

        console.error(
            "CLEAR CART ERROR RESPONSE:",
            error?.response?.data
        );

        throw error;
    }
};