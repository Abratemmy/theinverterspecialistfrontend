"use client";

import { useEffect, useState } from "react";

import {
    X,
    Loader2,
} from "lucide-react";

import { Brand } from "@/types/brand";


interface BrandModalProps {

    open: boolean;

    brand?: Brand | null;

    loading?: boolean;

    onClose: () => void;

    onSubmit: (data: {

        name: string;

        description: string;

        logo: string;

        website: string;

    }) => void;

}


export default function BrandModal({

    open,

    brand = null,

    loading = false,

    onClose,

    onSubmit,

}: BrandModalProps) {


    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [logo, setLogo] =
        useState("");

    const [website, setWebsite] =
        useState("");


    /*
    |--------------------------------------------------------------------------
    | Edit Mode
    |--------------------------------------------------------------------------
    */

    const isEditMode =
        Boolean(brand);


    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {

            return;

        }


        if (brand) {

            setName(
                brand.name || ""
            );

            setDescription(
                brand.description || ""
            );

            setLogo(
                brand.logo || ""
            );

            setWebsite(
                brand.website || ""
            );

        } else {

            setName("");

            setDescription("");

            setLogo("");

            setWebsite("");

        }

    }, [open, brand]);


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        onSubmit({

            name:
                name.trim(),

            description:
                description.trim(),

            logo:
                logo.trim(),

            website:
                website.trim(),

        });

    };


    /*
    |--------------------------------------------------------------------------
    | Don't Render
    |--------------------------------------------------------------------------
    */

    if (!open) {

        return null;

    }


    /*
    |--------------------------------------------------------------------------
    | Modal
    |--------------------------------------------------------------------------
    */

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
                                font-inter-custom
                            "
                        >

                            {isEditMode
                                ? "Edit Brand"
                                : "Add Brand"
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

                                ? "Update this brand's information."

                                : "Add a new brand to your store."

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
                            sm:grid-cols-2
                        "
                    >

                        {/* ================================================= */}
                        {/* NAME */}
                        {/* ================================================= */}

                        <div
                            className="
                                sm:col-span-2
                            "
                        >

                            <label
                                htmlFor="brand-name"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >

                                Brand Name

                                <span
                                    className="
                                        text-red-500
                                    "
                                >
                                    {" "}*
                                </span>

                            </label>


                            <input
                                id="brand-name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Samsung"
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
                        {/* WEBSITE */}
                        {/* ================================================= */}

                        <div
                            className="
                                sm:col-span-2
                            "
                        >

                            <label
                                htmlFor="brand-website"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >
                                Website
                            </label>


                            <input
                                id="brand-website"
                                type="url"
                                value={website}
                                onChange={(e) =>
                                    setWebsite(
                                        e.target.value
                                    )
                                }
                                placeholder="https://www.samsung.com"
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
                        {/* LOGO */}
                        {/* ================================================= */}

                        <div
                            className="
                                sm:col-span-2
                            "
                        >

                            <label
                                htmlFor="brand-logo"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >
                                Logo URL
                            </label>


                            <input
                                id="brand-logo"
                                type="url"
                                value={logo}
                                onChange={(e) =>
                                    setLogo(
                                        e.target.value
                                    )
                                }
                                placeholder="https://example.com/logo.png"
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

                        <div
                            className="
                                sm:col-span-2
                            "
                        >

                            <label
                                htmlFor="brand-description"
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
                                id="brand-description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Brief description of the brand..."
                                rows={4}
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
                                min-w-[130px]
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
                                    ? "Update Brand"
                                    : "Create Brand"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}