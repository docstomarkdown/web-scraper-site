import React from "react";
import { ScrapingAnimation } from "./ScrapingAnimation";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Database } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen w-full bg-white flex flex-col justify-center items-center py-24 px-6 md:px-12 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-100/50 rounded-full blur-[128px]" />

                {/* Subtle Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                        backgroundSize: '64px 64px'
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 lg:gap-16 w-full">

                {/* Text Content */}
                <div className="space-y-8 max-w-xl text-center lg:text-left flex-1">



                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                        Extract data from{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
                            any website
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Scrape any website visually. No coding required. Just point, click, and export to JSON or CSV.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <Link
                            href="/install"
                            className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start for Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>SOC 2 Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-blue-500" />
                            <span>10M+ rows extracted</span>
                        </div>
                    </div>
                </div>

                {/* Animation Container */}
                <div className="w-full max-w-7xl flex-1">
                    <ScrapingAnimation />
                </div>

            </div>
        </section>
    );
}
