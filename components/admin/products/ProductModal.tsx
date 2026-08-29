"use client";

import { useEffect, useState } from "react";

import {
    X,
    Loader2,
    Plus,
    Trash2,
} from "lucide-react";

import { Product } from "@/types/product";


// ============================================================
// TYPES
// ============================================================

interface CategoryOption {
    id: number;
    name: string;
}

interface BrandOption {
    id: number;
    name: string;
}


interface ProductFormData {

    product: {

        category_id: number;

        brand_id: number;

        name: string;

        short_description: string;

        description: string;

        additional_information: string;

        price: number;

        discount_price: number | null;

        quantity: number;

        weight: number | null;

        warranty: string;

        featured: boolean;

    };

    media: {

        media_type: "image" | "video";

        media_url: string;

        thumbnail_url: string;

        alt_text: string;

        is_primary: boolean;

        display_order: number;

    }[];

    specifications: {

        specification_name: string;

        specification_value: string;

        display_order: number;

    }[];

}


// ============================================================
// PROPS
// ============================================================

interface ProductModalProps {

    open: boolean;

    product?: Product | null;

    categories: CategoryOption[];

    brands: BrandOption[];

    loading?: boolean;

    onClose: () => void;

    onSubmit: (
        data: ProductFormData
    ) => void;

}


// ============================================================
// COMPONENT
// ============================================================

