"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Wallet, MousePointerClick, TrendingUp, BarChart3, Activity, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"

// ─── Shimmer Skeleton block ──────────────────────────────────────────────────
function Shimmer({ className }: { className?: string }) {
    return (
        <div className={cn("relative overflow-hidden bg-blue-100/50 rounded-lg", className)}>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    )
}

// ─── "Approach 2 — Primed Dashboard" ────────────────────────────────────────
function PrimedDashboardCard({
    isCalculated,
    roi,
    revenue,
    profit,
    checklistItems,
    resultType = "Result",
}: {
    isCalculated: boolean
    roi: number
    revenue: number
    profit: number
    checklistItems: { label: string; isComplete: boolean }[]
    resultType?: string
}) {
    const [showResults, setShowResults] = React.useState(isCalculated)
    const completedCount = checklistItems.filter(i => i.isComplete).length
    const totalCount = checklistItems.length
    const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

    React.useEffect(() => {
        if (isCalculated) {
            const t = setTimeout(() => setShowResults(true), 300)
            return () => clearTimeout(t)
        } else {
            setShowResults(false)
        }
    }, [isCalculated])

    const isProfit = profit >= 0

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-blue-200/60 bg-gradient-to-br from-[#f0f5ff] via-[#eef3ff] to-[#e8f0fe] p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-200/60">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                        Results Panel
                    </span>
                </div>

                <AnimatePresence>
                    {showResults && (
                        <motion.div
                            key="badge-result"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide shadow-sm",
                                isProfit ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" : "bg-red-50 border-red-200 text-red-700 font-bold"
                            )}
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", isProfit ? "bg-emerald-500" : "bg-red-500")} />
                                <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", isProfit ? "bg-emerald-500" : "bg-red-500")} />
                            </span>
                            {isProfit ? "Profitable" : "At a Loss"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Results Area with Overlay */}
            <div className="relative flex flex-col">
                <AnimatePresence>
                    {!showResults && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 z-30 flex items-center justify-center p-6 text-center pointer-events-none"
                        >
                            <div className="max-w-[240px]">
                                <p className="text-[13px] font-black text-blue-400/90 leading-relaxed tracking-tight drop-shadow-sm">
                                    Fill in the inputs below to acquire your <span className="text-blue-400 uppercase">{resultType}</span> result
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={cn("flex flex-col transition-all duration-500 ease-out", !showResults && "blur-[2.5px] opacity-40")}>
                    {/* Primary Result Area */}
                    <div className="bg-white/70 border border-white/80 rounded-xl p-5 mb-3 shadow-sm relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {!showResults ? (
                                <motion.div
                                    key="primary-skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center gap-3 py-4"
                                >
                                    <Shimmer className="h-2.5 w-28 rounded-full" />
                                    <Shimmer className="h-12 w-44 rounded-xl" />
                                    <Shimmer className="h-2 w-40 rounded-full" />
                                    <Shimmer className="h-2 w-32 rounded-full" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="primary-result"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center text-center gap-1.5 py-3"
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[100px] bg-blue-400/10 blur-[50px] rounded-full pointer-events-none" />
                                    <span className="relative text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
                                        Return on Investment
                                    </span>
                                    <span className="relative text-5xl font-black text-blue-600 tracking-tighter leading-none drop-shadow-sm">
                                        {roi.toFixed(2)}%
                                    </span>
                                    <p className="relative text-[11px] text-slate-400 font-medium leading-relaxed max-w-[220px]">
                                        {isProfit ? "Revenue exceeds costs." : "Campaign is at a loss."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Secondary Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: "Total Revenue", value: revenue, show: showResults },
                            { label: "Net Profit", value: profit, show: showResults, isProfit },
                        ].map((metric, idx) => (
                            <div key={idx} className="bg-white/60 border border-white/70 rounded-xl p-3 shadow-sm overflow-hidden relative">
                                <AnimatePresence mode="wait">
                                    {!metric.show ? (
                                        <motion.div key="sk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2 py-0.5">
                                            <Shimmer className="h-2 w-16" />
                                            <Shimmer className="h-5 w-12" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="val"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                                        >
                                            <div className="text-[11px] font-bold text-slate-400 mb-1.5">{metric.label}</div>
                                            <div className={cn("text-[17px] font-black tracking-tight whitespace-nowrap overflow-hidden transition-colors",
                                                metric.isProfit === undefined ? "text-slate-600" :
                                                    metric.isProfit ? "text-emerald-600" : "text-red-600"
                                            )}>
                                                ${metric.value.toLocaleString()}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Progress Bar — ONLY visible in empty state */}
            {/* <AnimatePresence>
                {!showResults && (
                    <motion.div
                        key="progress"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden shrink-0"
                    >
                        <div className="bg-white/60 border border-white/70 rounded-xl px-4 py-3 shadow-sm">
                            <div className="flex items-center justify-between mb-2.5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.12em]">Data Ready</span>
                                <span className="text-[10px] font-bold text-blue-600 font-black">{completedCount}/{totalCount} fields</span>
                            </div>
                            <div className="h-1.5 w-full bg-blue-100/80 rounded-full overflow-hidden mb-3">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPct}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {checklistItems.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        layout
                                        className={cn(
                                            "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border transition-all duration-400",
                                            item.isComplete
                                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold"
                                                : "bg-white/80 border-slate-200 text-slate-500"
                                        )}
                                    >
                                        {item.isComplete ? <Check className="w-2.5 h-2.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
                                        {item.label}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </div>
    )
}

// ─── "Approach 4 — Minimalist Core" ──────────────────────────────────────────
function MinimalistCoreCard({
    isCalculated,
    roi,
    revenue,
    profit,
    checklistItems,
    resultType = "Result",
}: {
    isCalculated: boolean
    roi: number
    revenue: number
    profit: number
    checklistItems: { label: string; isComplete: boolean }[]
    resultType?: string
}) {
    const [showResults, setShowResults] = React.useState(isCalculated)
    const completedCount = checklistItems.filter(i => i.isComplete).length
    const totalCount = checklistItems.length

    React.useEffect(() => {
        if (isCalculated) {
            const t = setTimeout(() => setShowResults(true), 350)
            return () => clearTimeout(t)
        } else {
            setShowResults(false)
        }
    }, [isCalculated])

    const isProfit = profit >= 0

    return (
        <div className="relative rounded-2xl overflow-hidden border border-blue-200/60 bg-gradient-to-br from-[#f0f5ff] via-[#eef3ff] to-[#e8f0fe] p-6 flex flex-col gap-6 transition-all duration-500 shadow-lg">
            {/* Header / Status Line */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-200/60">
                        <Activity className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                        Results Panel
                    </span>
                </div>

                <AnimatePresence>
                    {!showResults && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="bg-white/60 border border-white/70 px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-sm"
                        >
                            <span className="text-[10px] font-black text-blue-600">{completedCount}/{totalCount}</span>
                            <div className="w-16 h-1.5 bg-blue-100/80 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content Area */}
            <div className="relative min-h-[160px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <motion.div
                            key="minimal-empty"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="flex flex-col items-center text-center gap-4"
                        >
                            <div className="w-14 h-14 rounded-full bg-blue-600/10 border border-blue-200/50 flex items-center justify-center text-blue-600 shadow-sm">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.15em] leading-none">Awaiting Data</h3>
                                <p className="text-[12px] text-slate-500 font-semibold max-w-[180px] leading-relaxed">
                                    Complete the inputs to generate your <span className="text-blue-600 font-bold">{resultType}</span>.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="minimal-result"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center gap-6 w-full"
                        >
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{resultType}</span>
                                <div className="relative flex items-baseline justify-center">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[100px] bg-blue-400/10 blur-[50px] rounded-full pointer-events-none" />
                                    <span className="relative text-7xl font-black text-blue-600 tracking-tighter leading-none drop-shadow-sm tabular-nums">
                                        {roi.toFixed(1)}<span className="text-3xl ml-1">%</span>
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full">
                                <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-sm flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Revenue</span>
                                    <span className="text-[17px] font-black text-slate-600">${revenue.toLocaleString()}</span>
                                </div>
                                <div className={cn(
                                    "p-4 rounded-2xl border shadow-sm flex flex-col gap-1.5",
                                    isProfit ? "bg-emerald-50/70 border-emerald-100/80" : "bg-red-50/70 border-red-100/80"
                                )}>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Profit</span>
                                    <span className={cn("text-[17px] font-black", isProfit ? "text-emerald-600" : "text-red-600")}>
                                        ${profit.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle Footer Tag */}
            <div className="flex items-center justify-center pt-2 border-t border-blue-200/30">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Design Engine V4.0</span>
            </div>
        </div>
    )
}

// ─── Main Comparison Page ────────────────────────────────────────────────────
export default function ResultCardComparisonPage() {
    const [fee, setFee] = useState<number | "">("")
    const [price, setPrice] = useState<number | "">("")
    const [orders, setOrders] = useState<number | "">("")

    const v = (x: number | "") => (x === "" ? 0 : x)
    const totalCost = v(fee)
    const totalRevenue = v(price) * v(orders)
    const profit = totalRevenue - totalCost
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
    const isCalculated = fee !== "" && price !== "" && orders !== ""

    const primedChecklistItems = [
        { label: "Influencer Fee", isComplete: fee !== "" },
        { label: "Selling Price", isComplete: price !== "" },
        { label: "No. of Orders", isComplete: orders !== "" },
    ]

    const handleReset = () => {
        setFee("")
        setPrice("")
        setOrders("")
    }

    return (
        <div className="min-h-screen bg-slate-50/40 py-12 px-4 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-12 text-center space-y-2">
                    <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest shadow-sm mb-3">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                        Design Lab
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Result Card: Modern Architectures
                    </h1>
                    <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
                        Toggle the inputs below to compare the behavior of two refined, premium card architectures.
                    </p>
                </div>

                {/* Main Row: Input | v2 | v4 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* ── Column 1: Input Card ── */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Inputs</span>
                            <span className="text-sm font-semibold text-slate-600">Configuration</span>
                        </div>
                        <Card className="overflow-hidden shadow-sm border border-slate-200/80">
                            <CalculatorCardHeader
                                title="Campaign Details"
                                description="Calculate ROI with real-time feedback."
                                onReset={handleReset}
                            />
                            <CardContent className="p-6 space-y-4">
                                <CalculatorInput
                                    label="Influencer Fee"
                                    value={fee}
                                    onChange={setFee}
                                    placeholder="1000.00"
                                    currency="USD"
                                    tooltip="Payment to influencer."
                                    groupingTitle="Costs"
                                    groupingIcon={Wallet}
                                />
                                <CalculatorInput
                                    label="Average Selling Price"
                                    value={price}
                                    onChange={setPrice}
                                    placeholder="100.00"
                                    currency="USD"
                                    tooltip="Product price."
                                    groupingTitle="Revenue"
                                    groupingIcon={ShoppingCart}
                                />
                                <CalculatorInput
                                    label="Number of Orders"
                                    value={orders}
                                    onChange={setOrders}
                                    placeholder="50"
                                    tooltip="Expected sales."
                                    groupingTitle="Volume"
                                    groupingIcon={MousePointerClick}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* ── Column 2: Primed Dashboard (v2) ── */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">v2</span>
                            <span className="text-sm font-semibold text-slate-600">Primed Dashboard</span>
                        </div>
                        <PrimedDashboardCard
                            isCalculated={isCalculated}
                            roi={roi}
                            revenue={totalRevenue}
                            profit={profit}
                            checklistItems={primedChecklistItems}
                            resultType="ROI"
                        />
                    </div>

                    {/* ── Column 3: Minimalist Core (v4) ── */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">v4</span>
                            <span className="text-sm font-semibold text-slate-600">Minimalist Core</span>
                        </div>
                        <MinimalistCoreCard
                            isCalculated={isCalculated}
                            roi={roi}
                            revenue={totalRevenue}
                            profit={profit}
                            checklistItems={primedChecklistItems}
                            resultType="ROI"
                        />
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Antigravity Design Engine</p>
                </div>
            </div>
        </div>
    )
}
