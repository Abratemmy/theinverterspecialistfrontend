// ============================================================
// PAYMENT TYPES
// ============================================================

export interface InitializePaymentPayload {
    order_id: number;
}


// ============================================================
// INITIALIZE PAYMENT RESPONSE
// ============================================================

export interface InitializePaymentResponse {
    success: boolean;
    message: string;

    data: {
        paymentId: number;
        orderId: number;
        orderNumber: string;

        amount: number;

        currency: string;

        reference: string;

        authorizationUrl: string;

        accessCode: string;
    };
}


// ============================================================
// VERIFY PAYMENT RESPONSE
// ============================================================

export interface VerifyPaymentResponse {
    success: boolean;

    message: string;

    data: {
        alreadyVerified: boolean;

        status: "success";

        payment: {
            id: number;

            order_id: number;

            user_id: number;

            payment_reference: string;

            gateway: string;

            payment_method: string;

            amount: number | string;

            currency: string;

            status: string;

            gateway_transaction_id?: string;

            gateway_response?: string;

            paid_at?: string;

            created_at?: string;

            updated_at?: string;
        };

        order?: {
            id: number;

            order_number: string;

            user_id: number;

            payment_status: string;

            order_status: string;

            subtotal: number | string;

            shipping_fee: number | string;

            discount: number | string;

            tax: number | string;

            total_amount: number | string;
        };

        transaction?: {
            id: number;

            reference: string;

            amount: number;

            currency: string;

            status: string;

            paid_at?: string;

            channel?: string;
        };
    };
}


// ============================================================
// ADMIN PAYMENT STATUS
// ============================================================

export type AdminPaymentStatus =
    | "pending"
    | "successful"
    | "failed"
    | "cancelled"
    | "refunded";


// ============================================================
// ADMIN PAYMENT METHOD
// ============================================================

export type AdminPaymentMethod =
    | "card"
    | "bank_transfer"
    | "ussd"
    | "bank"
    | "qr"
    | "mobile_money"
    | "cash_on_delivery";


// ============================================================
// ADMIN PAYMENT USER
// ============================================================

export interface AdminPaymentUser {

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    phone: string;

}


// ============================================================
// ADMIN PAYMENT ORDER
// ============================================================

export interface AdminPaymentOrder {

    id: number;

    order_number: string;

    order_status: string;

    payment_status: string;

    total_amount: number | string;

}


// ============================================================
// ADMIN PAYMENT
// ============================================================

export interface AdminPayment {

    id: number;

    order_id: number;

    user_id: number;

    payment_reference: string;

    gateway: string;

    payment_method: AdminPaymentMethod;

    amount: number | string;

    currency: string;

    status: AdminPaymentStatus;

    gateway_transaction_id:
        | string
        | null;

    gateway_response:
        | string
        | null;

    paid_at:
        | string
        | null;

    created_at: string;

    updated_at: string;

    order?: AdminPaymentOrder;

    user?: AdminPaymentUser;

}


// ============================================================
// ADMIN PAYMENT PAGINATION
// ============================================================

export interface AdminPaymentPagination {

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}


// ============================================================
// GET ADMIN PAYMENTS RESPONSE
// ============================================================

export interface AdminPaymentsResponse {

    success: boolean;

    data: AdminPayment[];

    pagination: AdminPaymentPagination;

}


// ============================================================
// GET SINGLE ADMIN PAYMENT RESPONSE
// ============================================================

export interface AdminPaymentResponse {

    success: boolean;

    data: AdminPayment;

}