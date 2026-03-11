"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/framer-animations";
import { BarChart3, Search, Users, TrendingUp } from "lucide-react";

const useCases = [
    {
        title: "Price Monitoring",
        description: "Track competitor prices in real-time. Adjust your pricing strategy dynamically to win the Buy Box and maximize margins.",
        icon: BarChart3,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-50 border-blue-100",
        iconHoverBg: "group-hover:bg-blue-600 group-hover:border-blue-600",
        glow: "group-hover:shadow-blue-200/70",
        ring: "group-hover:ring-blue-100",
        accent: "from-blue-500 to-blue-600",
        radial: "[background:radial-gradient(ellipse_at_top_right,theme(colors.blue.50)_0%,transparent_65%)]",
        features: ["Real-time price tracking", "Dynamic pricing alerts", "Historical price trends"],
        bulletColor: "bg-blue-400",
    },
    {
        title: "Product Research",
        description: "Analyze top-selling products, identify gaps in the market, and validate new product ideas with data-backed insights.",
        icon: Search,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-50 border-indigo-100",
        iconHoverBg: "group-hover:bg-indigo-600 group-hover:border-indigo-600",
        glow: "group-hover:shadow-indigo-200/70",
        ring: "group-hover:ring-indigo-100",
        accent: "from-indigo-500 to-indigo-600",
        radial: "[background:radial-gradient(ellipse_at_top_right,theme(colors.indigo.50)_0%,transparent_65%)]",
        features: ["Bestseller analysis", "Gap analysis", "Market validation"],
        bulletColor: "bg-indigo-400",
    },
    {
        title: "Competitor Analysis",
        description: "Monitor competitor inventory, promotions, and customer reviews to stay one step ahead in your niche.",
        icon: Users,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-50 border-emerald-100",
        iconHoverBg: "group-hover:bg-emerald-600 group-hover:border-emerald-600",
        glow: "group-hover:shadow-emerald-200/70",
        ring: "group-hover:ring-emerald-100",
        accent: "from-emerald-500 to-emerald-600",
        radial: "[background:radial-gradient(ellipse_at_top_right,theme(colors.emerald.50)_0%,transparent_65%)]",
        features: ["Inventory tracking", "Review sentiment", "Promotion monitoring"],
        bulletColor: "bg-emerald-400",
    },
];

export default function UseCases() {
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant} className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-6">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span>Use Cases</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 tracking-tight">
                        Built for <span className="text-blue-600">E-commerce Growth</span>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Everything you need to stay competitive in the fast-paced world of e-commerce. Turn raw web data into actionable business intelligence.
                    </p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
                    {useCases.map((useCase, i) => {
                        const Icon = useCase.icon;
                        return (
                            <motion.div key={i} variants={fadeUpVariant} className={`group relative p-8 rounded-2xl bg-white border border-slate-100 ring-2 ring-transparent overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 hover:border-slate-200 hover:shadow-2xl ${useCase.glow} ${useCase.ring}`}>
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${useCase.radial}`} />
                                <div className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${useCase.iconBg} ${useCase.iconHoverBg}`}>
                                    <Icon className={`w-6 h-6 transition-colors duration-300 ${useCase.iconColor} group-hover:text-white`} />
                                </div>
                                <h3 className="relative z-10 text-xl font-bold text-slate-700 mb-3 group-hover:text-slate-900 transition-colors">{useCase.title}</h3>
                                <p className="relative z-10 text-slate-500 leading-relaxed mb-6">{useCase.description}</p>
                                <ul className="relative z-10 space-y-2.5 mt-auto">
                                    {useCase.features.map((feature, j) => (
                                        <li key={j} className="flex items-center text-sm text-slate-500">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${useCase.bulletColor}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${useCase.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
