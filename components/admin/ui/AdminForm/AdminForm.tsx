"use client";

import {
    FormEvent,
    ReactNode,
} from "react";

interface AdminFormProps {

    children: ReactNode;

    onSubmit: (
        event: FormEvent<HTMLFormElement>
    ) => void;

    className?: string;
}

export default function AdminForm({
    children,
    onSubmit,
    className = "",
}: AdminFormProps) {

    return (

        <form
            onSubmit={onSubmit}
            className={`
                space-y-5
                ${className}
            `}
        >

            {children}

        </form>

    );

}