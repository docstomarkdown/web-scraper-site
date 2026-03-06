"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, CheckCircle2, Circle, ArrowLeft, Percent } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
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
    dynamicMessages,
    className,
    checklistItems,
    variant = 'indicators'
}: ResultSummaryCardProps) {
    const formatValueWithUnit = (value: string | number, unit?: string, isCurrency?: boolean) => {
        const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value
        if (isCurrency && currency && !isNaN(numValue)) {
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
                // Fallback without narrowSymbol
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
                    text: "PROFIT",
                    bg: "bg-emerald-100/80",
                    dot: "bg-emerald-500",
                    textCol: "text-emerald-700"
                }
            }
            if (numericProfitLoss < 0) {
                return {
                    text: "LOSS",
                    bg: "bg-red-100/80",
                    dot: "bg-red-500",
                    textCol: "text-red-700"
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
                "relative overflow-hidden border border-blue-200/60 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 shadow-sm p-6 rounded-2xl backdrop-blur-3xl",
                className
            )}>
                {/* Inner subtle border for glass effect */}
                <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none" />

                {/* Background Effects matching a premium aesthetic */}
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px] pointer-events-none opacity-[0.08]" />
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-indigo-400 rounded-full blur-[100px] pointer-events-none opacity-[0.05]" />

                {/* Header Section */}
                <div className="relative z-10 mb-6">
                    <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-[10px] sm:text-[11px] font-black text-blue-600/60 uppercase tracking-[0.2em] leading-none">
                                Summary Result
                            </span>
                            <h3 className="text-slate-700 font-bold text-[14px] sm:text-sm tracking-tight">
                                {displayTitle.split(/(\(.*?\))/g).map((part, i) => (
                                    part.startsWith('(') && part.endsWith(')') ? (
                                        <span key={i} className="normal-case font-bold tracking-tight ml-1">
                                            {part}
                                        </span>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                ))}
                            </h3>
                        </div>

                        {showLiveBadge && isCalculated && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={cn(
                                    "flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border border-slate-200/50 transition-all shadow-sm shrink-0 mt-0.5",
                                    badge.bg
                                )}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", badge.dot)}></span>
                                    <span className={cn("relative inline-flex rounded-full h-2 w-2", badge.dot)}></span>
                                </span>
                                <span className={cn("text-[8px] sm:text-[10px] font-black tracking-[0.15em] leading-none uppercase", badge.textCol)}>
                                    {badge.text}
                                </span>
                            </motion.div>
                        )}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!isCalculated ? (
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="mt-4 space-y-6 w-full"
                        >
                            {(checklistItems && checklistItems.length > 0) ? (
                                <>
                                    <div className="mb-6">
                                        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                                            {emptyMessage || "Enter the below mentioned fields to get the output."}
                                        </p>
                                    </div>

                                    <div className="space-y-4 pl-1">
                                        {checklistItems.map((item, idx) => {
                                            const key = item.key || `checklist-item-${idx}`;
                                            return (
                                                <motion.div
                                                    key={key}
                                                    layout
                                                    className={cn(
                                                        "flex flex-col gap-1.5 transition-all duration-500",
                                                        item.isComplete ? "opacity-20 translate-x-1" : "opacity-100"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {/* A subtle indicator bar instead of a clickable circle */}
                                                        <div className={cn(
                                                            "w-1 h-4 rounded-full transition-all duration-500",
                                                            item.isComplete ? "bg-emerald-400" : "bg-blue-400/30"
                                                        )} />
                                                        <span className={cn(
                                                            "text-[12px] font-semibold tracking-tight transition-all duration-500",
                                                            item.isComplete ? "text-slate-400" : "text-slate-600"
                                                        )}>
                                                            {item.label}
                                                        </span>
                                                    </div>

                                                    {/* Progress bar line that fills when complete */}
                                                    <div className="h-[1px] w-full bg-slate-200/50 relative overflow-hidden">
                                                        <motion.div
                                                            initial={false}
                                                            animate={{ x: item.isComplete ? "0%" : "-100%" }}
                                                            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center min-h-[220px] px-2 w-full relative z-10">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[100px] bg-blue-200/20 blur-[50px] rounded-full pointer-events-none" />
                                    <div className="relative group">
                                        <div className="relative bg-white/40 backdrop-blur-xl px-7 py-5 rounded-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 text-center transition-all duration-500 hover:bg-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
                                            <p className="text-[12px] font-medium leading-relaxed tracking-wide bg-gradient-to-br from-slate-600 to-slate-400 bg-clip-text text-transparent max-w-[280px] mx-auto">
                                                {emptyMessage || "Your results will appear here once you enter the required values."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                            {/* ─── Primary Result Value ─── */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                                className="space-y-1.5"
                            >
                                <div className="flex items-baseline gap-2 mt-1 flex-wrap min-w-0 relative">
                                    <div className="absolute -inset-4 bg-white/40 blur-2xl rounded-full z-0 block pointer-events-none"></div>
                                    <div className="relative z-10 text-2xl sm:text-4xl font-extrabold text-blue-600 tracking-tight leading-none overflow-visible">
                                        {formatValueWithUnit(displayValue, primaryResult.unit, primaryResult.isCurrency)}
                                    </div>
                                    {displayLabel && (
                                        <span className="relative z-10 text-xs sm:text-base text-slate-500 font-medium opacity-80 pb-0.5">
                                            {displayLabel}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    {displayDescription}
                                </p>
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
                                                <span className="text-[13px] font-bold text-slate-400 whitespace-nowrap group-hover:text-blue-600/60 transition-colors duration-300">
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
