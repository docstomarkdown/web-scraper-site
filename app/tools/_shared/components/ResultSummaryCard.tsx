"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, CheckCircle2, Circle, ArrowLeft, Percent, Check, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { currencies } from "./CurrencyCombobox"
interface SecondaryResult {
    key: string
    label: string
    value: string | number
    unit?: string
    tooltip?: string
    isCurrency?: boolean // New flag to handle currency formatting
    className?: string // Added to support custom grid layouts
}
export interface ChecklistItem {
    key?: string
    label: string
    isComplete: boolean
}
interface ResultSummaryCardProps {
    title: string
    primaryResult: {
        value: string | number
        unit?: string
        label?: string
        isCurrency?: boolean
        key?: string
    }
    secondaryResults: SecondaryResult[]
    currency?: string // Global currency code for the card
    showLiveBadge?: boolean
    liveBadgeText?: string
    isCalculated?: boolean
    profitLossKey?: string
    description?: string
    emptyMessage?: string
    emptyResultLabel?: string
    dynamicMessages?: {
        positive: string
        negative: string
        neutral: string
    }
    className?: string
    checklistItems?: ChecklistItem[]
    variant?: 'indicators' | 'editorial'
}
export function ResultSummaryCard({
    title,
    primaryResult,
    secondaryResults,
    currency,
    showLiveBadge = true,
    liveBadgeText = "LIVE",
    isCalculated = false,
    profitLossKey,
    description,
    emptyMessage,
    emptyResultLabel,
    dynamicMessages,
    className,
    checklistItems,
    variant = 'indicators'
}: ResultSummaryCardProps) {
    const [showResults, setShowResults] = React.useState(isCalculated)
    const completedCount = checklistItems ? checklistItems.filter(i => i.isComplete).length : 0
    const totalCount = checklistItems ? checklistItems.length : 0

    React.useEffect(() => {
        if (isCalculated) {
            // A micro-delay (200ms) to ensure the very last green tick flashes on screen before the view dissolves, without causing an artificial pause
            const timer = setTimeout(() => {
                setShowResults(true)
            }, 350)
            return () => clearTimeout(timer)
        } else {
            setShowResults(false)
        }
    }, [isCalculated])

    const formatValueWithUnit = (value: string | number, unit?: string, isCurrency?: boolean) => {
        const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value
        if (isCurrency && currency && !isNaN(numValue)) {
            // Priority: Use the symbol from our established currencies list
            const found = currencies.find(c => c.code === currency)
            if (found) {
                const formatter = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
                return (
                    <span className="flex items-baseline">
                        <span className="mr-1 opacity-90">{found.symbol}</span>
                        {formatter.format(numValue)}
                    </span>
                )
            }

            try {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
                    currencyDisplay: 'narrowSymbol',
                    maximumFractionDigits: 2
                })
                const formatted = formatter.format(numValue)
                // If it's a currency, we use the formatter's output directly
                return (
                    <span className="flex items-baseline">
                        {formatted}
                    </span>
                )
            } catch {
                try {
                    const formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency,
                        maximumFractionDigits: 2
                    })
                    return (
                        <span className="flex items-baseline">
                            {formatter.format(numValue)}
                        </span>
                    )
                } catch {
                    // silent fallback
                }
            }
        }
        const displayNum = isNaN(numValue) ? 0 : numValue
        if (!unit) return displayNum
        // Symbols that usually go at the front
        const frontSymbols = ['$', '€', '£', '¥', '₹', 'A$', 'C$', 'S$']
        const isFront = frontSymbols.some(s => unit.startsWith(s))
        if (isFront) {
            return (
                <span className="flex items-baseline">
                    <span className="mr-0.5 opacity-90">{unit}</span>
                    {value}
                </span>
            )
        }
        // Default: Unit goes at the back (%, cm, m, kg, etc.)
        return (
            <span className="flex items-baseline">
                {value}
                <span className="ml-1 opacity-70 font-medium text-[0.6em]">{unit}</span>
            </span>
        )
    }
    const getNumericResult = () => {
        if (!profitLossKey) return 0
        let rawValue: string | number = 0
        // Check primary result first
        if (primaryResult.key === profitLossKey) {
            rawValue = primaryResult.value
        } else {
            // Then check secondary results
            const result = secondaryResults.find(r => r.key === profitLossKey)
            if (result) rawValue = result.value
        }
        const numeric = typeof rawValue === 'string' ? parseFloat(rawValue.replace(/[^0-9.-]+/g, "")) : rawValue
        return isNaN(numeric) ? 0 : numeric
    }
    const numericProfitLoss = getNumericResult()
    const isLoss = numericProfitLoss < 0
    // Helper to flip Profit/Loss text automatically
    const autoAdjustText = (text: string) => {
        if (!isLoss) return text
        return text.replace(/Profit/g, "Loss").replace(/PROFIT/g, "LOSS").replace(/profit/g, "loss")
    }
    const getSecondaryValueColor = (result: SecondaryResult) => {
        if (profitLossKey && result.key === profitLossKey) {
            if (numericProfitLoss > 0) return "text-emerald-600"
            if (numericProfitLoss < 0) return "text-red-600"
        }
        return "text-slate-400"
    }
    const badge = (() => {
        if (profitLossKey) {
            if (numericProfitLoss > 0) {
                return {
                    text: "Profit",
                    bg: "bg-emerald-100/80",
                    dot: "bg-emerald-500",
                    textCol: "text-emerald-700 font-bold"
                }
            }
            if (numericProfitLoss < 0) {
                return {
                    text: "Loss",
                    bg: "bg-red-100/80",
                    dot: "bg-red-500",
                    textCol: "text-red-700 font-bold"
                }
            }
        }
        return {
            text: liveBadgeText || "LIVE",
            bg: "bg-emerald-100/50",
            dot: "bg-emerald-500",
            textCol: "text-emerald-700"
        }
    })()
    // Dynamic description generator
    const displayDescription = (() => {
        if (description) return description // User override always wins
        if (profitLossKey) {
            if (numericProfitLoss > 0) {
                return dynamicMessages?.positive || "Great job! Your campaign is generating a positive return on investment."
            }
            if (numericProfitLoss < 0) {
                return dynamicMessages?.negative || "Your campaign is operating at a loss. Consider optimizing your costs or improving conversion rates."
            }
            return dynamicMessages?.neutral || "Your campaign broke even. You made back exactly what you spent."
        }
        return "A quick measure of your success."
    })()
    // Handle title and label adjustments
    const displayTitle = autoAdjustText(title)
    const displayLabel = primaryResult.label ? autoAdjustText(primaryResult.label) : undefined
    // For display purposes, we might want to show the absolute value if we are already labeling it as "Loss"
    // and if it's the primary profit/loss result.
    const getDisplayValue = (val: string | number, key?: string) => {
        if (key !== profitLossKey || !isLoss) return val
        // If it's a string, we need to handle formatting carefully
        if (typeof val === 'string') {
            // Check if it looks like a negative number (contains - or starts with ( )
            const numeric = parseFloat(val.replace(/[^0-9.-]+/g, ""))
            if (numeric < 0) {
                // Return version without minus sign
                return val.replace("-", "").replace("(", "").replace(")", "")
            }
        } else if (typeof val === 'number') {
            return Math.abs(val)
        }
        return val
    }
    const displayValue = getDisplayValue(primaryResult.value, primaryResult.key)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Card className={cn(
                "relative overflow-hidden border border-blue-200/60 bg-gradient-to-br from-blue-50 to-blue-100/40 shadow-sm p-6 rounded-2xl backdrop-blur-3xl",
                className
            )}>
                {/* Inner subtle border for glass effect */}
                <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none" />

                {/* Background Effects matching a premium aesthetic */}
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px] pointer-events-none opacity-[0.08]" />
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-indigo-400 rounded-full blur-[100px] pointer-events-none opacity-[0.05]" />

                {/* Header Section */}
                <div className="relative z-10 mb-4">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col flex-1 justify-center">
                            <div className="flex items-center gap-2.5 flex-wrap mt-0.5">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                                    <Activity className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.18em] leading-none">
                                    Results Panel
                                </span>
                            </div>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {!showResults && totalCount > 0 && (
                                <motion.div
                                    key="progress"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="bg-white/60 border border-white/70 px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-sm mt-0.5"
                                >
                                    <span className="text-[10px] font-black text-blue-600">{completedCount}/{totalCount}</span>
                                    <div className="w-16 h-1.5 bg-blue-100/80 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {showLiveBadge && showResults && (
                                <motion.div
                                    key="live-badge"
                                    initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                                    className={cn(
                                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border border-slate-200/50 transition-all shadow-sm shrink-0 mt-0.5",
                                        badge.bg
                                    )}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", badge.dot)}></span>
                                        <span className={cn("relative inline-flex rounded-full h-2 w-2", badge.dot)}></span>
                                    </span>
                                    <span className={cn("text-[10px] sm:text-[11px] font-bold tracking-[0.05em] leading-none", badge.textCol)}>
                                        {badge.text}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            {/* ─── Floating Glass Instruction Overlay ─── */}
                            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 max-w-[220px] pointer-events-auto"
                                >
                                    {/* Pulsing icon */}
                                    <div className="relative flex items-center justify-center">
                                        <span className="absolute w-10 h-10 rounded-full bg-blue-400/20 animate-ping" style={{ animationDuration: "2.4s" }} />
                                        <div className="relative w-9 h-9 rounded-full bg-blue-600/10 border border-blue-200/60 flex items-center justify-center text-blue-500">
                                            <Activity className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <p className="text-[12.5px] text-slate-500 font-semibold leading-snug text-center">
                                            Complete the inputs to generate your
                                        </p>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/10 border border-blue-200/60 text-[11px] font-black text-blue-700 tracking-wide">
                                            {emptyMessage
                                                ? emptyMessage
                                                : emptyResultLabel || primaryResult.label || title || "Result"}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* ─── Ghosted Skeleton Dashboard (mirrors results layout) ─── */}
                            <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                {/* Primary Hero Skeleton */}
                                <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                    {/* Label shimmer */}
                                    <div className="h-2.5 w-24 rounded-full bg-blue-200/60 mb-3 animate-pulse" />
                                    {/* Value shimmer */}
                                    <div className="h-12 w-40 rounded-xl bg-blue-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                    {/* Description shimmer */}
                                    <div className="flex flex-col items-center gap-1.5 mt-1">
                                        <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                        <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200/40 to-transparent my-4" />

                                {/* Secondary Metrics Grid Skeleton */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {secondaryResults.map((result, idx) => {
                                        const is3rdOf3 = secondaryResults.length === 3 && idx === 2;
                                        return (
                                            <div
                                                key={`skeleton-${result.key}`}
                                                className={cn(
                                                    "bg-white/50 border border-white/40 p-3 sm:p-4 rounded-xl flex flex-col justify-between",
                                                    is3rdOf3 ? "sm:col-span-2" : "",
                                                    result.className
                                                )}
                                            >
                                                <div className="h-2 w-20 rounded-full bg-slate-200/60 mb-3 animate-pulse" style={{ animationDelay: `${0.1 + idx * 0.08}s` }} />
                                                <div className="h-4 w-16 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: `${0.15 + idx * 0.08}s` }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results-state"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col relative z-10"
                        >
                            {/* ─── Floating Hero (Primary Result) ─── */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col items-center justify-center py-5 px-4 mb-2"
                            >
                                {/* Central Aura Spotlight */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[140px] bg-blue-400/10 blur-[60px] rounded-full pointer-events-none z-0" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[80px] bg-indigo-400/5 blur-[40px] rounded-full pointer-events-none z-0" />

                                <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                                    {displayLabel && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] leading-none mb-1"
                                        >
                                            {displayLabel}
                                        </motion.span>
                                    )}

                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl sm:text-6xl font-extrabold text-blue-600 tracking-tighter leading-none drop-shadow-sm">
                                            {formatValueWithUnit(displayValue, primaryResult.unit, primaryResult.isCurrency)}
                                        </span>
                                    </div>

                                    {displayDescription && (
                                        <p className="text-[12px] text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed mt-1">
                                            {displayDescription}
                                        </p>
                                    )}
                                </div>
                            </motion.div>

                            {/* Divider Line */}
                            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent my-4" />

                            {/* Grid Layout for secondary metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10 auto-rows-fr">
                                {secondaryResults.map((result, idx) => {
                                    const is3rdOf3 = secondaryResults.length === 3 && idx === 2;
                                    return (
                                        <motion.div
                                            key={result.key}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.15 + idx * 0.08, ease: "easeOut" }}
                                            className={cn(
                                                "group bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-3 sm:p-4 rounded-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_12px_30px_rgba(59,130,246,0.08)]",
                                                is3rdOf3 ? "sm:col-span-2" : "",
                                                result.className
                                            )}
                                        >
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <span className="text-[13px] font-bold text-slate-500 whitespace-nowrap group-hover:text-blue-600/60 transition-colors duration-300">
                                                    {autoAdjustText(result.label)}
                                                </span>
                                                {result.tooltip && (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                tabIndex={-1}
                                                                className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0"
                                                            >
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent sideOffset={6} className="bg-slate-900 border-slate-800 text-white text-xs max-w-xs p-3 shadow-xl rounded-xl font-medium z-[110]">
                                                            {result.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </div>

                                            <div className={cn(
                                                "text-[17.5px] font-black tracking-tight transition-colors duration-300",
                                                getSecondaryValueColor(result)
                                            )}>
                                                {formatValueWithUnit(
                                                    getDisplayValue(result.value, result.key),
                                                    result.unit,
                                                    result.isCurrency
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
