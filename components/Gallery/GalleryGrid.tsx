"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import type { Gallery } from "@/types/gallery";

interface GalleryGridProps {
    gallery: Gallery[];
}

export default function GalleryGrid({
    gallery,
}: GalleryGridProps) {

    const [selectedIndex, setSelectedIndex] =
        useState<number | null>(null);


    const selectedImage =
        selectedIndex !== null
            ? gallery[selectedIndex]
            : null;


    const closeZoom = () => {
        setSelectedIndex(null);
    };


    const showPrevious = () => {

        if (selectedIndex === null) return;

        setSelectedIndex(
            selectedIndex === 0
                ? gallery.length - 1
                : selectedIndex - 1
        );
    };


    const showNext = () => {

        if (selectedIndex === null) return;

        setSelectedIndex(
            selectedIndex === gallery.length - 1
                ? 0
                : selectedIndex + 1
        );
    };


    return (
        <>
            {/* =====================================
                GALLERY GRID
            ====================================== */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {gallery.map((item) => (

                    <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                            setSelectedIndex(
                                gallery.indexOf(item)
                            )
                        }
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 text-left"
                    >

                        <img
                            src={item.image_url}
                            alt={
                                item.alt_text ||
                                item.title ||
                                "Gallery image"
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />


                        {/* Hover overlay */}

                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">

                            {item.title && (
                                <span className="p-5 text-sm font-medium text-white">
                                    {item.title}
                                </span>
                            )}

                        </div>

                    </button>

                ))}

            </div>


            {/* =====================================
                ZOOM / LIGHTBOX
            ====================================== */}

            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                    onClick={closeZoom}
                >

                    {/* CLOSE */}

                    <button
                        type="button"
                        onClick={closeZoom}
                        className="absolute right-5 top-5 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                        aria-label="Close image"
                    >
                        <X size={26} />
                    </button>


                    {/* PREVIOUS */}

                    {gallery.length > 1 && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                showPrevious();
                            }}
                            className="absolute left-4 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-8"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={28} />
                        </button>
                    )}


                    {/* IMAGE */}

                    <div
                        className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <img
                            src={selectedImage.image_url}
                            alt={
                                selectedImage.alt_text ||
                                selectedImage.title ||
                                "Gallery image"
                            }
                            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
                        />

                    </div>


                    {/* NEXT */}

                    {gallery.length > 1 && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                showNext();
                            }}
                            className="absolute right-4 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-8"
                            aria-label="Next image"
                        >
                            <ChevronRight size={28} />
                        </button>
                    )}

                </div>
            )}
        </>
    );
}