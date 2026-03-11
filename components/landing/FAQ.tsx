"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
    { question: "Do I need any coding skills?", answer: <>Not at all. The extension uses a <strong>visual point-and-click interface</strong>. Hover over the data you want, click to select, and the scraper handles everything automatically.</> },
    { question: "How does auto-pagination work?", answer: <>Click <strong>'Capture Next Button'</strong>, then click the website's next-page button. The extension validates it and <strong>automatically crawls</strong> every subsequent page — extracting and merging all data into one dataset.</> },
    { question: "Can I scrape pages behind a login?", answer: <>Yes. The extension runs inside your browser, so it can access any page you're logged into — including <strong>dashboards, membership sites, and private listings</strong>.</> },
    { question: "Which websites are supported?", answer: <>Any website you can open in Chrome. There are built-in profiles for <strong>Amazon, Flipkart, eBay, and Zara</strong>, plus a universal engine that adapts to any site automatically.</> },
    { question: "What export formats are available?", answer: <><strong>Google Sheets, Excel (XLSX), JSON, or CSV</strong>. You can download the data directly or sync automatically to Google Sheets via our built-in one-click OAuth2 integration.</> },
    { question: "Does it remove sponsored results?", answer: <>Yes. A built-in filter automatically detects and strips out <strong>sponsored listings, ad-injected items, and promotional banners</strong> so you only get clean, organic data.</> },
    { question: "How are lazy-loaded images handled?", answer: <>The extension captures all images — including <strong>lazy-loaded ones</strong> — by checking srcset, data-src, and other attributes. It also handles <strong>carousels and CSS grid layouts</strong>.</> },
    { question: "Is it free to use?", answer: <>Yes. The core extension is <strong>completely free</strong> — extract data from any website, paginate through pages, and export in all formats. No credit card required.</> },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq-v2" className="py-20 bg-slate-50/50 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="max-w-4xl mx-auto px-6 md:px-12 relative">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                        <HelpCircle className="w-4 h-4" />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 tracking-tight">
                        Frequently Asked <span className="text-blue-600">Questions</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Quick answers to the most common questions about Web Scraper.
                    </p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="bg-white border border-slate-100/80 rounded-[2rem] shadow-sm divide-y divide-slate-100 overflow-hidden">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div key={i} variants={fadeUpVariant} className="group">
                                <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between py-6 px-6 md:px-8 text-left transition-colors hover:bg-slate-50/50">
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide transition-all duration-300 ${isOpen ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-blue-50 text-blue-600"}`}>
                                            Q{i + 1}
                                        </div>
                                        <span className={`text-[17px] font-semibold leading-snug transition-colors duration-200 pr-4 ${isOpen ? "text-blue-600" : "text-slate-700 group-hover:text-blue-600"}`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"}`}>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
                                            <p className="pb-6 pl-[80px] md:pl-[92px] pr-6 md:pr-12 text-slate-500 leading-relaxed text-[15px] [&>strong]:text-slate-500 [&>strong]:font-semibold">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="mt-20">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-2xl bg-slate-50 border border-slate-100 gap-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-600 mb-1">Still have questions?</h3>
                            <p className="text-slate-500 text-[15px] leading-relaxed">Reach out and we&apos;ll get back to you quickly.</p>
                        </div>
                        <a href="/contact" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]">
                            Contact Support
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
