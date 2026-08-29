"use client";

import { useEffect, useState } from "react";

import {
    Plus,
    Trash2,
} from "lucide-react";

import {
    Product,
    ProductMedia,
    ProductSpecification,
} from "@/types/product";

import { Category } from "@/types/category";
import { Brand } from "@/types/brand";


interface ProductFormProps {

    product?: Product | null;

    categories: Category[];

    brands: Brand[];

    loading?: boolean;

    onSubmit: (data: any) => void;

    onCancel: () => void;
}


interface MediaFormItem {

    media_type: "image" | "video";

    media_url: string;

    thumbnail_url: string;

    alt_text: string;

    is_primary: boolean;

    display_order: number;
}


interface SpecificationFormItem {

    specification_name: string;

    specification_value: string;

    display_order: number;
}


export default function ProductForm({

    product = null,

    categories,

    brands,

    loading = false,

    onSubmit,

    onCancel,

}: ProductFormProps) {


    /*
    |--------------------------------------------------------------------------
    | EDIT MODE
    |--------------------------------------------------------------------------
    */

    const isEditMode =
        Boolean(product);


    /*
    |--------------------------------------------------------------------------
    | PRODUCT FIELDS
    |--------------------------------------------------------------------------
    */

    const [name, setName] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("");

    const [brandId, setBrandId] =
        useState("");

    const [shortDescription, setShortDescription] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [additionalInformation, setAdditionalInformation] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [discountPrice, setDiscountPrice] =
        useState("");

    const [quantity, setQuantity] =
        useState("0");

    const [weight, setWeight] =
        useState("");

    const [warranty, setWarranty] =
        useState("");

    const [featured, setFeatured] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | MEDIA
    |--------------------------------------------------------------------------
    */

    const [media, setMedia] =
        useState<MediaFormItem[]>([]);


    /*
    |--------------------------------------------------------------------------
    | SPECIFICATIONS
    |--------------------------------------------------------------------------
    */

    const [specifications, setSpecifications] =
        useState<SpecificationFormItem[]>([]);


    /*
    |--------------------------------------------------------------------------
    | POPULATE FORM
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (product) {

            setName(
                product.name || ""
            );

            setCategoryId(
                String(product.category_id || "")
            );

            setBrandId(
                String(product.brand_id || "")
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
                product.price !== undefined &&
                product.price !== null
                    ? String(product.price)
                    : ""
            );

            setDiscountPrice(
                product.discount_price !== undefined &&
                product.discount_price !== null
                    ? String(product.discount_price)
                    : ""
            );

            setQuantity(
                String(product.quantity ?? 0)
            );

            setWeight(
                product.weight !== undefined &&
                product.weight !== null
                    ? String(product.weight)
                    : ""
            );

            setWarranty(
                product.warranty || ""
            );

            setFeatured(
                Boolean(product.featured)
            );


            /*
            |--------------------------------------------------------------------------
            | MEDIA
            |--------------------------------------------------------------------------
            */

            setMedia(

                (product.media || []).map(
                    (item: ProductMedia) => ({

                        media_type:
                            item.media_type,

                        media_url:
                            item.media_url || "",

                        thumbnail_url:
                            item.thumbnail_url || "",

                        alt_text:
                            item.alt_text || "",

                        is_primary:
                            Boolean(
                                item.is_primary
                            ),

                        display_order:
                            item.display_order || 1,

                    })
                )

            );


            /*
            |--------------------------------------------------------------------------
            | SPECIFICATIONS
            |--------------------------------------------------------------------------
            */

            setSpecifications(

                (product.specifications || []).map(
                    (
                        item: ProductSpecification
                    ) => ({

                        specification_name:
                            item.specification_name || "",

                        specification_value:
                            item.specification_value || "",

                        display_order:
                            item.display_order || 1,

                    })
                )

            );

        } else {

            resetForm();

        }

    }, [product]);


    /*
    |--------------------------------------------------------------------------
    | RESET
    |--------------------------------------------------------------------------
    */

    const resetForm = () => {

        setName("");

        setCategoryId("");

        setBrandId("");

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


    /*
    |--------------------------------------------------------------------------
    | MEDIA
    |--------------------------------------------------------------------------
    */

    const addMedia = () => {

        setMedia((prev) => [

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

            },

        ]);

    };


    const removeMedia = (
        index: number
    ) => {

        setMedia((prev) =>
            prev.filter(
                (_, i) => i !== index
            )
        );

    };


    const updateMedia = (
        index: number,
        field: keyof MediaFormItem,
        value: string | boolean | number
    ) => {

        setMedia((prev) =>

            prev.map((item, i) => {

                if (i !== index) {

                    return item;

                }

                return {

                    ...item,

                    [field]: value,

                };

            })

        );

    };


    const makePrimaryMedia = (
        index: number
    ) => {

        setMedia((prev) =>

            prev.map((item, i) => ({

                ...item,

                is_primary:
                    i === index,

            }))

        );

    };


    /*
    |--------------------------------------------------------------------------
    | SPECIFICATIONS
    |--------------------------------------------------------------------------
    */

    const addSpecification = () => {

        setSpecifications((prev) => [

            ...prev,

            {

                specification_name: "",

                specification_value: "",

                display_order:
                    prev.length + 1,

            },

        ]);

    };


    const removeSpecification = (
        index: number
    ) => {

        setSpecifications((prev) =>
            prev.filter(
                (_, i) => i !== index
            )
        );

    };


    const updateSpecification = (
        index: number,
        field: keyof SpecificationFormItem,
        value: string | number
    ) => {

        setSpecifications((prev) =>

            prev.map((item, i) => {

                if (i !== index) {

                    return item;

                }

                return {

                    ...item,

                    [field]: value,

                };

            })

        );

    };


    /*
    |--------------------------------------------------------------------------
    | SUBMIT
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        /*
        |--------------------------------------------------------------------------
        | EDIT
        |--------------------------------------------------------------------------
        */

        if (isEditMode) {

            onSubmit({

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

            });

            return;

        }


        /*
        |--------------------------------------------------------------------------
        | CREATE
        |--------------------------------------------------------------------------
        */

        onSubmit({

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

            media:

                media.map((item) => ({

                    media_type:
                        item.media_type,

                    media_url:
                        item.media_url.trim(),

                    thumbnail_url:
                        item.thumbnail_url.trim()
                            || null,

                    alt_text:
                        item.alt_text.trim()
                            || null,

                    is_primary:
                        item.is_primary,

                    display_order:
                        item.display_order,

                })),

            specifications:

                specifications.map((item) => ({

                    specification_name:
                        item.specification_name.trim(),

                    specification_value:
                        item.specification_value.trim(),

                    display_order:
                        item.display_order,

                })),

        });

    };


    /*
    |--------------------------------------------------------------------------
    | INPUT CLASS
    |--------------------------------------------------------------------------
    */

    const inputClass = `
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
    `;


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ========================================================= */}
            {/* PRODUCT INFORMATION */}
            {/* ========================================================= */}

            <section
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-6
                "
            >

                <h2
                    className="
                        text-lg
                        font-semibold
                    "
                >
                    Product Information
                </h2>

                <p
                    className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    "
                >
                    Basic information about the product.
                </p>


                <div
                    className="
                        mt-6
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
                            Product Name *
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="e.g. Growatt 5KVA Hybrid Inverter"
                            required
                            disabled={loading}
                            className={inputClass}
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
                            Category *
                        </label>

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                setCategoryId(
                                    e.target.value
                                )
                            }
                            required
                            disabled={loading}
                            className={inputClass}
                        >

                            <option value="">
                                Select category
                            </option>

                            {categories.map(
                                (category) => (

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
                            Brand *
                        </label>

                        <select
                            value={brandId}
                            onChange={(e) =>
                                setBrandId(
                                    e.target.value
                                )
                            }
                            required
                            disabled={loading}
                            className={inputClass}
                        >

                            <option value="">
                                Select brand
                            </option>

                            {brands.map(
                                (brand) => (

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


                    {/* SHORT DESCRIPTION */}

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
                            Short Description
                        </label>

                        <textarea
                            value={shortDescription}
                            onChange={(e) =>
                                setShortDescription(
                                    e.target.value
                                )
                            }
                            rows={3}
                            placeholder="Short summary of the product..."
                            disabled={loading}
                            className={inputClass}
                        />

                    </div>


                    {/* DESCRIPTION */}

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
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            rows={6}
                            placeholder="Detailed product description..."
                            disabled={loading}
                            className={inputClass}
                        />

                    </div>


                    {/* ADDITIONAL INFORMATION */}

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
                            Additional Information
                        </label>

                        <textarea
                            value={additionalInformation}
                            onChange={(e) =>
                                setAdditionalInformation(
                                    e.target.value
                                )
                            }
                            rows={5}
                            placeholder="Additional information about the product..."
                            disabled={loading}
                            className={inputClass}
                        />

                    </div>

                </div>

            </section>


            {/* ========================================================= */}
            {/* PRICING & INVENTORY */}
            {/* ========================================================= */}

            <section
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-6
                "
            >

                <h2
                    className="
                        text-lg
                        font-semibold
                    "
                >
                    Pricing & Inventory
                </h2>


                <div
                    className="
                        mt-6
                        grid
                        gap-5
                        md:grid-cols-2
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
                            Price *
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            placeholder="0.00"
                            required
                            disabled={loading}
                            className={inputClass}
                        />

                    </div>


                    {/* DISCOUNT */}

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
                            onChange={(e) =>
                                setDiscountPrice(
                                    e.target.value
                                )
                            }
                            placeholder="0.00"
                            disabled={loading}
                            className={inputClass}
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
                            Quantity *
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    e.target.value
                                )
                            }
                            required
                            disabled={loading}
                            className={inputClass}
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
                            onChange={(e) =>
                                setWeight(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. 25"
                            disabled={loading}
                            className={inputClass}
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
                            onChange={(e) =>
                                setWarranty(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. 2 Years"
                            disabled={loading}
                            className={inputClass}
                        />

                    </div>

                </div>


                {/* FEATURED */}

                <label
                    className="
                        mt-6
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                    "
                >

                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) =>
                            setFeatured(
                                e.target.checked
                            )
                        }
                        disabled={loading}
                        className="
                            h-4
                            w-4
                            accent-primary
                        "
                    />

                    <span
                        className="
                            text-sm
                            font-medium
                        "
                    >
                        Feature this product
                    </span>

                </label>

            </section>


            {/* ========================================================= */}
            {/* MEDIA */}
            {/* ========================================================= */}

            <section
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-6
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                            "
                        >
                            Product Media
                        </h2>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Add product images or videos.
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

                        <Plus size={17} />

                        Add Media

                    </button>

                </div>


                {media.length === 0 ? (

                    <div
                        className="
                            mt-6
                            rounded-xl
                            border
                            border-dashed
                            p-8
                            text-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No media added yet.
                    </div>

                ) : (

                    <div
                        className="
                            mt-6
                            space-y-4
                        "
                    >

                        {media.map(
                            (item, index) => (

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
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        "
                                    >

                                        <p
                                            className="
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            Media {index + 1}
                                        </p>


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
                                                h-9
                                                w-9
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


                                    <div
                                        className="
                                            mt-4
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
                                                onChange={(e) =>
                                                    updateMedia(
                                                        index,
                                                        "media_type",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={loading}
                                                className={
                                                    inputClass
                                                }
                                            >

                                                <option value="image">
                                                    Image
                                                </option>

                                                <option value="video">
                                                    Video
                                                </option>

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
                                                onChange={(e) =>
                                                    updateMedia(
                                                        index,
                                                        "media_url",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="https://..."
                                                required
                                                disabled={loading}
                                                className={
                                                    inputClass
                                                }
                                            />

                                        </div>


                                        {/* THUMBNAIL */}

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
                                                onChange={(e) =>
                                                    updateMedia(
                                                        index,
                                                        "thumbnail_url",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Optional"
                                                disabled={loading}
                                                className={
                                                    inputClass
                                                }
                                            />

                                        </div>


                                        {/* ALT */}

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
                                                onChange={(e) =>
                                                    updateMedia(
                                                        index,
                                                        "alt_text",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Product image description"
                                                disabled={loading}
                                                className={
                                                    inputClass
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* PRIMARY */}

                                    <label
                                        className="
                                            mt-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <input
                                            type="checkbox"
                                            checked={
                                                item.is_primary
                                            }
                                            onChange={() =>
                                                makePrimaryMedia(
                                                    index
                                                )
                                            }
                                            disabled={loading}
                                        />

                                        <span
                                            className="
                                                text-sm
                                            "
                                        >
                                            Primary media
                                        </span>

                                    </label>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>


            {/* ========================================================= */}
            {/* SPECIFICATIONS */}
            {/* ========================================================= */}

            <section
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-6
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                            "
                        >
                            Product Specifications
                        </h2>

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
                        onClick={addSpecification}
                        disabled={loading}
                        className="
                            flex
                            items-center
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

                        <Plus size={17} />

                        Add Specification

                    </button>

                </div>


                {specifications.length === 0 ? (

                    <div
                        className="
                            mt-6
                            rounded-xl
                            border
                            border-dashed
                            p-8
                            text-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No specifications added yet.
                    </div>

                ) : (

                    <div
                        className="
                            mt-6
                            space-y-3
                        "
                    >

                        {specifications.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="
                                        grid
                                        gap-3
                                        rounded-xl
                                        border
                                        p-4
                                        md:grid-cols-[1fr_1fr_auto]
                                    "
                                >

                                    <input
                                        type="text"
                                        value={
                                            item.specification_name
                                        }
                                        onChange={(e) =>
                                            updateSpecification(
                                                index,
                                                "specification_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Capacity"
                                        required
                                        disabled={loading}
                                        className={
                                            inputClass
                                        }
                                    />


                                    <input
                                        type="text"
                                        value={
                                            item.specification_value
                                        }
                                        onChange={(e) =>
                                            updateSpecification(
                                                index,
                                                "specification_value",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. 5KVA"
                                        required
                                        disabled={loading}
                                        className={
                                            inputClass
                                        }
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
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            text-red-500
                                            transition
                                            hover:bg-red-50
                                        "
                                    >

                                        <Trash2
                                            size={18}
                                        />

                                    </button>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>


            {/* ========================================================= */}
            {/* ACTIONS */}
            {/* ========================================================= */}

            <div
                className="
                    flex
                    justify-end
                    gap-3
                "
            >

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        rounded-xl
                        border
                        px-6
                        py-3
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
                        rounded-xl
                        bg-primary
                        px-6
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

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

    );
}