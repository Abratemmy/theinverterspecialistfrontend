"use client";

import { useRef, useState } from "react";

import {
    Image as ImageIcon,
    Upload,
    Trash2,
    Eye,
} from "lucide-react";
import {
    showSuccess,
    showError,
} from "@/lib/toast";

import {
    useGallery,
} from "@/hooks/useGallery";

import LoadingState from "@/components/common/LoadingState/LoadingState";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import DeleteModal from "@/components/common/DeleteModal";

import StatusSelect from "@/components/admin/StatusSelect";

import type {
    Gallery,
    GalleryStatus,
} from "@/types/gallery";


export default function AdminGalleryPage() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        gallery,
        isLoading,
        isError,
        uploadImage,
        isUploading,
        deleteImage,
        isDeleting,
        updateStatus,
        isUpdatingStatus,
    } = useGallery();


    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [title, setTitle] =
        useState("");

    const [altText, setAltText] =
        useState("");

    const [displayOrder, setDisplayOrder] =
        useState("0");

    const [deleteTarget, setDeleteTarget] =
        useState<Gallery | null>(null);


    // ==========================================
    // FILE SELECT
    // ==========================================

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            showError("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showError("Image size must not exceed 5MB.");
            return;
        }

        setSelectedFile(file);
    };


    // ==========================================
    // UPLOAD
    // ==========================================

    const handleUpload = async () => {

        if (!selectedFile) {
            showError("Please select an image.");
            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "image",
                selectedFile
            );

            formData.append(
                "title",
                title
            );

            formData.append(
                "alt_text",
                altText
            );

            formData.append(
                "display_order",
                displayOrder || "0"
            );


            await uploadImage(formData);

            showSuccess(
                "Gallery image uploaded successfully."
            );


            // Reset form
            setSelectedFile(null);
            setTitle("");
            setAltText("");
            setDisplayOrder("0");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error: unknown) {

            console.error(
                "UPLOAD GALLERY ERROR:",
                error
            );

            showError(
                "Failed to upload gallery image."
            );
        }
    };


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = async () => {

        if (!deleteTarget) return;

        try {

            await deleteImage(
                deleteTarget.id
            );

            showSuccess(
                "Gallery image deleted successfully."
            );

            setDeleteTarget(null);

        } catch (error: unknown) {

            console.error(
                "DELETE GALLERY ERROR:",
                error
            );

            showError(
                "Failed to delete gallery image."
            );
        }
    };


    // ==========================================
    // STATUS
    // ==========================================

    const handleStatusChange = async (
        galleryItem: Gallery,
        status: GalleryStatus
    ) => {

        try {

            await updateStatus({
                id: galleryItem.id,
                status,
            });

            showSuccess(
                "Gallery status updated successfully."
            );

        } catch (error: unknown) {

            console.error(
                "UPDATE GALLERY STATUS ERROR:",
                error
            );

            showError(
                "Failed to update gallery status."
            );
        }
    };


    if (isLoading) {
        return <LoadingState />;
    }


    if (isError) {
        return (
            <div className="p-6">
                <p className="text-red-500">
                    Failed to load gallery.
                </p>
            </div>
        );
    }


    return (
        <div className="space-y-8 p-6">

            {/* =====================================
                HEADER
            ====================================== */}

            <div>
                <h1 className="text-2xl font-semibold">
                    Gallery
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Upload and manage images displayed
                    on your website.
                </p>
            </div>


            {/* =====================================
                UPLOAD SECTION
            ====================================== */}

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="rounded-lg bg-green-50 p-2">
                        <Upload
                            size={20}
                            className="text-green-700"
                        />
                    </div>

                    <div>
                        <h2 className="font-semibold">
                            Upload Gallery Image
                        </h2>

                        <p className="text-sm text-gray-500">
                            JPG, PNG or WebP. Maximum 5MB.
                        </p>
                    </div>

                </div>


                <div className="grid gap-5 md:grid-cols-2">


                    {/* IMAGE */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium">
                            Image
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            className="block w-full rounded-lg border p-3 text-sm"
                        />

                        {selectedFile && (
                            <p className="mt-2 text-sm text-gray-500">
                                Selected: {selectedFile.name}
                            </p>
                        )}

                    </div>


                    {/* TITLE */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="e.g. Solar Installation"
                            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600"
                        />

                    </div>


                    {/* ALT TEXT */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Alt Text
                        </label>

                        <input
                            type="text"
                            value={altText}
                            onChange={(e) =>
                                setAltText(e.target.value)
                            }
                            placeholder="Describe the image"
                            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600"
                        />

                    </div>


                    {/* DISPLAY ORDER */}

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Display Order
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={displayOrder}
                            onChange={(e) =>
                                setDisplayOrder(e.target.value)
                            }
                            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600"
                        />

                    </div>

                </div>


                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#6f9736] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#19482a] disabled:cursor-not-allowed disabled:opacity-60"
                >

                    <Upload size={18} />

                    {isUploading
                        ? "Uploading..."
                        : "Upload Image"
                    }

                </button>

            </div>


            {/* =====================================
                GALLERY
            ====================================== */}

            <div>

                <div className="mb-5 flex items-center gap-2">

                    <ImageIcon size={20} />

                    <h2 className="text-lg font-semibold">
                        Gallery Images
                    </h2>

                    <span className="text-sm text-gray-500">
                        ({gallery.length})
                    </span>

                </div>


                {gallery.length === 0 ? (

                    <EmptyState
                        title="No gallery images"
                        description="Upload your first gallery image to get started."
                    />

                ) : (

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {gallery.map((item) => (

                            <div
                                key={item.id}
                                className=" rounded-xl border bg-white shadow-sm"
                            >

                                {/* IMAGE */}

                                <div className="relative aspect-square overflow-hidden bg-gray-100">

                                    <img
                                        src={item.image_url}
                                        alt={
                                            item.alt_text ||
                                            item.title ||
                                            "Gallery image"
                                        }
                                        className="h-full w-full object-cover"
                                    />

                                </div>


                                {/* CONTENT */}

                                <div className="space-y-4 p-4">

                                    <div>

                                        <h3 className="font-medium">
                                            {item.title ||
                                                "Untitled Image"}
                                        </h3>

                                        {/* <p className="mt-1 text-xs text-gray-500">
                                            Order: {item.display_order}
                                        </p> */}

                                    </div>


                                    {/* STATUS */}

                                    {/* <StatusSelect
                                        value={item.status}
                                        onChange={(value) =>
                                            handleStatusChange(
                                                item,
                                                value
                                            )
                                        }
                                        disabled={
                                            isUpdatingStatus
                                        }
                                        options={[
                                            {
                                                value: "active",
                                                label: "Active",
                                            },
                                            {
                                                value: "inactive",
                                                label: "Inactive",
                                            },
                                        ]}
                                    /> */}


                                    {/* ACTIONS */}

                                    <div className="flex gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                window.open(
                                                    item.image_url,
                                                    "_blank"
                                                )
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                                        >

                                            <Eye size={16} />

                                            View

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDeleteTarget(item)
                                            }
                                            disabled={isDeleting}
                                            className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                                        >

                                            <Trash2 size={16} />

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* =====================================
                DELETE MODAL
            ====================================== */}

            {deleteTarget && (
                <DeleteModal
                    open={true}
                    onClose={() =>
                        setDeleteTarget(null)
                    }
                    onConfirm={handleDelete}
                    title="Delete Gallery Image"
                    message="Are you sure you want to delete this gallery image? This will also remove the image from Cloudinary."
                />
            )}


        </div>
    );
}