export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export const faqs: FAQItem[] = [
    {
        id: 1,
        question: "Do you deliver nationwide?",
        answer:
            "Yes. We deliver solar products and power solutions to every state in Nigeria through our trusted logistics partners.",
    },
    {
        id: 2,
        question: "Do your products come with warranty?",
        answer:
            "Yes. All our products come with manufacturer warranties. Warranty duration varies depending on the brand and product type.",
    },
    {
        id: 3,
        question: "Do you offer installation services?",
        answer:
            "Yes. Our certified technicians provide professional installation for residential, commercial, and industrial solar systems.",
    },
    {
        id: 4,
        question: "Can I pay in installments?",
        answer:
            "Flexible payment options are available on selected products and projects. Please contact our sales team for details.",
    },
    {
        id: 5,
        question: "How long does delivery take?",
        answer:
            "Orders are usually processed within 24 hours. Delivery takes 1–3 business days in major cities and slightly longer for other locations.",
    },
    {
        id: 6,
        question: "How can I contact customer support?",
        answer:
            "You can reach us through phone, WhatsApp, email, or by visiting our office during business hours.",
    },
];