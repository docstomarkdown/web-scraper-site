"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { motion } from "framer-motion"
import { Target, DollarSign, MousePointer2, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function PPCBidCalculator() {
    const [price, setPrice] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [targetACoS, setTargetACoS] = useState<number | "">("")
    const [maxBid, setMaxBid] = useState<number>(0)
    const [breakevenBid, setBreakevenBid] = useState<number>(0)
    const [maxCPA, setMaxCPA] = useState<number>(0)

    useEffect(() => {
        const p = price === "" ? 0 : price
        const cr = (conversionRate === "" ? 0 : conversionRate) / 100
        const acos = (targetACoS === "" ? 0 : targetACoS) / 100

        if (p > 0 && cr > 0 && acos > 0) {
            // Formula: Sales Value per Click = Price * Conversion Rate
            // Max Bid = Sales Value per Click * Target ACoS
            const calculatedBid = p * cr * acos
            setMaxBid(calculatedBid)

            // Breakeven Bid (at 100% ACoS)
            setBreakevenBid(p * cr)

            // Max CPA = Price * Target ACoS
            setMaxCPA(p * acos)
        } else {
            setMaxBid(0)
            setBreakevenBid(0)
            setMaxCPA(0)
        }
    }, [price, conversionRate, targetACoS])

    const handleReset = () => {
        setPrice("")
        setConversionRate("")
        setTargetACoS("")
    }
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader

                            description="Set your product price and target goals."

                            onReset={handleReset}
                        />
                        <CardContent className="space-y-6 pt-6">
                            {/* Group 1: Product Data */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Product Data</h3>
                                </div>
                                <CalculatorInput
                                    label="Sale Price"
                                    value={price}
                                    onChange={setPrice}
                                    placeholder="50.00"
                                    min={0}
                                    step={0.01}
                                    tooltip="The selling price of your product."
                                />
                                <CalculatorInput
                                    label="Conversion Rate (%)"
                                    value={conversionRate}
                                    onChange={setConversionRate}
                                    placeholder="10.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Your average conversion rate (orders / clicks * 100)."
                                />
                            </div>

                            <Separator />

                            {/* Group 2: Campaign Goals */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Target className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Campaign Goals</h3>
                                </div>
                                <CalculatorInput
                                    label="Target ACoS (%)"
                                    value={targetACoS}
                                    onChange={setTargetACoS}
                                    placeholder="30.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Your target Advertising Cost of Sales (Ad Spend / Sales * 100)."
                                />
                            </div>
                        </CardContent>
                    </Card>


                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Maximum Suggested Bid"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold">$</span>
                                <Counter
                                    value={maxBid}
                                    formatter={(val) => val.toFixed(2)}
                                    className="text-4xl font-bold"
                                />
                            </div>
                        }
                        secondaryMetrics={[
                            {
                                label: "Max CPA",
                                value: `$${maxCPA.toFixed(2)}`,
                                color: "text-blue-400"
                            },
                            {
                                label: "Breakeven Bid",
                                value: `$${breakevenBid.toFixed(2)}`,
                                color: "text-amber-400"
                            }
                        ]}
                    />

                    {/* Breakdown Card */}
                    {maxBid > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Bid Calculation</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Expected Revenue / Click</span>
                                    <span className="text-sm font-semibold text-slate-800">${((Number(price) || 0) * (Number(conversionRate) || 0) / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Target ACoS</span>
                                    <span className="text-sm font-semibold text-slate-800">{targetACoS}%</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-blue-50/20">
                                    <span className="text-sm font-bold text-slate-900">Max Bid</span>
                                    <span className="text-base font-bold text-blue-600">${maxBid.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter metrics to calculate bid.</p>
                        </div>
                    )}

                    {/* Insight Card */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Profitability Insight
                            </h3>
                            {maxBid > 0 ? (
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Optimal</span>
                            ) : (
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Waiting</span>
                            )}
                        </div>


                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aggressiveness Scale</p>
                                {targetACoS && (
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                        {Number(targetACoS)}% ACoS
                                    </span>
                                )}
                            </div>
                            <div className="relative pt-2 pb-1">
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-blue-400 border-r border-white" style={{ width: '33.33%' }} />
                                    <div className="h-full bg-blue-400 border-r border-white" style={{ width: '33.33%' }} />
                                    <div className="h-full bg-amber-400" style={{ width: '33.33%' }} />
                                </div>
                                {/* Dynamic Pointer */}
                                {targetACoS && (
                                    <motion.div
                                        initial={{ left: 0 }}
                                        animate={{ left: `${Math.min(Math.max(Number(targetACoS), 0), 100)}%` }}
                                        className="absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow-md z-10 -ml-2 transition-all"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[11px] font-bold text-slate-500 italic">
                                <span>Conservative</span>
                                <span>Target</span>
                                <span>Aggressive</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}

const Separator = () => <div className="h-px w-full bg-slate-100" />

