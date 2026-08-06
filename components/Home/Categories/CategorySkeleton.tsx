// import Skeleton from "@/components/common/Skeleton/Skeleton";

import Skeleton from "@/components/common/Skeleton/Skeleton";

export default function CategorySkeleton() {
    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-card">

            <Skeleton className="h-40 w-full rounded-none" />

            <div className="space-y-3 p-6">
                <Skeleton className="h-5 w-3/4" />
            </div>

        </div>
    );
}