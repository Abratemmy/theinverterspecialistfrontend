"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { useCategories } from "@/hooks/useCategories";

export default function FooterLinks() {
    const { data,
        isLoading,
        error, } = useCategories();
    
        const categories = data?.data ?? [];
    

    const quickLinks = [
        {
            name: "Home",
            href: ROUTES.HOME,
        },
        {
            name: "Shop",
            href: ROUTES.PRODUCTS,
        },
        {
            name: "Categories",
            href: ROUTES.CATEGORIES,
        },
        {
            name: "Brands",
            href: ROUTES.BRANDS,
        },
        {
            name: "About Us",
            href: ROUTES.ABOUT,
        },
        {
            name: "Contact",
            href: ROUTES.CONTACT,
        },
    ];

    return (
        <div
            className="
                grid
                gap-10

                sm:grid-cols-2

                lg:grid-cols-3
            "
        >
            {/* Quick Links */}

            <div>

                <h3 className="mb-6 text-lg font-semibold text-white">
                    Quick Links
                </h3>

                <ul className="space-y-4">

                    {quickLinks.map((link) => (

                        <li key={link.name}>

                            <Link
                                href={link.href}
                                className="
                                    transition-colors
                                    duration-300

                                    hover:text-primary
                                "
                            >
                                {link.name}
                            </Link>

                        </li>

                    ))}

                </ul>

            </div>

            {/* Categories */}

            <div>

                <h3 className="mb-6 text-lg font-semibold text-white">
                    Categories
                </h3>

                <ul className="space-y-4">

                    {categories
                        .slice(0, 5)
                        .map((category) => (

                            <li key={category.id}>

                                <Link
                                    href={`/categories/${category.slug}`}
                                    className="
                                        transition-colors
                                        duration-300

                                        hover:text-primary
                                    "
                                >
                                    {category.name}
                                </Link>

                            </li>

                        ))}

                </ul>

            </div>

            {/* Brands */}

            

            {/* Contact */}

            <div>

                <h3 className="mb-6 text-lg font-semibold text-white">
                    Contact
                </h3>

                <ul className="space-y-5">

                    <li className="flex items-start gap-3">
                        <MapPin
                            size={28}
                            className="mt-1 text-primary"
                        />

                        <span>
                            No. XX Example Street,
                            Lagos, Nigeria
                        </span>
                    </li>

                    <li className="flex items-center gap-3">

                        <Phone
                            size={18}
                            className="text-primary"
                        />

                        <a href="tel:+2348000000000">
                            +234 800 000 0000
                        </a>

                    </li>

                    <li className="flex items-center gap-3">

                        <Mail
                            size={18}
                            className="text-primary"
                        />

                        <a href="mailto:info@ebton.com">
                            info@ebton.com
                        </a>

                    </li>

                    <li className="flex items-start gap-3">

                        <Clock
                            size={18}
                            className="mt-1 text-primary"
                        />

                        <span>
                            Mon - Sat
                            <br />
                            8:00 AM - 6:00 PM
                        </span>

                    </li>

                </ul>

            </div>

        </div>
    );
}