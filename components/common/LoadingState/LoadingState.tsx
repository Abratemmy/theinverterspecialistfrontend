// components/common/LoadingState/LoadingState.tsx

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
    text?: string;
}

export default function LoadingState({
    text = "Loading..."
}: LoadingStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16">

            <Loader2
                size={40}
                className="animate-spin text-primary"
            />

            <p className="mt-4 text-text-light">
                {text}
            </p>

        </div>
    );
}