"use client";

import Image, { ImageProps } from "next/image";
import { useMemo, useState } from "react";

type ImageType =
    | "category"
    | "product"
    | "brand"
    | "blog"
    | "avatar"
    | "default"

interface ImageWithFallbackProps
    extends Omit<ImageProps, "src"> {
    src?: string | null;
    imageType?: ImageType;
}

const FALLBACK_IMAGES: Record<ImageType, string> = {
    category: "/images/placeholders/category-placeholder.png",
    product: "/images/placeholders/products.jpg",
    brand: "/images/placeholders/brands.png",
    blog: "/images/placeholders/blog-placeholder.png",
    avatar: "/images/placeholders/avatar-placeholder.png",
    default: "/images/placeholders/default-placeholder.png",
};

export default function ImageWithFallback({
    src,
    imageType = "default",
    alt,
    ...props
}: ImageWithFallbackProps) {

    const fallbackImage = useMemo(
        () => FALLBACK_IMAGES[imageType],
        [imageType]
    );

    const [imageSrc, setImageSrc] = useState(
        src && src.trim() !== ""
            ? src
            : fallbackImage
    );

    return (
        <Image
            {...props}
            src={imageSrc}
            alt={alt}
            onError={() => setImageSrc(fallbackImage)}
        />
    );
}