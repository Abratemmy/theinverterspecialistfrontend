"use client";

import Container from "@/components/common/Container/Container";

import FooterLinks from "./FooterLinks";
// import FooterNewsletter from "./FooterNewsletter";
import FooterBottom from "./FooterBottom";
import SocialLinks from "./SocialLinks";
import { Logo } from "../Header";

export default function Footer() {
    return (
        <footer className="mt-20 bg-gray-950 text-gray-300">

            <Container>

                <div
                    className="
                        grid
                        gap-12
                        py-16

                        lg:grid-cols-[1.4fr_2fr]
                    "
                >

                    {/* Company Info */}

                    <div>
                        <Logo />

                        <p className="mt-5 leading-8 text-gray-400">
                            Your trusted partner for premium solar,
                            inverters, batteries, accessories and
                            complete renewable energy solutions across
                            Nigeria.
                        </p>

                        <div className="mt-8">
                            <SocialLinks />
                        </div>

                    </div>

                    {/* Links */}

                    <div>

                        <FooterLinks />

                    </div>

                </div>

                {/* <FooterNewsletter /> */}

            </Container>

            <FooterBottom />

        </footer>
    );
}