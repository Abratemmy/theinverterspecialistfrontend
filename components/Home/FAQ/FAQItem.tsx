"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
    question: string;
    answer: string;
    open: boolean;
    onClick: () => void;
}

export default function FAQItem({
    question,
    answer,
    open,
    onClick,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <button
                onClick={onClick}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-6
                    text-left
                    transition-colors
                    hover:bg-gray-50
                "
            >
                <span className="text-lg font-semibold">
                    {question}
                </span>

                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                >
                    <ChevronDown className="text-primary" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <div className="border-t border-gray-100 px-6 pb-6 pt-4 text-gray-600 leading-7">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}