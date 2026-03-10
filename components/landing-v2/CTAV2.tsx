"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome, BarChart3, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { productConfig } from "@/config/product";

export default function CTAV2() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-100/40 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Split panel card */}
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
                        <div className="grid md:grid-cols-2">

                            {/* ── Left panel ── */}
                            <div className="p-10 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">

                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-[0.1em] mb-6 w-fit shadow-sm">
                                    <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                                    <span>Analyze • Optimize • Scale</span>
                                </div>

                                {/* Headline */}
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-[1.15] mb-5">
                                    Start extracting data
                                    <br />
                                    <span className="text-blue-600">
                                        today
                                    </span>
                                </h2>

                                <p className="text-base text-slate-500 leading-relaxed mb-6">
                                    Join thousands of data professionals who use Web Scraper to collect the data they need — without writing a single line of code.
                                </p>

                                {/* Chrome Web Store badge */}
                                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm w-fit">
                                    <Chrome className="w-5 h-5 text-blue-500 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium leading-none mb-1">Available in the</p>
                                        <p className="text-sm font-bold text-slate-700 leading-none">Chrome Web Store</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── Right panel ── */}
                            <div className="p-10 lg:p-12 flex flex-col justify-center gap-4 bg-white">

                                {/* Primary card */}
                                <Link
                                    href={productConfig.product.ctaUrl}
                                    target="_blank"
                                    className="group flex items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-[#3B5BDB] hover:bg-[#3451c7] text-white transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                            <Zap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-base leading-tight">Install Web Scraper.do</p>
                                            <p className="text-blue-200 text-sm mt-0.5">Free · No credit card required</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 group-hover:text-white transition-transform shrink-0" />
                                </Link>

                                {/* Secondary card */}
                                <Link
                                    href="/pricing"
                                    className="group flex items-center justify-between gap-4 px-6 py-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm text-slate-700 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                            <BarChart3 className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-base text-slate-800 leading-tight">View Pricing Plans</p>
                                            <p className="text-slate-400 text-sm mt-0.5">From free to enterprise</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-slate-500 transition-transform shrink-0" />
                                </Link>

                                {/* Feature checklist */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3">
                                    {[
                                        "Free Chrome Extension",
                                        "No Code Required",
                                        "Google Sheets · Excel · CSV",
                                        "Works on Any Website",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-2 text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
