import Link from "next/link";

interface RecentCustomersProps {

    customers: any[];

}


export default function RecentCustomers({
    customers
}: RecentCustomersProps) {

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

            <div className="flex items-center justify-between border-b p-5 border-gray-400">

                <div>

                    <h2 className="font-bold">

                        Recent Customers

                    </h2>


                    <p className="mt-1 text-xs text-muted-foreground">

                        Newly registered customers

                    </p>

                </div>


                <Link
                    href="/admin/customers"
                    className="text-sm font-medium text-primary hover:underline"
                >

                    View all

                </Link>

            </div>


            <div className="divide-y divide-gray-200">

                {customers.length === 0 ? (

                    <div className="p-8 text-center text-sm text-muted-foreground">

                        No customers found.

                    </div>

                ) : (

                    customers
                        .slice(0, 5)
                        .map(
                            (customer, index) => {

                                const name =
                                    customer.first_name
                                        ? `${customer.first_name} ${customer.last_name || ""}`
                                        : customer.name ||
                                          customer.full_name ||
                                          "Customer";


                                return (

                                    <div
                                        key={
                                            customer.id ||
                                            index
                                        }
                                        className="flex items-center gap-3 p-5"
                                    >

                                        <div
                                            className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-primary/10
                                                font-semibold
                                                text-primary
                                            "
                                        >

                                            {name
                                                .charAt(0)
                                                .toUpperCase()}

                                        </div>


                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-semibold">

                                                {name}

                                            </p>


                                            <p className="truncate text-xs text-muted-foreground">

                                                {
                                                    customer.email
                                                }

                                            </p>

                                        </div>

                                    </div>

                                );

                            }

                        )

                )}

            </div>

        </section>

    );

}