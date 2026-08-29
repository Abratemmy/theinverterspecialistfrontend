"use client";

import { EmptyState } from "@/components/common";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";


interface SalesChartProps {

    data: any[];

}


export default function SalesChart({
    data
}: SalesChartProps) {

    const chartData =
        data.map((item) => ({

            month:
                item.month_name ||
                item.month ||
                item.label ||
                "",

            sales:
                Number(
                    item.sales ||
                    item.total_sales ||
                    item.revenue ||
                    0
                )

        }));


    return (

        <section
            className="
                rounded-2xl
                border
                border-gray-200
                bg-card
                p-5
                shadow-sm
                sm:p-6
                mb-6
                
            "
        >

            <div className="mb-6">

                <h2 className="text-lg font-bold">

                    Sales Overview

                </h2>


                <p className="mt-1 text-sm text-muted-foreground">

                    Monthly sales performance

                </p>

            </div>


            <div className="h-[320px] w-full">

                {chartData.length === 0 ? (

                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">

                        <EmptyState
                            title="No Sales data available for this month"
                        />

                    </div>

                ) : (

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="stroke-border"
                            />


                            <XAxis
                                dataKey="month"
                                tick={{
                                    fontSize: 12
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <YAxis
                                tick={{
                                    fontSize: 12
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) =>
                                    `₦${Number(value).toLocaleString("en-NG")}`
                                }
                            />


                            <Tooltip
                                formatter={(value) =>
                                    `₦${Number(value).toLocaleString("en-NG")}`
                                }
                            />


                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#6B9F2A"
                                strokeWidth={3}
                                dot={{
                                    r: 4
                                }}
                                activeDot={{
                                    r: 6
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                )}

            </div>

        </section>

    );

}