"use client";

import React from "react";
import { Download, MousePointer, FileJson, RefreshCcw, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";

const steps = [
    {
        title: "Install Extension",
        description: "Add our Chrome extension in seconds. No complex setup or local environment configuration needed.",
        icon: Download,
        lightColor: "bg-blue-100 text-blue-600",
    },
    {
        title: "Select Data Points",
        description: "Navigate to any website and simply click on the text, images, or links you want to extract.",
        icon: MousePointer,
        lightColor: "bg-indigo-100 text-indigo-600",
    },
    {
        title: "Auto-Paginate",
        description: "Select the 'Next' button once. The scraper automatically handles pagination and infinite scrolls for you.",
        icon: RefreshCcw,
        lightColor: "bg-violet-100 text-violet-600",
    },
    {
        title: "Export Instantly",
        description: "Download your data as JSON, CSV, or sync it directly to Google Sheets.",
        icon: FileJson,
        lightColor: "bg-emerald-100 text-emerald-600",
    },
];

export default function HowItWorksV2() {
    return (
        <section id="how-it-works-v2" className="py-20 bg-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 border border-blue-100">
                        <Zap className="w-4 h-4" />
                        <span>Simple 4-step workflow</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 tracking-tight">
                        From URL to data in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            seconds
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        No scraper scripts. No infrastructure. No technical setup. Just open the extension, point at what you want, and export.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative grid md:grid-cols-4 gap-8"
                >
                    {/* Connecting Line (Desktop) */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-violet-100 to-emerald-100 origin-left"
                    />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div key={i} variants={fadeUpVariant} className="relative group">
                                <div className="relative z-10 flex flex-col items-center text-center">

                                    {/* Icon Container (Copied exactly from original V1) */}
                                    <div className={cn(
                                        "w-24 h-24 rounded-3xl rotate-3 flex items-center justify-center shadow-xl shadow-slate-200 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 mb-8 bg-white"
                                    )}>
                                        <div className={cn(
                                            "w-20 h-20 rounded-2xl flex items-center justify-center transition-colors",
                                            step.lightColor
                                        )}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-xl font-bold text-slate-700 mb-3 leading-snug">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-3 px-2">{step.description}</p>

                                    {/* Step Indicator (Copied exactly from original V1) */}
                                    {i < steps.length - 1 && (
                                        <div className="absolute top-8 -right-4 hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-slate-100 text-slate-400 font-bold text-sm">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
