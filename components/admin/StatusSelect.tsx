"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    ChevronDown,
} from "lucide-react";


export interface StatusSelectOption<T extends string> {

    value: T;

    label: string;

    className?: string;

}


interface StatusSelectProps<T extends string> {

    value: T;

    onChange: (
        value: T
    ) => void;

    options: StatusSelectOption<T>[];

    placeholder?: string;

    className?: string;

    disabled?: boolean;

}


export default function StatusSelect<
    T extends string
>({
    value,
    onChange,
    options,
    placeholder = "Select status",
    className = "",
    disabled = false,
}: StatusSelectProps<T>) {

    const [
        open,
        setOpen
    ] = useState(false);


    const containerRef =
        useRef<HTMLDivElement>(null);


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


    const selectedOption =
        options.find(
            (option) =>
                option.value === value
        );


    return (

        <div
            ref={containerRef}
            className={`
                relative
                 min-w-[165px]
                ${className}
            `}
        >

            {/* ==================================================
                SELECT BUTTON
            ================================================== */}

            <button
                type="button"
                disabled={disabled}
                onClick={() =>
                    setOpen(
                        (current) =>
                            !current
                    )
                }
                className="
                    flex
                    h-11
                    w-full
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-3
                    text-left
                    text-sm
                    font-medium
                    text-gray-700
                    outline-none
                    transition
                    hover:bg-gray-50
                    focus:border-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >

                <span>
                    {selectedOption?.label ??
                        placeholder}
                </span>


                <ChevronDown
                    size={17}
                    className={`
                        shrink-0
                        text-gray-400
                        transition-transform
                        ${
                            open
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />

            </button>


            {/* ==================================================
                OPTIONS
            ================================================== */}

            {open && (

                <div className="
                    absolute
                    left-0
                    top-[calc(100%+6px)]
                    z-50
                    w-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-1
                    shadow-lg
                ">

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
                                    onClick={() => {

                                        onChange(
                                            option.value
                                        );

                                        setOpen(
                                            false
                                        );

                                    }}
                                    className={`
                                        flex
                                        w-full
                                        items-center
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        transition

                                        ${
                                            selected
                                                ? "font-medium"
                                                : ""
                                        }

                                        ${
                                            option.className ??
                                            "text-gray-700 hover:bg-gray-50"
                                        }
                                    `}
                                >

                                    {option.label}

                                </button>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}