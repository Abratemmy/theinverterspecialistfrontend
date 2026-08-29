import { notFound } from "next/navigation";

import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";

import {
    getProductBySlug,
} from "@/services/product.service";

import ProductDetail from "@/components/Products/ProductDetails";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";


interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}


export default async function ProductPage({
    params,
}: ProductPageProps) {

    const { slug } = await params;

    let product;

    try {

        product =
            await getProductBySlug(slug);

    } catch {

        notFound();

    }


    if (!product) {

        notFound();

    }


    return (

        <main>

            <Header showSearch />

            <Container>

                <div className="py-6">

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },

                            {
                                label: "Products",
                                href: "/products",
                            },

                            {
                                label:
                                    product.name,
                            },
                        ]}
                    />

                </div>


                <ProductDetail
                    product={product}
                />

            </Container>


            <Footer />

        </main>

    );
}