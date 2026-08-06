import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Ebton Greener Energy Co.",
    description:
        "Powering Homes and Businesses with Reliable Renewable Energy Solutions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${poppins.variable}`}
            >
                <QueryProvider>
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}