"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Plus,
    Pencil,
    Trash2,
    Package,
    RefreshCw,
    RotateCcw,
    Search,
} from "lucide-react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getInactiveProducts,
    restoreProduct,
    permanentDeleteProduct,
} from "@/services/product.service";
import ConfirmationModal from "@/components/common/ConfirmationModal";

import { getCategories } from "@/services/category.service";
import { getBrands } from "@/services/brandService";

import {
    Product,
} from "@/types/product";

import ProductModal from "@/components/admin/products/ProductModal";

import EmptyState from "@/components/common/EmptyState/EmptyState";
import LoadingState from "@/components/common/LoadingState/LoadingState";
import ErrorState from "@/components/common/ErrorState/ErrorState";
import DeleteModal from "@/components/common/DeleteModal";

import {
    showSuccess,
    showError,
} from "@/lib/toast";


export default function AdminProductsPage() {

    const queryClient = useQueryClient();


    // ============================================================
    // TAB
    // ============================================================

    const [activeTab, setActiveTab] =
        useState<"active" | "inactive">("active");


    // ============================================================
    // PRODUCT MODAL
    // ============================================================

    const [modalOpen, setModalOpen] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);


    // ============================================================
    // DELETE MODAL
    // ============================================================

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [productToDelete, setProductToDelete] =
        useState<Product | null>(null);

    const [deleteType, setDeleteType] =
        useState<"soft" | "permanent">("soft");


    // ============================================================
    // INACTIVE SEARCH
    // ============================================================

    const [inactiveSearch, setInactiveSearch] =
        useState("");

    // ============================================================
    // INACTIVE PAGINATION
    // ============================================================

    const [inactivePage, setInactivePage] =
        useState(1);

    const inactiveLimit = 10;


    // ============================================================
    // ACTIVE PRODUCTS
    // ============================================================
    const [activeSearch, setActiveSearch] =
    useState("");

    const [activePage, setActivePage] =
        useState(1);

    const activeLimit = 10;

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({

        queryKey: [
            "admin-products",
            activePage,
            activeSearch
        ],

        queryFn: () =>
            getProducts({
                page: activePage,
                limit: activeLimit,
                search:
                activeSearch.trim() ||
                undefined,
            }),

        placeholderData: (previousData) =>
        previousData,

    });


    // ============================================================
    // INACTIVE PRODUCTS
    // ============================================================

    const {
        data: inactiveData,
        isLoading: inactiveLoading,
        isError: inactiveError,
        refetch: refetchInactive,
    } = useQuery({

        queryKey: [
            "admin-inactive-products",
            inactivePage,
            inactiveSearch,
        ],

        queryFn: () =>
            getInactiveProducts({

                page: inactivePage,

                limit: inactiveLimit,

                search:
                    inactiveSearch.trim() ||
                    undefined,

            }),

    });


    // ============================================================
    // CATEGORIES
    // ============================================================

    const {
        data: categoriesData,
    } = useQuery({

        queryKey: [
            "categories",
        ],

        queryFn: getCategories,

        staleTime:
            5 * 60 * 1000,

    });


    // ============================================================
    // BRANDS
    // ============================================================

    const {
        data: brandsData,
    } = useQuery({

        queryKey: [
            "brands",
        ],

        queryFn: getBrands,

        staleTime:
            5 * 60 * 1000,

    });


    // ============================================================
    // ACTIVE DATA
    // ============================================================

    const products =
    data?.products || [];

    const activeTotal =
        data?.total || 0;

    const activeTotalPages =
        data?.totalPages || 1;

    const safeActivePage =
        Math.min(
            activePage,
            activeTotalPages
        );


    // ============================================================
    // INACTIVE DATA
    // ============================================================

    console.log("Inactive", inactiveData)

    const inactiveProducts =
        inactiveData?.products || [];

    const inactiveTotal =
        inactiveData?.total || 0;


    const inactiveTotalPages =
        inactiveData?.totalPages ??
        Math.max(
            Math.ceil(
                inactiveTotal /
                inactiveLimit
            ),
            1
        );


    // ============================================================
    // CATEGORIES / BRANDS
    // ============================================================

    const categories =
        categoriesData?.data || [];

    const brands =
        brandsData?.data || [];


    // ============================================================
    // KEEP PAGE VALID
    // ============================================================

    useEffect(() => {

        if (
            inactivePage >
            inactiveTotalPages
        ) {

            setInactivePage(
                inactiveTotalPages
            );

        }

    }, [
        inactivePage,
        inactiveTotalPages,
    ]);


    // ============================================================
    // SEARCH
    // ============================================================
    const handleActiveSearch = (
        value: string
    ) => {

        setActiveSearch(value);

        setActivePage(1);

    };

    const handleInactiveSearch = (
        value: string
    ) => {

        setInactiveSearch(value);

        /*
         * Always return to page 1
         * when search changes.
         */

        setInactivePage(1);

    };


    // ============================================================
    // CREATE PRODUCT
    // ============================================================

    const createMutation =
        useMutation({

            mutationFn:
                createProduct,

            onSuccess: () => {

                showSuccess(
                    "Product created successfully."
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-products",
                    ],
                });

                setModalOpen(false);

                setSelectedProduct(null);

            },

            onError: (
                error: any
            ) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to create product."
                );

            },

        });


    // ============================================================
    // UPDATE PRODUCT
    // ============================================================

    const updateMutation =
        useMutation({

            mutationFn: ({
                id,
                data,
            }: {
                id: number;
                data: any;
            }) =>
                updateProduct(
                    id,
                    data
                ),

            onSuccess: () => {

                showSuccess(
                    "Product updated successfully."
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-products",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-inactive-products",
                    ],
                });

                setModalOpen(false);

                setSelectedProduct(null);

            },

            onError: (
                error: any
            ) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to update product."
                );

            },

        });


    // ============================================================
    // SOFT DELETE PRODUCT
    // ============================================================

    const deleteMutation =
        useMutation({

            mutationFn:
                deleteProduct,

            onSuccess: () => {

                showSuccess(
                    "Product moved to inactive products."
                );

                /*
                 * Refresh active products.
                 */

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-products",
                    ],
                });

                /*
                 * Refresh inactive products.
                 */

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-inactive-products",
                    ],
                });

                /*
                 * Close modal.
                 */

                setDeleteModalOpen(false);

                setProductToDelete(null);

            },

            onError: (
                error: any
            ) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to delete product."
                );

            },

        });


    // ============================================================
    // RESTORE PRODUCT
    // ============================================================

    const restoreMutation =
        useMutation({

            mutationFn:
                restoreProduct,

            onSuccess: () => {

                showSuccess(
                    "Product restored successfully."
                );

                /*
                 * Refresh active products.
                 */

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-products",
                    ],
                });

                /*
                 * Refresh inactive products.
                 */

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-inactive-products",
                    ],
                });

            },

            onError: (
                error: any
            ) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to restore product."
                );

            },

        });


    // ============================================================
    // PERMANENT DELETE
    // ============================================================

    const permanentDeleteMutation =
        useMutation({

            mutationFn:
                permanentDeleteProduct,

            onSuccess: () => {

                showSuccess(
                    "Product permanently deleted."
                );

                /*
                 * Refresh inactive products.
                 */

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-inactive-products",
                    ],
                });

                /*
                 * Also refresh active products
                 * just to keep everything synchronized.
                 */

                queryClient.invalidateQueries({
                    queryKey: [
                        "admin-products",
                    ],
                });

                /*
                 * Close modal.
                 */

                setDeleteModalOpen(false);

                setProductToDelete(null);

            },

            onError: (
                error: any
            ) => {

                showError(
                    error?.response?.data?.message ||
                    "Failed to permanently delete product."
                );

            },

        });


    // ============================================================
    // ADD PRODUCT
    // ============================================================

    const handleAddProduct = () => {

        setSelectedProduct(null);

        setModalOpen(true);

    };


    // ============================================================
    // EDIT PRODUCT
    // ============================================================

    const handleEditProduct = (
        product: Product
    ) => {

        setSelectedProduct(
            product
        );

        setModalOpen(true);

    };


    // ============================================================
    // CLOSE PRODUCT MODAL
    // ============================================================

    const handleCloseModal = () => {

        if (
            createMutation.isPending ||
            updateMutation.isPending
        ) {

            return;

        }

        setModalOpen(false);

        setSelectedProduct(null);

    };


    // ============================================================
    // SUBMIT PRODUCT
    // ============================================================

    const handleSubmit = (
        formData: any
    ) => {

        /*
         * CREATE
         */

        if (!selectedProduct) {

            createMutation.mutate(
                formData
            );

            return;

        }


        /*
         * UPDATE
         */

        updateMutation.mutate({

            id:
                selectedProduct.id,

            data:
                formData.product,

        });

    };


    // ============================================================
    // OPEN SOFT DELETE MODAL
    // ============================================================

    const handleDelete = (
        product: Product
    ) => {

        setProductToDelete(
            product
        );

        setDeleteType(
            "soft"
        );

        setDeleteModalOpen(
            true
        );

    };


    // ============================================================
    // OPEN PERMANENT DELETE MODAL
    // ============================================================

    const handlePermanentDelete = (
        product: Product
    ) => {

        setProductToDelete(
            product
        );

        setDeleteType(
            "permanent"
        );

        setDeleteModalOpen(
            true
        );

    };


    // ============================================================
    // CONFIRM DELETE
    // ============================================================

    const handleConfirmDelete = () => {

        if (
            !productToDelete
        ) {

            return;

        }


        /*
         * SOFT DELETE
         */

        if (
            deleteType ===
            "soft"
        ) {

            deleteMutation.mutate(
                productToDelete.id
            );

            return;

        }


        /*
         * PERMANENT DELETE
         */

        permanentDeleteMutation.mutate(
            productToDelete.id
        );

    };


    // ============================================================
    // RESTORE
    // ============================================================
    const [restoreModalOpen, setRestoreModalOpen] =
        useState(false);

    const [productToRestore, setProductToRestore] =
        useState<Product | null>(null);

    const handleRestore = (
        product: Product
    ) => {

        setProductToRestore(product);

        setRestoreModalOpen(true);

    };

    const handleConfirmRestore = () => {

        if (!productToRestore) {
            return;
        }

        restoreMutation.mutate(
            productToRestore.id,
            {
                onSuccess: () => {

                    setRestoreModalOpen(false);

                    setProductToRestore(null);

                }
            }
        );

    };


    // ============================================================
    // ACTIVE LOADING
    // ============================================================

    if (
        activeTab === "active" &&
        isLoading
    ) {

        return (
            <LoadingState />
        );

    }


    // ============================================================
    // ACTIVE ERROR
    // ============================================================

    if (
        activeTab === "active" &&
        isError
    ) {

        return (

            <div
                className="
                    space-y-4
                "
            >

                <ErrorState
                    title="Unable to load products"
                    description="Something went wrong while loading your products."
                />

                <button
                    type="button"
                    onClick={() =>
                        refetch()
                    }
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
                        hover:opacity-90
                    "
                >

                    <RefreshCw
                        size={16}
                    />

                    Try Again

                </button>

            </div>

        );

    }


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <div
            className="
                space-y-6
            "
        >

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            font-semibold
                            tracking-tight
                        "
                    >
                        Products
                    </h1>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        "
                    >
                        Manage your store products.
                    </p>

                </div>


                {/* ADD PRODUCT */}

                {activeTab === "active" && (

                    <button
                        type="button"
                        onClick={
                            handleAddProduct
                        }
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-primary
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >

                        <Plus
                            size={18}
                        />

                        Add Product

                    </button>

                )}

            </div>


            {/* ================================================= */}
            {/* TABS */}
            {/* ================================================= */}

            <div
                className="
                    flex
                    w-full
                    border-b
                "
            >

                {/* ACTIVE TAB */}

                <button
                    type="button"
                    onClick={() =>
                        setActiveTab(
                            "active"
                        )
                    }
                    className={`
                        relative
                        px-5
                        py-3
                        text-sm
                        font-medium
                        transition
                        ${
                            activeTab === "active"
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        }
                    `}
                >

                    Active Products
                    <span
                        className="
                            rounded-full
                            bg-gray-300
                            px-2
                            py-0.5
                            text-xs
                            font-medium
                            ml-3
                        "
                    >
                        {activeTotal}{" "}

                    </span>

                    {activeTab === "active" && (

                        <span
                            className="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                h-0.5
                                bg-primary
                            "
                        />

                    )}

                </button>


                {/* INACTIVE TAB */}

                <button
                    type="button"
                    onClick={() => {

                        setActiveTab(
                            "inactive"
                        );

                        setInactivePage(
                            1
                        );

                    }}
                    className={`
                        relative
                        flex
                        items-center
                        gap-2
                        px-5
                        py-3
                        text-sm
                        font-medium
                        transition
                        ${
                            activeTab === "inactive"
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        }
                    `}
                >

                    Inactive Products

                    {inactiveTotal > 0 && (

                        <span
                            className="
                                rounded-full
                                bg-gray-300
                                px-2
                                py-0.5
                                text-xs
                                font-medium
                            "
                        >
                            {
                                inactiveTotal
                            }
                        </span>

                    )}

                    {activeTab === "inactive" && (

                        <span
                            className="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                h-0.5
                                bg-primary
                            "
                        />

                    )}

                </button>

            </div>


            {/* ================================================= */}
            {/* ACTIVE PRODUCTS */}
            {/* ================================================= */}

            {activeTab === "active" && (

                <>
                    <div
                        className="
                            relative
                            w-full
                            mt-6
                            mb-6
                            sm:max-w-md
                           
                        "
                    >

                        <Search
                            size={22}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-muted-foreground
                                
                            "
                        />
                        <input
                            type="text"
                            value={activeSearch}
                            onChange={(e) =>
                                handleActiveSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search products..."
                            className="
                                w-full
                                rounded-xl
                                shadow-sm
                                border
                                border-gray-200
                                bg-white
                                py-3
                                pl-10
                                pr-4
                                text-sm
                                outline-none
                                transition
                                focus:border-[var(--color-primary)]
                                focus:ring-1
                                focus:ring-[var(--color-primary)]
                            "
                        />

                    </div>

                    {products.length === 0 ? (

                        <div
                            className="
                                space-y-4
                            "
                        >

                            <EmptyState
                                title="No products found"
                                description={activeSearch !== " " ? "No product match your search" :"You haven't added any products yet."}
                            />
                        </div>

                    ) : (

                        <>
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
                                            min-w-[900px]
                                            text-sm
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

                                                <th className="px-6 py-4 text-left font-bold uppercase text-[var(--color-text)]">
                                                    Product
                                                </th>

                                                <th className="px-6 py-4 text-left font-bold uppercase text-[var(--color-text)]">
                                                    Category
                                                </th>

                                                <th className="px-6 py-4 text-left font-bold uppercase text-[var(--color-text)]">
                                                    Brand
                                                </th>

                                                <th className="px-6 py-4 text-left font-bold uppercase text-[var(--color-text)]">
                                                    Price
                                                </th>

                                                <th className="px-6 py-4 text-left font-bold uppercase text-[var(--color-text)]">
                                                    Stock
                                                </th>

                                                <th className="px-6 py-4 text-right font-bold uppercase text-[var(--color-text)]">
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {products.map(
                                                (
                                                    product
                                                ) => {

                                                    const displayPrice =
                                                        Number(
                                                            product.discount_price ||
                                                            product.price
                                                        );

                                                    return (

                                                        <tr
                                                            key={
                                                                product.id
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

                                                            {/* PRODUCT */}

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
                                                                            h-12
                                                                            w-12
                                                                            shrink-0
                                                                            items-center
                                                                            justify-center
                                                                            overflow-hidden
                                                                            rounded-xl
                                                                            bg-muted
                                                                        "
                                                                    >

                                                                        <Package
                                                                            size={21}
                                                                            className="text-muted-foreground"
                                                                        />

                                                                    </div>

                                                                    <div>

                                                                        <p
                                                                            className="
                                                                                max-w-[280px]
                                                                                truncate
                                                                                font-medium
                                                                            "
                                                                        >
                                                                            {
                                                                                product.name
                                                                            }
                                                                        </p>

                                                                        {product.featured && (

                                                                            <span
                                                                                className="
                                                                                    mt-1
                                                                                    inline-block
                                                                                    text-xs
                                                                                    font-medium
                                                                                    text-primary
                                                                                "
                                                                            >
                                                                                Featured
                                                                            </span>

                                                                        )}

                                                                    </div>

                                                                </div>

                                                            </td>


                                                            {/* CATEGORY */}

                                                            <td
                                                                className="
                                                                    px-6
                                                                    py-4
                                                                    text-muted-foreground
                                                                "
                                                            >

                                                                {
                                                                    product.category?.name ||
                                                                    "—"
                                                                }

                                                            </td>


                                                            {/* BRAND */}

                                                            <td
                                                                className="
                                                                    px-6
                                                                    py-4
                                                                    text-muted-foreground
                                                                "
                                                            >

                                                                {
                                                                    product.brand?.name ||
                                                                    "—"
                                                                }

                                                            </td>


                                                            {/* PRICE */}

                                                            <td
                                                                className="
                                                                    px-6
                                                                    py-4
                                                                "
                                                            >

                                                                <p
                                                                    className="
                                                                        font-semibold
                                                                    "
                                                                >

                                                                    ₦
                                                                    {displayPrice.toLocaleString()}

                                                                </p>


                                                                {product.discount_price &&
                                                                    Number(
                                                                        product.discount_price
                                                                    ) <
                                                                        Number(
                                                                            product.price
                                                                        ) && (

                                                                        <p
                                                                            className="
                                                                                text-xs
                                                                                text-muted-foreground
                                                                                line-through
                                                                            "
                                                                        >

                                                                            ₦
                                                                            {Number(
                                                                                product.price
                                                                            ).toLocaleString()}

                                                                        </p>

                                                                    )}

                                                            </td>


                                                            {/* STOCK */}

                                                            <td
                                                                className="
                                                                    px-6
                                                                    py-4
                                                                "
                                                            >

                                                                <span
                                                                    className={`
                                                                        font-medium
                                                                        ${
                                                                            product.quantity <= 0
                                                                                ? "text-red-500"
                                                                                : product.quantity <= 5
                                                                                    ? "text-orange-500"
                                                                                    : "text-green-600"
                                                                        }
                                                                    `}
                                                                >

                                                                    {
                                                                        product.quantity
                                                                    }

                                                                </span>

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
                                                                        justify-end
                                                                        gap-2
                                                                    "
                                                                >

                                                                    {/* EDIT */}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleEditProduct(
                                                                                product
                                                                            )
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
                                                                            hover:bg-muted
                                                                        "
                                                                        title="Edit product"
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
                                                                                product
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
                                                                            disabled:opacity-50
                                                                        "
                                                                        title="Move to inactive"
                                                                    >

                                                                        <Trash2
                                                                            size={16}
                                                                        />

                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    );

                                                }
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                                {/* ACTIVE PAGINATION */}

                                {activeTotalPages > 1 && (

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            border-t
                                            border-gray-200
                                            px-6
                                            py-4
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                        "
                                    >

                                        <p
                                            className="
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >

                                            Page{" "}
                                            {safeActivePage}{" "}
                                            of{" "}
                                            {activeTotalPages}

                                        </p>


                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            {/* PREVIOUS */}

                                            <button
                                                type="button"
                                                disabled={
                                                    safeActivePage <= 1
                                                }
                                                onClick={() =>
                                                    setActivePage(
                                                        (page) =>
                                                            Math.max(
                                                                page - 1,
                                                                1
                                                            )
                                                    )
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    transition
                                                    hover:bg-muted
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-40
                                                "
                                            >
                                                Previous
                                            </button>


                                            {/* PAGE NUMBERS */}

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1
                                                "
                                            >

                                                {Array.from(
                                                    {
                                                        length:
                                                            activeTotalPages,
                                                    }
                                                ).map(
                                                    (_, index) => {

                                                        const page =
                                                            index + 1;

                                                        return (

                                                            <button
                                                                key={page}
                                                                type="button"
                                                                onClick={() =>
                                                                    setActivePage(
                                                                        page
                                                                    )
                                                                }
                                                                className={`
                                                                    flex
                                                                    h-9
                                                                    min-w-9
                                                                    items-center
                                                                    justify-center
                                                                    rounded-lg
                                                                    px-2
                                                                    text-sm
                                                                    transition
                                                                    ${
                                                                        safeActivePage ===
                                                                        page
                                                                            ? "bg-primary text-white"
                                                                            : "border hover:bg-muted"
                                                                    }
                                                                `}
                                                            >

                                                                {page}

                                                            </button>

                                                        );

                                                    }
                                                )}

                                            </div>


                                            {/* NEXT */}

                                            <button
                                                type="button"
                                                disabled={
                                                    safeActivePage >=
                                                    activeTotalPages
                                                }
                                                onClick={() =>
                                                    setActivePage(
                                                        (page) =>
                                                            Math.min(
                                                                page + 1,
                                                                activeTotalPages
                                                            )
                                                    )
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    transition
                                                    hover:bg-muted
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-40
                                                "
                                            >
                                                Next
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                            
                        </>

                    )}

                </>

            )}


            {/* ================================================= */}
            {/* INACTIVE PRODUCTS */}
            {/* ================================================= */}

            {activeTab === "inactive" && (

                <>

                    {/* LOADING */}

                    {inactiveLoading ? (

                        <LoadingState />

                    ) : inactiveError ? (

                        <div
                            className="
                                space-y-4
                            "
                        >

                            <ErrorState
                                title="Unable to load inactive products"
                                description="Something went wrong while loading inactive products."
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    refetchInactive()
                                }
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
                                    hover:opacity-90
                                "
                            >

                                <RefreshCw
                                    size={16}
                                />

                                Try Again

                            </button>

                        </div>

                    ) : (

                        <>

                            {/* SEARCH */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                            >

                                <div
                                    className="
                                        relative
                                        w-full
                                        sm:max-w-md
                                        mt-6
                                        mb-6
                                    "
                                >

                                    <Search
                                        size={18}
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-muted-foreground
                                          
                                        "
                                    />

                                    <input
                                        type="text"
                                        value={
                                            inactiveSearch
                                        }
                                        onChange={(e) =>
                                            handleInactiveSearch(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Search inactive products..."
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            bg-white
                                            py-3
                                            pl-10
                                            pr-4
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-[var(--color-primary)]
                                            focus:ring-1
                                            focus:ring-[var(--color-primary)]
                                        "
                                    />

                                </div>


                                <div
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >

                                    {
                                        inactiveTotal
                                    }{" "}

                                    product
                                    {
                                        inactiveTotal === 1
                                            ? ""
                                            : "s"
                                    }

                                </div>

                            </div>


                            {/* EMPTY */}

                            {inactiveProducts.length === 0 ? (

                                <EmptyState
                                    title={
                                        inactiveSearch
                                            ? "No matching products"
                                            : "No inactive products"
                                    }
                                    description={
                                        inactiveSearch
                                            ? "No inactive product matches your search."
                                            : "There are currently no inactive products."
                                    }
                                />

                            ) : (

                                <div
                                    className="
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        bg-white
                                        shadow-sm
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
                                                min-w-[1000px]
                                                text-sm
                                            "
                                        >

                                            <thead>

                                                <tr
                                                    className="
                                                        border-b
                                                        bg-muted/30
                                                    "
                                                >

                                                    <th className="px-6 py-4 text-left font-semibold">
                                                        Product
                                                    </th>

                                                    <th className="px-6 py-4 text-left font-semibold">
                                                        Category
                                                    </th>

                                                    <th className="px-6 py-4 text-left font-semibold">
                                                        Brand
                                                    </th>

                                                    <th className="px-6 py-4 text-left font-semibold">
                                                        Price
                                                    </th>

                                                    <th className="px-6 py-4 text-left font-semibold">
                                                        Stock
                                                    </th>

                                                    <th className="px-6 py-4 text-right font-semibold">
                                                        Actions
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {inactiveProducts.map(
                                                    (
                                                        product
                                                    ) => {

                                                        const displayPrice =
                                                            Number(
                                                                product.discount_price ||
                                                                product.price
                                                            );

                                                        return (

                                                            <tr
                                                                key={
                                                                    product.id
                                                                }
                                                                className="
                                                                    border-b
                                                                    last:border-0
                                                                    hover:bg-muted/20
                                                                "
                                                            >

                                                                {/* PRODUCT */}

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
                                                                                h-12
                                                                                w-12
                                                                                shrink-0
                                                                                items-center
                                                                                justify-center
                                                                                overflow-hidden
                                                                                rounded-xl
                                                                                bg-gray-100
                                                                            "
                                                                        >

                                                                            <Package
                                                                                size={21}
                                                                                className="
                                                                                    text-gray-400
                                                                                "
                                                                            />

                                                                        </div>


                                                                        <div>

                                                                            <p
                                                                                className="
                                                                                    max-w-[280px]
                                                                                    truncate
                                                                                    font-medium
                                                                                "
                                                                            >
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </p>


                                                                            <span
                                                                                className="
                                                                                    mt-1
                                                                                    inline-block
                                                                                    rounded-full
                                                                                    bg-red-50
                                                                                    px-2
                                                                                    py-0.5
                                                                                    text-xs
                                                                                    font-medium
                                                                                    text-red-500
                                                                                "
                                                                            >
                                                                                Inactive
                                                                            </span>

                                                                        </div>

                                                                    </div>

                                                                </td>


                                                                {/* CATEGORY */}

                                                                <td
                                                                    className="
                                                                        px-6
                                                                        py-4
                                                                        text-muted-foreground
                                                                    "
                                                                >

                                                                    {
                                                                        product.category?.name ||
                                                                        "—"
                                                                    }

                                                                </td>


                                                                {/* BRAND */}

                                                                <td
                                                                    className="
                                                                        px-6
                                                                        py-4
                                                                        text-muted-foreground
                                                                    "
                                                                >

                                                                    {
                                                                        product.brand?.name ||
                                                                        "—"
                                                                    }

                                                                </td>


                                                                {/* PRICE */}

                                                                <td
                                                                    className="
                                                                        px-6
                                                                        py-4
                                                                    "
                                                                >

                                                                    <p
                                                                        className="
                                                                            font-semibold
                                                                        "
                                                                    >

                                                                        ₦
                                                                        {displayPrice.toLocaleString()}

                                                                    </p>

                                                                </td>


                                                                {/* STOCK */}

                                                                <td
                                                                    className="
                                                                        px-6
                                                                        py-4
                                                                    "
                                                                >

                                                                    <span
                                                                        className="
                                                                            font-medium
                                                                            text-muted-foreground
                                                                        "
                                                                    >

                                                                        {
                                                                            product.quantity
                                                                        }

                                                                    </span>

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
                                                                            justify-end
                                                                            gap-2
                                                                        "
                                                                    >

                                                                        {/* RESTORE */}

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRestore(
                                                                                    product
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                restoreMutation.isPending
                                                                            }
                                                                            className="
                                                                                flex
                                                                                items-center
                                                                                gap-2
                                                                                rounded-lg
                                                                                border
                                                                                border-primary
                                                                                px-3
                                                                                py-2
                                                                                text-sm
                                                                                font-medium
                                                                                text-primary
                                                                                transition
                                                                                hover:bg-[var(--bgcolor-primary)]
                                                                                hover:text-white
                                                                                disabled:cursor-not-allowed
                                                                                disabled:opacity-50
                                                                            "
                                                                        >

                                                                            <RotateCcw
                                                                                size={15}
                                                                            />

                                                                            Restore

                                                                        </button>


                                                                        {/* PERMANENT DELETE */}

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handlePermanentDelete(
                                                                                    product
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                permanentDeleteMutation.isPending
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
                                                                                disabled:cursor-not-allowed
                                                                                disabled:opacity-50
                                                                            "
                                                                            title="Permanently delete"
                                                                        >

                                                                            <Trash2
                                                                                size={16}
                                                                            />

                                                                        </button>

                                                                    </div>

                                                                </td>

                                                            </tr>

                                                        );

                                                    }
                                                )}

                                            </tbody>

                                        </table>

                                    </div>


                                    {/* ================================================= */}
                                    {/* PAGINATION */}
                                    {/* ================================================= */}

                                    {inactiveTotalPages > 1 && (

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-3
                                                border-t
                                                px-6
                                                py-4
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                            "
                                        >

                                            <p
                                                className="
                                                    text-sm
                                                    text-muted-foreground
                                                "
                                            >

                                                Page{" "}

                                                {
                                                    inactivePage
                                                }

                                                {" "}of{" "}

                                                {
                                                    inactiveTotalPages
                                                }

                                            </p>


                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                "
                                            >

                                                {/* PREVIOUS */}

                                                <button
                                                    type="button"
                                                    disabled={
                                                        inactivePage <= 1
                                                    }
                                                    onClick={() =>
                                                        setInactivePage(
                                                            (page) =>
                                                                Math.max(
                                                                    page - 1,
                                                                    1
                                                                )
                                                        )
                                                    }
                                                    className="
                                                        rounded-lg
                                                        border
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        transition
                                                        hover:bg-muted
                                                        disabled:cursor-not-allowed
                                                        disabled:opacity-40
                                                    "
                                                >

                                                    Previous

                                                </button>


                                                {/* PAGE NUMBERS */}

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-1
                                                    "
                                                >

                                                    {Array.from(
                                                        {
                                                            length:
                                                                inactiveTotalPages,
                                                        }
                                                    ).map(
                                                        (
                                                            _,
                                                            index
                                                        ) => {

                                                            const page =
                                                                index + 1;

                                                            return (

                                                                <button
                                                                    key={
                                                                        page
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setInactivePage(
                                                                            page
                                                                        )
                                                                    }
                                                                    className={`
                                                                        flex
                                                                        h-9
                                                                        min-w-9
                                                                        items-center
                                                                        justify-center
                                                                        rounded-lg
                                                                        px-2
                                                                        text-sm
                                                                        transition
                                                                        ${
                                                                            inactivePage ===
                                                                            page
                                                                                ? "bg-primary text-white"
                                                                                : "border hover:bg-muted"
                                                                        }
                                                                    `}
                                                                >

                                                                    {
                                                                        page
                                                                    }

                                                                </button>

                                                            );

                                                        }
                                                    )}

                                                </div>


                                                {/* NEXT */}

                                                <button
                                                    type="button"
                                                    disabled={
                                                        inactivePage >=
                                                        inactiveTotalPages
                                                    }
                                                    onClick={() =>
                                                        setInactivePage(
                                                            (page) =>
                                                                Math.min(
                                                                    page + 1,
                                                                    inactiveTotalPages
                                                                )
                                                        )
                                                    }
                                                    className="
                                                        rounded-lg
                                                        border
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        transition
                                                        hover:bg-muted
                                                        disabled:cursor-not-allowed
                                                        disabled:opacity-40
                                                    "
                                                >

                                                    Next

                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            )}

                        </>

                    )}

                </>

            )}


            {/* ================================================= */}
            {/* PRODUCT MODAL */}
            {/* ================================================= */}

            <ProductModal

                open={
                    modalOpen
                }

                product={
                    selectedProduct
                }

                categories={
                    categories
                }

                brands={
                    brands
                }

                loading={
                    createMutation.isPending ||
                    updateMutation.isPending
                }

                onClose={
                    handleCloseModal
                }

                onSubmit={
                    handleSubmit
                }

            />


            {/* ================================================= */}
            {/* DELETE MODAL */}
            {/* ================================================= */}

            <DeleteModal

                open={
                    deleteModalOpen
                }

                title={
                    deleteType === "permanent"
                        ? "Permanently Delete Product"
                        : "Delete Product"
                }

                message={
                    deleteType === "permanent"
                        ? "This action cannot be undone. Permanently delete"
                        : "Are you sure you want to move"
                }

                itemName={
                    productToDelete?.name
                }

                loading={
                    deleteMutation.isPending ||
                    permanentDeleteMutation.isPending
                }

                onClose={() => {

                    if (
                        deleteMutation.isPending ||
                        permanentDeleteMutation.isPending
                    ) {

                        return;

                    }

                    setDeleteModalOpen(
                        false
                    );

                    setProductToDelete(
                        null
                    );

                }}

                onConfirm={
                    handleConfirmDelete
                }

            />

            <ConfirmationModal
                open={restoreModalOpen}

                title="Restore Product"

                message="Are you sure you want to restore this product?"

                itemName={
                    productToRestore?.name
                }

                confirmText="Restore Product"

                cancelText="Cancel"

                loading={
                    restoreMutation.isPending
                }

                onClose={() => {

                    if (restoreMutation.isPending) {
                        return;
                    }

                    setRestoreModalOpen(false);

                    setProductToRestore(null);

                }}

                onConfirm={
                    handleConfirmRestore
                }
            />

        </div>

    );

}