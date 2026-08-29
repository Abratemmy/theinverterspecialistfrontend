import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import ServiceGrid from "@/components/Services/ServiceGrid";
import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";


export default function ServicesPage() {

    return (

        <main>

            <Header />


            {/* ================================================= */}
            {/* HERO */}
            {/* ================================================= */}

            <section className="bg-gray-50 py-12 sm:py-16">

                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Services",
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
                            Our Services
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

                            Power Solutions,
                            <span className="text-primary">
                                {" "}Expert Services
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

                            Beyond selling quality solar, inverter,
                            battery, and electrical products, we provide
                            professional services to help you install,
                            maintain, troubleshoot, and get the best
                            performance from your power systems.

                        </p>

                    </div>

                </Container>

            </section>


            {/* ================================================= */}
            {/* SERVICES */}
            {/* ================================================= */}

            <ServiceGrid />


            <Footer />

        </main>

    );

}