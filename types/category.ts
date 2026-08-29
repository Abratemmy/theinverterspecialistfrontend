export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryResponse {
    success: boolean;
    count: number;
    data: Category[];
}

export interface CategorySingleResponse {

    success: boolean;

    message?: string;

    data: Category;

}