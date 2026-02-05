"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/framer-animations";

const faqs = [
    {
        question: "Do I need any coding skills to use Web Scraper Pro?",
        answer: "Not at all. Our visual editor allows you to simply point and click on the elements you want to extract. We handle the complex selectors and code generation in the background."
    },
    {
        question: "Can I scrape sites behind a login?",
        answer: "Yes, our extension works directly in your browser, so if you're logged into a website, the scraper has access to that data. We also support cloud scraping with authenticated sessions."
    },
    {
        question: "How do you handle IP blocking?",
        answer: "We have a built-in network of residential proxies. The scraper automatically rotates IPs and manages browser fingerprints to simulate human behavior and avoid detection."
    },
    {
        question: "What formats can I export to?",
        answer: "You can download data as CSV, JSON, or Excel. We also have native integrations with Zapier, or you can send data to your own API via Webhooks."
    },
    {
        question: "Is there a free trial?",
        answer: "Yes, we offer a generous free tier that lets you scrape up to 1,000 pages per month. No credit card required to get started."
    }
];

export default function FAQ() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600">Everything you need to know about simple web scraping.</p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-b border-slate-200">
                                <AccordionTrigger className="text-left py-6 text-slate-900 font-semibold hover:text-blue-600 hover:no-underline transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
