"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalculatorInput } from "@/app/tools/_shared/components"
import { ResultFeedbackCard, Counter, FadeIn } from "@/app/tools/_shared/components"
import { HelpCircle, RefreshCw, TrendingUp, DollarSign, Percent, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function ACoSCalculator() {
    const [adSpend, setAdSpend] = useState<number | "">(200)
    const [adRevenue, setAdRevenue] = useState<number | "">(800)
    const [profitMargin, setProfitMargin] = useState<number | "">("")

    const [acos, setAcos] = useState<number>(0)
    const [roas, setRoas] = useState<number>(0)
    const [netProfit, setNetProfit] = useState<number>(0)
    const [breakevenAcos, setBreakevenAcos] = useState<number>(0)

    useEffect(() => {
        const spend = Number(adSpend) || 0
        const revenue = Number(adRevenue) || 0
        const margin = Number(profitMargin) || 0

        if (revenue > 0) {
            const calculatedAcos = (spend / revenue) * 100
            setAcos(calculatedAcos)
            setRoas(spend > 0 ? revenue / spend : 0)
        } else {
            setAcos(0)
            setRoas(0)
        }

        if (revenue > 0 && margin > 0) {
            // Breakeven ACoS is simply the Profit Margin %
            setBreakevenAcos(margin)

            // Net Profit = (Revenue * Margin%) - Spend
            const profit = (revenue * (margin / 100)) - spend
            setNetProfit(profit)
        } else {
            setBreakevenAcos(0)
            setNetProfit(0)
        }

    }, [adSpend, adRevenue, profitMargin])

    const handleReset = () => {
        setAdSpend("")
        setAdRevenue("")
        setProfitMargin("")
    }

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Determine Status
    let status = "Waiting"
    let statusColor = "text-slate-400"
    let statusBg = "bg-slate-100"

    if (acos > 0 && breakevenAcos > 0) {
        if (acos < breakevenAcos) {
            status = "Profitable"
            statusColor = "text-emerald-600"
            statusBg = "bg-emerald-100"
        } else if (Math.abs(acos - breakevenAcos) < 0.1) {
            status = "Breakeven"
            statusColor = "text-amber-600"
            statusBg = "bg-amber-100"
        } else {
            status = "Unprofitable"
            statusColor = "text-red-600"
            statusBg = "bg-red-100"
        }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Campaign Financials
                                    </CardTitle>
                                    <button onClick={scrollToGuide} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <HelpCircle className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-500 font-medium tracking-tight">Enter your ad spend, revenue, and product margin.</p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Reset All"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {/* Group 1: Campaign Data */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Campaign Data</h3>
                                </div>
                                <CalculatorInput
                                    label="Total Ad Spend ($)"
                                    value={adSpend}
                                    onChange={setAdSpend}
                                    placeholder="200.00"
                                    min={0}
                                    tooltip="Total amount spent on advertising."
                                />
                                <CalculatorInput
                                    label="Ad Revenue ($)"
                                    value={adRevenue}
                                    onChange={setAdRevenue}
                                    placeholder="800.00"
                                    min={0}
                                    tooltip="Total sales revenue generated from these ads."
                                />
                            </div>

                            <Separator />

                            {/* Group 2: Product Metrics */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Percent className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Product Metrics</h3>
                                </div>
                                <CalculatorInput
                                    label="Profit Margin (%)"
                                    value={profitMargin}
                                    onChange={setProfitMargin}
                                    placeholder="40.0"
                                    min={0}
                                    max={100}
                                    tooltip="Your product's profit margin before ad costs. This is your Breakeven ACoS."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logic Highlight */}
                    <FadeIn delay={0.2}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800 mb-1 leading-tight">Net Profit Analysis</h4>
                                <p className={cn(
                                    "text-[15px] leading-relaxed max-w-sm transition-colors duration-300 font-medium",
                                    netProfit !== 0 ? "text-slate-600" : "text-slate-400"
                                )}>
                                    After deducting ad spend from your gross profit, your net return is <span className={cn("font-bold", netProfit > 0 ? "text-emerald-600" : netProfit < 0 ? "text-red-500" : "text-slate-900")}>${netProfit.toFixed(2)}</span>.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="ACoS Percentage"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter
                                    value={acos}
                                    formatter={(val) => val.toFixed(2)}
                                    className="text-5xl font-bold"
                                />
                                <span className="text-3xl font-bold text-slate-400">%</span>
                            </div>
                        }
                        secondaryMetrics={[
                            {
                                label: "Breakeven ACoS",
                                value: `${breakevenAcos.toFixed(2)}%`,
                                color: "text-slate-300"
                            },
                            {
                                label: "ROAS",
                                value: `${roas.toFixed(2)}x`,
                                color: "text-emerald-400"
                            }
                        ]}
                    />

                    {/* Insight Card */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Profitability Insight
                            </h3>
                            {acos > 0 && (
                                <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", statusBg, statusColor)}>
                                    {status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <InsightItem
                                label="Net Profit"
                                value={netProfit !== 0 ? `$${netProfit.toFixed(2)}` : "$0.00"}
                                description="Actual profit after advertising costs."
                                icon={DollarSign}
                                color={netProfit > 0 ? "text-emerald-600" : netProfit < 0 ? "text-red-500" : "text-slate-400"}
                                bg={netProfit > 0 ? "bg-emerald-50" : netProfit < 0 ? "bg-red-50" : "bg-slate-50"}
                            />
                            <InsightItem
                                label="Margin Efficiency"
                                value={breakevenAcos > 0 ? `${(breakevenAcos - acos).toFixed(2)}%` : "0.00%"}
                                description="Remaining margin after ad spend."
                                icon={CheckCircle2}
                                color={breakevenAcos - acos > 0 ? "text-emerald-600" : "text-slate-400"}
                                bg={breakevenAcos - acos > 0 ? "bg-emerald-50" : "bg-slate-50"}
                            />
                        </div>

                        <Separator />

                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efficiency Scale</p>
                                {acos > 0 && (
                                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border",
                                        acos > breakevenAcos ? "text-red-600 bg-red-50 border-red-100" : "text-emerald-600 bg-emerald-50 border-emerald-100"
                                    )}>
                                        {acos.toFixed(1)}% Current
                                    </span>
                                )}
                            </div>

                            <div className="relative pt-2 pb-1">
                                {/* Visual Bar: Green (Profit) -> Red (Loss) */}
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-emerald-400" style={{ width: '50%' }} />
                                    <div className="h-full bg-red-400" style={{ width: '50%' }} />
                                </div>

                                {/* Breakeven Marker (Center) */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-400 -ml-[1px] h-full z-0" />

                                {/* Dynamic Pointer */}
                                {breakevenAcos > 0 && acos > 0 && (
                                    <motion.div
                                        initial={{ left: '50%' }}
                                        animate={{
                                            // 50% is breakeven. 
                                            // If ACoS = 0, Left = 0%. 
                                            // If ACoS = Breakeven, Left = 50%.
                                            // If ACoS = 2x Breakeven, Left = 100%.
                                            left: `${Math.min(Math.max((acos / (breakevenAcos * 2)) * 100, 0), 100)}%`
                                        }}
                                        className="absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow-md z-10 -ml-2 transition-all"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[11px] font-bold text-slate-500 italic">
                                <span>High Profit</span>
                                <span>Breakeven</span>
                                <span>Loss</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}

const Separator = () => <div className="h-px w-full bg-slate-100" />

function InsightItem({ label, value, description, icon: Icon, color, bg }: { label: string, value: string, description: string, icon: any, color: string, bg: string }) {
    return (
        <div className="flex gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{label}</h4>
                    <span className={cn("text-sm font-bold", color)}>{value}</span>
                </div>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{description}</p>
            </div>
        </div>
    )
}
