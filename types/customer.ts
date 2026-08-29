// ============================================================
// CUSTOMER TYPES
// ============================================================

export type UserRole =
    | "customer"
    | "manager"
    | "admin";

export type UserStatus =
    | "active"
    | "inactive"
    | "blocked";


// ============================================================
// CUSTOMER
// ============================================================

export interface Customer {

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    phone: string | null;

    role: UserRole;

    status: UserStatus;

    profile_image: string | null;

    last_login: string | null;

    created_at: string;

    updated_at: string;

}


// ============================================================
// GET CUSTOMERS RESPONSE
// ============================================================

export interface CustomerPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}


export interface CustomersResponse {
    success: boolean;
    message: string;
    data: Customer[];
    pagination: CustomerPagination;
}


// ============================================================
// GET SINGLE CUSTOMER RESPONSE
// ============================================================

export interface CustomerResponse {

    success: boolean;

    message: string;

    data: Customer;

}


// ============================================================
// UPDATE ROLE
// ============================================================

export interface UpdateCustomerRolePayload {

    role: UserRole;

}

export interface UpdateCustomerRoleResponse {

    success: boolean;

    message: string;

    data: Customer;

}


// ============================================================
// UPDATE STATUS
// ============================================================

export interface UpdateCustomerStatusPayload {

    status: UserStatus;

}

export interface UpdateCustomerStatusResponse {

    success: boolean;

    message: string;

    data: Customer;

}