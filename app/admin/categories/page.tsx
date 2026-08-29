"use client";

import { useState } from "react";

import {
    Plus,
    Pencil,
    Trash2,
    FolderOpen,
} from "lucide-react";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    useCategories,
} from "@/hooks/useCategories";

import {
    createCategory,
    updateCategory,
    deleteCategory,
    CreateCategoryData,
    UpdateCategoryData,
} from "@/services/category.service";

import {
    Category,
} from "@/types/category";

import CategoryModal from "@/components/admin/categories/CategoryModal";

import LoadingState from "@/components/common/LoadingState/LoadingState";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import ErrorState from "@/components/common/ErrorState/ErrorState";

import DeleteModal from "@/components/common/DeleteModal";
import { showError, showSuccess } from "@/lib/toast";



export default function CategoriesPage() {

    // ==========================================================
    // QUERY CLIENT
    // ==========================================================

    const queryClient =
        useQueryClient();


    // ==========================================================
    // GET CATEGORIES
    // ==========================================================

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useCategories();


    const categories =
        data?.data ?? [];


    // ==========================================================
    // MODAL STATE
    // ==========================================================

    const [
        categoryModalOpen,
        setCategoryModalOpen,
    ] = useState(false);


    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState<Category | null>(null);


    // ==========================================================
    // DELETE MODAL STATE
    // ==========================================================

    const [
        deleteModalOpen,
        setDeleteModalOpen,
    ] = useState(false);


    const [
        categoryToDelete,
        setCategoryToDelete,
    ] = useState<Category | null>(null);


    // ==========================================================
    // CREATE CATEGORY MUTATION
    // ==========================================================

    const createMutation =
        useMutation({

            mutationFn:
                (category: CreateCategoryData) =>
                    createCategory(category),

            onSuccess: (response) => {

                showSuccess(
                    response?.message ||
                    "Category created successfully."
                );


                queryClient.invalidateQueries({

                    queryKey: [
                        "categories"
                    ],

                });


                setCategoryModalOpen(false);

            },

            onError: (error: any) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to create category."
                );

            },

        });


    // ==========================================================
    // UPDATE CATEGORY MUTATION
    // ==========================================================

    const updateMutation =
        useMutation({

            mutationFn: ({
                id,
                data,
            }: {
                id: number;
                data: UpdateCategoryData;
            }) =>
                updateCategory(
                    id,
                    data
                ),

            onSuccess: (response) => {

                showSuccess(
                    response?.message ||
                    "Category updated successfully."
                );


                queryClient.invalidateQueries({

                    queryKey: [
                        "categories"
                    ],

                });


                setCategoryModalOpen(false);

                setSelectedCategory(null);

            },

            onError: (error: any) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to update category."
                );

            },

        });


    // ==========================================================
    // DELETE CATEGORY MUTATION
    // ==========================================================

    const deleteMutation =
        useMutation({

            mutationFn:
                (id: number) =>
                    deleteCategory(id),

            onSuccess: (response) => {

                showSuccess(
                    response?.message ||
                    "Category deleted successfully."
                );


                queryClient.invalidateQueries({

                    queryKey: [
                        "categories"
                    ],

                });


                setDeleteModalOpen(false);

                setCategoryToDelete(null);

            },

            onError: (error: any) => {

                /*
                 * Important:
                 *
                 * If products are using the category,
                 * the backend will return:
                 *
                 * Cannot delete Solar Panels.
                 * 5 products are using this category...
                 *
                 * We display that message directly.
                 */

                showError(
                    error?.response?.data?.message ||
                    "Failed to delete category."
                );

            },

        });


    // ==========================================================
    // OPEN CREATE MODAL
    // ==========================================================

    const handleCreate = () => {

        setSelectedCategory(null);

        setCategoryModalOpen(true);

    };


    // ==========================================================
    // OPEN EDIT MODAL
    // ==========================================================

    const handleEdit = (
        category: Category
    ) => {

        setSelectedCategory(category);

        setCategoryModalOpen(true);

    };


    // ==========================================================
    // OPEN DELETE MODAL
    // ==========================================================

    const handleDelete = (
        category: Category
    ) => {

        setCategoryToDelete(category);

        setDeleteModalOpen(true);

    };


    // ==========================================================
    // CONFIRM DELETE
    // ==========================================================

    const handleConfirmDelete = () => {

        if (!categoryToDelete) {

            return;

        }


        deleteMutation.mutate(
            categoryToDelete.id
        );

    };


    // ==========================================================
    // SUBMIT CATEGORY
    // ==========================================================

    const handleSubmit = (
        formData: {
            name: string;
            description: string;
            image: string;
        }
    ) => {

        if (selectedCategory) {

            updateMutation.mutate({

                id:
                    selectedCategory.id,

                data: {

                    name:
                        formData.name,

                    description:
                        formData.description,

                    image:
                        formData.image,

                },

            });

            return;

        }


        createMutation.mutate({

            name:
                formData.name,

            description:
                formData.description,

            image:
                formData.image,

        });

    };


    // ==========================================================
    // MODAL LOADING
    // ==========================================================

    const modalLoading =
        createMutation.isPending ||
        updateMutation.isPending;


    // ==========================================================
    // PAGE LOADING
    // ==========================================================

    if (isLoading) {

        return (

            <LoadingState />

        );

    }


    // ==========================================================
    // PAGE ERROR
    // ==========================================================

    if (isError) {

        return (

            <ErrorState
                description={
                    error instanceof Error
                        ? error.message
                        : "Failed to load categories."
                }
                onRetry={() => refetch()}
            />

        );

    }


    // ==========================================================
    // PAGE
    // ==========================================================

    return (

        <div className="space-y-6">


            {/* ================================================== */}
            {/* HEADER */}
            {/* ================================================== */}

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
                        Categories
                    </h1>


                    <p
                        className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Manage product categories
                        for your store.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleCreate}
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
                        text-white
                        transition
                        hover:opacity-90
                    "
                >

                    <Plus size={18} />

                    Add Category

                </button>

            </div>


            {/* ================================================== */}
            {/* EMPTY STATE */}
            {/* ================================================== */}

            {categories.length === 0 ? (
                <>
                <EmptyState
                    title="No categories found"
                    description="You haven't created any categories yet."
                    
                />
                <button
                            type="button"
                            onClick={handleCreate}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-primary
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                            "
                        >

                            <Plus size={17} />

                            Add Category

                        </button>
                </>

            ) : (


                /* ================================================== */
                /* TABLE */
                /* ================================================== */

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

                    <div
                        className="
                            overflow-x-auto
                        "
                    >

                        <table
                            className="
                                w-full
                                min-w-[700px]
                            "
                        >

                            <thead>

                                <tr
                                    className="
                                        border-b
                                        border-gray-200
                                        bg-gray-50
                                    "
                                >

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Category
                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Description
                                    </th>


                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-muted-foreground
                                        "
                                    >
                                        Created
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

                                {categories.map(
                                    (category) => (

                                        <tr
                                            key={
                                                category.id
                                            }
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

                                            {/* CATEGORY */}

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
                                                            bg-primary/10
                                                        "
                                                    >

                                                        {category.image ? (

                                                            <img
                                                                src={
                                                                    category.image
                                                                }
                                                                alt={
                                                                    category.name
                                                                }
                                                                className="
                                                                    h-full
                                                                    w-full
                                                                    object-cover
                                                                "
                                                            />

                                                        ) : (

                                                            <FolderOpen
                                                                size={20}
                                                                className="
                                                                    text-primary
                                                                "
                                                            />

                                                        )}

                                                    </div>


                                                    <div>

                                                        <p
                                                            className="
                                                                font-medium
                                                            "
                                                        >
                                                            {
                                                                category.name
                                                            }
                                                        </p>


                                                        <p
                                                            className="
                                                                text-xs
                                                                text-muted-foreground
                                                            "
                                                        >
                                                            /
                                                            {
                                                                category.slug
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* DESCRIPTION */}

                                            <td
                                                className="
                                                    max-w-sm
                                                    px-6
                                                    py-4
                                                "
                                            >

                                                <p
                                                    className="
                                                        truncate
                                                        text-sm
                                                        text-muted-foreground
                                                    "
                                                    title={
                                                        category.description ||
                                                        ""
                                                    }
                                                >
                                                    {category.description ||
                                                        "—"}
                                                </p>

                                            </td>


                                            {/* CREATED */}

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-muted-foreground
                                                "
                                            >

                                                {category.created_at
                                                    ? new Date(
                                                        category.created_at
                                                    ).toLocaleDateString()
                                                    : "—"}

                                            </td>


                                            {/* ACTIONS */}

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
                                                            handleEdit(
                                                                category
                                                            )
                                                        }
                                                        disabled={
                                                            updateMutation.isPending ||
                                                            deleteMutation.isPending
                                                        }
                                                        className="
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            transition
                                                            hover:bg-primary/10
                                                            hover:text-primary
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                        title="Edit category"
                                                    >

                                                        <Pencil
                                                            size={16}
                                                        />

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                category
                                                            )
                                                        }
                                                        disabled={
                                                            deleteMutation.isPending
                                                        }
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
                                                            hover:bg-red-50
                                                            hover:text-red-600
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-50
                                                        "
                                                        title="Delete category"
                                                    >

                                                        <Trash2
                                                            size={16}
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}


            {/* ================================================== */}
            {/* CATEGORY MODAL */}
            {/* ================================================== */}

            <CategoryModal

                open={
                    categoryModalOpen
                }

                category={
                    selectedCategory
                }

                loading={
                    modalLoading
                }

                onClose={() => {

                    if (modalLoading) {

                        return;

                    }

                    setCategoryModalOpen(false);

                    setSelectedCategory(null);

                }}

                onSubmit={
                    handleSubmit
                }

            />


            {/* ================================================== */}
            {/* DELETE MODAL */}
            {/* ================================================== */}

            <DeleteModal

                open={
                    deleteModalOpen
                }

                title="Delete Category"

                loading={
                    deleteMutation.isPending
                }
                onClose={() => {

                    if (
                        deleteMutation.isPending
                    ) {

                        return;

                    }

                    setDeleteModalOpen(false);

                    setCategoryToDelete(null);

                }}

                onConfirm={
                    handleConfirmDelete
                }

            />

        </div>

    );

}