"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Activity, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import type { ChecklistItem } from "./ResultSummaryCard"

interface ResultDateCardProps {
    title: string
    primaryResult: {
        value: string | number
        unit?: string
        label?: string
        isCurrency?: boolean
        key?: string
    }
    /** The date section displayed below the divider */
    dateSection: {
        /** Icon element rendered in the icon box (defaults to Calendar) */
        icon?: React.ReactNode
        label: string
        /** The main date/value string. Use emptyText when not yet calculated. */
        value: string
        /** Placeholder shown when isCalculated is false */
        emptyText?: string
    }
    /** A card rendered below the date section */
    infoCard: {
        title: string
        /** Arbitrary React content for the body of the info card */
        children: React.ReactNode
    }
    currency?: string
    showLiveBadge?: boolean
    liveBadgeText?: string
    isCalculated?: boolean
    emptyMessage?: string
    emptyResultLabel?: string
    className?: string
    checklistItems?: ChecklistItem[]
    /** Custom configuration to override the "LIVE" badge in the top right */
    customBadge?: {
        text: string
        icon?: React.ReactNode
        bgClass?: string
        textClass?: string
        borderClass?: string
    }
}

export function ResultDateCard({
    title,
    primaryResult,
    dateSection,
    infoCard,
    currency,
    showLiveBadge = true,
    liveBadgeText = "LIVE",
    isCalculated = false,
    emptyMessage,
    emptyResultLabel,
    className,
    checklistItems,
    customBadge,
}: ResultDateCardProps) {
    const [showResults, setShowResults] = React.useState(isCalculated)

    const completedCount = checklistItems ? checklistItems.filter(i => i.isComplete).length : 0
    const totalCount = checklistItems ? checklistItems.length : 0

    React.useEffect(() => {
        if (isCalculated) {
            const timer = setTimeout(() => {
                setShowResults(true)
            }, 350)
            return () => clearTimeout(timer)
        } else {
            setShowResults(false)
        }
    }, [isCalculated])

    const formatValueWithUnit = (value: string | number, unit?: string, isCurrency?: boolean) => {
        const numValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value
        if (isCurrency && currency && !isNaN(numValue)) {
            try {
                const formatter = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                    currencyDisplay: "narrowSymbol",
                    maximumFractionDigits: 2,
                })
                return <span className="flex items-baseline">{formatter.format(numValue)}</span>
            } catch {
                try {
                    const formatter = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: currency,
                        maximumFractionDigits: 2,
                    })
                    return <span className="flex items-baseline">{formatter.format(numValue)}</span>
                } catch {
                    // silent fallback
                }
            }
        }
        const displayNum = isNaN(numValue) ? 0 : numValue
        if (!unit) return displayNum
        const frontSymbols = ["$", "€", "£", "¥", "₹", "A$", "C$", "S$"]
        const isFront = frontSymbols.some(s => unit.startsWith(s))
        if (isFront) {
            return (
                <span className="flex items-baseline">
                    <span className="mr-0.5 opacity-90">{unit}</span>
                    {value}
                </span>
            )
        }
        return (
            <span className="flex items-baseline">
                {value}
                <span className="ml-1 opacity-70 font-medium text-[0.6em]">{unit}</span>
            </span>
        )
    }

    const badge = customBadge
        ? {
            text: customBadge.text,
            bg: customBadge.bgClass || "bg-emerald-100/50",
            textCol: customBadge.textClass || "text-emerald-700",
            border: customBadge.borderClass || "border-slate-200/50",
            icon: customBadge.icon,
            dot: undefined,
        }
        : {
            text: liveBadgeText || "LIVE",
            bg: "bg-emerald-100/50",
            dot: "bg-emerald-500",
            textCol: "text-emerald-700",
            border: "border-slate-200/50",
            icon: undefined,
        }

    const displayLabel = primaryResult.label

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Card
                className={cn(
                    "relative overflow-hidden border border-blue-200/60 bg-gradient-to-br from-blue-50 to-blue-100/40 shadow-sm p-6 rounded-2xl backdrop-blur-3xl",
                    className
                )}
            >
                {/* Inner subtle border for glass effect */}
                <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none" />

                {/* Background Effects */}
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
                                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border transition-all shadow-sm shrink-0 mt-0.5",
                                        badge.bg,
                                        badge.border
                                    )}
                                >
                                    {badge.icon ? (
                                        badge.icon
                                    ) : badge.dot ? (
                                        <span className="relative flex h-2 w-2">
                                            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", badge.dot)} />
                                            <span className={cn("relative inline-flex rounded-full h-2 w-2", badge.dot)} />
                                        </span>
                                    ) : null}
                                    <span className={cn("text-[10px] sm:text-[11px] font-bold tracking-wide leading-none", badge.textCol)}>
                                        {badge.text}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        /* ─── Empty / Loading State ─── */
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            {/* Floating Glass Instruction Overlay */}
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

                            {/* Ghosted Skeleton (mirrors results layout) */}
                            <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                {/* Primary Hero Skeleton */}
                                <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                    <div className="h-2.5 w-24 rounded-full bg-blue-200/60 mb-3 animate-pulse" />
                                    <div className="h-12 w-40 rounded-xl bg-blue-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                    <div className="flex flex-col items-center gap-1.5 mt-1">
                                        <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                        <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200/40 to-transparent my-4" />

                                {/* Date Section Skeleton */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-200/50 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-24 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                        <div className="h-4 w-40 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                    </div>
                                </div>

                                {/* Info Card Skeleton */}
                                <div className="bg-white/50 border border-white/40 p-4 rounded-xl space-y-2">
                                    <div className="h-2.5 w-28 rounded-full bg-slate-200/60 animate-pulse" />
                                    <div className="h-2 w-full rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                    <div className="h-2 w-4/5 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ─── Results State ─── */
                        <motion.div
                            key="results-state"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col relative z-10"
                        >
                            {/* Primary Hero */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex flex-col items-center justify-center py-5 px-4 mb-2"
                            >
                                {/* Aura Spotlight */}
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
                                            {formatValueWithUnit(primaryResult.value, primaryResult.unit, primaryResult.isCurrency)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Divider */}
                            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent my-4" />

                            {/* ─── Date Section ─── */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
                                className="flex items-center gap-3 mb-5"
                            >
                                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-200/50 shrink-0">
                                    {dateSection.icon ?? <Calendar className="w-5 h-5 text-blue-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                                        {dateSection.label}
                                    </p>
                                    <p className="text-base font-bold text-slate-600 truncate">
                                        {isCalculated ? dateSection.value : (dateSection.emptyText ?? "Waiting for inputs…")}
                                    </p>
                                </div>
                            </motion.div>

                            {/* ─── Info Card ─── */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.23, ease: "easeOut" }}
                                className="group bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_12px_30px_rgba(59,130,246,0.08)]"
                            >
                                <p className="text-[13px] font-bold text-slate-500 mb-1.5 group-hover:text-blue-600/60 transition-colors duration-300">
                                    {infoCard.title}
                                </p>
                                <div className="text-sm font-medium text-slate-600 leading-relaxed">
                                    {infoCard.children}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
