"use client";

import {
    SelectHTMLAttributes,
} from "react";

interface AdminSelectOption {

    value: string;

    label: string;
}

interface AdminSelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {

    label: string;

    options: AdminSelectOption[];

    error?: string;

    required?: boolean;
}

export default function AdminSelect({
    label,
    options,
    error,
    required = false,
    id,
    ...props
}: AdminSelectProps) {

    return (

        <div className="space-y-2">

            <label
                htmlFor={id}
                className="
                    block
                    text-sm
                    font-medium
                "
            >

                {label}

                {required && (

                    <span className="
                        ml-1
                        text-red-500
                    ">
                        *
                    </span>

                )}

            </label>


            <select
                id={id}
                {...props}
                className={`
                    w-full
                    rounded-xl
                    border
                    bg-background
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                    ${
                        error
                            ? "border-red-500"
                            : "border-border"
                    }
                `}
            >

                {options.map(
                    (option) => (

                        <option
                            key={
                                option.value
                            }
                            value={
                                option.value
                            }
                        >

                            {option.label}

                        </option>

                    )
                )}

            </select>


            {error && (

                <p className="
                    text-xs
                    text-red-500
                ">

                    {error}

                </p>

            )}

        </div>

    );

}