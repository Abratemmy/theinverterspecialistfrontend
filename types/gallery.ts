export type GalleryStatus = "active" | "inactive";

export interface Gallery {
    id: number;
    image_url: string;
    public_id: string | null;
    title: string | null;
    alt_text: string | null;
    display_order: number;
    status: GalleryStatus;
    created_at: string;
    updated_at: string;
}

export interface GalleryResponse {
    success: boolean;
    data: Gallery[];
}