"use client";

import {
    TextareaHTMLAttributes,
} from "react";

interface AdminTextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {

    label: string;

    error?: string;

    required?: boolean;
}

export default function AdminTextarea({
    label,
    error,
    required = false,
    id,
    ...props
}: AdminTextareaProps) {

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


            <textarea
                id={id}
                {...props}
                className={`
                    min-h-[120px]
                    w-full
                    resize-y
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