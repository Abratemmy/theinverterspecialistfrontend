"use client";

import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Leaf,
    ShieldCheck,
    Sun,
    Users,
    Zap,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container/Container";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--color-background)]">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Header />


            {/* =====================================================
                BREADCRUMB
            ===================================================== */}
             <section className="bg-gray-50 py-12 sm:py-16">
            <Container>
                <Breadcrumb
                    items={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "About Us",
                        },
                    ]}
                />
            </Container>
            </section>

            {/* =====================================================
                INTRODUCTION
            ===================================================== */}

            <section className="
                bg-white
                py-16
                sm:py-20
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        grid
                        items-center
                        gap-12
                        lg:grid-cols-2
                    ">

                        {/* Left */}

                        <div>

                            <p className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-primary)]
                            ">

                                About Us

                            </p>


                            <h1 className="
                                mt-3
                                text-3xl
                                font-extrabold
                                tracking-tight
                                   sm:text-4xl
                                lg:text-5xl
                            ">

                                Building a brighter
                                <span className="text-primary">
                                {" "}energy future.
                            </span>

                            </h1>


                            <div className="
                                mt-6
                                space-y-4
                                text-base
                                leading-8
                                text-[var(--color-text)]
                            ">

                                <p>
                                    At Ebton Technology , we believe
                                    that access to reliable electricity should
                                    not be a luxury. Our goal is to provide
                                    dependable solar and backup power
                                    solutions that make everyday life and
                                    business operations easier.
                                </p>


                                <p>
                                    From inverters and solar panels to
                                    batteries and other power accessories,
                                    we bring together quality products and
                                    practical energy solutions for modern
                                    homes and businesses.
                                </p>


                                <p>
                                    We are committed to helping our customers
                                    make informed energy decisions while
                                    delivering products they can depend on.
                                </p>

                            </div>

                        </div>


                        {/* Right */}

                        <div className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            bg-gradient-to-br
                            from-[var(--color-primary)]
                            to-[var(--color-primary-dark)]
                            p-8
                            shadow-xl
                            sm:p-10
                        ">

                            <div className="
                                absolute
                                -right-10
                                -top-10
                                h-40
                                w-40
                                rounded-full
                                bg-white/10
                            " />


                            <Sun
                                size={48}
                                className="text-lime-300"
                            />


                            <h3 className="
                                mt-6
                                text-2xl
                                font-bold
                                text-white
                            ">

                                Energy independence
                                starts with the right solution.

                            </h3>


                            <p className="
                                mt-4
                                leading-7
                                text-white/75
                            ">

                                Whether you need backup power for your home,
                                a solar system for your business, or quality
                                components for a larger installation, we're
                                here to help you find the right solution.

                            </p>


                            <div className="
                                mt-8
                                grid
                                grid-cols-2
                                gap-4
                            ">

                                <div className="
                                    rounded-2xl
                                    bg-white/10
                                    p-5
                                ">

                                    <Zap
                                        size={24}
                                        className="text-lime-300"
                                    />

                                    <p className="
                                        mt-3
                                        font-bold
                                        text-white
                                    ">

                                        Reliable Power

                                    </p>

                                </div>


                                <div className="
                                    rounded-2xl
                                    bg-white/10
                                    p-5
                                ">

                                    <Leaf
                                        size={24}
                                        className="text-lime-300"
                                    />

                                    <p className="
                                        mt-3
                                        font-bold
                                        text-white
                                    ">

                                        Clean Energy

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                MISSION
            ===================================================== */}

            <section className="
                bg-[var(--color-background)]
                py-16
                sm:py-20
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        grid
                        gap-10
                        lg:grid-cols-[0.8fr_1.2fr]
                        lg:items-center
                    ">

                        <div>

                            <div className="
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                            ">

                                <Sun size={32} />

                            </div>


                            <p className="
                                mt-6
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-primary)]
                            ">

                                Our Mission

                            </p>


                            <h2 className="
                                mt-3
                                text-3xl
                                font-extrabold
                                text-[var(--color-text)]
                                sm:text-4xl
                            ">

                                Making sustainable
                                energy accessible.

                            </h2>

                        </div>


                        <div className="
                            rounded-3xl
                            bg-white
                            p-7
                            shadow-sm
                            sm:p-10
                        ">

                            <p className="
                                text-base
                                leading-8
                                text-[var(--color-text)]
                            ">

                                At Ebton Technology , our mission is to
                                accelerate the transition toward sustainable
                                energy. We believe that solar power and
                                reliable backup systems can contribute to a
                                cleaner, healthier, and more resilient future,
                                and we are dedicated to making quality energy
                                solutions accessible and affordable.

                            </p>


                            <p className="
                                mt-5
                                text-base
                                leading-8
                                text-[var(--color-text)]
                            ">

                                From residential homes to commercial
                                projects, we provide quality solar products
                                and power solutions that empower our
                                customers to reduce their dependence on
                                unreliable power sources, improve energy
                                efficiency, and take greater control of their
                                energy future.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                WHY CHOOSE US
            ===================================================== */}

            <section className="
                bg-[var(--color-background)]
                py-16
                sm:py-20
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        mx-auto
                        max-w-3xl
                        text-center
                    ">

                        <p className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[var(--color-primary)]
                        ">

                            Why Choose Us

                        </p>


                        <h2 className="
                            mt-3
                            text-3xl
                            font-extrabold
                            text-[var(--color-text)]
                            sm:text-4xl
                        ">

                            More than products.
                            We provide solutions.

                        </h2>


                        <p className="
                            mt-4
                            leading-7
                            text-[var(--color-text)]
                        ">

                            We focus on helping customers find dependable
                            energy solutions that match their needs and
                            budget.

                        </p>

                    </div>


                    <div className="
                        mt-12
                        grid
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-4
                    ">


                        {/* Quality */}

                        <div className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:-translate-y-1
                            hover:shadow-lg
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                            ">

                                <ShieldCheck size={25} />

                            </div>


                            <h3 className="
                                mt-5
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Quality Products

                            </h3>


                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--color-text)]
                            ">

                                We focus on reliable products from trusted
                                brands and manufacturers.

                            </p>

                        </div>


                        {/* Expertise */}

                        <div className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:-translate-y-1
                            hover:shadow-lg
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                            ">

                                <Zap size={25} />

                            </div>


                            <h3 className="
                                mt-5
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Energy Expertise

                            </h3>


                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--color-text)]
                            ">

                                We help customers understand their options
                                and choose solutions that fit their needs.

                            </p>

                        </div>


                        {/* Customer */}

                        <div className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:-translate-y-1
                            hover:shadow-lg
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                            ">

                                <Users size={25} />

                            </div>


                            <h3 className="
                                mt-5
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Customer First

                            </h3>


                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--color-text)]
                            ">

                                We put our customers at the centre of
                                everything we do.

                            </p>

                        </div>


                        {/* Sustainability */}

                        <div className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            hover:-translate-y-1
                            hover:shadow-lg
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-[var(--color-primary)]/10
                                text-[var(--color-primary)]
                            ">

                                <Leaf size={25} />

                            </div>


                            <h3 className="
                                mt-5
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Sustainability

                            </h3>


                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--color-text)]
                            ">

                                We believe in energy solutions that support a
                                cleaner and more sustainable future.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                OUR VALUES
            ===================================================== */}

            <section className="
                bg-white
                py-16
                sm:py-20
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        grid
                        gap-12
                        lg:grid-cols-2
                        lg:items-center
                    ">

                        <div>

                            <p className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-primary)]
                            ">

                                What We Stand For

                            </p>


                            <h2 className="
                                mt-3
                                text-3xl
                                font-extrabold
                                text-[var(--color-text)]
                                sm:text-4xl
                            ">

                                Values that guide
                                everything we do.

                            </h2>


                            <p className="
                                mt-5
                                leading-8
                                text-[var(--color-text)]
                            ">

                                We are building a company that customers
                                can trust for their energy needs. That means
                                being transparent, dependable, innovative,
                                and committed to delivering genuine value.

                            </p>

                        </div>


                        <div className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        ">

                            {[
                                "Integrity",
                                "Reliability",
                                "Innovation",
                                "Customer Satisfaction",
                                "Sustainability",
                                "Excellence",
                            ].map((value) => (

                                <div
                                    key={value}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-gray-100
                                        bg-[var(--color-background)]
                                        p-4
                                    "
                                >

                                    <CheckCircle2
                                        size={20}
                                        className="
                                            shrink-0
                                            text-[var(--color-primary)]
                                        "
                                    />

                                    <span className="
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    ">

                                        {value}

                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="
                bg-[var(--color-primary)]
                py-16
                sm:py-20
            ">

                <div className="
                    mx-auto
                    max-w-4xl
                    px-4
                    text-center
                    sm:px-6
                    lg:px-8
                ">

                    <div className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        text-white
                    ">

                        <Sun size={32} />

                    </div>


                    <h2 className="
                        mt-6
                        text-3xl
                        font-extrabold
                        text-white
                        sm:text-4xl
                    ">

                        Ready to take control of
                        your energy future?

                    </h2>


                    <p className="
                        mx-auto
                        mt-4
                        max-w-2xl
                        leading-7
                        text-white/75
                    ">

                        Explore our range of solar and backup power products
                        or speak with our team about the right solution for
                        your home or business.

                    </p>


                    <div className="
                        mt-8
                        flex
                        flex-col
                        justify-center
                        gap-3
                        sm:flex-row
                    ">

                        <Link
                            href="/products"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-white
                                px-7
                                py-3.5
                                text-sm
                                font-bold
                                text-[var(--color-primary)]
                                transition
                                hover:bg-gray-100
                            "
                        >

                            Shop Products

                            <ArrowRight size={18} />

                        </Link>


                        <Link
                            href="/contact"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/30
                                px-7
                                py-3.5
                                text-sm
                                font-bold
                                text-white
                                transition
                                hover:bg-white/10
                            "
                        >

                            Contact Us

                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />

        </main>
    );
}