import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({
    icon: Icon,
    title,
    description,
}: Props) {
    return (
        <div
            className="
                rounded-2xl
                bg-white
                py-5
                px-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                flex
                gap-4
            "
        >
            <div
                className="
                    mb-5
                    inline-flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bgprimaryColorLight
                "
            >
                <Icon
                    size={30}
                   className="primaryColor"
                />
            </div>

            <div>

                <h3 className="mb-2 text-base font-semibold">
                    {title}
                </h3>

                <p className="leading-7 text-gray-600">
                    {description}
                </p>
            </div>
        </div>
    );
}