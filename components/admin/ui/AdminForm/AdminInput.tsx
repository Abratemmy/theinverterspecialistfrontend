"use client";

import {
    InputHTMLAttributes,
} from "react";

interface AdminInputProps
    extends InputHTMLAttributes<HTMLInputElement> {

    label: string;

    error?: string;

    required?: boolean;
}

export default function AdminInput({
    label,
    error,
    required = false,
    id,
    ...props
}: AdminInputProps) {

    return (

        <div className="space-y-2">

            <label
                htmlFor={id}
                className="
                    block
                    text-sm
                    font-medium
                    text-[var(--color-text)]
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


            <input
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
                    placeholder:text-muted-foreground
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                    ${
                        error
                            ? "border-red-500"
                            : "border-border"
                    }
                `}
            />


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