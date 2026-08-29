"use client";

import Link from "next/link";
import {    useRouter, usePathname } from "next/navigation";
import { NAV_LINKS } from "../../../constants/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    const isActiveRoute = (route: string) => {
        return (
            pathname === route ||
            pathname.startsWith(`${route}/`)
        );
    };

    return (
        <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((item) => {
                const active = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative font-medium transition-colors duration-300 ${
                            isActiveRoute(item.href)
                                ?  "text-[var(--color-primary)]"
                                : "text-white hover:text-[var(--color-primary)]"
                        }`}
                    >
                        {item.label}

                        <span
                            className={`absolute -bottom-2 left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300
                                ${
                                    isActiveRoute(item.href)
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