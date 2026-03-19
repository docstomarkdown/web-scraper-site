import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { Wallet, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfitAllocationProps {
    revenue: number
    cogs: number
    adSpend: number
    overhead: number
    taxAmount: number
    netProfit: number
    currency: string
}

export function ProfitAllocation({
    revenue,
    cogs,
    adSpend,
    overhead,
    taxAmount,
    netProfit,
    currency
}: ProfitAllocationProps) {
    const [isOpen, setIsOpen] = useState(false)

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    const formatCompact = (val: number) => {
        const absVal = Math.abs(val)
        if (absVal < 1000000) return formatCurrency(val)
        const digits = absVal > 1000000000000 ? 0 : 1
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: digits
        }).format(val)
    }

    const getPercent = (amount: number) => {
        return revenue > 0 ? Math.min(Math.max((amount / revenue) * 100, 0), 100) : 0
    }

    const cogsPercent = getPercent(cogs)
    const adsPercent = getPercent(adSpend)
    const overheadPercent = getPercent(overhead)
    const taxPercent = getPercent(taxAmount)
    const profitPercent = getPercent(Math.max(netProfit, 0))

    const activeData = [
        { name: "COGS", value: cogs, color: "#94a3b8" },
        { name: "Ads", value: adSpend, color: "#60a5fa" },
        { name: "Overhead", value: overhead, color: "#c084fc" },
        { name: "Tax", value: taxAmount, color: "#fbbf24" },
        { name: "Net Profit", value: Math.max(0, netProfit), color: "#10b981" },
    ].filter(i => i.value > 0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl pt-1 pb-1 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                type="button"
            >
                <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-500" />
                    <span className="text-[13px] font-bold text-slate-500">View Income & Expense Breakdown</span>
                </div>
                <div className="flex items-center gap-3">
                    {netProfit < 0 && (
                        <span className="text-[10px] font-black bg-red-50 text-red-600 px-2 py-0.5 rounded-full animate-pulse">
                            Negative Margin
                        </span>
                    )}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </motion.span>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 border-t border-slate-100 flex items-center gap-4 min-h-[140px]">
                {/* Left: Donut Chart - Removed hover tooltip */}
                <div className="h-[120px] w-[120px] relative shrink-0">
                    {revenue > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={activeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {activeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </RechartsPie>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-[10px] font-bold border-2 border-dashed border-slate-100 rounded-full text-center p-4">
                            Complete Inputs to Visualize Breakdown
                        </div>
                    )}
                    {/* Center Label */}
                    {revenue > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total</span>
                            <span className={`text-center font-black leading-tight ${netProfit >= 0 ? 'text-slate-900' : 'text-red-600'} ${Math.abs(revenue) > 1000000000 ? 'text-[8px]' : 'text-[11px]'}`}>
                                {formatCompact(revenue)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right: Legend with Absolute Values */}
                <div className="flex-1 space-y-1.5 pt-1">
                    <LegendItem label="COGS" value={cogs} percent={cogsPercent} color="bg-slate-400" formatCurrency={formatCurrency} />
                    <LegendItem label="Ads" value={adSpend} percent={adsPercent} color="bg-blue-400" formatCurrency={formatCurrency} />
                    <LegendItem label="Overhead" value={overhead} percent={overheadPercent} color="bg-purple-400" formatCurrency={formatCurrency} />
                    <LegendItem label="Tax" value={taxAmount} percent={taxPercent} color="bg-amber-400" formatCurrency={formatCurrency} />
                    <div className="pt-1 mt-1 border-t border-slate-100">
                        <LegendItem
                            label="Net Profit"
                            value={netProfit}
                            percent={profitPercent}
                            color="bg-emerald-500"
                            isProfit
                            isNegative={netProfit < 0}
                            formatCurrency={formatCurrency}
                        />
                    </div>
                </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function LegendItem({
    label,
    value,
    percent,
    color,
    isProfit = false,
    isNegative = false,
    formatCurrency
}: {
    label: string,
    value: number,
    percent: number,
    color: string,
    isProfit?: boolean,
    isNegative?: boolean,
    formatCurrency: (v: number) => string
}) {
    return (
        <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5 border border-slate-100/50">
            <div className="flex items-center gap-1.5 truncate">
                <div className={cn(
                    "w-2 h-2 rounded-full shrink-0",
                    isProfit && isNegative ? "bg-red-500" : color
                )} />
                <span className={cn(
                    "font-medium truncate",
                    isProfit ? (isNegative ? "text-red-600" : "text-emerald-700") : "text-slate-600"
                )}>
                    {label}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">
                    {formatCurrency(value)}
                </span>
                <span className={cn(
                    "font-black w-10 text-right",
                    isProfit ? (isNegative ? "text-red-600" : "text-emerald-600") : "text-slate-900"
                )}>
                    {percent.toFixed(1)}%
                </span>
            </div>
        </div>
    )
}
