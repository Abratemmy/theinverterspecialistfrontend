export default function ProductSkeleton() {
    return (
        <div
            className="
                animate-pulse
                overflow-hidden
                rounded-3xl
                bg-card
                shadow-card
            "
        >
            <div className="h-72 bg-gray-200" />

            <div className="space-y-4 p-6">
                <div className="h-4 w-24 rounded bg-gray-200" />

                <div className="h-5 rounded bg-gray-200" />

                <div className="h-5 w-2/3 rounded bg-gray-200" />

                <div className="h-4 w-28 rounded bg-gray-200" />

                <div className="h-6 w-32 rounded bg-gray-200" />

                <div className="h-12 rounded-xl bg-gray-200" />
            </div>
        </div>
    );
}