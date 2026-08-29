"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Check,
    ChevronDown,
} from "lucide-react";

import type {
    OrderStatus,
    PaymentStatus,
} from "@/types/order";


// ============================================================
// TYPES
// ============================================================

interface OrderStatusSelectProps {

    value: OrderStatus;
    paymentStatus: PaymentStatus;

    onChange: (
        value: OrderStatus
    ) => void;

    disabled?: boolean;

    className?: string;

}


// ============================================================
// STATUS OPTIONS
// ============================================================

const statusOptions: {
    value: OrderStatus;
    label: string;
}[] = [

    {
        value: "pending",
        label: "Pending",
    },

    {
        value: "processing",
        label: "Processing",
    },

    {
        value: "packed",
        label: "Packed",
    },

    {
        value: "shipped",
        label: "Shipped",
    },

    {
        value: "out_for_delivery",
        label: "Out for Delivery",
    },

    {
        value: "delivered",
        label: "Delivered",
    },

    {
        value: "cancelled",
        label: "Cancelled",
    },

];


// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles: Record<
    OrderStatus,
    {
        button: string;
        dot: string;
        hover: string;
    }
> = {

    pending: {

        button:
            "bg-yellow-50 text-yellow-700 border-yellow-200",

        dot:
            "bg-yellow-500",

        hover:
            "hover:bg-yellow-50",

    },

    processing: {

        button:
            "bg-blue-50 text-blue-700 border-blue-200",

        dot:
            "bg-blue-500",

        hover:
            "hover:bg-blue-50",

    },

    packed: {

        button:
            "bg-purple-50 text-purple-700 border-purple-200",

        dot:
            "bg-purple-500",

        hover:
            "hover:bg-purple-50",

    },

    shipped: {

        button:
            "bg-indigo-50 text-indigo-700 border-indigo-200",

        dot:
            "bg-indigo-500",

        hover:
            "hover:bg-indigo-50",

    },

    out_for_delivery: {

        button:
            "bg-orange-50 text-orange-700 border-orange-200",

        dot:
            "bg-orange-500",

        hover:
            "hover:bg-orange-50",

    },

    delivered: {

        button:
            "bg-green-50 text-green-700 border-green-200",

        dot:
            "bg-green-500",

        hover:
            "hover:bg-green-50",

    },

    cancelled: {

        button:
            "bg-red-50 text-red-700 border-red-200",

        dot:
            "bg-red-500",

        hover:
            "hover:bg-red-50",

    },

};


// ============================================================
// COMPONENT
// ============================================================

export default function OrderStatusSelect({

    value,

    paymentStatus,

    onChange,

    disabled = false,

    className = "",

}: OrderStatusSelectProps) {

    const paymentNotCompleted =
        paymentStatus !== "paid";


    const isDisabled =
        disabled || paymentNotCompleted


    // ========================================================
    // STATE
    // ========================================================

    const [
        open,
        setOpen,
    ] = useState(false);


    // ========================================================
    // REF
    // ========================================================

    const containerRef =
        useRef<HTMLDivElement>(null);


    // ========================================================
    // CURRENT STATUS
    // ========================================================

    const currentStatus =
        statusOptions.find(
            (option) =>
                option.value === value
        );


    const currentStyles =
        statusStyles[value];


    // ========================================================
    // CLOSE WHEN CLICKING OUTSIDE
    // ========================================================

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                containerRef.current &&
                !containerRef.current.contains(
                    event.target as Node
                )
            ) {

                setOpen(false);

            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // ========================================================
    // HANDLE SELECT
    // ========================================================

    const handleSelect = (
        status: OrderStatus
    ) => {

        setOpen(false);

        if (status === value) {

            return;

        }

        onChange(status);

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div
            ref={containerRef}
            className={`
                relative
                inline-block
                ${className}
            `}
        >

            {/* ================================================= */}
            {/* SELECT BUTTON */}
            {/* ================================================= */}

            <button
                type="button"
                disabled={isDisabled}
                onClick={() =>
                    setOpen(
                        (previous) =>
                            !previous
                    )
                }
                className={`
                    flex
                    min-w-[150px]
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    border
                    px-3
                    py-2
                    text-sm
                    font-medium
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${currentStyles.button}
                `}
            >

                <span
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {/* STATUS DOT */}

                    <span
                        className={`
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                            ${currentStyles.dot}
                        `}
                    />


                    {/* STATUS LABEL */}

                    <span>
                        {
                            currentStatus?.label
                        }
                    </span>

                </span>


                {/* ARROW */}

                <ChevronDown
                    size={16}
                    className={`
                        shrink-0
                        transition-transform
                        duration-200
                        ${
                            open
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />

            </button>


            {/* ================================================= */}
            {/* DROPDOWN */}
            {/* ================================================= */}

            {open && (

                <div
                    className="
                        absolute
                        right-0
                        z-50
                        mt-2
                        w-[190px]
                        overflow-hidden
                        rounded-xl
                        border
                        bg-white
                        p-1
                        shadow-lg
                        ring-1
                        ring-black/5
                    "
                >

                    {statusOptions.map(
                        (option) => {

                            const styles =
                                statusStyles[
                                    option.value
                                ];

                            const selected =
                                option.value ===
                                value;


                            return (

                                <button
                                    key={
                                        option.value
                                    }
                                    type="button"
                                    onClick={() =>
                                        handleSelect(
                                            option.value
                                        )
                                    }
                                    className={`
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            selected
                                                ? styles.button
                                                : "text-gray-700 hover:bg-gray-100"
                                        }
                                    `}
                                >

                                    <span
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        {/* STATUS DOT */}

                                        <span
                                            className={`
                                                h-2
                                                w-2
                                                rounded-full
                                                ${styles.dot}
                                            `}
                                        />


                                        {/* LABEL */}

                                        <span>
                                            {
                                                option.label
                                            }
                                        </span>

                                    </span>


                                    {/* CHECK */}

                                    {selected && (

                                        <Check
                                            size={
                                                16
                                            }
                                        />

                                    )}

                                </button>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}