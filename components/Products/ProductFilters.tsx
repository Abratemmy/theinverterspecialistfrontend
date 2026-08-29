"use client";

interface FilterItem {
    id: number;
    name: string;
}


interface ProductFiltersProps {

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
}


export default function ProductFilters({
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

}: ProductFiltersProps) {

    return (

        <aside
            className="
                sticky
                top-24
                rounded-2xl
                border
                bg-background
                p-5
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

                <h3 className="text-base font-semibold">
                    Filters
                </h3>


                <button
                    type="button"
                    onClick={onClear}
                    className="
                        text-xs
                        text-muted-foreground
                        transition
                        hover:text-primary
                    "
                >
                    Clear all
                </button>

            </div>


            {/* Categories */}

            <div className="border-b pb-6">

                <h4
                    className="
                        mb-4
                        text-sm
                        font-semibold
                    "
                >
                    Categories
                </h4>


                <div className="space-y-3">

                    {categories.map((category) => (

                        <label
                            key={category.id}
                            className="
                                flex
                                cursor-pointer
                                items-center
                                gap-3
                                text-sm
                            "
                        >

                            <input
                                type="radio"
                                name="product-category"
                                checked={
                                    selectedCategory ===
                                    category.id
                                }
                                onChange={() =>
                                    onCategoryChange(
                                        category.id
                                    )
                                }
                                className="
                                    h-4
                                    w-4
                                    accent-primary
                                "
                            />


                            <span>
                                {category.name}
                            </span>

                        </label>

                    ))}

                </div>

            </div>


            {/* Brands */}

            <div className="border-b py-6">

                <h4
                    className="
                        mb-4
                        text-sm
                        font-semibold
                    "
                >
                    Brands
                </h4>


                <div
                    className="
                        max-h-60
                        space-y-3
                        overflow-y-auto
                        pr-1
                    "
                >

                    {brands.map((brand) => (

                        <label
                            key={brand.id}
                            className="
                                flex
                                cursor-pointer
                                items-center
                                gap-3
                                text-sm
                            "
                        >

                            <input
                                type="radio"
                                name="product-brand"
                                checked={
                                    selectedBrand ===
                                    brand.id
                                }
                                onChange={() =>
                                    onBrandChange(
                                        brand.id
                                    )
                                }
                                className="
                                    h-4
                                    w-4
                                    accent-primary
                                "
                            />


                            <span>
                                {brand.name}
                            </span>

                        </label>

                    ))}

                </div>

            </div>


            {/* Price */}

            <div className="pt-6">

                <h4
                    className="
                        mb-4
                        text-sm
                        font-semibold
                    "
                >
                    Price Range
                </h4>


                <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                    "
                >

                    <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={
                            minPrice ?? ""
                        }
                        onChange={(event) => {

                            const value =
                                event.target.value;

                            onPriceChange(
                                value
                                    ? Number(value)
                                    : undefined,
                                maxPrice
                            );

                        }}
                        className="
                            h-10
                            w-full
                            rounded-lg
                            border
                            bg-background
                            px-3
                            text-sm
                            outline-none
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/10
                        "
                    />


                    <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={
                            maxPrice ?? ""
                        }
                        onChange={(event) => {

                            const value =
                                event.target.value;

                            onPriceChange(
                                minPrice,
                                value
                                    ? Number(value)
                                    : undefined
                            );

                        }}
                        className="
                            h-10
                            w-full
                            rounded-lg
                            border
                            bg-background
                            px-3
                            text-sm
                            outline-none
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/10
                        "
                    />

                </div>

            </div>

        </aside>
    );
}