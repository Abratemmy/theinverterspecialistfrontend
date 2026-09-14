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
        image: "/images/hero/hero-1.jpg",
        primaryButton: "Shop Now",
        secondaryButton: "Request Quote",
    },
    {
        id: 2,
        title: "Solar Solutions",
        subtitle: "Designed For Every Home",
        description:
            "Complete solar packages professionally designed and installed by experienced engineers.",
        image: "/images/hero/hero-4.jpg",
        primaryButton: "View Packages",
        secondaryButton: "Get Started",
    },
];

// Theinverterspecialist@@2026