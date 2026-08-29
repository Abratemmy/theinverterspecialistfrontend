import api from "@/lib/axios";


// ============================================================
// TYPES
// ============================================================

export interface DashboardSummary {
    total_users: number;
    total_products: number;
    total_categories: number;
    total_brands: number;

    total_orders: number;

    pending_orders: number;
    processing_orders: number;
    packed_orders: number;
    shipped_orders: number;
    delivered_orders: number;
    cancelled_orders: number;

    total_revenue: number;

    today_orders: number;
    today_revenue: number;

    low_stock_count: number;
}


export interface RecentOrder {
    id: number;
    order_number: string;

    customer: {
        id: number;
        name: string;
        email: string;
    };

    total_amount: number;

    payment_status: string;
    order_status: string;

    created_at: string;
}


export interface RecentCustomer {
    id: number;

    full_name: string;

    email: string;

    phone?: string | null;

    status: string;

    joined_at: string;
}


export interface TopSellingProduct {
    product_id: number;

    product_name: string;

    unit_price: number;

    current_stock: number;

    total_sold: number;

    total_revenue: number;
}


export interface LowStockProduct {
    id: number;

    name: string;

    unit_price: number;

    quantity: number;

    stock_status: string;
}


export interface MonthlySale {
    year: number;

    month_number: number;

    month: string;

    revenue: number;

    orders: number;
}


export interface DashboardData {
    summary: DashboardSummary;

    recent_orders: RecentOrder[];

    recent_customers: RecentCustomer[];

    top_selling_products: TopSellingProduct[];

    low_stock_products: LowStockProduct[];

    monthly_sales: MonthlySale[];
}


export interface DashboardResponse {
    success: boolean;

    data: DashboardData;
}


// ============================================================
// GET DASHBOARD
// ============================================================

export const getAdminDashboard =
    async (): Promise<DashboardData> => {

        const response =
            await api.get<DashboardResponse>(
                "/admin/dashboard"
            );


        return response.data.data;

    };