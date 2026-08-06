"use client";

import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";

import { FaXTwitter, FaInstagram } from "react-icons/fa6";

const socials = [
    {
        name: "Facebook",
        href: "https://facebook.com/EbtonTech",
        icon: FaFacebookF,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/ebtontechnologies/",
        icon: FaInstagram,
    },
    {
        name: "X",
        href: "https://x.com/EbtonTech",
        icon: FaXTwitter,
    }
];

export default function SocialLinks() {
    return (
        <div className="flex items-center gap-4">
            {socials.map((social) => {
                const Icon = social.icon;

                return (
                    <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="
                            group
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-gray-700
                            bg-gray-900
                            text-gray-400
                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:border-primary
                            hover:bg-primary
                            hover:text-white
                            hover:shadow-lg
                        "
                    >
                        <Icon
                            size={20}
                            className="
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />
                    </Link>
                );
            })}
        </div>
    );
}