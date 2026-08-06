"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({
    items,
}: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm"
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div
                        key={item.label}
                        className="flex items-center gap-2"
                    >
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="
                                    text-muted-foreground
                                    transition-colors
                                    duration-300
                                    hover:text-primary
                                "
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={
                                    isLast
                                        ? "font-medium text-primary"
                                        : "text-muted-foreground"
                                }
                            >
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <ChevronRight
                                size={16}
                                className="text-gray-400"
                            />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}