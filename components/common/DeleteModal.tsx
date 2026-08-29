"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteModalProps {
    open: boolean;
    title?: string;
    message?: string;
    itemName?: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({
    open,
    title = "Delete Item",
    message = "Are you sure you want to delete this item?",
    itemName,
    loading = false,
    onClose,
    onConfirm,
}: DeleteModalProps) {

    if (!open) {
        return null;
    }

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
        >
            <div
                className="
                    w-full
                    max-w-md
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-2xl
                "
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        px-6
                        pt-6
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500/10
                                text-red-500
                            "
                        >

                            <AlertTriangle
                                size={22}
                            />

                        </div>

                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    font-poppins-custom
                                "
                            >
                                {title}
                            </h2>

                        </div>

                    </div>


                    {/* CLOSE */}

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
                            text-muted-foreground
                            transition
                            hover:bg-muted
                            hover:text-foreground
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <X
                            size={22}
                            className=""
                        />

                    </button>

                </div>


                {/* MESSAGE */}

                <div
                    className="
                        px-6
                        pb-6
                        pt-4
                    "
                >

                    <p
                        className="
                            text-sm
                            leading-6
                            text-muted-foreground
                        "
                    >

                        {message}

                        {itemName && (
                            <>
                                {" "}

                                <span
                                    className="
                                        font-semibold
                                        text-foreground
                                    "
                                >
                                    `{itemName}`
                                </span>

                                {"?"}
                            </>
                        )}

                    </p>


                    <p
                        className="
                            mt-2
                            text-xs
                            text-muted-foreground
                        "
                    >
                        This action cannot be undone.
                    </p>

                </div>


                {/* ACTIONS */}

                <div
                    className="
                        flex
                        justify-between
                        gap-3
                        border-t
                        bg-muted/20
                        px-6
                        py-4
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
                            transition
                            hover:bg-muted
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            inline-flex
                            min-w-[100px]
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {loading && (

                            <Loader2
                                size={16}
                                className="
                                    animate-spin
                                "
                            />

                        )}

                        {loading
                            ? "Deleting..."
                            : "Delete"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
}