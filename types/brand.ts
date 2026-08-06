export interface Brand {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    logo?: string | null;
    status: "active" | "inactive";
    created_at?: string;
    updated_at?: string;
}