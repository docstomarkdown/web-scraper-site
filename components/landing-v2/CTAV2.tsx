"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { productConfig } from "@/config/product";

export default function CTAV2() {
    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Decorative orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-100/40 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        <span>Free to install · No credit card required</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-700 mb-5 tracking-tight leading-tight">
                        Start extracting data{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            today
                        </span>
                    </h2>

                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-8">
                        Join thousands of data professionals, researchers, and businesses who use Web Scraper to collect the data they need — without writing a single line of code.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href={productConfig.product.ctaUrl}
                            target="_blank"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.03] hover:shadow-blue-500/40 active:scale-[0.98]"
                        >
                            <Chrome className="w-5 h-5" />
                            Install Web Scraper.do
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-blue-600 hover:border-blue-200 font-semibold text-base transition-all hover:scale-[1.02] shadow-sm"
                        >
                            View Pricing Plans
                        </Link>
                    </div>

                    {/* Mini trust row */}
                    <div className="mt-8 flex flex-nowrap items-center justify-center gap-6 text-sm text-slate-500">
                        {["Free Chrome Extension", "No Code Required", "CSV · JSON · Sheets Export", "Works on Any Website"].map((item) => (
                            <div key={item} className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
