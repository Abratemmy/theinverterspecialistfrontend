"use client";

import Link from "next/link";

export default function FooterBottom() {
    const year = new Date().getFullYear();

    return (
        <div className="border-t border-gray-800">
            <div
                className="
                     w-full
                    flex
                    justify-center
                    px-6
                    py-6
                "
            >
                {/* Copyright */}
                <p
                    className="
                        text-center
                        text-sm
                        text-gray-400
                        md:text-left
                    "
                >
                    © {year}{" "}
                    <span className="font-semibold text-white">
                        Ebton Greener Energy
                    </span>
                    . All rights reserved.
                </p>
            </div>

        </div>
    );
}