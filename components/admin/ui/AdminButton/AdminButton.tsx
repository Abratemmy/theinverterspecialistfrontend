"use client";

import {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import {
    Loader2,
} from "lucide-react";

interface AdminButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {

    children: ReactNode;

    loading?: boolean;

    variant?:
        | "primary"
        | "secondary"
        | "danger"
        | "ghost";
}

export default function AdminButton({
    children,
    loading = false,
    variant = "primary",
    disabled,
    className = "",
    ...props
}: AdminButtonProps) {

    const variants = {

        primary:
            "bg-primary text-white hover:opacity-90",

        secondary:
            "border bg-card hover:bg-muted",

        danger:
            "bg-red-500 text-white hover:bg-red-600",

        ghost:
            "hover:bg-muted",

    };


    return (

        <button
            {...props}
            disabled={
                disabled ||
                loading
            }
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                py-3
                text-sm
                font-semibold
                transition
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${variants[variant]}
                ${className}
            `}
        >

            {loading && (

                <Loader2
                    size={17}
                    className="
                        animate-spin
                    "
                />

            )}

            {children}

        </button>

    );

}