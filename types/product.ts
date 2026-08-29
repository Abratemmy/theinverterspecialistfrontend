export interface ProductCategory {

    id: number;

    name: string;

    slug: string;

}


export interface ProductBrand {

    id: number;

    name: string;

    slug: string;

}


export interface ProductMedia {

    id: number;

    media_type: "image" | "video";

    media_url: string;

    thumbnail_url?: string | null;

    alt_text?: string | null;

    is_primary: boolean;

    display_order: number;

}


export interface ProductSpecification {

    id: number;

    specification_name: string;

    specification_value: string;

    display_order: number;

}


export interface Product {

    id: number;

    category_id: number;

    brand_id: number;

    name: string;

    slug: string;

    short_description?: string | null;

    description?: string | null;

    additional_information?: string | null;

    price: string | number;

    discount_price?: string | number | null;

    quantity: number;

    weight?: string | number | null;

    warranty?: string | null;

    status: "active" | "inactive";

    featured: boolean;

    category?: ProductCategory;

    brand?: ProductBrand;

    media: ProductMedia[];

    specifications: ProductSpecification[];

    created_at?: string;

    updated_at?: string;

    primaryImage?: string | null;

    stockStatus?:
        | "in_stock"
        | "low_stock"
        | "out_of_stock";

    discountPercentage?: number;

}


export interface ProductResponse {

    success: boolean;

    products: Product[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}


export interface ProductSingleResponse {

    success: boolean;

    message?: string;

    data: Product;

}


export interface InactiveProductResponse {

    success: boolean;

    products: Product[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}


export interface CreateProductData {

    product: {

        category_id: number;

        brand_id: number;

        name: string;

        short_description?: string;

        description?: string;

        additional_information?: string;

        price: number;

        discount_price?: number | null;

        quantity?: number;

        weight?: number | null;

        warranty?: string;

        featured?: boolean;

    };
    media?: ProductMedia[];

    specifications?: ProductSpecification[];
  

}


export interface UpdateProductData {

    category_id?: number;

    brand_id?: number;

    name?: string;

    short_description?: string;

    description?: string;

    additional_information?: string;

    price?: number;

    discount_price?: number | null;

    quantity?: number;

    weight?: number | null;

    warranty?: string;

    featured?: boolean;
    media?: ProductMedia[];

    specifications?: ProductSpecification[];

}

// ============================================================
// ADMIN PAYMENT TYPES
// ============================================================

export type AdminPaymentStatus =
    | "pending"
    | "successful"
    | "failed"
    | "cancelled"
    | "refunded";


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
// GET ADMIN PAYMENT RESPONSE
// ============================================================

export interface AdminPaymentResponse {

    success: boolean;

    data: AdminPayment;

}