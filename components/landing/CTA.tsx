"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productConfig } from "@/config/product";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/framer-animations";

export default function CTA() {
    return (
        <section className="py-32 relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-slate-50/50" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpVariant}
                className="max-w-4xl mx-auto px-6 relative z-10 text-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
                    <Sparkles className="w-4 h-4" />
                    <span>Start scraping in minutes</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Ready to turn websites into data?
                </h2>

                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop wasting hours on manual copy-pasting or maintaining broken scripts. Get the data you need with Web Scraper Pro.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-105"
                    >
                        <Link href={productConfig.product.ctaUrl} target="_blank">
                            {productConfig.product.ctaText}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all bg-white"
                    >
                        <Link href="/contact">
                            Contact Sales
                        </Link>
                    </Button>
                </div>

                <p className="mt-8 text-sm text-slate-400">
                    No credit card required for free tier • Cancel anytime
                </p>
            </motion.div>
        </section>
    );
}
