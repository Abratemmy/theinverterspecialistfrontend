// components/common/EmptyState/EmptyState.tsx

import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
}

export default function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">

            <Inbox
                size={70}
                className="text-border text-[var(--color-text-light)]"
            />

            <h3 className="mt-6 text-2xl mb-3 font-semibold font-poppins-customs text-[var(--color-primary)]">
                {title}
            </h3>

            {description && (
                <p className="mt-2 max-w-md text-[var(--color-text-light)]">
                    {description}
                </p>
            )}

        </div>
    );
}