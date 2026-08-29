import {
    LucideIcon,
    ArrowUpRight
} from "lucide-react";


interface DashboardCardProps {

    title: string;

    value: string | number;

    description?: string;

    icon: LucideIcon;

}


export default function DashboardCard({

    title,

    value,

    description,

    icon: Icon

}: DashboardCardProps) {

    return (

        <div
            className="
                group
                rounded-2xl
                border
                bg-card
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                border-gray-200
                mt-6
                mb-6
            "
        >

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-[var(--color-text)] uppercase">

                        {title}

                    </p>


                    <h3 className="mt-2 text-2xl font-bold tracking-tight">

                        {value}

                    </h3>

                </div>


                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary/10
                        text-primary
                    "
                >

                    <Icon size={21} />

                </div>

            </div>


            <div className="mt-5 flex items-center justify-between">

                <p className="text-xs text-muted-foreground">

                    {description}

                </p>


                <ArrowUpRight
                    size={16}
                    className="
                        text-muted-foreground
                        transition
                        group-hover:text-primary
                    "
                />

            </div>

        </div>

    );

}