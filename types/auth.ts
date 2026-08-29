export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    role: "customer" | "admin" | "manager";
    profile_image?: string | null;
    status: "active" | "inactive" | "blocked";
    last_login?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    password: string;
    confirm_password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user: User;
    };
}