import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    href?: string;
    actionText?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    href,
    actionText = "View All",
}: SectionHeaderProps) {
    return (
        <div className="mb-7 flex items-center justify-between gap-6">
            {/* Left */}

            <div>
                <h2 className="text-3xl font-bold text-text">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-2 max-w-2xl text-muted">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Right */}

            {href && (
                <Link
                    href={href}
                    className="
                        hidden
                        items-center
                        gap-2
                        font-semibold
                        text-primary
                        transition-all
                        duration-300
                        hover:gap-3
                        md:flex
                    "
                >
                    {actionText}

                    <ArrowRight size={18} />
                </Link>
            )}
        </div>
    );
}