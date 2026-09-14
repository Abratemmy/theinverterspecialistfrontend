import api from "@/lib/axios";

import type {
    InitializePaymentPayload,
    InitializePaymentResponse,
    VerifyPaymentResponse,
} from "@/types/payment";


// ============================================================
// INITIALIZE PAYMENT
// ============================================================

export const initializePayment = async (
    payload: InitializePaymentPayload
): Promise<InitializePaymentResponse> => {

    const { data } =
        await api.post<InitializePaymentResponse>(
            "/payments/initialize",
            payload
        );

    return data;
};


// ============================================================
// VERIFY PAYMENT
// ============================================================

export const verifyPayment = async (
    reference: string
): Promise<VerifyPaymentResponse> => {

    const { data } =
        await api.get<VerifyPaymentResponse>(
            `/payments/verify/${reference}`
        );

    return data;
};

export const createBankTransferPayment = async (
    payload: {
        order_id: number;
    }
) => {

    const response = await api.post(
        "/payments/bank-transfer",
        payload
    );

    return response.data;
};
