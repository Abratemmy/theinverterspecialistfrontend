import { EmptyState } from "@/components/common";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container/Container";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";

import type { Gallery } from "@/types/gallery";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


async function getGallery(): Promise<Gallery[]> {

    const response = await fetch(
        `${API_URL}/gallery`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch gallery."
        );
    }

    const result = await response.json();

    return result.data;
}


export default async function GalleryPage() {

    const gallery = await getGallery();


    return (
        <main>
            <Header />

            {/* =====================================
                HERO
            ====================================== */}

            <section className="bg-gray-50 py-12 sm:py-16">
                

                <Container>
                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Gallery",
                            },
                        ]}
                    />

                    <div className="mt-8 max-w-3xl">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6f9736]">
                            Our Gallery
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight
                                sm:text-4xl
                                lg:text-5xl">
                            Explore <span className="text-primary">
                                {" "}Our Work </span>
                        </h1>

                        <p className="mt-5 text-gray-600">
                            Take a look at our solar installations,
                            inverter systems, batteries and other
                            projects.
                        </p>

                    </div>

                </Container>

            </section>


            {/* =====================================
                GALLERY
            ====================================== */}

            <section className="py-16">

                <Container>

                    {gallery.length === 0 ? (

                        <div className="text-center">
                            <EmptyState
                                title="We haven't uploaded gallery yet"
                                description="No gallery images available yet."
                            />

                            

                        </div>

                    ) : (

                        <GalleryGrid
                            gallery={gallery}
                        />

                    )}

                </Container>

            </section>
        
            <Footer />

        </main>
    );
}