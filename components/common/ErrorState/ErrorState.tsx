// components/common/ErrorState/ErrorState.tsx

import { TriangleAlert } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    title = "Something went wrong",
    description = "Please try again.",
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">

            <TriangleAlert
                size={70}
                className="text-red-500"
            />

            <h3 className="mt-6 text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-1 text-text-light">
                {description}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn-primary mt-8 text-sm"
                >
                    Try Again
                </button>
            )}

        </div>
    );
}