export default function ProductModal({

    open,

    product = null,

    categories,

    brands,

    loading = false,

    onClose,

    onSubmit,

}: ProductModalProps) {


    // ========================================================
    // EDIT MODE
    // ========================================================

    const isEditMode =
        Boolean(product);


    // ========================================================
    // BASIC PRODUCT STATE
    // ========================================================

    const [
        categoryId,
        setCategoryId
    ] = useState<number | "">("");

    const [
        brandId,
        setBrandId
    ] = useState<number | "">("");

    const [
        name,
        setName
    ] = useState("");

    const [
        shortDescription,
        setShortDescription
    ] = useState("");

    const [
        description,
        setDescription
    ] = useState("");

    const [
        additionalInformation,
        setAdditionalInformation
    ] = useState("");

    const [
        price,
        setPrice
    ] = useState("");

    const [
        discountPrice,
        setDiscountPrice
    ] = useState("");

    const [
        quantity,
        setQuantity
    ] = useState("0");

    const [
        weight,
        setWeight
    ] = useState("");

    const [
        warranty,
        setWarranty
    ] = useState("");

    const [
        featured,
        setFeatured
    ] = useState(false);


    // ========================================================
    // MEDIA
    // ========================================================

    const [
        media,
        setMedia
    ] = useState<
        ProductFormData["media"]
    >([]);


    // ========================================================
    // SPECIFICATIONS
    // ========================================================

    const [
        specifications,
        setSpecifications
    ] = useState<
        ProductFormData["specifications"]
    >([]);


    // ========================================================
    // POPULATE FORM
    // ========================================================

    useEffect(() => {

        if (!open) {

            return;

        }


        if (product) {

            setCategoryId(
                product.category_id
            );

            setBrandId(
                product.brand_id
            );

            setName(
                product.name || ""
            );

            setShortDescription(
                product.short_description || ""
            );

            setDescription(
                product.description || ""
            );

            setAdditionalInformation(
                product.additional_information || ""
            );

            setPrice(
                String(product.price ?? "")
            );

            setDiscountPrice(
                product.discount_price !== null &&
                product.discount_price !== undefined
                    ? String(product.discount_price)
                    : ""
            );

            setQuantity(
                String(product.quantity ?? 0)
            );

            setWeight(
                product.weight !== null &&
                product.weight !== undefined
                    ? String(product.weight)
                    : ""
            );

            setWarranty(
                product.warranty || ""
            );

            setFeatured(
                Boolean(product.featured)
            );


            setMedia(

                (product.media || []).map(
                    (item, index) => ({

                        media_type:
                            item.media_type,

                        media_url:
                            item.media_url,

                        thumbnail_url:
                            item.thumbnail_url || "",

                        alt_text:
                            item.alt_text || "",

                        is_primary:
                            Boolean(
                                item.is_primary
                            ),

                        display_order:
                            item.display_order ??
                            index + 1,

                    })
                )

            );


            setSpecifications(

                (product.specifications || []).map(
                    (item, index) => ({

                        specification_name:
                            item.specification_name,

                        specification_value:
                            item.specification_value,

                        display_order:
                            item.display_order ??
                            index + 1,

                    })
                )

            );

        } else {

            resetForm();

        }

    }, [open, product]);


    // ========================================================
    // RESET
    // ========================================================

    const resetForm = () => {

        setCategoryId("");

        setBrandId("");

        setName("");

        setShortDescription("");

        setDescription("");

        setAdditionalInformation("");

        setPrice("");

        setDiscountPrice("");

        setQuantity("0");

        setWeight("");

        setWarranty("");

        setFeatured(false);

        setMedia([]);

        setSpecifications([]);

    };


    // ========================================================
    // MEDIA FUNCTIONS
    // ========================================================

    const addMedia = () => {

        setMedia(prev => [

            ...prev,

            {

                media_type: "image",

                media_url: "",

                thumbnail_url: "",

                alt_text: "",

                is_primary:
                    prev.length === 0,

                display_order:
                    prev.length + 1,

            }

        ]);

    };


    const removeMedia = (
        index: number
    ) => {

        setMedia(prev => {

            const updated =
                prev.filter(
                    (_, i) =>
                        i !== index
                );

            return updated.map(
                (item, i) => ({

                    ...item,

                    display_order:
                        i + 1,

                })
            );

        });

    };


    const updateMedia = (
        index: number,
        field: string,
        value: string | boolean
    ) => {

        setMedia(prev =>

            prev.map(
                (item, i) => {

                    if (i !== index) {

                        return item;

                    }

                    return {

                        ...item,

                        [field]: value,

                    };

                }
            )

        );

    };


    const setPrimaryMedia = (
        index: number
    ) => {

        setMedia(prev =>

            prev.map(
                (item, i) => ({

                    ...item,

                    is_primary:
                        i === index,

                })
            )

        );

    };


    // ========================================================
    // SPECIFICATION FUNCTIONS
    // ========================================================

    const addSpecification = () => {

        setSpecifications(prev => [

            ...prev,

            {

                specification_name: "",

                specification_value: "",

                display_order:
                    prev.length + 1,

            }

        ]);

    };


    const removeSpecification = (
        index: number
    ) => {

        setSpecifications(prev =>

            prev
                .filter(
                    (_, i) =>
                        i !== index
                )
                .map(
                    (item, i) => ({

                        ...item,

                        display_order:
                            i + 1,

                    })
                )

        );

    };


    const updateSpecification = (
        index: number,
        field:
            | "specification_name"
            | "specification_value",
        value: string
    ) => {

        setSpecifications(prev =>

            prev.map(
                (item, i) => {

                    if (i !== index) {

                        return item;

                    }

                    return {

                        ...item,

                        [field]: value,

                    };

                }
            )

        );

    };


    // ========================================================
    // SUBMIT
    // ========================================================

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        if (!categoryId || !brandId) {

            return;

        }


        const data: ProductFormData = {

            product: {

                category_id:
                    Number(categoryId),

                brand_id:
                    Number(brandId),

                name:
                    name.trim(),

                short_description:
                    shortDescription.trim(),

                description:
                    description.trim(),

                additional_information:
                    additionalInformation.trim(),

                price:
                    Number(price),

                discount_price:
                    discountPrice
                        ? Number(discountPrice)
                        : null,

                quantity:
                    Number(quantity),

                weight:
                    weight
                        ? Number(weight)
                        : null,

                warranty:
                    warranty.trim(),

                featured,

            },


            media: media
                .filter(
                    item =>
                        item.media_url.trim()
                )
                .map(
                    item => ({

                        ...item,

                        media_url:
                            item.media_url.trim(),

                        thumbnail_url:
                            item.thumbnail_url.trim(),

                        alt_text:
                            item.alt_text.trim(),

                    })
                ),


            specifications:
                specifications
                    .filter(
                        item =>
                            item.specification_name.trim() &&
                            item.specification_value.trim()
                    )
                    .map(
                        item => ({

                            ...item,

                            specification_name:
                                item.specification_name.trim(),

                            specification_value:
                                item.specification_value.trim(),

                        })
                    ),

        };


        onSubmit(data);

    };


    // ========================================================
    // DON'T RENDER
    // ========================================================

    if (!open) {

        return null;

    }


    // ========================================================
    // RENDER
    // ========================================================

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
                    flex
                    max-h-[92vh]
                    w-full
                    max-w-5xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
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
                        shrink-0
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
                                font-[var(--font-inter)]
                            "
                        >

                            {isEditMode
                                ? "Edit Product"
                                : "Add Product"
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

                                ? "Update this product's information."

                                : "Add a new product to your store."

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
                    onSubmit={handleSubmit}
                    className="
                        flex-1
                        overflow-y-auto
                        p-6
                    "
                >

                    {/* ================================================= */}
                    {/* BASIC INFORMATION */}
                    {/* ================================================= */}

                    <section>

                        <div className="mb-5">

                            <h3
                                className="
                                    text-base
                                    font-semibold
                                "
                            >
                                Basic Information
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                Enter the main details of the product.
                            </p>

                        </div>


                        <div
                            className="
                                grid
                                gap-5
                                md:grid-cols-2
                            "
                        >

                            {/* NAME */}

                            <div
                                className="
                                    md:col-span-2
                                "
                            >

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Product Name
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>


                                <input
                                    type="text"
                                    value={name}
                                    onChange={e =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Growatt 5KVA Hybrid Inverter"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* CATEGORY */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Category
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>


                                <select
                                    value={categoryId}
                                    onChange={e =>
                                        setCategoryId(
                                            e.target.value
                                                ? Number(
                                                    e.target.value
                                                )
                                                : ""
                                        )
                                    }
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map(
                                        category => (

                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* BRAND */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Brand
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>


                                <select
                                    value={brandId}
                                    onChange={e =>
                                        setBrandId(
                                            e.target.value
                                                ? Number(
                                                    e.target.value
                                                )
                                                : ""
                                        )
                                    }
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                >

                                    <option value="">
                                        Select brand
                                    </option>

                                    {brands.map(
                                        brand => (

                                            <option
                                                key={brand.id}
                                                value={brand.id}
                                            >
                                                {brand.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>

                    </section>


                    {/* ================================================= */}
                    {/* PRICING & INVENTORY */}
                    {/* ================================================= */}

                    <section
                        className="
                            mt-8
                            border-t
                            pt-8
                        "
                    >

                        <div className="mb-5">

                            <h3
                                className="
                                    text-base
                                    font-semibold
                                "
                            >
                                Pricing & Inventory
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                Set the product price and inventory information.
                            </p>

                        </div>


                        <div
                            className="
                                grid
                                gap-5
                                sm:grid-cols-2
                                lg:grid-cols-3
                            "
                        >

                            {/* PRICE */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Price
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>


                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    onChange={e =>
                                        setPrice(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* DISCOUNT PRICE */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Discount Price
                                </label>


                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={discountPrice}
                                    onChange={e =>
                                        setDiscountPrice(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Optional"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* QUANTITY */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Quantity
                                </label>


                                <input
                                    type="number"
                                    min="0"
                                    value={quantity}
                                    onChange={e =>
                                        setQuantity(
                                            e.target.value
                                        )
                                    }
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* WEIGHT */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Weight
                                </label>


                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={weight}
                                    onChange={e =>
                                        setWeight(
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. 25.5"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* WARRANTY */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Warranty
                                </label>


                                <input
                                    type="text"
                                    value={warranty}
                                    onChange={e =>
                                        setWarranty(
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. 2 Years"
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* FEATURED */}

                            <div
                                className="
                                    flex
                                    items-end
                                "
                            >

                                <label
                                    className="
                                        flex
                                        cursor-pointer
                                        items-center
                                        gap-3
                                        pb-3
                                    "
                                >

                                    <input
                                        type="checkbox"
                                        checked={featured}
                                        onChange={e =>
                                            setFeatured(
                                                e.target.checked
                                            )
                                        }
                                        disabled={loading}
                                        className="
                                            h-4
                                            w-4
                                        "
                                    />

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Featured Product
                                    </span>

                                </label>

                            </div>

                        </div>

                    </section>


                    {/* ================================================= */}
                    {/* DESCRIPTIONS */}
                    {/* ================================================= */}

                    <section
                        className="
                            mt-8
                            border-t
                            pt-8
                        "
                    >

                        <div className="mb-5">

                            <h3
                                className="
                                    text-base
                                    font-semibold
                                "
                            >
                                Product Description
                            </h3>

                        </div>


                        <div
                            className="
                                space-y-5
                            "
                        >

                            {/* SHORT DESCRIPTION */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Short Description
                                </label>


                                <textarea
                                    value={shortDescription}
                                    onChange={e =>
                                        setShortDescription(
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                    placeholder="A short summary of the product..."
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <label
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
                                    value={description}
                                    onChange={e =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    rows={6}
                                    placeholder="Detailed product description..."
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>


                            {/* ADDITIONAL INFORMATION */}

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                    "
                                >
                                    Additional Information
                                </label>


                                <textarea
                                    value={
                                        additionalInformation
                                    }
                                    onChange={e =>
                                        setAdditionalInformation(
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    placeholder="Additional information about the product..."
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
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/10
                                        disabled:opacity-60
                                    "
                                />

                            </div>

                        </div>

                    </section>


                    {/* ================================================= */}
                    {/* SPECIFICATIONS */}
                    {/* ================================================= */}

                    <section
                        className="
                            mt-8
                            border-t
                            pt-8
                        "
                    >

                        <div
                            className="
                                mb-5
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        text-base
                                        font-semibold
                                    "
                                >
                                    Specifications
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Add technical specifications for this product.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={
                                    addSpecification
                                }
                                disabled={loading}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    transition
                                    hover:bg-muted
                                    disabled:opacity-50
                                "
                            >

                                <Plus
                                    size={16}
                                />

                                Add Specification

                            </button>

                        </div>


                        {specifications.length === 0 ? (

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-dashed
                                    p-6
                                    text-center
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    No specifications added yet.
                                </p>

                            </div>

                        ) : (

                            <div
                                className="
                                    space-y-3
                                "
                            >

                                {specifications.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                                                grid
                                                gap-3
                                                rounded-xl
                                                border
                                                p-4
                                                sm:grid-cols-[1fr_1fr_auto]
                                            "
                                        >

                                            <input
                                                type="text"
                                                value={
                                                    item.specification_name
                                                }
                                                onChange={e =>
                                                    updateSpecification(
                                                        index,
                                                        "specification_name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. Capacity"
                                                disabled={loading}
                                                className="
                                                    w-full
                                                    rounded-lg
                                                    border
                                                    bg-background
                                                    px-3
                                                    py-2.5
                                                    text-sm
                                                    outline-none
                                                    focus:border-primary
                                                "
                                            />


                                            <input
                                                type="text"
                                                value={
                                                    item.specification_value
                                                }
                                                onChange={e =>
                                                    updateSpecification(
                                                        index,
                                                        "specification_value",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. 5KVA"
                                                disabled={loading}
                                                className="
                                                    w-full
                                                    rounded-lg
                                                    border
                                                    bg-background
                                                    px-3
                                                    py-2.5
                                                    text-sm
                                                    outline-none
                                                    focus:border-primary
                                                "
                                            />


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSpecification(
                                                        index
                                                    )
                                                }
                                                disabled={loading}
                                                className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    text-red-500
                                                    transition
                                                    hover:bg-red-50
                                                "
                                            >

                                                <Trash2
                                                    size={17}
                                                />

                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </section>


                    {/* ================================================= */}
                    {/* MEDIA */}
                    {/* ================================================= */}

                    <section
                        className="
                            mt-8
                            border-t
                            pt-8
                        "
                    >

                        <div
                            className="
                                mb-5
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <h3
                                    className="
                                        text-base
                                        font-semibold
                                    "
                                >
                                    Product Media
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Add product images using their URLs.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={addMedia}
                                disabled={loading}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    px-3
                                    py-2
                                    text-sm
                                    font-medium
                                    transition
                                    hover:bg-muted
                                    disabled:opacity-50
                                "
                            >

                                <Plus
                                    size={16}
                                />

                                Add Media

                            </button>

                        </div>


                        {media.length === 0 ? (

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-dashed
                                    p-6
                                    text-center
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    No product media added yet.
                                </p>

                            </div>

                        ) : (

                            <div
                                className="
                                    space-y-4
                                "
                            >

                                {media.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-xl
                                                border
                                                p-4
                                            "
                                        >

                                            <div
                                                className="
                                                    grid
                                                    gap-4
                                                    md:grid-cols-2
                                                "
                                            >

                                                {/* TYPE */}

                                                <div>

                                                    <label
                                                        className="
                                                            mb-2
                                                            block
                                                            text-xs
                                                            font-medium
                                                        "
                                                    >
                                                        Media Type
                                                    </label>


                                                    <select
                                                        value={
                                                            item.media_type
                                                        }
                                                        onChange={e =>
                                                            updateMedia(
                                                                index,
                                                                "media_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={loading}
                                                        className="
                                                            w-full
                                                            rounded-lg
                                                            border
                                                            bg-background
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            outline-none
                                                        "
                                                    >

                                                        <option value="image">
                                                            Image
                                                        </option>

                                                        {/* <option value="video">
                                                            Video
                                                        </option> */}

                                                    </select>

                                                </div>


                                                {/* URL */}

                                                <div>

                                                    <label
                                                        className="
                                                            mb-2
                                                            block
                                                            text-xs
                                                            font-medium
                                                        "
                                                    >
                                                        Media URL
                                                    </label>


                                                    <input
                                                        type="url"
                                                        value={
                                                            item.media_url
                                                        }
                                                        onChange={e =>
                                                            updateMedia(
                                                                index,
                                                                "media_url",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="https://..."
                                                        disabled={loading}
                                                        className="
                                                            w-full
                                                            rounded-lg
                                                            border
                                                            bg-background
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            outline-none
                                                        "
                                                    />

                                                </div>


                                                {/* THUMBNAIL */}

                                                {item.media_type === "video" && (

                                                    <div>

                                                        <label
                                                            className="
                                                                mb-2
                                                                block
                                                                text-xs
                                                                font-medium
                                                            "
                                                        >
                                                            Thumbnail URL
                                                        </label>


                                                        <input
                                                            type="url"
                                                            value={
                                                                item.thumbnail_url
                                                            }
                                                            onChange={e =>
                                                                updateMedia(
                                                                    index,
                                                                    "thumbnail_url",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="https://..."
                                                            disabled={loading}
                                                            className="
                                                                w-full
                                                                rounded-lg
                                                                border
                                                                bg-background
                                                                px-3
                                                                py-2.5
                                                                text-sm
                                                                outline-none
                                                            "
                                                        />

                                                    </div>

                                                )}


                                                {/* ALT TEXT */}

                                                <div>

                                                    <label
                                                        className="
                                                            mb-2
                                                            block
                                                            text-xs
                                                            font-medium
                                                        "
                                                    >
                                                        Alt Text
                                                    </label>


                                                    <input
                                                        type="text"
                                                        value={
                                                            item.alt_text
                                                        }
                                                        onChange={e =>
                                                            updateMedia(
                                                                index,
                                                                "alt_text",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Product image description"
                                                        disabled={loading}
                                                        className="
                                                            w-full
                                                            rounded-lg
                                                            border
                                                            bg-background
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            outline-none
                                                        "
                                                    />

                                                </div>

                                            </div>


                                            {/* MEDIA ACTIONS */}

                                            <div
                                                className="
                                                    mt-4
                                                    flex
                                                    items-center
                                                    justify-between
                                                    border-t
                                                    pt-4
                                                "
                                            >

                                                <label
                                                    className="
                                                        flex
                                                        cursor-pointer
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                    "
                                                >

                                                    <input
                                                        type="radio"
                                                        name="primary-media"
                                                        checked={
                                                            item.is_primary
                                                        }
                                                        onChange={() =>
                                                            setPrimaryMedia(
                                                                index
                                                            )
                                                        }
                                                        disabled={loading}
                                                    />

                                                    Primary Media

                                                </label>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeMedia(
                                                            index
                                                        )
                                                    }
                                                    disabled={loading}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        rounded-lg
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        text-red-500
                                                        transition
                                                        hover:bg-red-50
                                                    "
                                                >

                                                    <Trash2
                                                        size={16}
                                                    />

                                                    Remove

                                                </button>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </section>


                    {/* ================================================= */}
                    {/* ACTIONS */}
                    {/* ================================================= */}

                    <div
                        className="
                            mt-8
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
                                min-w-[145px]
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
                                    ? "Update Product"
                                    : "Create Product"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}