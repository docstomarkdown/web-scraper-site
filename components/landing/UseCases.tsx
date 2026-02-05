"use client";

import React from "react";
import { productConfig } from "@/config/product";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";

export default function UseCases() {
    const { useCases } = productConfig;

    return (
        <section className="py-24 bg-slate-50 border-y border-slate-200" id="use-cases">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariant}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        {useCases.title}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {useCases.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {useCases.cases.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUpVariant}
                            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                {item.description}
                            </p>
                            <ul className="space-y-2">
                                {item.features.map((feature, j) => (
                                    <li key={j} className="flex items-center text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
