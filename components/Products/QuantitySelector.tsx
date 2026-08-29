"use client";

import {
    Minus,
    Plus,
} from "lucide-react";

interface QuantitySelectorProps {
    quantity: number;
    maxQuantity: number;
    onChange: (quantity: number) => void;
    disabled?: boolean;
}

export default function QuantitySelector({
    quantity,
    maxQuantity,
    onChange,
    disabled = false,
}: QuantitySelectorProps) {

    const decrease = () => {

        if (quantity <= 1) {
            return;
        }

        onChange(quantity - 1);
    };


    const increase = () => {

        if (quantity >= maxQuantity) {
            return;
        }

        onChange(quantity + 1);
    };


    return (
        <div
            className="
                inline-flex
                h-12
                items-center
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
            "
        >

            <button
                type="button"
                onClick={decrease}
                disabled={
                    disabled ||
                    quantity <= 1
                }
                className="
                    flex
                    h-full
                    w-12
                    items-center
                    justify-center
                    transition

                    hover:bg-gray-50

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
                aria-label="Decrease quantity"
            >
                <Minus size={17} />
            </button>


            <span
                className="
                    flex
                    h-full
                    min-w-12
                    items-center
                    justify-center
                    border-x
                    border-gray-200
                    px-3
                    text-sm
                    font-semibold
                "
            >
                {quantity}
            </span>


            <button
                type="button"
                onClick={increase}
                disabled={
                    disabled ||
                    quantity >= maxQuantity
                }
                className="
                    flex
                    h-full
                    w-12
                    items-center
                    justify-center
                    transition

                    hover:bg-gray-50

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
                aria-label="Increase quantity"
            >
                <Plus size={17} />
            </button>

        </div>
    );
}