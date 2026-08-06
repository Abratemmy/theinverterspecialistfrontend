"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Container from "@/components/common/Container/Container";
import SectionHeader from "@/components/common/SectionHeader";

import FAQItem from "./FAQItem";
import { faqs } from "@/constants/faq";



export default function FAQ() {
    const [activeId, setActiveId] = useState<number | null>(1);

    return (
        <section className="py-8 bg-gray-50">
            <Container>

                <SectionHeader
                    title="Frequently Asked Questions"
                    subtitle="Everything you need to know before purchasing your solar and power solutions."
                />

                <div className="mx-auto mt-12 max-w-4xl space-y-5">

                    {faqs.map((faq, index) => (

                        <motion.div
                            key={faq.id}
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.08,
                            }}
                        >
                            <FAQItem
                                question={faq.question}
                                answer={faq.answer}
                                open={activeId === faq.id}
                                onClick={() =>
                                    setActiveId(
                                        activeId === faq.id
                                            ? null
                                            : faq.id
                                    )
                                }
                            />
                        </motion.div>

                    ))}

                </div>

            </Container>
        </section>
    );
}