import ShopByCategory from "./Categories/ShopByCategories";
import FAQ from "./FAQ/FAQ";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Features from "./Features/Features";
import Hero from "./Hero/Hero";
import TopBrands from "./TopBrands/TopBrands";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";


export default function HomePage() {
    return (
        <>
            <Hero />

            <Features />

            <ShopByCategory />

            <FeaturedProducts />

            <WhyChooseUs />

            <TopBrands />

            <FAQ />
        </>
    );
}