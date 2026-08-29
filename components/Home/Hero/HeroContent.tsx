"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const FEATURES = [
    "100% Genuine Products",
    "Nationwide Delivery",
    "Professional Installation",
];

export default function HeroContent() {
    return (
        <div className="flex flex-col justify-center">

            {/* Badge */}

            <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-[var(--bgcolor-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                    Renewable Energy Solutions
                </span>
            </div>

            {/* Heading */}

            <h1
                className="
                    text-3xl
                    font-bold
                    tracking-tight
                    sm:text-4xl
                    lg:text-5xl
                "
            >
                Powering a
                <span className="block text-[var(--color-primary)]">
                    Brighter, Greener Future
                </span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Discover premium solar panels, hybrid inverters,
                lithium batteries and energy accessories designed
                to power homes and businesses across Nigeria with
                reliable and sustainable energy solutions.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

                <Link
                    href="/products"
                    className="inline-flex items-center rounded-xl bg-[var(--color-primary)] px-8 py-4 font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
                >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                    href="/contact"
                    className="rounded-xl border border-[var(--color-primary)] px-8 py-4 font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
                >
                    Request Quote
                </Link>

            </div>

            {/* Trust Features */}

            <div className="mt-12 grid gap-4 sm:grid-cols-2">

                {FEATURES.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-center gap-3"
                    >
                        <CheckCircle
                            size={22}
                            className="text-primary"
                        />

                        <span className="font-medium text-gray-700">
                            {feature}
                        </span>
                    </div>
                ))}

            </div>

        </div>
    );
}