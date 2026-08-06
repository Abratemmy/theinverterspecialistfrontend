"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function MotionSection({
    children,
    className = "",
}: Props) {
    return (
        <motion.section
            className={className}
            initial={{
                opacity: 0,
                y: 60,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.25,
            }}
            transition={{
                duration: 0.7,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.section>
    );
}