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

        if (isCurrency && currency) {
            try {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
                    maximumFractionDigits: 2
                })
                const formatted = formatter.format(numValue)

                // If it's a currency, we use the formatter's output directly
                return (
                    <span className="flex items-baseline">
                        {formatted}
                    </span>
                )
            } catch (e) {
                // Fallback to old logic if formatting fails
            }
        }

        if (!unit) return value

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

        // Check primary result first
        if (primaryResult.key === profitLossKey) {
            return typeof primaryResult.value === 'string' ? parseFloat(primaryResult.value.replace(/[^0-9.-]+/g, "")) : primaryResult.value
        }

        // Then check secondary results
        const result = secondaryResults.find(r => r.key === profitLossKey)
        if (!result) return 0
        return typeof result.value === 'string' ? parseFloat(result.value.replace(/[^0-9.-]+/g, "")) : result.value
    }

    const numericProfitLoss = getNumericResult()
    const isLoss = numericProfitLoss < 0

    // Helper to flip Profit/Loss text automatically
    const autoAdjustText = (text: string) => {
        if (!isLoss) return text
        return text.replace(/Profit/g, "Loss").replace(/PROFIT/g, "LOSS").replace(/profit/g, "loss")
    }

    const getSecondaryValueColor = (result: SecondaryResult) => {
        if (!isCalculated) return "text-blue-400"

        if (profitLossKey && result.key === profitLossKey) {
            if (numericProfitLoss > 0) return "text-emerald-400"
            if (numericProfitLoss < 0) return "text-red-400"
        }

        return "text-blue-400"
    }

    const badge = (() => {
        if (!isCalculated) {
            return {
                text: liveBadgeText || "AWAITING DATA",
                bg: "bg-emerald-500/20",
                dot: "bg-emerald-400",
                textCol: "text-emerald-400"
            }
        }

        if (profitLossKey) {
            if (numericProfitLoss > 0) {
                return {
                    text: "PROFIT",
                    bg: "bg-emerald-500/20",
                    dot: "bg-emerald-400",
                    textCol: "text-emerald-400"
                }
            }
            if (numericProfitLoss < 0) {
                return {
                    text: "LOSS",
                    bg: "bg-red-500/20",
                    dot: "bg-red-400",
                    textCol: "text-red-400"
                }
            }
        }

        return {
            text: liveBadgeText || "LIVE",
            bg: "bg-emerald-500/20",
            dot: "bg-emerald-400",
            textCol: "text-emerald-400"
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
            "relative overflow-hidden border-0 bg-slate-700 shadow-xl p-6 rounded-2xl",
            className
        )}>
            {/* Background Effects matching Net Profit Calculator */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none opacity-10" />

            {/* Header Section */}
            <div className="relative z-10 flex justify-between items-start gap-4 mb-6">
                <div className="flex-1 min-w-0 space-y-3">
                    <h3 className="text-slate-300 font-bold text-xs sm:text-sm tracking-wider break-words">
                        {displayTitle.split(/(\(.*?\))/g).map((part, i) => (
                            part.startsWith('(') && part.endsWith(')') ? (
                                <span key={i} className="normal-case font-medium ml-1">
                                    {part}
                                </span>
                            ) : (
                                <span key={i} className="uppercase">{part}</span>
                            )
                        ))}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                        <div className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight leading-none truncate">
                            {formatValueWithUnit(displayValue, primaryResult.unit, primaryResult.isCurrency)}
                        </div>
                        {displayLabel && (
                            <span className="text-xs sm:text-base text-slate-300 font-semibold whitespace-nowrap opacity-40">
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
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg shrink-0 self-start mt-0.5",
                            badge.bg
                        )}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", badge.dot)}></span>
                            <span className={cn("relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px_rgba(255,255,255,0.4)]", badge.dot)}></span>
                        </span>
                        <span className={cn("text-[8px] sm:text-[10px] font-black tracking-[0.15em] leading-none uppercase", badge.textCol)}>
                            {badge.text}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Divider Line - Thin and subtle like image */}
            <div className="relative h-[1px] w-full bg-white/10 mb-4" />

            {/* Grid Layout for secondary metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10 auto-rows-fr">
                {secondaryResults.map((result, idx) => (
                    <motion.div
                        key={result.key}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/[0.06] border border-white/[0.05] p-3 sm:p-4 rounded-xl transition-all duration-200 flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-300 whitespace-nowrap">
                                {autoAdjustText(result.label)}
                            </span>
                            {result.tooltip && (
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="text-slate-400 hover:text-white transition-colors cursor-help shrink-0">
                                                <Info className="w-3.5 h-3.5" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-slate-900 border-slate-700 text-white text-xs max-w-[200px] p-3 shadow-2xl">
                                            {result.tooltip}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                        <div className={cn(
                            "text-base sm:text-lg font-extrabold tracking-tight transition-colors duration-300",
                            getSecondaryValueColor(result)
                        )}>
                            {formatValueWithUnit(
                                getDisplayValue(result.value, result.key),
                                result.unit,
                                result.isCurrency
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Card>
    )
}
