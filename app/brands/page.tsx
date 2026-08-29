import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import BrandGrid from "@/components/Brands/BrandGrid";
import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";


export default function BrandsPage() {
    return (
        <main>
            <Header />
            {/* Hero */}
            <section className="bg-gray-50 py-12 sm:py-16">
                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Brands",
                            },
                        ]}
                    />

                    <div className="mt-8 max-w-3xl">

                        <span
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wider
                                text-primary
                            "
                        >
                            Our Partners
                        </span>

                        <h1
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            Trusted Brands,
                            <span className="text-primary">
                                {" "}Reliable Solutions
                            </span>
                        </h1>

                        <p
                            className="
                                mt-5
                                max-w-2xl
                                text-base
                                leading-7
                                text-muted-foreground
                                sm:text-lg
                            "
                        >
                            We work with leading manufacturers and
                            trusted brands to provide quality solar,
                            inverter, battery, and power solutions.
                        </p>

                    </div>

                </Container>
            </section>


            {/* Brands */}
            <BrandGrid />

            <Footer />

        </main>
    );
}