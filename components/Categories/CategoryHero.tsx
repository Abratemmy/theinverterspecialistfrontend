"use client";

import Container from "@/components/common/Container/Container";
import Breadcrumb from "../common/Breadcrumb";

export default function CategoryHero() {
    return (
        <section
            className="
                bg-gradient-to-r
                from-primary/10
                to-primary/5
                py-10
            "
        >
            <Container>

                <Breadcrumb
                    items={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Categories",
                        },
                    ]}
                />

                <div className="mt-8 max-w-3xl">

                    <h1
                        className="
                            text-4xl
                            font-bold

                            lg:text-5xl
                        "
                    >
                        Shop by <span className="text-primary">Categories</span>
                    </h1>

                    <p
                        className="
                            mt-6
                            text-lg
                            leading-8
                            text-muted-foreground
                        "
                    >
                        Browse our carefully selected categories and
                        discover premium solar products, inverters,
                        batteries, accessories and more.
                    </p>

                </div>

            </Container>
        </section>
    );
}