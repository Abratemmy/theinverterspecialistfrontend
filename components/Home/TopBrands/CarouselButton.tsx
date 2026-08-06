"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    direction: "left" | "right";
    onClick: () => void;
    disabled?: boolean;
}

export default function CarouselButton({
    direction,
    onClick,
    disabled,
}: Props) {
    const Icon =
        direction === "left"
            ? ChevronLeft
            : ChevronRight;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                shadow-md
                transition-all
                duration-300

                hover:border-primary
                hover:bg-[var(--color-primary)]
                hover:text-white

                disabled:cursor-not-allowed
                disabled:opacity-40
            "
        >
            <Icon size={22} />
        </button>
    );
}