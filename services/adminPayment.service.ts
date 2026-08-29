import type {
    AdminPaymentsResponse,
    AdminPaymentResponse,
    AdminPaymentStatus,
} from "@/types/payment";


const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";


// ============================================================
// GET ADMIN PAYMENTS
// ============================================================

export interface GetAdminPaymentsParams {

    page?: number;

    limit?: number;

    status?: AdminPaymentStatus | "";

    search?: string;

}


export const getAdminPayments = async (
    params: GetAdminPaymentsParams = {}
): Promise<AdminPaymentsResponse> => {

    const searchParams =
        new URLSearchParams();


    searchParams.set(
        "page",
        String(params.page ?? 1)
    );


    searchParams.set(
        "limit",
        String(params.limit ?? 10)
    );


    if (params.status) {

        searchParams.set(
            "status",
            params.status
        );

    }


    if (
        params.search &&
        params.search.trim()
    ) {

        searchParams.set(
            "search",
            params.search.trim()
        );

    }


    const response =
        await fetch(
            `${API_URL}/admin/payments?${searchParams.toString()}`,
            {
                method: "GET",
                credentials: "include"
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch payments."
        );

    }


    return result;

};


// ============================================================
// GET SINGLE ADMIN PAYMENT
// ============================================================

export const getAdminPaymentById = async (
    paymentId: number | string
): Promise<AdminPaymentResponse> => {

    const response =
        await fetch(
            `${API_URL}/admin/payments/${paymentId}`,
            {
                method: "GET",
                credentials: "include"
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to fetch payment."
        );

    }


    return result;

};