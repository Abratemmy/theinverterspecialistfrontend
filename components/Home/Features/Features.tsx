
import Container from "@/components/common/Container/Container";
import FeatureCard from "./FeatureCard";
import { FEATURES } from "@/constants/features";

export default function Features() {
    return (
        <section className="bg-slate-50 py-8">
            <Container>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {FEATURES.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}