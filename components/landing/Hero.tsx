"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome, MousePointer2, Table2, FileSpreadsheet, Star, FileJson2, FileText, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { productConfig } from "@/config/product";

export default function Hero() {
    return (
        <section className="w-full bg-white min-h-[calc(100vh-64px)] pt-36 pb-20 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 left-1/4 w-[440px] h-[440px] bg-[#2772ED]/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-20 right-1/4 w-[360px] h-[360px] bg-[#2772ED]/8 rounded-full blur-[110px]" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 lg:gap-16 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl text-center lg:text-left lg:w-[48%]"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2772ED]/20 bg-[#2772ED]/5 text-[#2772ED] text-xs font-semibold tracking-wide uppercase mb-6">
                        Web Scraper.do
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-bold tracking-tight text-slate-600 leading-[1.08]">
                        Turn product pages into structured data.
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed mt-5 max-w-xl mx-auto lg:mx-0">
                        Select data and export in one click.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                        <Link
                            href={productConfig.product.ctaUrl}
                            target="_blank"
                            className="w-full sm:w-auto group inline-flex items-center justify-center rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-8 py-3.5 text-base font-semibold text-white transition-all hover:translate-y-[-1px] active:scale-[0.98] gap-2 shadow-lg shadow-[#2772ED]/25"
                        >
                            <Chrome className="w-5 h-5" />
                            Install Web Scraper.do
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full lg:w-[52%]"
                >
                    <div className="relative w-full max-w-2xl mx-auto mt-4">
                        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
                            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-[#2772ED]/30 ring-4 ring-white shadow-[0_0_0_4px_rgba(39,114,237,0.10)] items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-[#2772ED]" />
                            </div>
                            <div className="grid md:grid-cols-2">
                                <div className="p-5 border-b md:border-b-0 md:border-r border-slate-200 bg-gradient-to-b from-slate-50/70 to-white">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-semibold text-slate-700">Before Extraction</p>
                                        <span className="text-[11px] font-medium text-slate-400">Unstructured</span>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                                        <div className="space-y-3">
                                            {[
                                                {
                                                    title: "Running Shoes Pro X",
                                                    brand: "FastStride",
                                                    price: "$129.99",
                                                    strike: "$159.99",
                                                    review: "4.8 (1,240)",
                                                    seller: "ProSport Deals",
                                                },
                                                {
                                                    title: "Trail Runner Lite",
                                                    brand: "UrbanPace",
                                                    price: "$89.50",
                                                    strike: "$109.00",
                                                    review: "4.6 (860)",
                                                    seller: "TrendKart",
                                                },
                                                {
                                                    title: "Sport Sneaker Max",
                                                    brand: "Velocity",
                                                    price: "$149.00",
                                                    strike: "$179.00",
                                                    review: "4.9 (2,180)",
                                                    seller: "Prime Brands",
                                                },
                                            ].map((item) => (
                                                <div key={item.title} className="flex gap-3 border border-slate-100 rounded-md p-2.5">
                                                    <div className="w-14 h-14 rounded-md border border-slate-300 flex-shrink-0 bg-gradient-to-br from-blue-50 to-slate-100 relative overflow-hidden shadow-sm">
                                                        <div className="absolute inset-x-1.5 top-1.5 h-8 rounded bg-white border border-slate-200" />
                                                        <div className="absolute inset-x-3 top-3.5 h-3 rounded-full bg-[#2772ED]/25" />
                                                        <div className="absolute inset-x-2.5 bottom-2 h-1.5 rounded bg-slate-400/70" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[11px] text-slate-700 leading-snug line-clamp-2">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-[11px] text-slate-500 mt-0.5">Brand: {item.brand}</p>
                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <span className="text-[12px] font-bold text-slate-800">{item.price}</span>
                                                            <span className="text-[10px] text-slate-400 line-through">{item.strike}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                            <span className="text-[11px] text-slate-600">{item.review}</span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 mt-0.5">Sold by: {item.seller}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-[#2772ED]/10 to-white">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-semibold text-[#2772ED]">After Extraction</p>
                                        <span className="text-[11px] font-semibold text-[#2772ED]">Structured</span>
                                    </div>
                                    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-white">
                                            <p className="text-[11px] font-medium text-slate-700">Extracted Data Preview</p>
                                            <span className="text-[10px] font-medium text-slate-400">Sample</span>
                                        </div>
                                        <div className="h-0.5 bg-[#2772ED]/25" />
                                        <div
                                            className="grid text-[10px] font-semibold text-slate-500 bg-slate-50 border-b border-slate-200"
                                            style={{ gridTemplateColumns: "2.3fr 1.2fr 1fr 0.9fr 1.4fr" }}
                                        >
                                            <div className="px-3 py-2 border-r border-slate-200">Title</div>
                                            <div className="px-3 py-2 border-r border-slate-200">Brand</div>
                                            <div className="px-3 py-2 border-r border-slate-200">Price</div>
                                            <div className="px-3 py-2 border-r border-slate-200">Rating</div>
                                            <div className="px-3 py-2">Seller</div>
                                        </div>
                                        {[
                                            ["Running Shoes Pro X", "FastStride", "$129.99", "4.8", "ProSport Deals"],
                                            ["Trail Runner Lite", "UrbanPace", "$89.50", "4.6", "TrendKart"],
                                            ["Sport Sneaker Max", "Velocity", "$149.00", "4.9", "Prime Brands"],
                                        ].map((item) => (
                                            <div
                                                key={item[0]}
                                                className="grid text-[11px] border-b last:border-b-0 border-slate-100"
                                                style={{ gridTemplateColumns: "2.3fr 1.2fr 1fr 0.9fr 1.4fr" }}
                                            >
                                                <div className="px-3 py-2 text-slate-700 truncate border-r border-slate-100">{item[0]}</div>
                                                <div className="px-3 py-2 text-slate-700 truncate border-r border-slate-100">{item[1]}</div>
                                                <div className="px-3 py-2 text-slate-700 whitespace-nowrap border-r border-slate-100">{item[2]}</div>
                                                <div className="px-3 py-2 text-slate-700 whitespace-nowrap border-r border-slate-100">{item[3]}</div>
                                                <div className="px-3 py-2 text-slate-700 truncate">{item[4]}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-7 rounded-lg border border-slate-200 bg-white overflow-hidden">
                                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50">
                                            <p className="text-[11px] font-medium text-slate-700">Output Formats</p>
                                            <span className="text-[10px] font-medium text-slate-400">Ready</span>
                                        </div>
                                        <div className="p-3">
                                            <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: "Excel", icon: FileSpreadsheet },
                                                { label: "Google Sheets", icon: Table2 },
                                                { label: "JSON", icon: FileJson2 },
                                                { label: "CSV", icon: FileText },
                                            ].map((fmt) => {
                                                const Icon = fmt.icon;
                                                return (
                                                    <div
                                                        key={fmt.label}
                                                        className="rounded-md border border-slate-200 bg-white px-2 py-2 flex items-center gap-1.5 min-w-0"
                                                    >
                                                        <span className="w-6 h-6 rounded-md bg-[#2772ED]/10 text-[#2772ED] flex items-center justify-center shrink-0">
                                                            <Icon className="w-3 h-3" />
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="text-[10px] font-semibold text-slate-700 leading-tight whitespace-nowrap">{fmt.label}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-2.5 text-center">
                                            One-click export in your preferred format.
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -z-10 -inset-3 bg-gradient-to-r from-[#2772ED]/10 to-transparent rounded-3xl blur-2xl" />
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="relative z-10 max-w-7xl mx-auto mt-8"
            >
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm px-5 py-5 md:px-6 md:py-6 cursor-default select-none">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {[
                            { icon: MousePointer2, title: "Point & Select", desc: "Pick elements visually" },
                            { icon: RefreshCw, title: "Pagination Support", desc: "Handle next-page flows" },
                            { icon: Table2, title: "Scrape Lists", desc: "Capture listing results" },
                            { icon: Table2, title: "Product Pages", desc: "Extract detail fields" },
                            { icon: Table2, title: "Images & Details", desc: "Collect media and specs" },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="flex items-start gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-[#2772ED]/10 text-[#2772ED] flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="w-4 h-4" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
