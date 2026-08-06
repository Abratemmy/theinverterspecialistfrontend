import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <Image
                src="/images/logo.jpeg"
                alt="Ebton Greener Energy Co."
                width={180}
                height={60}
                priority
            />
        </Link>
    );
}