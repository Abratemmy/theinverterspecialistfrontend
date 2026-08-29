
"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
    open: boolean;
    title?: string;
    message?: string;
    itemName?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    variant?: "primary" | "danger";
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({
    open,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    itemName,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    variant = "primary",
    onClose,
    onConfirm,
}: ConfirmationModalProps) {

    if (!open) {
        return null;
    }

    const confirmButtonClass =
        variant === "danger"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:opacity-90";

    return (
        <div
            className="
                fixed
                inset-0
                z-[200]
                flex
                items-center
                justify-center
                bg-black/80
                p-4
                backdrop-blur-sm
            "
            onClick={() => {
                if (!loading) {
                    onClose();
                }
            }}
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-xl
                "
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                                text-primary
                            "
                        >
                            <AlertTriangle size={21} />
                        </div>

                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-gray-900
                                "
                            >
                                {title}
                            </h2>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-500
                            transition
                            hover:bg-gray-100
                            hover:text-gray-900
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <X size={18} />
                    </button>

                </div>


                {/* MESSAGE */}

                <div
                    className="
                        mt-5
                        text-sm
                        leading-6
                        text-gray-600
                    "
                >

                    <p>
                        {message}
                    </p>

                    {itemName && (
                        <p
                            className="
                                mt-2
                                font-semibold
                                text-gray-900
                            "
                        >
                            `{itemName}`
                        </p>
                    )}

                </div>


                {/* ACTIONS */}

                <div
                    className="
                        mt-6
                        flex
                        flex-col-reverse
                        gap-3
                        sm:flex-row
                        sm:justify-end
                    "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            rounded-xl
                            border
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {cancelText}
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`
                            rounded-xl
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            ${confirmButtonClass}
                        `}
                    >

                        {loading
                            ? "Please wait..."
                            : confirmText}

                    </button>

                </div>

            </div>

        </div>
    );
}
