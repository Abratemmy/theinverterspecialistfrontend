interface Props {
    title: string;
    subtitle?: string;
    center?: boolean;
}

export default function SectionTitle({
    title,
    subtitle,
    center = false,
}: Props) {
    return (
        <div className={center ? "text-center" : ""}>
            {subtitle && (
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-600">
                    {subtitle}
                </p>
            )}

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {title}
            </h2>
        </div>
    );
}