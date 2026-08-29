import Link from "next/link";

import {
    Package,
    Trophy
} from "lucide-react";


interface TopProductsProps {

    products: any[];

}


export default function TopProducts({
    products
}: TopProductsProps) {

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

                        Top Selling Products

                    </h2>


                    <p className="mt-1 text-xs text-muted-foreground">

                        Best performing products

                    </p>

                </div>


                <Trophy
                    size={20}
                    className="text-primary"
                />

            </div>


            <div className="divide-y divide-gray-200">

                {products.length === 0 ? (

                    <div className="p-8 text-center text-sm text-muted-foreground">

                        No product sales data available.

                    </div>

                ) : (

                    products
                        .slice(0, 5)
                        .map(
                            (product, index) => (

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
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-muted
                                            text-sm
                                            font-bold
                                        "
                                    >

                                        {index + 1}

                                    </div>


                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-primary/10
                                            text-primary
                                        "
                                    >

                                        <Package
                                            size={19}
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

                                            Sold:{" "}

                                            {
                                                product.total_quantity ||
                                                product.quantity_sold ||
                                                product.total_sold ||
                                                0
                                            }

                                        </p>

                                    </div>

                                </div>

                            ))

                )}

            </div>

        </section>

    );

}