import HeroContent from "./HeroContent";
import HeroSlider from "./HeroSlider";

export default function Hero() {
    return (
        <section className="bg-slate-50">

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    <HeroContent />

                    <HeroSlider />

                </div>

            </div>

        </section>
    );
}