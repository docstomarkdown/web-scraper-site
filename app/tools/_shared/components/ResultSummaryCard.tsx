"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
interface SecondaryResult {
    key: string
    label: string
    value: string | number
    unit?: string
    tooltip?: string
    isCurrency?: boolean // New flag to handle currency formatting
    className?: string // Added to support custom grid layouts
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
    className
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
        if (!isCalculated) return "text-slate-400"
        if (profitLossKey && result.key === profitLossKey) {
            if (numericProfitLoss > 0) return "text-emerald-600"
            if (numericProfitLoss < 0) return "text-red-600"
        }
        return "text-slate-400"
    }
    const badge = (() => {
        if (!isCalculated) {
            return {
                text: liveBadgeText || "AWAITING DATA",
                bg: "bg-emerald-100/50",
                dot: "bg-emerald-500",
                textCol: "text-emerald-700"
            }
        }
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
        if (!isCalculated) {
            return emptyMessage || "Enter your campaign details to see if you will make or lose money."
        }
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
        <Card className={cn(
            "relative overflow-hidden border-2 border-blue-200/80 bg-gradient-to-br from-blue-100/40 via-blue-50/20 to-indigo-100/40 shadow-[0_15px_50px_rgba(59,130,246,0.15)] p-6 rounded-2xl backdrop-blur-3xl",
            className
        )}>
            {/* Inner subtle border for glass effect */}
            <div className="absolute inset-0 border border-white/60 rounded-2xl pointer-events-none" />
            {/* Background Effects matching a premium aesthetic */}
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[100px] pointer-events-none opacity-[0.12]" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] pointer-events-none opacity-[0.1]" />
            {/* Header Section */}
            <div className="relative z-10 flex justify-between items-start gap-4 mb-6">
                <div className="flex-1 min-w-0 space-y-3">
                    <h3 className="text-slate-500 font-bold text-xs sm:text-sm uppercase tracking-normal break-words">
                        {displayTitle.split(/(\(.*?\))/g).map((part, i) => (
                            part.startsWith('(') && part.endsWith(')') ? (
                                <span key={i} className="normal-case font-bold tracking-normal ml-1 text-slate-500">
                                    {part}
                                </span>
                            ) : (
                                <span key={i}>{part}</span>
                            )
                        ))}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1 flex-wrap min-w-0 relative">
                        {/* Glow behind main text */}
                        <div className="absolute -inset-4 bg-white/40 blur-2xl rounded-full z-0 block pointer-events-none"></div>
                        <div className="relative z-10 text-2xl sm:text-5xl font-extrabold text-blue-600 tracking-tight leading-none overflow-visible">
                            {formatValueWithUnit(displayValue, primaryResult.unit, primaryResult.isCurrency)}
                        </div>
                        {displayLabel && (
                            <span className="relative z-10 text-xs sm:text-base text-slate-500 font-medium opacity-80 pb-0.5">
                                {displayLabel}
                            </span>
                        )}
                    </div>
                </div>
                {showLiveBadge && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border border-slate-200/50 transition-all shadow-sm shrink-0 self-start mt-0.5",
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
            {/* Divider Line - Soft gradient */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent mb-4" />
            {/* Grid Layout for secondary metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10 auto-rows-fr">
                {secondaryResults.map((result, idx) => {
                    const is3rdOf3 = secondaryResults.length === 3 && idx === 2;
                    return (
                        <motion.div
                            key={result.key}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={cn(
                                "group bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-3 sm:p-4 rounded-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_12px_30px_rgba(59,130,246,0.08)]",
                                is3rdOf3 ? "sm:col-span-2" : "",
                                result.className
                            )}
                        >
                            <div className="flex items-center gap-1.5 mb-2">
                                <span className="text-[14.5px] font-medium text-slate-500 whitespace-nowrap group-hover:text-blue-600 transition-colors duration-300">
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
                                "text-[19px] font-extrabold tracking-tight transition-colors duration-300",
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
        </Card>
    )
}
