"use client";

import {
    ChevronDown,
    Check,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";


interface FilterOption {

    value: string;

    label: string;

}


interface OrderFilterSelectProps {

    value: string;

    onChange: (
        value: string
    ) => void;

    options: FilterOption[];

    placeholder: string;

    className?: string;

}


export default function OrderFilterSelect({

    value,

    onChange,

    options,

    placeholder,

    className = "",

}: OrderFilterSelectProps) {


    const [open, setOpen] =
        useState(false);


    const containerRef =
        useRef<HTMLDivElement>(null);


    const selectedOption =
        options.find(
            (option) =>
                option.value === value
        );


    // ========================================================
    // CLOSE OUTSIDE
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
    // SELECT
    // ========================================================

    const handleSelect = (
        optionValue: string
    ) => {

        onChange(optionValue);

        setOpen(false);

    };


    return (

        <div
            ref={containerRef}
            className={`
                relative
                ${className}
            `}
        >

            {/* ================================================= */}
            {/* BUTTON */}
            {/* ================================================= */}

            <button
                type="button"
                onClick={() =>
                    setOpen(
                        (previous) =>
                            !previous
                    )
                }
                className="
                    flex
                    h-11
                    min-w-[165px]
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    border
                    bg-white
                    px-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-50
                    focus:border-primary
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/10
                "
            >

                <span>
                    {
                        selectedOption?.label ||
                        placeholder
                    }
                </span>


                <ChevronDown
                    size={17}
                    className={`
                        transition-transform
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
                        left-0
                        top-full
                        z-50
                        mt-2
                        w-full
                        min-w-[190px]
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

                    {options.map(
                        (option) => {

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
                                        transition
                                        ${
                                            selected
                                                ? "bg-primary/10 font-medium text-primary"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }
                                    `}
                                >

                                    <span>
                                        {
                                            option.label
                                        }
                                    </span>


                                    {selected && (

                                        <Check
                                            size={16}
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