"use client";

import { useEffect, useState } from "react";

import {
    X,
    Loader2,
} from "lucide-react";

import { Category } from "@/types/category";


interface CategoryModalProps {

    open: boolean;

    category?: Category | null;

    loading?: boolean;

    onClose: () => void;

    onSubmit: (data: {

        name: string;

        description: string;

        image: string;

    }) => void;

}


export default function CategoryModal({

    open,

    category = null,

    loading = false,

    onClose,

    onSubmit,

}: CategoryModalProps) {


    // ==========================================================
    // FORM STATE
    // ==========================================================

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [image, setImage] =
        useState("");


    // ==========================================================
    // EDIT MODE
    // ==========================================================

    const isEditMode =
        Boolean(category);


    // ==========================================================
    // POPULATE FORM
    // ==========================================================

    useEffect(() => {

        if (!open) {

            return;

        }


        if (category) {

            setName(
                category.name || ""
            );

            setDescription(
                category.description || ""
            );

            setImage(
                category.image || ""
            );

        } else {

            setName("");

            setDescription("");

            setImage("");

        }

    }, [open, category]);


    // ==========================================================
    // SUBMIT
    // ==========================================================

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        onSubmit({

            name:
                name.trim(),

            description:
                description.trim(),

            image:
                image.trim(),

        });

    };


    // ==========================================================
    // DON'T RENDER
    // ==========================================================

    if (!open) {

        return null;

    }


    // ==========================================================
    // MODAL
    // ==========================================================

    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/80
                p-4
                backdrop-blur-lg
            "
        >

            <div
                className="
                    w-full
                    max-w-2xl
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-2xl
                "
            >

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        px-6
                        py-5
                    "
                >

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                            "
                        >

                            {isEditMode
                                ? "Edit Category"
                                : "Add Category"
                            }

                        </h2>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-muted-foreground
                            "
                        >

                            {isEditMode

                                ? "Update this category's information."

                                : "Add a new category to your store."

                            }

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            transition
                            hover:bg-muted
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <X
                            size={19}
                        />

                    </button>

                </div>


                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        max-h-[80vh]
                        overflow-y-auto
                        p-6
                    "
                >

                    <div
                        className="
                            grid
                            gap-5
                        "
                    >

                        {/* ================================================= */}
                        {/* CATEGORY NAME */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="category-name"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >

                                Category Name

                                <span
                                    className="
                                        text-red-500
                                    "
                                >
                                    {" "}*
                                </span>

                            </label>


                            <input
                                id="category-name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Solar Panels"
                                required
                                disabled={loading}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    bg-background
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/10
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            />

                        </div>


                        {/* ================================================= */}
                        {/* IMAGE */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="category-image"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >

                                Image URL

                            </label>


                            <input
                                id="category-image"
                                type="url"
                                value={image}
                                onChange={(e) =>
                                    setImage(
                                        e.target.value
                                    )
                                }
                                placeholder="https://example.com/category.jpg"
                                disabled={loading}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    bg-background
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/10
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            />

                        </div>


                        {/* ================================================= */}
                        {/* DESCRIPTION */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="category-description"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >

                                Description

                            </label>


                            <textarea
                                id="category-description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Brief description of the category..."
                                rows={5}
                                disabled={loading}
                                className="
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    bg-background
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/10
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            />

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* ACTIONS */}
                    {/* ================================================= */}

                    <div
                        className="
                            mt-6
                            flex
                            justify-end
                            gap-3
                            border-t
                            pt-5
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="
                                rounded-xl
                                border
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                transition
                                hover:bg-muted
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex
                                min-w-[140px]
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-primary
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-primary-foreground
                                transition
                                hover:opacity-90
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading && (

                                <Loader2
                                    size={17}
                                    className="
                                        animate-spin
                                    "
                                />

                            )}


                            {loading

                                ? isEditMode
                                    ? "Updating..."
                                    : "Creating..."

                                : isEditMode
                                    ? "Update Category"
                                    : "Create Category"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}