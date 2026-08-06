
import HomePage from "@/components/Home/HomePage";
import Footer from "@/components/layout/Footer/Footer";
import Header  from "@/components/layout/Header/Header";


export default function Home() {
    return (
        <>
            <Header showSearch />

            <main className="min-h-screen bg-slate-50">
              <HomePage />
            </main>

            <Footer />
        </>
    );
}