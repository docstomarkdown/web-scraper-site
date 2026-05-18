"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Chrome, MousePointer2, Table2, FileSpreadsheet, Star, FileJson2, FileText, RefreshCw, ShieldCheck, List, ShoppingBag, Image } from "lucide-react";
import { motion } from "framer-motion";
import { productConfig } from "@/config/product";

export default function Hero() {
    return (
        <section className="w-full bg-white min-h-[calc(100vh-64px)] pt-36 pb-20 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 left-1/4 w-[440px] h-[440px] bg-[#2772ED]/6 rounded-full blur-[130px]" />
                <div className="absolute -bottom-20 right-1/4 w-[360px] h-[360px] bg-[#2772ED]/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 lg:gap-16 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl text-center lg:text-left lg:w-[48%]"
                >
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#2772ED]/30 bg-[#2772ED]/8 text-[#1f5ec2] text-sm font-medium tracking-[0.01em] mb-6">
                        <span className="w-6 h-6 rounded-full bg-[#2772ED]/20 text-[#1f5ec2] flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4" />
                        </span>
                        <span className="leading-none">Scrape data like a pro</span>
                    </div>

                    <h1 className="text-4xl sm:text-[2.45rem] lg:text-[2.6rem] xl:text-[2.85rem] font-bold tracking-tight text-slate-600 leading-[1.08]">
                        <span className="sm:whitespace-nowrap">Extract web data in minutes,</span>
                        <br />
                        <span className="sm:whitespace-nowrap">not hours.</span>
                    </h1>

                    <p className="text-lg text-slate-600 leading-relaxed mt-5 max-w-xl mx-auto lg:mx-0">
                        Point and click to scrape product data, lists, and images, then export to Google Sheets, Excel, CSV, or JSON.
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300/70 bg-slate-50/70 px-3.5 py-1.5 text-[13px] text-slate-600">
                        <span className="inline-flex">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        </span>
                        <span>Trusted by marketers, researchers, and ecommerce teams.</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-5">
                        <Link
                            href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=hero&utm_campaign=chrome_install`}
                            target="_blank"
                            className="w-full sm:w-auto group inline-flex items-center justify-center rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-8 py-3.5 text-base font-semibold text-white transition-all hover:translate-y-[-1px] active:scale-[0.98] gap-2 shadow-lg shadow-[#2772ED]/25"
                        >
                            <Chrome className="w-5 h-5" />
                            Install from Chrome Web Store
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
                                <motion.span
                                    className="inline-flex"
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowRight className="w-4 h-4 text-[#2772ED]" />
                                </motion.span>
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
                                            ].map((item, idx) => (
                                                <motion.div
                                                    key={item.title}
                                                    className="flex gap-3 border border-slate-100 rounded-md p-2.5"
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.35, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
                                                >
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
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-[#2772ED]/6 to-white">
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
                                        <table className="w-full table-fixed border-collapse">
                                            <colgroup>
                                                <col style={{ width: "52%" }} />
                                                <col style={{ width: "28%" }} />
                                                <col style={{ width: "20%" }} />
                                            </colgroup>
                                            <thead>
                                                <tr className="text-[10px] font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
                                                    <th className="px-3 py-2 border-r border-slate-200 text-left font-semibold">Title</th>
                                                    <th className="px-3 py-2 border-r border-slate-200 text-left font-semibold">Brand</th>
                                                    <th className="px-3 py-2 text-left font-semibold">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    ["Running Shoes Pro X", "FastStride", "$129.99"],
                                                    ["Trail Runner Lite", "UrbanPace", "$89.50"],
                                                    ["Sport Sneaker Max", "Velocity", "$149.00"],
                                                ].map((item, idx) => (
                                                    <motion.tr
                                                        key={item[0]}
                                                        className="text-[11px] border-b last:border-b-0 border-slate-100"
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.35, delay: 0.35 + idx * 0.08, ease: "easeOut" }}
                                                    >
                                                        <td className="px-3 py-2 text-slate-700 truncate border-r border-slate-100">{item[0]}</td>
                                                        <td className="px-3 py-2 text-slate-700 truncate border-r border-slate-100">{item[1]}</td>
                                                        <td className="px-3 py-2 text-slate-700 whitespace-nowrap">{item[2]}</td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                                                    <motion.div
                                                        key={fmt.label}
                                                        className="rounded-md border border-slate-200 bg-white px-2 py-2 flex items-center gap-1.5 min-w-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/70"
                                                        whileHover={{ scale: 1.02 }}
                                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                    >
                                                        <span className="w-6 h-6 rounded-md bg-[#2772ED]/10 text-[#2772ED] flex items-center justify-center shrink-0">
                                                            <Icon className="w-3 h-3" />
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="text-[10px] font-semibold text-slate-700 leading-tight whitespace-nowrap">{fmt.label}</p>
                                                        </div>
                                                    </motion.div>
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
                        <div className="absolute -z-10 -inset-3 bg-gradient-to-r from-[#2772ED]/6 to-transparent rounded-3xl blur-2xl" />
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="relative z-10 max-w-7xl mx-auto mt-8"
            >
                <p className="text-sm text-slate-600 text-center mb-4">
                    Works on ecommerce sites, directories, listings, and more.
                </p>
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm px-5 py-5 md:px-6 md:py-6 cursor-default select-none">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {[
                            { icon: MousePointer2, title: "Point & Select", desc: "Pick elements visually" },
                            { icon: RefreshCw, title: "Pagination Support", desc: "Handle next-page flows" },
                            { icon: List, title: "Scrape Lists", desc: "Capture listing results" },
                            { icon: ShoppingBag, title: "Detail Pages", desc: "Extract structured fields" },
                            { icon: Image, title: "Images & Details", desc: "Collect media and specs" },
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
