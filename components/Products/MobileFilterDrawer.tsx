"use client";

import ProductFilters from "./ProductFilters";


interface FilterItem {
    id: number;
    name: string;
}


interface MobileFilterDrawerProps {

    categories: FilterItem[];

    brands: FilterItem[];

    selectedCategory?: number;

    selectedBrand?: number;

    minPrice?: number;

    maxPrice?: number;

    onCategoryChange: (
        value: number | undefined
    ) => void;

    onBrandChange: (
        value: number | undefined
    ) => void;

    onPriceChange: (
        min?: number,
        max?: number
    ) => void;

    onClear: () => void;

    onClose: () => void;
}


export default function MobileFilterDrawer({
    categories,
    brands,

    selectedCategory,
    selectedBrand,

    minPrice,
    maxPrice,

    onCategoryChange,
    onBrandChange,
    onPriceChange,

    onClear,
    onClose,

}: MobileFilterDrawerProps) {

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                lg:hidden
            "
        >

            {/* Overlay */}

            <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                className="
                    absolute
                    inset-0
                    cursor-default
                    bg-black/40
                "
            />


            {/* Drawer */}

            <div
                className="
                    absolute
                    right-0
                    top-0
                    h-full
                    w-[90%]
                    max-w-sm
                    overflow-y-auto
                    bg-background
                    p-5
                    shadow-2xl
                "
            >

                {/* Header */}

                <div
                    className="
                        mb-6
                        flex
                        items-center
                        justify-between
                    "
                >

                    <h2 className="text-lg font-bold">
                        Filters
                    </h2>


                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close filters"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            text-lg
                            transition
                            hover:border-primary
                            hover:text-primary
                        "
                    >
                        ×
                    </button>

                </div>


                <ProductFilters
                    categories={categories}
                    brands={brands}

                    selectedCategory={
                        selectedCategory
                    }

                    selectedBrand={
                        selectedBrand
                    }

                    minPrice={minPrice}
                    maxPrice={maxPrice}

                    onCategoryChange={
                        onCategoryChange
                    }

                    onBrandChange={
                        onBrandChange
                    }

                    onPriceChange={
                        onPriceChange
                    }

                    onClear={onClear}
                />


                {/* Apply */}

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        mt-6
                        h-12
                        w-full
                        rounded-xl
                        bg-primary
                        font-semibold
                        text-white
                        transition
                        hover:bg-primary-dark
                    "
                >
                    Apply Filters
                </button>

            </div>

        </div>
    );
}