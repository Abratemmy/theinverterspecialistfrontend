import Link from "next/link";

import {
    AlertTriangle,
    Package
} from "lucide-react";


interface LowStockProductsProps {

    products: any[];

}


export default function LowStockProducts({
    products
}: LowStockProductsProps) {
    console.log("PRODUCTS", products)
    return (

        <section
            className="
                rounded-2xl
                border
                border-gray-200
                bg-card
                shadow-sm
            "
        >

            <div className="flex items-center justify-between border-b border-gray-400 p-5">

                <div>

                    <h2 className="font-bold">

                        Low Stock

                    </h2>


                    <p className="mt-1 text-xs text-muted-foreground">

                        Products that need attention

                    </p>

                </div>


                <AlertTriangle
                    size={20}
                    className="text-amber-500"
                />

            </div>


            <div className="divide-y divide-gray-200">

                {products.length === 0 ? (

                    <div className="p-8 text-center">

                        <Package
                            size={32}
                            className="mx-auto text-green-500"
                        />

                        <p className="mt-3 text-sm font-medium">

                            Stock looks good

                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">

                            No low-stock products.

                        </p>
                       

                    </div>

                ) : (

                    products
                        .slice(0, 5)
                        .map(
                            (product, index) => {

                                const quantity =
                                    Number(
                                        product.quantity ??
                                        product.stock ??
                                        product.stock_quantity ??
                                        0
                                    );


                                return (

                                    <div
                                        key={
                                            product.id ||
                                            index
                                        }
                                        className="flex items-center gap-4 p-5"
                                    >

                                        <div
                                            className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-amber-100
                                                text-amber-600
                                            "
                                        >

                                            <Package
                                                size={18}
                                            />

                                        </div>


                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-sm font-semibold">

                                                {
                                                    product.name ||
                                                    product.product_name ||
                                                    "Product"
                                                }

                                            </p>


                                            <p className="mt-1 text-xs text-muted-foreground">

                                                Only {quantity}{" "}

                                                {quantity === 1
                                                    ? "item"
                                                    : "items"}{" "}

                                                remaining

                                            </p>

                                        </div>


                                        {/* <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="
                                                rounded-lg
                                                border
                                                px-3
                                                py-2
                                                text-xs
                                                font-medium
                                                transition
                                                hover:bg-muted
                                            "
                                        >

                                            Manage

                                        </Link> */}

                                    </div>

                                );

                            }

                        )

                )}

            </div>

        </section>

    );

}