import Container from "@/components/common/Container/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/Home/FeaturedProducts/ProductCard";
import { getProducts } from "@/services/product.service";
import { getCategoryBySlug } from "@/services/category.service";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";


interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CategoryPage({
    params,
}: CategoryPageProps) {
    const { slug } = await params;

    // Get category using the slug
    const category = await getCategoryBySlug(slug);

    // Get products using the category ID
    const productResponse = await getProducts({
        category: category.id,
        page: 1,
        limit: 12,
        sort: "newest",
    });

    const products = productResponse.products;

    return (
        <main>
            <Header />
            {/* Category Header */}
            <section className="bg-gray-50 py-12">
                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Categories",
                                href: "/categories",
                            },
                            {
                                label: category.name,
                            },
                        ]}
                    />

                    <div className="mt-8 max-w-3xl">

                        <h1 className="text-3xl font-bold sm:text-4xl">
                            {category.name}
                        </h1>

                        <p className="mt-4 text-muted-foreground">
                            Explore our collection of{" "}
                            {category.name.toLowerCase()} and find
                            the right solution for your needs.
                        </p>

                    </div>

                </Container>
            </section>

            {/* Products */}
            <section className="py-section">
                <Container>

                    {/* Product heading */}
                    <div
                        className="
                            mb-8
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <div>
                            <h2 className="text-2xl font-bold">
                                {category.name}
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
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

                                sm:grid-cols-2
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
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-semibold">
                                No products found
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                There are currently no products in
                                this category.
                            </p>
                        </div>
                    )}

                </Container>
            </section>
            <Footer />
        </main>
    );
}