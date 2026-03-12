"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";
import { motion } from "framer-motion";
import { productConfig } from "@/config/product";

export default function CTA() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50/70 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#2772ED]/7 rounded-full blur-[110px]" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#2772ED]/6 rounded-full blur-[90px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 px-8 py-12 md:px-12 md:py-14 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2772ED]/10 border border-[#2772ED]/20 text-[#2772ED] text-[11px] font-semibold normal-case tracking-normal mb-6">
                            Ready To Start
                        </div>

                        <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 tracking-tight leading-[1.15]">
                            Start extracting structured data in minutes.
                        </h2>
                        <p className="text-base text-slate-500 leading-relaxed mt-4 max-w-2xl mx-auto">
                            Built for product lists, product pages, images, and properties.
                        </p>

                        <div className="mt-8 flex justify-center">
                            <Link
                                href={productConfig.product.ctaUrl}
                                target="_blank"
                                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#3C78DB] hover:bg-[#336dcf] text-white font-semibold shadow-md shadow-[#3C78DB]/18 transition-all"
                            >
                                <span className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                                    <Chrome className="w-5 h-5 text-white" />
                                </span>
                                <span>Install from Chrome Web Store</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
