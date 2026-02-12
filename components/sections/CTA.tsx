"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/framer-animations";

interface CTAProps {
    withSectionWrapper?: boolean;
}

export function CTA({ withSectionWrapper = true }: CTAProps) {
    const content = (
        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpVariant}
                className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
                <div className="py-12 px-10 md:py-16 md:px-14 flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-[0.1em] mb-6 shadow-sm shadow-blue-100/50">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Analyze • Optimize • Scale</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Ready to find winning products?
                        </h2>

                        <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Scrape websites or analyze Shopify stores to discover profitable products faster.
                        </p>

                        {/* Chrome Badge - Left Aligned on Desktop */}
                        <div className="mt-10 flex justify-center lg:justify-start">
                            <Image
                                src="/Chromeweb store badge.png"
                                alt="Chrome Web Store"
                                width={206}
                                height={64}
                                className="h-[64px] w-auto contrast-[1.1] saturate-[1.1] drop-shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Right Content - Actions */}
                    <div className="flex flex-col w-full lg:w-auto gap-5 shrink-0">
                        {/* Primary Action */}
                        <div className="w-full lg:w-[360px]">
                            <Button
                                asChild
                                size="lg"
                                className="w-full h-auto py-5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-100 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 group border-b-4 border-blue-800 active:border-b-0"
                            >
                                <Link href="#" className="flex items-center gap-4">
                                    <div className="bg-white/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                                        <Zap className="w-6 h-6 text-blue-100" />
                                    </div>
                                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                        <span className="font-bold text-lg tracking-tight truncate">Install Web Scraper Pro</span>
                                        <span className="text-xs text-blue-100/80 font-medium">Start finding winning products</span>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-xl group-hover:translate-x-1 transition-transform">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </Button>
                        </div>

                        {/* Secondary Action */}
                        <div className="w-full lg:w-[360px]">
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="w-full h-auto py-5 px-6 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm hover:shadow-md transition-all duration-300 group"
                            >
                                <Link href="#" className="flex items-center gap-4">
                                    <div className="bg-slate-100 p-2.5 rounded-xl group-hover:bg-blue-100/50 group-hover:scale-110 transition-all duration-300">
                                        <ShoppingBag className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                                    </div>
                                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                        <span className="font-bold text-lg tracking-tight text-slate-900 truncate">Explore Shopify Spy</span>
                                        <span className="text-xs text-slate-500 font-medium">Discover winning Shopify stores</span>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-slate-100 transition-colors">
                                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    if (!withSectionWrapper) {
        return content;
    }

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-slate-50/50" />
            {content}
        </section>
    );
}
