export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    primaryButton: string;
    secondaryButton: string;
}

export const HERO_SLIDES: HeroSlide[] = [
    {
        id: 1,
        title: "Power Your Home",
        subtitle: "With Clean Renewable Energy",
        description:
            "Premium solar panels, hybrid inverters and lithium batteries engineered for dependable power.",
        image: "/images/hero/hero-1.png",
        primaryButton: "Shop Now",
        secondaryButton: "Request Quote",
    },
    {
        id: 2,
        title: "Reliable Backup",
        subtitle: "Energy You Can Trust",
        description:
            "Keep your home and business running during outages with industry-leading inverter systems.",
        image: "/images/hero/hero-2.png",
        primaryButton: "Explore Products",
        secondaryButton: "Contact Us",
    },
    {
        id: 3,
        title: "Solar Solutions",
        subtitle: "Designed For Every Home",
        description:
            "Complete solar packages professionally designed and installed by experienced engineers.",
        image: "/images/hero/hero-2.png",
        primaryButton: "View Packages",
        secondaryButton: "Get Started",
    },
];