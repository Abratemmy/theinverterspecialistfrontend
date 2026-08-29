export interface Brand {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    logo?: string | null;
    website?: string | null;
    status: "active" | "inactive";
    created_at?: string;
    updated_at?: string;
}

export interface BrandResponse {
    success: boolean;
    count: number;
    data: Brand[];
}

export interface BrandSingleResponse {
    success: boolean;
    message?: string;
    data: Brand;
}