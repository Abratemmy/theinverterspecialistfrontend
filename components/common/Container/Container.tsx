import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function Container({
    children,
    className = "",
}: Props) {
    return (
        <div
            className={`
                w-full
                px-10
                sm:px-6
                md:px-8
                lg:px-10
                xl:px-12
                ${className}
            `}
        >
            {children}
        </div>
    );
}