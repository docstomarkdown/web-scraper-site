"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Percent, Wallet, ShoppingCart, MousePointerClick } from "lucide-react"
import { cn } from "@/lib/utils"
// Reusing your real internal components for the most accurate "ResultCard approach 2" simulation
import { CalculatorInput, ResultSummaryCard } from "@/app/tools/_shared/components"

function ChecklistApproach() {
    const [fields, setFields] = useState({
        traffic: "",
        orderValue: "",
        commission: "",
    })

    const isFullyCalculated = fields.traffic !== "" && fields.orderValue !== "" && fields.commission !== ""

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Approach 1</div>
                <h2 className="text-xl font-bold text-slate-800">The "Ghost Indicator" Monitor</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Real Input Style */}
                <div className="lg:col-span-7">
                    <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0 space-y-6">
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Affiliate Traffic"
                                    value={fields.traffic}
                                    onChange={(v) => setFields(f => ({ ...f, traffic: v }))}
                                    placeholder="5000"
                                    tooltip="Total clicks from affiliate links."
                                    groupingTitle="Traffic Sources"
                                    groupingIcon={MousePointerClick}
                                />
                                <CalculatorInput
                                    label="Average Order Value"
                                    value={fields.orderValue}
                                    onChange={(v) => setFields(f => ({ ...f, orderValue: v }))}
                                    placeholder="120.00"
                                    currency="USD"
                                    tooltip="The average amount a customer spends per transaction."
                                    groupingTitle="Sales Metrics"
                                    groupingIcon={ShoppingCart}
                                />
                                <CalculatorInput
                                    label="Commission Rate"
                                    value={fields.commission}
                                    onChange={(v) => setFields(f => ({ ...f, commission: v }))}
                                    placeholder="10"
                                    suffix="%"
                                    tooltip="The percentage paid to the affiliate per sale."
                                    groupingTitle="Payout Settings"
                                    groupingIcon={Wallet}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Real ResultSummaryCard using the internal shared logic */}
                <div className="lg:col-span-5">
                    <ResultSummaryCard
                        title="APPROACH 1: DASHBOARD MONITOR"
                        primaryResult={{
                            value: isFullyCalculated ? "1,250" : "0",
                            label: "Total Pay",
                            isCurrency: true
                        }}
                        currency="USD"
                        secondaryResults={[]}
                        isCalculated={isFullyCalculated}
                        checklistItems={[
                            { label: "Check Traffic Status", isComplete: fields.traffic !== "" },
                            { label: "Verify Order Value", isComplete: fields.orderValue !== "" },
                            { label: "Analyze Commission", isComplete: fields.commission !== "" }
                        ]}
                        emptyMessage="Provide the details below to generate your results."
                    />
                </div>
            </div>
        </div>
    )
}

function EditorialApproach() {
    const [traffic, setTraffic] = useState<number | "">("")
    const [aov, setAov] = useState<number | "">("")
    const isCalculated = traffic !== "" && aov !== ""

    return (
        <div className="flex flex-col gap-6 pt-12 border-t border-slate-200">
            <div className="flex items-center gap-2">
                <div className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Approach 2</div>
                <h2 className="text-xl font-bold text-slate-800">The Editorial & Minimalist</h2>
            </div>

            <div className="grid grid-cols-1 lg:col-cols-12 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3">
                    <CalculatorInput
                        label="Campaign Traffic"
                        value={traffic}
                        onChange={setTraffic}
                        placeholder="10000"
                        groupingTitle="Target Reach"
                        groupingIcon={MousePointerClick}
                    />
                    <CalculatorInput
                        label="Store Order Value"
                        value={aov}
                        onChange={setAov}
                        placeholder="50.00"
                        currency="USD"
                        groupingTitle="Revenue Potential"
                        groupingIcon={ShoppingCart}
                    />
                </div>

                {/* Approach 2 Prototype UI */}
                <div className="lg:col-span-5">
                    <Card className="relative overflow-hidden border border-blue-200/60 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 shadow-sm p-6 sm:p-8 rounded-2xl backdrop-blur-3xl min-h-[320px]">
                        <div className="absolute inset-0 border border-white/60 rounded-2xl pointer-events-none" />

                        <div className="absolute -bottom-10 -right-4 pointer-events-none opacity-[0.03] rotate-12">
                            <Percent className="w-[280px] h-[280px] text-blue-900" />
                        </div>

                        <div className="relative z-10 mb-6">
                            <h3 className="text-slate-500 font-bold text-sm tracking-tight border-b border-blue-200/40 pb-3 uppercase">
                                Affiliate Payouts Calculation
                            </h3>
                        </div>

                        <AnimatePresence mode="wait">
                            {!isCalculated ? (
                                <motion.div
                                    key="editorial-empty"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex flex-col items-start justify-center pt-8 pb-4 relative z-10 max-w-[280px]"
                                >
                                    <motion.div
                                        animate={{ x: [-2, 2, -2] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="bg-white/60 p-2.5 rounded-full shadow-sm border border-white mb-6 backdrop-blur-md"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-blue-500" />
                                    </motion.div>
                                    <h4 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug mb-3">
                                        Waiting for signals.
                                    </h4>
                                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                                        Enter your details on the left to instantly generate your exact payouts and ROI reports here.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="editorial-results"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center pt-10"
                                >
                                    <span className="text-[10px] font-bold text-blue-600/60 uppercase tracking-[0.2em] mb-2">Total Result</span>
                                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter">
                                        ${((Number(traffic) || 0) * (Number(aov) || 0) * 0.1).toLocaleString()}
                                    </h2>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default function EmptyStateTestPage() {
    return (
        <div className="min-h-screen bg-slate-50/30 p-8 sm:p-12 md:p-24 max-w-7xl mx-auto space-y-24">
            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Empty State UI Playground</h1>
                <p className="text-lg text-slate-500 font-medium">
                    Test how the result cards react to real user inputs. Both approaches are optimized for premium SaaS tools.
                </p>
            </div>

            <ChecklistApproach />
            <EditorialApproach />

            <div className="pt-20 text-center">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Web Scraper Pro Design Lab</p>
            </div>
        </div>
    )
}
