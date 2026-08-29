"use client";

import {
    X,
} from "lucide-react";

import {
    ReactNode,
    useEffect,
} from "react";

interface AdminModalProps {

    open: boolean;

    onClose: () => void;

    title: string;

    description?: string;

    children: ReactNode;

    maxWidth?: string;

    closeOnOverlayClick?: boolean;
}

export default function AdminModal({
    open,
    onClose,
    title,
    description,
    children,
    maxWidth = "max-w-2xl",
    closeOnOverlayClick = true,
}: AdminModalProps) {


    // ============================================================
    // ESCAPE KEY
    // ============================================================

    useEffect(() => {

        if (!open) {
            return;
        }

        const handleKeyDown =
            (event: KeyboardEvent) => {

                if (
                    event.key === "Escape"
                ) {

                    onClose();

                }

            };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [
        open,
        onClose,
    ]);


    // ============================================================
    // BODY SCROLL
    // ============================================================

    useEffect(() => {

        if (!open) {
            return;
        }

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        return () => {

            document.body.style.overflow =
                originalOverflow;

        };

    }, [open]);


    if (!open) {
        return null;
    }


    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                p-4
            "
        >

            {/* ================================================== */}
            {/* OVERLAY */}
            {/* ================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    bg-black/50
                    backdrop-blur-sm
                "
                onClick={() => {

                    if (
                        closeOnOverlayClick
                    ) {

                        onClose();

                    }

                }}
            />


            {/* ================================================== */}
            {/* MODAL */}
            {/* ================================================== */}

            <div
                className={`
                    relative
                    z-10
                    flex
                    max-h-[90vh]
                    w-full
                    ${maxWidth}
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    bg-card
                    shadow-2xl
                `}
            >

                {/* ================================================== */}
                {/* HEADER */}
                {/* ================================================== */}

                <div className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    border-b
                    px-6
                    py-5
                ">

                    <div>

                        <h2 className="
                            text-xl
                            font-bold
                            text-[var(--color-text)]
                        ">

                            {title}

                        </h2>


                        {description && (

                            <p className="
                                mt-1
                                text-sm
                                text-muted-foreground
                            ">

                                {description}

                            </p>

                        )}

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-muted-foreground
                            transition
                            hover:bg-muted
                            hover:text-foreground
                        "
                        aria-label="Close modal"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* ================================================== */}
                {/* CONTENT */}
                {/* ================================================== */}

                <div className="
                    overflow-y-auto
                    p-6
                ">

                    {children}

                </div>

            </div>

        </div>

    );

}