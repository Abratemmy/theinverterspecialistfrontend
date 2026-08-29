"use client";

import { useState } from "react";

import {
    Award,
    Edit,
    Plus,
    Trash2,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import {
    useBrands,
} from "@/hooks/useBrands";

import {
    createBrand,
    updateBrand,
    deleteBrand,
    CreateBrandData,
    UpdateBrandData,
} from "@/services/brandService";

import BrandModal from "@/components/admin/brands/BrandModal";

import LoadingState from "@/components/common/LoadingState/LoadingState";
import ErrorState from "@/components/common/ErrorState/ErrorState";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import DeleteModal from "@/components/common/DeleteModal";

import {
    showSuccess,
    showError,
} from "@/lib/toast";

import { Brand } from "@/types/brand";


export default function BrandsPage() {


    /*
    |--------------------------------------------------------------------------
    | Brands
    |--------------------------------------------------------------------------
    */

    const {
        data,
        isLoading,
        isError,
        error,
    } = useBrands();


    /*
    |--------------------------------------------------------------------------
    | React Query
    |--------------------------------------------------------------------------
    */

    const queryClient =
        useQueryClient();


    /*
    |--------------------------------------------------------------------------
    | Modal
    |--------------------------------------------------------------------------
    */

    const [modalOpen, setModalOpen] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | Selected Brand
    |--------------------------------------------------------------------------
    */

    const [selectedBrand, setSelectedBrand] =
        useState<Brand | null>(null);


    /*
    |--------------------------------------------------------------------------
    | Create / Update Loading
    |--------------------------------------------------------------------------
    */

    const [saving, setSaving] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | Delete Loading
    |--------------------------------------------------------------------------
    */

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

    const [brandToDelete, setBrandToDelete] =
        useState<Brand | null>(null);


    /*
    |--------------------------------------------------------------------------
    | Brands Data
    |--------------------------------------------------------------------------
    */

    const brands =
        data?.data || [];


    /*
    |--------------------------------------------------------------------------
    | Open Create Modal
    |--------------------------------------------------------------------------
    */

    const handleAddBrand = () => {

        setSelectedBrand(null);

        setModalOpen(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Open Edit Modal
    |--------------------------------------------------------------------------
    */

    const handleEditBrand = (
        brand: Brand
    ) => {

        setSelectedBrand(brand);

        setModalOpen(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Close Modal
    |--------------------------------------------------------------------------
    */

    const handleCloseModal = () => {

        if (saving) {

            return;

        }

        setModalOpen(false);

        setSelectedBrand(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Create / Update Brand
    |--------------------------------------------------------------------------
    */

    const handleSaveBrand = async (
        formData: {
            name: string;
            slug: string;
            description: string;
            logo: string;
            website: string;
        }
    ) => {

        try {

            setSaving(true);


            /*
             * UPDATE
             */

            if (selectedBrand) {

                const updateData: UpdateBrandData = {

                    name: formData.name,

                    slug: formData.slug,

                    description:
                        formData.description,

                    logo:
                        formData.logo,

                    website:
                        formData.website,

                };


                await updateBrand(
                    selectedBrand.id,
                    updateData
                );


                showSuccess(
                    "Brand updated successfully."
                );

            }


            /*
             * CREATE
             */

            else {

                const createData: CreateBrandData = {

                    name: formData.name,

                    slug: formData.slug,

                    description:
                        formData.description,

                    logo:
                        formData.logo,

                    website:
                        formData.website,

                };


                await createBrand(
                    createData
                );


                showSuccess(
                    "Brand created successfully."
                );

            }


            /*
             * Refresh brands
             */

            await queryClient.invalidateQueries({

                queryKey: ["brands"],

            });


            /*
             * Close modal
             */

            setModalOpen(false);

            setSelectedBrand(null);


        } catch (error: any) {

            console.error(
                "Save brand error:",
                error
            );


            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong.";


            showError(message);


        } finally {

            setSaving(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Delete Brand
    |--------------------------------------------------------------------------
    */
    const handleDeleteBrand = (
        brand: Brand
    ) => {
        setBrandToDelete(brand);
        setDeleteModalOpen(true);

    };

    const confirmDeleteBrand = async () => {

        if (!brandToDelete) {
            return;
        }

        try {

            setDeletingId(
                brandToDelete.id
            );


            await deleteBrand(
                brandToDelete.id
            );


            /*
            |--------------------------------------------------------------------------
            | Refresh brands
            |--------------------------------------------------------------------------
            */

            await queryClient.invalidateQueries({

                queryKey: ["brands"],

            });


            /*
            |--------------------------------------------------------------------------
            | Success
            |--------------------------------------------------------------------------
            */

            showSuccess(
                "Brand deleted successfully."
            );


            /*
            |--------------------------------------------------------------------------
            | Close modal
            |--------------------------------------------------------------------------
            */

            setDeleteModalOpen(false);

            setBrandToDelete(null);


            } catch (error: any) {

                console.error(
                    "Delete brand error:",
                    error
                );


                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to delete brand.";


                showError(message);


            } finally {

                setDeletingId(null);

            }

    };

    const closeDeleteModal = () => {

        if (deletingId !== null) {
            return;
        }

        setDeleteModalOpen(false);

        setBrandToDelete(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (isLoading) {

        return (

            <LoadingState
                text="Loading brands..."
            />

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (isError) {

        const errorMessage =
            (error as any)
                ?.response
                ?.data
                ?.message ||
            "Failed to load brands.";


        return (

            <ErrorState
                description={
                    errorMessage
                }
            />

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Page
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                space-y-6
            "
        >


            {/* ========================================================= */}
            {/* PAGE HEADER */}
            {/* ========================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    mb-5
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                        "
                    >
                        Brands
                    </h1>


                    <p
                        className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Manage the brands available
                        in your store.
                    </p>

                </div>


                {/* ADD BRAND */}

                <button
                    type="button"
                    onClick={
                        handleAddBrand
                    }
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-primary-foreground
                        transition
                        hover:opacity-90
                    "
                >

                    <Plus
                        size={18}
                    />

                    Add Brand

                </button>

            </div>


            {/* ========================================================= */}
            {/* EMPTY */}
            {/* ========================================================= */}

            {brands.length === 0 ? (
                <EmptyState
                    title="No brands found"
                    description="
                        You haven't added any brands yet.
                        Add your first brand to get started.
                    "
                />

            ) : (

                /* ===================================================== */
                /* BRAND TABLE */
                /* ===================================================== */

                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        mt-6
                    "
                >

                    {/* ================================================= */}
                    {/* DESKTOP TABLE */}
                    {/* ================================================= */}

                    <div
                        className="
                            hidden
                            md:block
                        "
                    >

                        <table
                            className="
                                w-full
                            "
                        >

                            <thead>

                                <tr
                                    className="
                                        border-b
                                        border-gray-200
                                        bg-gray-50
                                        text-left
                                    "
                                >

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Brand
                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Slug
                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Website
                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-right
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {brands.map(
                                    (brand) => (

                                        <tr
                                            key={brand.id}
                                            className="
                                                cursor-pointer
                                                border-b
                                                border-gray-100
                                                transition
                                                odd:bg-[var(--color-primary-light)]
                                                even:bg-[var(--color-background)]
                                                hover:bg-gray-100
                                            "
                                        >

                                            {/* ================================================= */}
                                            {/* BRAND */}
                                            {/* ================================================= */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-11
                                                            w-11
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            overflow-hidden
                                                            rounded-xl
                                                            border
                                                            bg-muted/30
                                                        "
                                                    >

                                                        {brand.logo ? (

                                                            <img
                                                                src={
                                                                    brand.logo
                                                                }
                                                                alt={
                                                                    brand.name
                                                                }
                                                                className="
                                                                    h-full
                                                                    w-full
                                                                    object-contain
                                                                    p-1
                                                                "
                                                            />

                                                        ) : (

                                                            <Award
                                                                size={20}
                                                                className="
                                                                    text-muted-foreground
                                                                "
                                                            />

                                                        )}

                                                    </div>


                                                    <div
                                                        className="
                                                            min-w-0
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                font-medium
                                                            "
                                                        >
                                                            {
                                                                brand.name
                                                            }
                                                        </p>


                                                        {brand.description && (

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    max-w-sm
                                                                    truncate
                                                                    text-xs
                                                                    text-muted-foreground
                                                                "
                                                            >
                                                                {
                                                                    brand.description
                                                                }
                                                            </p>

                                                        )}

                                                    </div>

                                                </div>

                                            </td>


                                            {/* ================================================= */}
                                            {/* SLUG */}
                                            {/* ================================================= */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-muted-foreground
                                                "
                                            >

                                                /{brand.slug}

                                            </td>


                                            {/* ================================================= */}
                                            {/* WEBSITE */}
                                            {/* ================================================= */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >

                                                {brand.website ? (

                                                    <a
                                                        href={
                                                            brand.website
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="
                                                            text-sm
                                                            text-primary
                                                            hover:underline
                                                        "
                                                    >
                                                        Visit website
                                                    </a>

                                                ) : (

                                                    <span
                                                        className="
                                                            text-sm
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        —
                                                    </span>

                                                )}

                                            </td>


                                            {/* ================================================= */}
                                            {/* ACTIONS */}
                                            {/* ================================================= */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-end
                                                        gap-2
                                                    "
                                                >

                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEditBrand(
                                                                brand
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            brand.id
                                                        }
                                                        title="Edit brand"
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            transition
                                                            hover:bg-muted
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                    >

                                                        <Edit
                                                            size={16}
                                                        />

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDeleteBrand(
                                                                brand
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            brand.id
                                                        }
                                                        title="Delete brand"
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            text-red-500
                                                            transition
                                                            hover:bg-red-500/10
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                    >

                                                        {deletingId ===
                                                        brand.id ? (

                                                            <span
                                                                className="
                                                                    h-4
                                                                    w-4
                                                                    animate-spin
                                                                    rounded-full
                                                                    border-2
                                                                    border-red-500
                                                                    border-t-transparent
                                                                "
                                                            />

                                                        ) : (

                                                            <Trash2
                                                                size={16}
                                                            />

                                                        )}

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* ================================================= */}
                    {/* MOBILE */}
                    {/* ================================================= */}

                    <div
                        className="
                            divide-y
                            md:hidden
                        "
                    >

                        {brands.map(
                            (brand) => (

                                <div
                                    key={brand.id}
                                    className="
                                        p-5
                                    "
                                >

                                    {/* BRAND */}

                                    <div
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                bg-muted/30
                                            "
                                        >

                                            {brand.logo ? (

                                                <img
                                                    src={
                                                        brand.logo
                                                    }
                                                    alt={
                                                        brand.name
                                                    }
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-contain
                                                        p-1
                                                    "
                                                />

                                            ) : (

                                                <Award
                                                    size={20}
                                                    className="
                                                        text-muted-foreground
                                                    "
                                                />

                                            )}

                                        </div>


                                        <div
                                            className="
                                                min-w-0
                                                flex-1
                                            "
                                        >

                                            <p
                                                className="
                                                    font-medium
                                                "
                                            >
                                                {
                                                    brand.name
                                                }
                                            </p>


                                            <p
                                                className="
                                                    mt-1
                                                    truncate
                                                    text-xs
                                                    text-muted-foreground
                                                "
                                            >
                                                /{brand.slug}
                                            </p>

                                        </div>

                                    </div>


                                    {/* WEBSITE */}

                                    {brand.website && (

                                        <a
                                            href={
                                                brand.website
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                mt-3
                                                block
                                                text-sm
                                                text-primary
                                                hover:underline
                                            "
                                        >
                                            {brand.website}
                                        </a>

                                    )}


                                    {/* ACTIONS */}

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEditBrand(
                                                    brand
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                brand.id
                                            }
                                            className="
                                                inline-flex
                                                flex-1
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                border
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-medium
                                                transition
                                                hover:bg-muted
                                                disabled:opacity-50
                                            "
                                        >

                                            <Edit
                                                size={16}
                                            />

                                            Edit

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteBrand(
                                                    brand
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                brand.id
                                            }
                                            className="
                                                inline-flex
                                                flex-1
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-red-500/20
                                                px-4
                                                py-2.5
                                                text-sm
                                                font-medium
                                                text-red-500
                                                transition
                                                hover:bg-red-500/10
                                                disabled:opacity-50
                                            "
                                        >

                                            {deletingId ===
                                            brand.id ? (

                                                <span
                                                    className="
                                                        h-4
                                                        w-4
                                                        animate-spin
                                                        rounded-full
                                                        border-2
                                                        border-red-500
                                                        border-t-transparent
                                                    "
                                                />

                                            ) : (

                                                <Trash2
                                                    size={16}
                                                />

                                            )}

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}


            {/* ========================================================= */}
            {/* BRAND MODAL */}
            {/* ========================================================= */}

            <BrandModal

                open={
                    modalOpen
                }

                brand={
                    selectedBrand
                }

                loading={
                    saving
                }

                onClose={
                    handleCloseModal
                }

                onSubmit={
                    handleSaveBrand
                }

            />

            <DeleteModal

                open={
                    deleteModalOpen
                }

                title="Delete Brand"

                message="
                    Are you sure you want to delete
                "

                itemName={
                    brandToDelete?.name
                }

                loading={
                    deletingId !== null
                }

                onClose={
                    closeDeleteModal
                }

                onConfirm={
                    confirmDeleteBrand
                }

            />

        </div>

    );

}