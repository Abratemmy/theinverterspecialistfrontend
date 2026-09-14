import axios from "axios";

import type {
    Gallery,
    GalleryResponse,
} from "@/types/gallery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const getGallery = async (): Promise<Gallery[]> => {

    const response = await axios.get<GalleryResponse>(
        `${API_URL}/gallery`
    );

    return response.data.data;
};

export const getAdminGallery = async (): Promise<Gallery[]> => {

    const response = await axios.get<GalleryResponse>(
        `${API_URL}/gallery/admin`,
        {
            withCredentials: true,
        }
    );

    return response.data.data;
};


export const uploadGalleryImage = async (
    formData: FormData
): Promise<Gallery> => {

    const response = await axios.post<{
        success: boolean;
        data: Gallery;
    }>(
        `${API_URL}/gallery/admin`,
        formData,
        {
            withCredentials: true,
        }
    );

    return response.data.data;
};


export const deleteGalleryImage = async (
    id: number
): Promise<void> => {

    await axios.delete(
        `${API_URL}/gallery/admin/${id}`,
        {
            withCredentials: true,
        }
    );
};


export const updateGalleryStatus = async (
    id: number,
    status: "active" | "inactive"
): Promise<Gallery> => {

    const response = await axios.patch<{
        success: boolean;
        data: Gallery;
    }>(
        `${API_URL}/gallery/admin/${id}/status`,
        {
            status,
        },
        {
            withCredentials: true,
        }
    );

    return response.data.data;
};