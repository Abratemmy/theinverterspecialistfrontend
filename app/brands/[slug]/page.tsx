import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";

import ProductCard from "@/components/Home/FeaturedProducts/ProductCard";

import { getBrandBySlug } from "@/services/brandService";
import { getProducts } from "@/services/product.service";
import { EmptyState, ImageWithFallback } from "@/components/common";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";

interface BrandPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BrandPage({
    params,
}: BrandPageProps) {

    const { slug } = await params;


    // Get brand from slug

    const brand =
        await getBrandBySlug(slug);


    // Get products using brand ID

    const productResponse =
        await getProducts({

            brand: brand.id,

            page: 1,

            limit: 12,

            sort: "newest",

        });


    const products =
        productResponse.products;


    return (

        <main>

            <Header />
            {/* Brand Header */}

            <section
                className="
                    bg-gray-50
                    py-12
                    sm:py-16
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
                                label: "Brands",
                                href: "/brands",
                            },
                            {
                                label: brand.name,
                            },
                        ]}
                    />


                    <div
                        className="
                            mt-10
                            flex
                            flex-col
                            gap-8

                            sm:flex-row
                            sm:items-center
                        "
                    >

                        {/* Logo */}

                        <div
                            className="
                                flex
                                h-28
                                w-40
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                bg-white
                                p-5
                                shadow-sm
                            "
                        >

                        <ImageWithFallback
                            src={brand.logo}
                            alt={brand.name}
                            imageType="brand"
                            width={180}
                            height={100}
                            className="max-h-20 w-auto object-contain"
                        />

                        </div>


                        {/* Brand Info */}

                        <div>

                            <h1
                                className="
                                    text-3xl
                                    font-bold

                                    sm:text-4xl
                                "
                            >
                                {brand.name}
                            </h1>


                            <p
                                className="
                                    mt-3
                                    max-w-2xl
                                    leading-7
                                    text-muted-foreground
                                "
                            >
                                Explore our collection of{" "}
                                {brand.name} products and
                                discover reliable power and
                                energy solutions.
                            </p>

                        </div>

                    </div>

                </Container>

            </section>


            {/* Products */}

            <section className="py-section">

                <Container>

                    <div
                        className="
                            mb-8
                            flex
                            flex-col
                            gap-2

                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                "
                            >
                                {brand.name} Products
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                {productResponse.total}{" "}
                                {productResponse.total === 1
                                    ? "product"
                                    : "products"}
                            </p>

                        </div>

                    </div>


                    {/* Products */}

                    {products.length > 0 ? (

                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-4

                                sm:gap-6

                                lg:grid-cols-3

                                xl:grid-cols-4
                            "
                        >

                            {products.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />

                            ))}

                        </div>

                    ) : (

                        <EmptyState
                            title="No Products Found"
                            description={`There are currently no ${brand.name} products available.`}
                        />

                    )}

                </Container>

            </section>
            <Footer />

        </main>
    );
}