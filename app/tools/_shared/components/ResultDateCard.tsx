"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Activity, Calendar, Check } from "lucide-react"
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
    const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

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
            icon: customBadge.icon,
        }
        : {
            text: liveBadgeText || "LIVE",
            bg: "bg-emerald-100/50",
            textCol: "text-emerald-700",
            icon: undefined,
        }

    const displayLabel = primaryResult.label
    const emptyLabel = emptyMessage ?? (emptyResultLabel || primaryResult.label || title || "Result")

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Card
                className={cn(
                    "relative overflow-hidden border border-slate-200/60 bg-white shadow-sm rounded-2xl",
                    className
                )}
            >
                {/* ── Static Header (matches ResultSummaryCard) ── */}
                <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                            <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.18em] leading-none">
                            Results Panel
                        </span>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showResults ? (
                            totalCount > 0 && (
                                <motion.div
                                    key="progress"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-sm"
                                >
                                    <span className="text-[10px] font-black text-blue-600">{completedCount}/{totalCount}</span>
                                    <div className="w-16 h-1.5 bg-blue-100/80 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${progressPct}%` }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            )
                        ) : (
                            showLiveBadge && (
                                <motion.div
                                    key="live-badge"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10.5px] font-bold tracking-wide shrink-0",
                                        badge.bg, badge.textCol,
                                        "border-slate-200/50"
                                    )}
                                >
                                    {badge.icon ? badge.icon : <Check className="w-3.5 h-3.5" />}
                                    {badge.text}
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        /* ═══════════ EMPTY STATE (matches ResultSummaryCard) ═══════════ */
                        <motion.div
                            key="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative z-10 px-6 pb-6 pt-2"
                        >
                            {/* ─── Floating Glass Instruction Overlay ─── */}
                            <div className="relative">
                                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.55, ease: "easeOut" }}
                                        className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 max-w-[220px] pointer-events-auto"
                                    >
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
                                                {emptyLabel}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* ─── Ghosted Skeleton (mirrors results layout) ─── */}
                                <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                    {/* Primary Hero Skeleton */}
                                    <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                        <div className="h-2.5 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                        <div className="h-12 w-40 rounded-xl bg-slate-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                        <div className="flex flex-col items-center gap-1.5 mt-1">
                                            <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                            <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-slate-200/40 my-4" />

                                    {/* Date Section Skeleton */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-slate-200/50 animate-pulse" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-2 w-24 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                            <div className="h-4 w-40 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                        </div>
                                    </div>

                                    {/* Info Card Skeleton */}
                                    <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-2">
                                        <div className="h-2.5 w-28 rounded-full bg-slate-200/60 animate-pulse" />
                                        <div className="h-2 w-full rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                        <div className="h-2 w-4/5 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ═══════════ RESULTS STATE (matches ResultSummaryCard) ═══════════ */
                        <motion.div
                            key="results-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55, ease: "easeInOut" }}
                            className="flex flex-col"
                        >
                            {/* ── Primary Hero ── */}
                            <div className="px-5 pb-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                    className="relative flex flex-col items-center text-center py-6 px-4 rounded-2xl bg-slate-50/70 border border-slate-100/80"
                                >
                                    {displayLabel && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 3 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.12 }}
                                            className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.16em] leading-none mb-2"
                                        >
                                            {displayLabel}
                                        </motion.span>
                                    )}

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                                        className="flex items-baseline justify-center"
                                    >
                                        <span className="text-[2.75rem] sm:text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none">
                                            {formatValueWithUnit(primaryResult.value, primaryResult.unit, primaryResult.isCurrency)}
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* ── Date Section ── */}
                            <div className="px-5 pb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.12, ease: "easeOut" }}
                                    className="group bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-100/50 shrink-0">
                                            {dateSection.icon ?? <Calendar className="w-5 h-5 text-blue-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-[0.08em] leading-none mb-1.5 group-hover:text-slate-500 transition-colors">
                                                {dateSection.label}
                                            </p>
                                            <p className="text-[16px] font-extrabold text-slate-600 tracking-tight truncate">
                                                {isCalculated ? dateSection.value : (dateSection.emptyText ?? "Waiting for inputs…")}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* ── Info Card ── */}
                            <div className="px-5 pb-5">
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.17, ease: "easeOut" }}
                                    className="group bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                >
                                    {infoCard.title && (
                                        <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-[0.08em] leading-none mb-2 group-hover:text-slate-500 transition-colors">
                                            {infoCard.title}
                                        </p>
                                    )}
                                    <div className="text-sm font-medium text-slate-600 leading-relaxed">
                                        {infoCard.children}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
