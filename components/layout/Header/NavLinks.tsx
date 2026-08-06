"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../../../constants/navigation";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((item) => {
                const active = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative font-medium transition-colors duration-300 ${
                            active
                                ? "text-green-600"
                                : "text-gray-700 hover:text-green-600"
                        }`}
                    >
                        {item.label}

                        <span
                            className={`absolute -bottom-2 left-0 h-[2px] bg-green-600 transition-all duration-300
                                ${
                                    active
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                }`}
                        />
                    </Link>
                );
            })}
        </nav>
    );
}