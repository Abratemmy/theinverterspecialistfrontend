export interface ProductMedia {
    id: number;
    media_type: "image" | "video";
    media_url: string;
    thumbnail_url: string | null;
    alt_text: string | null;
    is_primary: boolean;
    display_order: number;
}

export interface ProductSpecification {
    id: number;
    specification_name: string;
    specification_value: string;
    display_order: number;
}

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

export interface Product {
    id: number;

    category_id: number;

    brand_id: number;

    name: string;

    slug: string;

    short_description: string;

    description: string;

    additional_information: string | null;

    price: string;

    discount_price: string | null;

    quantity: number;

    weight: string;

    warranty: string | null;

    featured: boolean;

    status: string;

    primaryImage: string | null;

    stockStatus: "in_stock" | "low_stock" | "out_of_stock";

    discountPercentage: number;

    category: ProductCategory;

    brand: ProductBrand;

    media: ProductMedia[];

    specifications: ProductSpecification[];
}

export interface ProductResponse {

    success: boolean;

    total: number;

    currentPage: number;

    totalPages: number;

    products: Product[];

}