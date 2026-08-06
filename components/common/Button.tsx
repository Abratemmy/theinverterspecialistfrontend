import Link from "next/link";

interface ButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "outline";
}

export default function Button({
    href,
    children,
    variant = "primary",
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors";

    const styles = {
        primary:
            "bg-green-600 text-white hover:bg-green-700",
        outline:
            "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
    };

    return (
        <Link
            href={href}
            className={`${base} ${styles[variant]}`}
        >
            {children}
        </Link>
    );
}