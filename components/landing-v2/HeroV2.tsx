"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowRight, Database, Zap, CheckCircle,
    ChevronRight, Download, Chrome
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { productConfig } from "@/config/product";

const demoSteps = [
    {
        id: 1,
        label: "Open Side Panel",
        short: "Open",
        description: "Click the extension icon to launch the scraper.",
    },
    {
        id: 2,
        label: "Point & Select",
        short: "Select",
        description: "Hover over any list — items are auto-detected.",
    },
    {
        id: 3,
        label: "Auto-Paginate",
        short: "Paginate",
        description: "All pages scraped automatically.",
    },
    {
        id: 4,
        label: "Export Data",
        short: "Export",
        description: "Export to Google Sheets, Excel, JSON, or CSV.",
    },
];

const scraperRows = [
    { name: "Running Shoes Pro X", price: "$129.99", rating: "4.8 ★" },
    { name: "Wireless Headphones Z3", price: "$79.95", rating: "4.6 ★" },
    { name: "Smart Watch Ultra", price: "$249.00", rating: "4.9 ★" },
    { name: "Laptop Stand XL", price: "$45.00", rating: "4.7 ★" },
];

const CYCLE_DURATION = 4500;
const STEP_COUNT = 4;

export default function HeroV2() {
    const [activeStep, setActiveStep] = useState(0);
    const [visibleRows, setVisibleRows] = useState<number[]>([]);
    const [exportPulse, setExportPulse] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const stepTimer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % STEP_COUNT);
            setVisibleRows([]);
            setProgress(0);
            setExportPulse(false);
        }, CYCLE_DURATION);
        return () => clearInterval(stepTimer);
    }, []);

    useEffect(() => {
        if (activeStep === 2) {
            scraperRows.forEach((_, i) => {
                setTimeout(() => setVisibleRows((prev) => [...prev, i]), i * 400 + 300);
            });
            let p = 0;
            const t = setInterval(() => {
                p += 3;
                setProgress(Math.min(p, 100));
                if (p >= 100) clearInterval(t);
            }, 40);
            return () => clearInterval(t);
        }
        if (activeStep === 3) {
            setVisibleRows([0, 1, 2, 3]);
            setProgress(100);
            setTimeout(() => setExportPulse(true), 600);
        }
    }, [activeStep]);

    return (
        <section className="w-full bg-white flex items-center min-h-[calc(100vh-64px)] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-10 lg:gap-14 w-full">

                {/* ── Left: Text + Steps ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-lg text-center lg:text-left flex-shrink-0 lg:w-[42%] lg:pl-8 flex flex-col justify-center"
                >

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-700 leading-[1.12]">
                        Extract data from{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            any website
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg text-slate-500 leading-relaxed mt-6">
                        Scrape any website visually. No coding required. Just point, click, and export to Google Sheets, Excel, JSON or CSV.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                        <Link
                            href={productConfig.product.ctaUrl}
                            target="_blank"
                            className="w-full sm:w-auto group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.98] gap-2"
                        >
                            <Chrome className="w-5 h-5" />
                            Install Web Scraper.do
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Trust */}
                    <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-400 mt-6 pt-2">
                        <div className="flex items-center gap-1.5 shrink-0">
                            <Database className="w-4 h-4 text-blue-400 shrink-0" />
                            <span className="whitespace-nowrap font-medium text-slate-500">10M+ rows</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="whitespace-nowrap font-medium text-slate-500">No code required</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                            <span className="whitespace-nowrap font-medium text-slate-500">Works on any website</span>
                        </div>
                    </div>
                </motion.div>

                {/* ── Right: Extension Demo ── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    id="demo-v2"
                    className="w-full lg:w-[58%] flex-shrink-0"
                >
                    <div className="relative w-full max-w-xl mx-auto mt-8">
                        {/* Glow */}
                        {/* Removed the blue shadow/glow as requested */}
                        {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 rounded-3xl blur-2xl" /> */}

                        {/* Browser Window */}
                        <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden">

                            {/* Browser Bar */}
                            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border-b border-slate-200">
                                <div className="flex gap-1.5 flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 bg-white rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-500 font-mono truncate">
                                    amazon.com/s?k=running+shoes
                                </div>
                                <div className="flex-shrink-0 w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                                    <span className="text-white text-[9px] font-bold">WS</span>
                                </div>
                            </div>

                            {/* Two-pane: webpage + side panel */}
                            <div className="flex h-[300px] sm:h-[340px]">

                                {/* Simulated Webpage */}
                                <div className="flex-1 bg-[#f8f9fa] overflow-hidden relative border-r border-slate-200">
                                    <AnimatePresence mode="wait">

                                        {/* Step 0: Open Extension */}
                                        {activeStep === 0 && (
                                            <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                                    <Chrome className="w-6 h-6 text-white" />
                                                </div>
                                                <p className="text-slate-600 text-sm text-center font-medium">Click the extension icon</p>
                                                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium">
                                                    Opening Side Panel →
                                                </motion.div>
                                            </motion.div>
                                        )}

                                        {/* Step 1: Point & Select — matches extension's actual outline+glow style */}
                                        {activeStep === 1 && (
                                            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 overflow-hidden">
                                                {/* Dim backdrop — matches extension's .wsp-dim-backdrop */}
                                                <div className="absolute inset-0 bg-slate-900/[0.08]" />

                                                <div className="relative p-3">
                                                    <div className="text-[10px] text-slate-400 mb-2 font-mono">Results for &quot;running shoes&quot;</div>
                                                    {[
                                                        { name: "Running Shoes Pro X", price: "$129.99" },
                                                        { name: "Trail Blazer 3000", price: "$89.99" },
                                                        { name: "Speed Runner Ultra", price: "$159.99" },
                                                    ].map((item, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: i * 0.15 }}
                                                            className="flex items-center gap-2 p-2 mb-1.5 rounded bg-white text-[10px]"
                                                            style={{
                                                                // OPTION 1: 1 layer down (Current) - Matches Tailwind blue-400 (#60a5fa / 96,165,250)
                                                                // OPTION 2: 2 layers down (Softer) - Use #93c5fd and 147,197,253 instead
                                                                // ORIGINAL: 0 layers down (Stronger) - Use #3b82f6 and 59,130,246 instead
                                                                outline: "2px solid #60a5fa",
                                                                outlineOffset: "-1px",
                                                                background: "rgba(96,165,250,0.08)",
                                                                boxShadow: "0 0 0 2px rgba(96,165,250,0.25), 0 0 6px rgba(96,165,250,0.3), inset 0 0 0 1px rgba(96,165,250,0.15)",
                                                            }}
                                                        >
                                                            <div className="w-8 h-8 bg-slate-100 rounded flex-shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-slate-800 truncate">{item.name}</div>
                                                                <div className="text-blue-600 font-bold">{item.price}</div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="mt-1.5 text-[9px] text-blue-600 bg-blue-50 rounded px-2 py-1 border border-blue-100 text-center"
                                                    >
                                                        ✦ 3 items detected · Click to lock selection
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 2: Auto-Pagination */}
                                        {activeStep === 2 && (
                                            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 p-3 overflow-hidden">
                                                <div className="text-[10px] font-semibold text-slate-700 mb-1">Extracting all pages...</div>
                                                <div className="text-[9px] text-slate-400 mb-2">Page 3 of ~12 · {visibleRows.length * 2 + 4} items</div>
                                                <div className="space-y-1">
                                                    {scraperRows.map((row, i) => (
                                                        <AnimatePresence key={i}>
                                                            {visibleRows.includes(i) && (
                                                                <motion.div initial={{ x: -15, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                                                    className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-slate-100 text-[9px]">
                                                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                                                    <span className="text-slate-700 font-medium truncate flex-1">{row.name}</span>
                                                                    <span className="text-blue-600 font-bold">{row.price}</span>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    ))}
                                                </div>
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <div className="flex justify-between text-[9px] text-slate-500 mb-1">
                                                        <span>Scraping page 3...</span><span>{progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                        <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                                            style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 3: Export */}
                                        {activeStep === 3 && (
                                            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 p-3 flex flex-col">
                                                <div className="text-[10px] font-semibold text-green-600 mb-1">✓ Extraction complete!</div>
                                                <div className="text-[9px] text-slate-400 mb-2">32 rows across 12 pages</div>
                                                <div className="flex-1 bg-white rounded border border-slate-100 overflow-hidden">
                                                    <div className="grid grid-cols-3 text-[8px] bg-slate-100 border-b border-slate-200">
                                                        {["Name", "Price", "Rating"].map(h => (
                                                            <div key={h} className="px-2 py-1 font-bold text-slate-600 uppercase tracking-wider">{h}</div>
                                                        ))}
                                                    </div>
                                                    {scraperRows.map((row, i) => (
                                                        <div key={i} className="grid grid-cols-3 text-[8px] border-b border-slate-50">
                                                            <div className="px-2 py-1 text-slate-700 truncate">{row.name.split(" ").slice(0, 2).join(" ")}</div>
                                                            <div className="px-2 py-1 text-blue-600 font-bold">{row.price}</div>
                                                            <div className="px-2 py-1 text-amber-600">{row.rating}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {exportPulse && (
                                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-1.5 mt-2">
                                                        {["Google Sheets", "Excel", "JSON", "CSV"].map((fmt, index) => (
                                                            <motion.div key={fmt} animate={{ scale: [1, 1.05, 1] }}
                                                                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.25 }}
                                                                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-600 text-white text-[9px] font-bold rounded cursor-pointer hover:bg-blue-700 transition-colors">
                                                                <Download className="w-2.5 h-2.5" />{fmt}
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        )}

                                    </AnimatePresence>
                                </div>

                                {/* Extension Side Panel */}
                                <div className="w-[140px] sm:w-[170px] bg-white flex flex-col flex-shrink-0">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700">
                                        <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                                            <span className="text-white text-[8px] font-bold">WS</span>
                                        </div>
                                        <span className="text-white text-[10px] font-semibold">Web Scraper</span>
                                    </div>

                                    <div className="flex-1 p-1.5 space-y-0.5 overflow-hidden">
                                        {demoSteps.map((step, i) => {
                                            const state = i < activeStep ? "done" : i === activeStep ? "active" : "idle";
                                            return (
                                                <motion.div key={step.id} animate={{ opacity: state === "idle" ? 0.35 : 1 }}
                                                    className={`p-1.5 rounded-lg text-[9px] border transition-all ${state === "active" ? "border-blue-200 bg-blue-50" : state === "done" ? "border-green-100 bg-green-50" : "border-transparent bg-slate-50"}`}>
                                                    <div className="flex items-center gap-1 mb-0.5">
                                                        <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${state === "done" ? "bg-green-500" : state === "active" ? "bg-blue-600" : "bg-slate-200"}`}>
                                                            {state === "done" ? <CheckCircle className="w-2 h-2 text-white" /> :
                                                                state === "active" ? <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 h-1 rounded-full bg-white" /> :
                                                                    <span className="text-slate-400 text-[6px] font-bold">{i + 1}</span>}
                                                        </div>
                                                        <span className={`font-semibold leading-tight ${state === "active" ? "text-blue-700" : state === "done" ? "text-green-700" : "text-slate-500"}`}>
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                    {state === "active" && <p className="text-slate-500 leading-tight pl-4 text-[8px]">{step.description}</p>}
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="border-t border-slate-100 p-1.5 bg-slate-50">
                                        <div className="text-[7px] text-slate-400 mb-0.5 font-medium uppercase tracking-wider">Live Stats</div>
                                        <div className="space-y-0.5">
                                            {[
                                                { l: "Items", v: activeStep >= 2 ? `${visibleRows.length * 2 + 4}` : activeStep >= 1 ? "3" : "—" },
                                                { l: "Pages", v: activeStep >= 2 ? "3/12" : "—" },
                                                { l: "Status", v: ["Ready", "Selecting", "Scraping", "Done ✓"][activeStep] },
                                            ].map(({ l, v }) => (
                                                <div key={l} className="flex justify-between text-[8px]">
                                                    <span className="text-slate-400">{l}</span>
                                                    <span className={`font-bold ${l === "Status" && activeStep === 3 ? "text-green-600" : "text-slate-700"}`}>{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step tabs */}
                            <div className="flex border-t border-slate-100 bg-slate-50">
                                {demoSteps.map((step, i) => (
                                    <div key={i}
                                        className={`flex-1 py-1 px-1 text-center text-[8px] font-medium transition-all ${i === activeStep ? "bg-white border-t-2 border-blue-500 text-blue-600" : i < activeStep ? "text-green-600" : "text-slate-400"}`}>
                                        {i < activeStep ? "✓" : `${i + 1}`}. {step.short}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 'Works on any website' inline badge — aligned right below demo */}
                    </div>

                    <div className="max-w-xl mx-auto w-full flex items-center justify-end pr-1 mt-3">
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                            className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-slate-100 px-3 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                            <span className="text-[11px] text-slate-600 font-medium whitespace-nowrap">
                                Works on <strong className="text-slate-900">any website</strong>
                            </span>
                        </motion.div>
                    </div>

                    {/* How It Works - Stepper below demo */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 max-w-xl mx-auto w-full">
                        <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                            How it works
                            <ArrowRight className="w-4 h-4 text-blue-500" />
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            {demoSteps.map((step, i) => {
                                const isActive = i === activeStep;
                                const isDone = i < activeStep;
                                return (
                                    <div key={step.id} className="flex items-center gap-2">
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${isActive ? "bg-blue-100 text-blue-700 border border-blue-200" : isDone ? "bg-green-50 text-green-600 border border-green-100" : "bg-slate-50 text-slate-400 border border-slate-100"}`}>
                                            {isDone ? (
                                                <CheckCircle className="w-3.5 h-3.5" />
                                            ) : isActive ? (
                                                <span className="w-3.5 h-3.5 rounded-full bg-blue-300 flex-shrink-0" />
                                            ) : (
                                                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 flex-shrink-0" />
                                            )}
                                            {step.short}
                                        </div>
                                        {i < demoSteps.length - 1 && (
                                            <ChevronRight className="w-3 h-3 text-slate-200 flex-shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div >
        </section >
    );
}
