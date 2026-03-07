"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ShoppingCart, Wallet, MousePointerClick, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorInput, CalculatorCardHeader, ResultSummaryCard } from "@/app/tools/_shared/components"

// ─── "Previous" Result Card (v1) ───────────────────────────────────────────
function PreviousResultCard({
    isCalculated,
    roi,
    revenue,
    profit,
    checklistItems,
}: {
    isCalculated: boolean
    roi: number
    revenue: number
    profit: number
    checklistItems: { label: string; isComplete: boolean }[]
}) {
    const [showResults, setShowResults] = React.useState(isCalculated)

    React.useEffect(() => {
        if (isCalculated) {
            const t = setTimeout(() => setShowResults(true), 200)
            return () => clearTimeout(t)
        } else {
            setShowResults(false)
        }
    }, [isCalculated])

    return (
        <Card className="relative overflow-hidden border border-blue-200/60 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 shadow-sm p-6 rounded-2xl backdrop-blur-3xl h-full">
            <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px] pointer-events-none opacity-[0.08]" />

            <div className="relative z-10 mb-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col flex-1 justify-center">
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                            <span className="text-[10px] sm:text-[11px] font-black text-blue-600/60 uppercase tracking-[0.2em] leading-none">
                                Results Overview
                            </span>
                        </div>
                    </div>

                    {showResults && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border border-slate-200/50 transition-all shadow-sm shrink-0 mt-0.5",
                                profit >= 0 ? "bg-emerald-100/80" : "bg-red-100/80"
                            )}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", profit >= 0 ? "bg-emerald-500" : "bg-red-500")}></span>
                                <span className={cn("relative inline-flex rounded-full h-2 w-2", profit >= 0 ? "bg-emerald-500" : "bg-red-500")}></span>
                            </span>
                            <span className={cn("text-[10px] sm:text-[11px] font-bold tracking-[0.05em] leading-none text-black", profit >= 0 ? "text-emerald-700" : "text-red-700")}>
                                {profit >= 0 ? "Profit" : "Loss"}
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key="prev-empty"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="flex flex-col gap-4"
                    >
                        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                            Enter the below mentioned fields to get the output for your ROI.
                        </p>
                        <div className="space-y-5 pl-1.5">
                            {checklistItems.map((item, idx) => (
                                <div key={idx} className={cn("flex items-center gap-3.5 transition-all duration-500", item.isComplete ? "opacity-20" : "opacity-100")}>
                                    <div className="w-5 flex items-center justify-center shrink-0">
                                        {item.isComplete ? (
                                            <Check className="w-[18px] h-[18px] text-emerald-500" />
                                        ) : (
                                            <div className="relative flex items-center justify-center">
                                                <span className="absolute h-3.5 w-3.5 rounded-full bg-blue-200/50 animate-ping" />
                                                <span className="relative h-1.5 w-1.5 rounded-full bg-blue-400" />
                                            </div>
                                        )}
                                    </div>
                                    <span className={cn("text-[13px] font-medium tracking-tight", item.isComplete ? "text-slate-500" : "text-slate-600")}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="prev-results"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col items-center justify-center py-5 px-4 mb-2"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[140px] bg-blue-400/10 blur-[60px] rounded-full pointer-events-none z-0" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[80px] bg-indigo-400/5 blur-[40px] rounded-full pointer-events-none z-0" />

                            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                                <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] leading-none mb-1">
                                    Return on Investment
                                </span>

                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl sm:text-6xl font-black text-blue-600 tracking-tighter leading-none drop-shadow-sm">
                                        {roi.toFixed(2)}%
                                    </span>
                                </div>

                                <p className="text-[12px] text-slate-400 font-medium max-w-[280px] mx-auto leading-relaxed mt-1">
                                    {profit >= 0 ? "Great job! Your campaign is generating a positive return on investment." : "Your campaign is operating at a loss."}
                                </p>
                            </div>
                        </motion.div>
                        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent my-4" />
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/70 border border-white/60 rounded-xl p-3">
                                <div className="text-[13px] font-bold text-slate-400 mb-2">Total Revenue</div>
                                <div className="text-[17.5px] font-black text-slate-600">${revenue.toLocaleString()}</div>
                            </div>
                            <div className="bg-white/70 border border-white/60 rounded-xl p-3">
                                <div className="text-[13px] font-bold text-slate-400 mb-2">Net Profit</div>
                                <div className={cn("text-[17.5px] font-black", profit >= 0 ? "text-emerald-600" : "text-red-600")}>${profit.toLocaleString()}</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}

// ─── Main Classic Comparison Page ──────────────────────────────────────────
export default function ResultCardClassicPage() {
    const [fee, setFee] = useState<number | "">("")
    const [price, setPrice] = useState<number | "">("")
    const [orders, setOrders] = useState<number | "">("")

    const v = (x: number | "") => (x === "" ? 0 : x)
    const totalCost = v(fee)
    const totalRevenue = v(price) * v(orders)
    const profit = totalRevenue - totalCost
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
    const isCalculated = fee !== "" && price !== "" && orders !== ""

    const checklistItems = [
        { label: "Enter your agreed Influencer Fee", isComplete: fee !== "" },
        { label: "Enter the Average Selling Price", isComplete: price !== "" },
        { label: "Enter your estimated Number of Orders", isComplete: orders !== "" },
    ]

    const cleanChecklistItems = [
        { key: "fee", label: "Influencer Fee", isComplete: fee !== "" },
        { key: "price", label: "Average Selling Price", isComplete: price !== "" },
        { key: "orders", label: "Number of Orders", isComplete: orders !== "" },
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
                        Classic Architectures Comparison
                    </h1>
                    <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
                        Comparing the Static Checklist (v1) and the Current Ghost Skeleton (v3).
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* ── Column 1: Input Card ── */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Inputs</span>
                            <span className="text-sm font-semibold text-slate-600">Campaign Details</span>
                        </div>
                        <Card className="overflow-hidden shadow-sm border border-slate-200/80">
                            <CalculatorCardHeader
                                title="Calculator Inputs"
                                description="Adjust values to see how the result cards react."
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

                    {/* ── Column 2: Static Checklist (v1) ── */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">v1</span>
                            <span className="text-sm font-semibold text-slate-600">Static Checklist Approach</span>
                        </div>
                        <PreviousResultCard
                            isCalculated={isCalculated}
                            roi={roi}
                            revenue={totalRevenue}
                            profit={profit}
                            checklistItems={checklistItems}
                        />
                    </div>

                    {/* ── Column 3: Current Ghost Skeleton (v3) ── */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">v3</span>
                            <span className="text-sm font-semibold text-slate-600">Current Ghost Skeleton</span>
                        </div>
                        <ResultSummaryCard
                            title="ROI Tracker"
                            currency="USD"
                            primaryResult={{
                                value: roi.toFixed(2),
                                unit: "%",
                                label: "Return on Investment",
                            }}
                            secondaryResults={[
                                {
                                    key: "revenue",
                                    label: "Total Revenue",
                                    value: totalRevenue.toLocaleString(),
                                    isCurrency: true,
                                },
                                {
                                    key: "profit",
                                    label: "Net Profit",
                                    value: profit.toLocaleString(),
                                    isCurrency: true,
                                },
                            ]}
                            isCalculated={isCalculated}
                            profitLossKey="profit"
                            checklistItems={cleanChecklistItems}
                            emptyMessage="Fill inputs to calculate ROI"
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
