"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    deleteGalleryImage,
    getAdminGallery,
    updateGalleryStatus,
    uploadGalleryImage,
} from "@/services/gallery.service";

import type {
    GalleryStatus,
} from "@/types/gallery";


export const useGallery = () => {

    const queryClient = useQueryClient();


    // ==========================================
    // GET GALLERY
    // ==========================================

    const galleryQuery = useQuery({
        queryKey: ["gallery"],
        queryFn: getAdminGallery,
    });


    // ==========================================
    // UPLOAD
    // ==========================================

    const uploadMutation = useMutation({
        mutationFn: uploadGalleryImage,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["gallery"],
            });
        },
    });


    // ==========================================
    // DELETE
    // ==========================================

    const deleteMutation = useMutation({
        mutationFn: deleteGalleryImage,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["gallery"],
            });
        },
    });


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const statusMutation = useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: number;
            status: GalleryStatus;
        }) =>
            updateGalleryStatus(
                id,
                status
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["gallery"],
            });
        },
    });


    return {
        gallery: galleryQuery.data ?? [],
        isLoading: galleryQuery.isLoading,
        isError: galleryQuery.isError,
        refetch: galleryQuery.refetch,

        uploadImage: uploadMutation.mutateAsync,
        isUploading: uploadMutation.isPending,

        deleteImage: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,

        updateStatus: statusMutation.mutateAsync,
        isUpdatingStatus: statusMutation.isPending,
    };
};