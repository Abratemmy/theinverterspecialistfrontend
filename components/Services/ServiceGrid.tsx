"use client";

import {
    Wrench,
    Zap,
    Search,
    Settings,
    RefreshCw,
    CircuitBoard,
    Camera,
} from "lucide-react";

import Container from "@/components/common/Container/Container";


const services = [

    {
        title: "Installation",
        description:
            "Professional installation of inverters, solar panels, batteries, and other power systems to ensure safe and reliable operation.",
        icon: Zap,
    },

    {
        title: "Power Audit",
        description:
            "We assess your power consumption and requirements to help you determine the right system capacity and configuration.",
        icon: Search,
    },

    {
        title: "Troubleshooting",
        description:
            "We diagnose power system faults and identify the cause of electrical, inverter, battery, and solar system problems.",
        icon: Wrench,
    },

    {
        title: "System Upgrade",
        description:
            "Upgrade your existing power system with additional capacity, improved components, or newer technology.",
        icon: RefreshCw,
    },

    {
        title: "Repairs & Maintenance",
        description:
            "Regular maintenance and professional repairs to keep your inverter, solar, battery, and electrical systems working efficiently.",
        icon: Settings,
    },

    {
        title: "General Electrical Design",
        description:
            "Professional electrical system design for residential, commercial, and other power installation projects.",
        icon: CircuitBoard,
    },

    {
        title: "CCTV Camera Installation",
        description:
            "Professional CCTV camera installation and setup to help protect your home, office, shop, and other properties.",
        icon: Camera,
    },

];


export default function ServiceGrid() {

    return (

        <section className="py-8 sm:py-10">

            <Container>

                {/* ================================================= */}
                {/* SECTION HEADER */}
                {/* ================================================= */}

                <div className="mx-auto max-w-2xl text-center">

                    <span
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-primary
                        "
                    >
                        What We Do
                    </span>


                    <h2
                        className="
                            mt-3
                            text-2xl
                            font-bold
                            tracking-tight
                            text-[var(--color-text)]
                            sm:text-3xl
                        "
                    >
                        Our Professional Services
                    </h2>


                    <p
                        className="
                            mt-4
                            text-base
                            leading-7
                            text-muted-foreground
                        "
                    >
                        From installation to maintenance and
                        troubleshooting, we provide reliable technical
                        services for your power and electrical needs.
                    </p>

                </div>


                {/* ================================================= */}
                {/* SERVICE GRID */}
                {/* ================================================= */}

                <div
                    className="
                        mt-12
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >

                    {services.map((service) => {
                        const Icon = service.icon;
                        return (

                            <div
                                key={service.title}
                                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-white
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-primary/30
                                    hover:shadow-lg
                                "
                            >

                                {/* ICON */}

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary/10
                                        text-primary
                                        transition
                                        duration-300
                                        group-hover:bg-[var(--color-primary)]
                                        group-hover:text-white
                                    "
                                >

                                    <Icon
                                        size={23}
                                    />

                                </div>


                                {/* TITLE */}

                                <h3
                                    className="
                                        mt-5
                                        text-lg
                                        font-semibold
                                        text-gray-900
                                    "
                                >

                                    {service.title}

                                </h3>


                                {/* DESCRIPTION */}

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-muted-foreground
                                    "
                                >

                                    {service.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </Container>

        </section>

    );

}