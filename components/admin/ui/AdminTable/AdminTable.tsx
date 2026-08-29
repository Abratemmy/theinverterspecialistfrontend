"use client";

import React from "react";

export interface AdminTableColumn<T> {
    key: string;
    label: string;
    className?: string;
    headerClassName?: string;

    render?: (
        item: T,
        index: number
    ) => React.ReactNode;
}

interface AdminTableProps<T> {

    columns: AdminTableColumn<T>[];

    data: T[];

    rowKey: (
        item: T,
        index: number
    ) => string | number;

    loading?: boolean;

    emptyMessage?: string;

    className?: string;
}

export default function AdminTable<T>({
    columns,
    data,
    rowKey,
    loading = false,
    emptyMessage = "No records found.",
    className = "",
}: AdminTableProps<T>) {

    return (

        <div
            className={`
                overflow-hidden
                rounded-2xl
                border
                bg-card
                shadow-sm
                ${className}
            `}
        >

            <div className="overflow-x-auto">

                <table className="
                    w-full
                    text-left
                ">

                    {/* ================================================== */}
                    {/* HEADER */}
                    {/* ================================================== */}

                    <thead className="
                        border-b
                        bg-muted/40
                    ">

                        <tr>

                            {columns.map(
                                (column) => (

                                    <th
                                        key={
                                            column.key
                                        }
                                        className={`
                                            whitespace-nowrap
                                            px-6
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-[var(--color-text)]
                                            ${
                                                column.headerClassName ||
                                                ""
                                            }
                                        `}
                                    >

                                        {
                                            column.label
                                        }

                                    </th>

                                )
                            )}

                        </tr>

                    </thead>


                    {/* ================================================== */}
                    {/* BODY */}
                    {/* ================================================== */}

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={
                                        columns.length
                                    }
                                    className="
                                        px-6
                                        py-16
                                        text-center
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        <div className="
                                            h-8
                                            w-8
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-primary
                                            border-t-transparent
                                        " />

                                    </div>

                                </td>

                            </tr>

                        ) : data.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={
                                        columns.length
                                    }
                                    className="
                                        px-6
                                        py-16
                                        text-center
                                        text-sm
                                        text-muted-foreground
                                    "
                                >

                                    {
                                        emptyMessage
                                    }

                                </td>

                            </tr>

                        ) : (

                            data.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            rowKey(
                                                item,
                                                index
                                            )
                                        }
                                        className="
                                            border-b
                                            last:border-b-0
                                            transition-colors
                                            hover:bg-muted/30
                                        "
                                    >

                                        {columns.map(
                                            (
                                                column
                                            ) => (

                                                <td
                                                    key={
                                                        column.key
                                                    }
                                                    className={`
                                                        px-6
                                                        py-4
                                                        text-sm
                                                        ${
                                                            column.className ||
                                                            ""
                                                        }
                                                    `}
                                                >

                                                    {column.render
                                                        ? column.render(
                                                            item,
                                                            index
                                                        )
                                                        : (item as any)[
                                                            column.key
                                                        ]}

                                                </td>

                                            )
                                        )}

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}