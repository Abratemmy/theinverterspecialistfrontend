import Link from "next/link";

import {
    ShoppingBag,
} from "lucide-react";
import { EmptyState } from "@/components/common";


interface RecentOrdersProps {

    orders: any[];

}


const formatMoney = (
    value: any
) => {

    return `₦${Number(
        value || 0
    ).toLocaleString("en-NG")}`;

};


export default function RecentOrders({
    orders
}: RecentOrdersProps) {

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

                        Recent Orders

                    </h2>


                    <p className="mt-1 text-xs text-muted-foreground">

                        Latest customer orders

                    </p>

                </div>


                <Link
                    href="/admin/orders"
                    className="text-sm font-medium text-primary hover:underline"
                >

                    View all

                </Link>

            </div>


            <div className="divide-y divide-gray-200">

                {orders.length === 0 ? (

                    <div className="p-8 text-center text-sm text-muted-foreground">

                        <EmptyState title="No order found" description="Other hasn't been created yet"/>

                    </div>

                ) : (

                    orders.slice(0, 5).map(
                        (order, index) => (

                            <div
                                key={
                                    order.id ||
                                    index
                                }
                                className="flex items-center justify-between gap-4 p-5"
                            >

                                <div className="flex min-w-0 items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-primary/10
                                            text-primary
                                        "
                                    >

                                        <ShoppingBag
                                            size={18}
                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p className="truncate text-sm font-semibold">

                                            #
                                            {
                                                order.order_number ||
                                                order.orderNumber ||
                                                order.id
                                            }

                                        </p>


                                        <p className="mt-1 truncate text-xs text-muted-foreground">

                                            {
                                                order.user?.first_name
                                                    ? `${order.user.first_name} ${order.user.last_name || ""}`
                                                    : order.customer_name ||
                                                      order.email ||
                                                      "Customer"
                                            }

                                        </p>

                                    </div>

                                </div>


                                <div className="shrink-0 text-right">

                                    <p className="text-sm font-semibold">

                                        {formatMoney(
                                            order.total_amount
                                        )}

                                    </p>


                                    <span
                                        className="
                                            mt-1
                                            inline-block
                                            rounded-full
                                            bg-primary/10
                                            px-2
                                            py-1
                                            text-[11px]
                                            font-medium
                                            capitalize
                                            text-primary
                                        "
                                    >

                                        {
                                            order.order_status ||
                                            "pending"
                                        }

                                    </span>

                                </div>

                            </div>

                        )
                    )

                )}

            </div>

        </section>

    );

}