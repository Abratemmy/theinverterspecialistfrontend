interface AdminBadgeProps {

    children: React.ReactNode;

    variant?:
        | "success"
        | "warning"
        | "danger"
        | "neutral"
        | "info";
}

export default function AdminBadge({
    children,
    variant = "neutral",
}: AdminBadgeProps) {

    const variants = {

        success:
            "bg-green-100 text-green-700",

        warning:
            "bg-orange-100 text-orange-700",

        danger:
            "bg-red-100 text-red-700",

        neutral:
            "bg-gray-100 text-gray-600",

        info:
            "bg-blue-100 text-blue-700",

    };


    return (

        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                capitalize
                ${variants[variant]}
            `}
        >

            {children}

        </span>

    );

}