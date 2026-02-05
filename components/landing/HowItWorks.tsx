"use client";

import React from "react";
import { Download, MousePointer, FileJson, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";

const steps = [
    {
        id: 1,
        title: "Install Extension",
        description: "Add our Chrome extension in seconds. No complex setup or local environment configuration needed.",
        icon: <Download className="w-6 h-6" />,
        color: "bg-blue-600",
        lightColor: "bg-blue-100 text-blue-600"
    },
    {
        id: 2,
        title: "Select Data Points",
        description: "Navigate to any website and simply click on the text, images, or links you want to extract.",
        icon: <MousePointer className="w-6 h-6" />,
        color: "bg-indigo-600",
        lightColor: "bg-indigo-100 text-indigo-600"
    },
    {
        id: 3,
        title: "Export Instantly",
        description: "Download your data as JSON, CSV, or sync it directly to your API.",
        icon: <FileJson className="w-6 h-6" />,
        color: "bg-purple-600",
        lightColor: "bg-purple-100 text-purple-600"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        <span>Fast & Simple Workflow</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        From URL to data in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">seconds</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Stop writing fragile scraper scripts. Our visual editor lets you build robust scrapers without writing a single line of code.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative grid md:grid-cols-3 gap-12"
                >
                    {/* Connecting Line (Desktop) */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 origin-left"
                    />

                    {steps.map((step, i) => (
                        <motion.div key={i} variants={fadeUpVariant} className="relative group">
                            {/* Step number badge */}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={cn(
                                    "w-24 h-24 rounded-3xl rotate-3 flex items-center justify-center shadow-xl shadow-slate-200 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 mb-8 bg-white"
                                )}>
                                    <div className={cn(
                                        "w-20 h-20 rounded-2xl flex items-center justify-center transition-colors",
                                        step.lightColor
                                    )}>
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{step.description}</p>

                                {/* Step Indicator */}
                                <div className={cn(
                                    "absolute top-8 -right-6 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-slate-100 text-slate-400 font-bold text-sm",
                                    i === steps.length - 1 && "hidden"
                                )}>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
