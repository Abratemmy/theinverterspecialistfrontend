"use client";

import Link from "next/link";

export default function FooterBottom() {
    const year = new Date().getFullYear();

    return (
        <div className="border-t border-gray-800">
            <div
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    justify-between
                    gap-4
                    px-6
                    py-6

                    md:flex-row
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

                {/* Links */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-6
                        text-sm
                    "
                >
                    <Link
                        href="/privacy-policy"
                        className="
                            text-gray-400
                            transition-colors
                            duration-300
                            hover:text-primary
                        "
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        href="/terms-and-conditions"
                        className="
                            text-gray-400
                            transition-colors
                            duration-300
                            hover:text-primary
                        "
                    >
                        Terms & Conditions
                    </Link>

                    <Link
                        href="/cookie-policy"
                        className="
                            text-gray-400
                            transition-colors
                            duration-300
                            hover:text-primary
                        "
                    >
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </div>
    );
}