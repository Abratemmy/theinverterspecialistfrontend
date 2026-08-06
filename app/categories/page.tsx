import CategoryHero from "@/components/Categories/CategoryHero";
import CategoryGrid from "@/components/Categories/CategoryGrid";
import Footer from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header";

export default function CategoriesPage() {
    return (
        <>
            <Header />
            <CategoryHero />
            <CategoryGrid />
            <Footer />
        </>
    );
}