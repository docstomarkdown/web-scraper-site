"use client";

import React from "react";
import { MousePointer2, Layers, Cloud, Clock, Shield, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";

const features = [
    {
        title: "Visual Scraper",
        description: "Point and click to extract data. No code required.",
        icon: <MousePointer2 className="w-6 h-6 text-blue-600" />,
    },
    {
        title: "Smart Pagination",
        description: "Automatically handles 'Next' buttons and infinite scrolling.",
        icon: <Layers className="w-6 h-6 text-indigo-600" />,
    },
    {
        title: "Cloud Export",
        description: "Sync data directly to Cloud Storage, Airtable, or API.",
        icon: <Cloud className="w-6 h-6 text-sky-600" />,
    },
    {
        title: "Schedule Jobs",
        description: "Run scrapers automatically on a recurring schedule.",
        icon: <Clock className="w-6 h-6 text-violet-600" />,
    },
    {
        title: "Anti-Detect",
        description: "Built-in rotating proxies and fingerprint management.",
        icon: <Shield className="w-6 h-6 text-emerald-600" />,
    },
    {
        title: "JS Rendering",
        description: "Perfect for dynamic Single Page Applications (SPAs).",
        icon: <Globe className="w-6 h-6 text-rose-600" />,
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        Everything you need for <span className="text-blue-600">data extraction</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        A complete toolkit built for simplicity and scale. Extract data from any website without worrying about infrastructure.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpVariant}
                            className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed group-hover:text-slate-500">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
