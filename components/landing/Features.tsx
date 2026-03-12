"use client";

import React from "react";
import { List, ImageIcon, Tags, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";

const features = [
    {
        title: "List Extraction",
        description: <>Extract complete product or result lists with fields aligned into clean rows for structured output.</>,
        icon: List,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50 border-blue-100/50",
        iconHoverBg: "group-hover:bg-blue-600 group-hover:border-blue-600",
        glow: "group-hover:shadow-blue-200/70",
        ring: "group-hover:ring-blue-100",
        accent: "from-blue-500 to-blue-600",
        radial: "[background:radial-gradient(ellipse_at_top_right,theme(colors.blue.50)_0%,transparent_65%)]",
    },
    {
        title: "Images Extraction",
        description: <>Capture product images directly from listings and detail pages, then download them as part of your export workflow.</>,
        icon: ImageIcon,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50 border-indigo-100/50",
        iconHoverBg: "group-hover:bg-indigo-600 group-hover:border-indigo-600",
        glow: "group-hover:shadow-indigo-200/70",
        ring: "group-hover:ring-indigo-100",
        accent: "from-indigo-500 to-indigo-600",
        radial: "[background:radial-gradient(ellipse_at_top_right,theme(colors.indigo.50)_0%,transparent_65%)]",
    },
    {
        title: "Property Extraction",
        description: <>Extract key attributes such as title, brand, price, rating, seller, and other structured properties from product pages.</>,
        icon: Tags,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50 border-emerald-100/50",
        iconHoverBg: "group-hover:bg-emerald-600 group-hover:border-emerald-600",
        glow: "group-hover:shadow-emerald-200/70",
        ring: "group-hover:ring-emerald-100",
        accent: "from-emerald-500 to-emerald-600",
        radial: "[background:radial-gradient(ellipse_at_top_right,theme(colors.emerald.50)_0%,transparent_65%)]",
    },
];

export default function Features() {
    return (
        <section id="features" className="pt-20 pb-12 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50/60 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-50/60 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        <span>Core workflow</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 tracking-tight">
                        Extract exactly what you need from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">any product page</span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Three extraction modes for ecommerce workflows: lists, images, and product properties.
                    </p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div key={i} variants={fadeUpVariant} className={`group relative p-6 rounded-2xl bg-white border border-slate-100 ring-2 ring-transparent transition-all duration-300 overflow-hidden cursor-default -translate-y-0 hover:-translate-y-2 hover:border-slate-200 hover:shadow-2xl ${f.glow} ${f.ring}`}>
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${f.radial}`} />
                                <div className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${f.iconBg} ${f.iconHoverBg}`}>
                                    <Icon className={`w-6 h-6 transition-colors duration-300 ${f.iconColor} group-hover:text-white`} />
                                </div>
                                <h3 className="relative z-10 text-xl font-bold text-slate-700 mb-3 group-hover:text-slate-900 transition-colors">{f.title}</h3>
                                <p className="relative z-10 text-slate-500 leading-relaxed [&>strong]:text-slate-500 [&>strong]:font-semibold">{f.description}</p>
                                <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
