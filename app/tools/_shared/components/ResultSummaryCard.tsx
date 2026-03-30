"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, CheckCircle2, Circle, ArrowLeft, Percent, ClipboardList, ClipboardPenLine, TextCursorInput, MousePointerClick, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { currencies, formatCurrencyValue } from "./CurrencyCombobox"
interface SecondaryResult {
    key: string
    label: string
    value: string | number
    unit?: string
    tooltip?: string
    isCurrency?: boolean // New flag to handle currency formatting
    className?: string // Added to support custom grid layouts
    icon?: LucideIcon | React.ComponentType<any> // Icon to display instead of the dot
    badge?: string // Badge text to display inline (e.g. "$ 90.00/ft³")
}
export interface ChecklistItem {
    key?: string
    label: string
    isComplete: boolean
}
interface ResultSummaryCardProps {
    title?: string
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
    liveBadgeColor?: "emerald" | "amber" | "rose" | "blue" | "slate"
    isCalculated?: boolean
    profitLossKey?: string
    validationBadgeText?: { valid: string; invalid: string }
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
    children?: React.ReactNode
}
export function ResultSummaryCard({
    title,
    primaryResult,
    secondaryResults,
    currency,
    showLiveBadge = true,
    liveBadgeText = "Live",
    liveBadgeColor = "emerald",
    isCalculated = false,
    profitLossKey,
    validationBadgeText,
    description,
    emptyMessage,
    emptyResultLabel,
    dynamicMessages,
    className,
    checklistItems,
    variant = 'indicators',
    children
}: ResultSummaryCardProps) {
    const [showResults, setShowResults] = React.useState(isCalculated)
    
    // Dynamic Mandatory Fields Computation
    const [dynamicStats, setDynamicStats] = React.useState({ completed: 0, total: 0 });
    const [hasInteracted, setHasInteracted] = React.useState(false);

    React.useEffect(() => {
        if (typeof document === 'undefined') return;
        
        const updateStats = () => {
            const elements = Array.from(document.querySelectorAll('.calculator-input-row, button, .calculator-input-field'));
            
            let currentGroupOptional = false;
            let total = 0;
            let completed = 0;
            const seenInputs = new Set();

            elements.forEach(el => {
                if (el.classList.contains('calculator-input-row') && el.getAttribute('data-has-title') === 'true') {
                    currentGroupOptional = el.textContent?.toLowerCase().includes('optional') || false;
                }
                else if (el.tagName === 'BUTTON') {
                    const text = el.textContent?.toLowerCase() || '';
                    if (text.includes('optional')) {
                        currentGroupOptional = true;
                    } else if (text.includes('advanced') && !text.includes('optional')) {
                        currentGroupOptional = false;
                    }
                }
                else if (el.classList.contains('calculator-input-field') && !seenInputs.has(el)) {
                    seenInputs.add(el);
                    const input = el as HTMLInputElement;
                    const val = input.value.trim();
                    const row = input.closest('.calculator-input-row');
                    const labelText = row?.querySelector('label')?.parentElement?.textContent?.toLowerCase() || '';
                    const isSelfOptional = labelText.includes('optional') || input.dataset.ignoreChecklist === 'true';
                    
                    const isMandatory = !currentGroupOptional && !isSelfOptional;

                    if (isMandatory) {
                        total++;
                        if (val !== "") {
                            completed++;
                        }
                    }
                }
            });

            setDynamicStats(prev => (prev.completed === completed && prev.total === total) ? prev : { completed, total });
        };

        updateStats();

        const handleInput = (e: Event) => {
            if ((e.target as HTMLElement).classList.contains('calculator-input-field')) {
                setHasInteracted(true);
                setTimeout(updateStats, 10);
            }
        };
        
        const handleClick = (e: Event) => {
            const btn = (e.target as HTMLElement).closest('button');
            if (btn && btn.textContent?.toLowerCase().includes('reset')) {
                setHasInteracted(false);
            }
            setTimeout(updateStats, 50); 
            setTimeout(updateStats, 200);
        };

        document.addEventListener('input', handleInput);
        document.addEventListener('click', handleClick);
        const interval = setInterval(updateStats, 1000);

        return () => {
            document.removeEventListener('input', handleInput);
            document.removeEventListener('click', handleClick);
            clearInterval(interval);
        };
    }, []);

    let completedCount = dynamicStats.completed;
    let totalCount = dynamicStats.total;

    // Fallback
    if (totalCount === 0 && checklistItems) {
        totalCount = checklistItems.length;
        completedCount = checklistItems.filter(i => i.isComplete).length;
    }

    if (!hasInteracted && completedCount < totalCount) {
        completedCount = 0;
    }

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
            return (
                <span className="flex items-baseline">
                    {formatCurrencyValue(numValue, currency, 2)}
                </span>
            )
        }
        const displayNum = isNaN(numValue) ? 0 : numValue
        if (!unit) return displayNum
        // Symbols that usually go at the front
        const frontSymbols = ['$', '€', '£', '¥', '₹', 'A$', 'C$', 'S$']
        const isFront = frontSymbols.some(s => unit.startsWith(s))
        if (isFront) {
            return (
                <span className="flex items-baseline">
                    <span className="mr-0.5">{unit}</span>
                    {value}
                </span>
            )
        }
        // Default: Unit goes at the back (%, cm, m, kg, etc.)
        return (
            <span className="flex items-baseline">
                {value}
                <span className="ml-1 font-medium text-[0.6em]">{unit}</span>
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
        return "text-slate-700"
    }
    const badge = (() => {
        if (profitLossKey) {
            if (numericProfitLoss > 0) {
                return {
                    text: validationBadgeText?.valid || "Profit",
                    bg: "bg-emerald-100/80",
                    dot: "bg-emerald-500",
                    textCol: "text-emerald-700 font-bold"
                }
            }
            if (numericProfitLoss < 0) {
                return {
                    text: validationBadgeText?.invalid || "Loss",
                    bg: "bg-red-100/80",
                    dot: "bg-red-500",
                    textCol: "text-red-700 font-bold"
                }
            }
        }
        const colors = {
            emerald: { bg: "bg-emerald-100/50", dot: "bg-emerald-500", textCol: "text-emerald-700" },
            amber: { bg: "bg-amber-100/50 border-amber-200", dot: "bg-amber-500", textCol: "text-amber-700 font-semibold" },
            rose: { bg: "bg-rose-100/50 border-rose-200", dot: "bg-rose-500", textCol: "text-rose-700 font-semibold" },
            blue: { bg: "bg-blue-100/50 border-blue-200", dot: "bg-blue-500", textCol: "text-blue-700 font-semibold" },
            slate: { bg: "bg-slate-100/50 border-slate-200", dot: "bg-slate-500", textCol: "text-slate-700 font-semibold" },
        }
        return {
            text: liveBadgeText || "Live",
            ...colors[liveBadgeColor]
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
    const displayLabelComponent = primaryResult.label || title
    const displayLabel = displayLabelComponent ? autoAdjustText(displayLabelComponent) : undefined
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

    const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
    const emptyLabel = emptyMessage ?? (emptyResultLabel || primaryResult.label || title || "Result")

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Card className={cn(
                "relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl",
                "bg-[#F5F8FD]",
                className
            )}>
                {/* ── Static Header ── */}
                <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                            <ClipboardList className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
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
                                    {badge.text}
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        /* ═══════════ EMPTY STATE ═══════════ */
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
                                        className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-fit max-w-[320px] pointer-events-auto"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <span className="absolute w-11 h-11 rounded-xl bg-blue-400/15 animate-ping" style={{ animationDuration: "2.8s" }} />
                                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-500 shadow-sm">
                                                <ClipboardPenLine className="w-[18px] h-[18px]" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-1.5">
                                            <div className="flex items-center gap-3 text-blue-500/70">
                                                <svg className="w-5 h-3 shrink-0" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 19l-7-7 7-7" />
                                                    <path d="M2 12h36" />
                                                </svg>
                                                <p className="text-[12.5px] text-slate-500 font-semibold leading-snug whitespace-nowrap z-10">
                                                    Fill in the inputs to see your
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/80 text-[11.5px] font-extrabold text-blue-600/90 tracking-wide shadow-sm shadow-blue-100/50">
                                                {emptyLabel}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* ─── Ghosted Skeleton Dashboard ─── */}
                                <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                    <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                        <div className="h-2.5 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                        <div className="h-12 w-40 rounded-xl bg-slate-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                        <div className="flex flex-col items-center gap-1.5 mt-1">
                                            <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                            <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {secondaryResults.map((result, idx) => (
                                            <div
                                                key={`skeleton-${result.key}`}
                                                className="bg-white border border-slate-100 p-4 rounded-xl"
                                            >
                                                <div className="h-2 w-16 rounded-full bg-slate-200/60 mb-3 animate-pulse" style={{ animationDelay: `${0.1 + idx * 0.08}s` }} />
                                                <div className="h-4 w-24 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: `${0.15 + idx * 0.08}s` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ═══════════ RESULTS STATE ═══════════ */
                        <motion.div
                            key="results-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55, ease: "easeInOut" }}
                            className="flex flex-col gap-3 px-5 pb-5 pt-2"
                        >
                            {/* ── Primary Hero (transparent, no border box) ── */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                className="relative flex flex-col items-center text-center py-6 px-4 bg-transparent"
                            >
                                {displayLabel && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 3 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.12 }}
                                        className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.18em] leading-none mb-2"
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
                                    <span className="text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none">
                                        {formatValueWithUnit(displayValue, primaryResult.unit, primaryResult.isCurrency)}
                                    </span>
                                </motion.div>

                                {displayDescription && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.22 }}
                                        className="text-[11.5px] text-slate-500 font-medium mt-2 max-w-[280px] mx-auto leading-relaxed"
                                    >
                                        {displayDescription}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* ── Secondary Result Cards (full-width stacked) ── */}
                            {secondaryResults.length > 0 && secondaryResults.map((result, idx) => {
                                const isCurrencyCard = result.isCurrency && currency
                                const hasBadge = !!result.badge
                                const valueColor = getSecondaryValueColor(result)
                                const IconComponent = result.icon
                                return (
                                    <motion.div
                                        key={result.key}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: 0.1 + idx * 0.05 }}
                                        className={cn(
                                            "bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200",
                                            "hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300",
                                            result.className
                                        )}
                                    >
                                        {/* Header: icon + label + badge + tooltip */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {IconComponent ? (
                                                    <IconComponent className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                ) : (
                                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-300" />
                                                )}
                                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">
                                                    {autoAdjustText(result.label)}
                                                </span>
                                                {result.tooltip && (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-300 hover:text-blue-500 transition-colors cursor-help shrink-0">
                                                                <Info className="w-3 h-3" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent sideOffset={6} className="bg-slate-900 border-slate-800 text-white text-xs max-w-xs p-3 shadow-xl rounded-xl font-medium z-[110]">
                                                            {result.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </div>
                                            {result.badge && (
                                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100/80 text-blue-700">
                                                    {result.badge}
                                                </span>
                                            )}
                                        </div>
                                        {/* Value */}
                                        <div className={cn(IconComponent ? "pl-6" : "pl-3.5", hasBadge && "pt-0.5")}>
                                            <span className={cn(
                                                "font-bold tracking-tight block text-[16px] sm:text-[17px]",
                                                isCurrencyCard
                                                    ? "text-slate-700"
                                                    : valueColor
                                            )}>
                                                {formatValueWithUnit(
                                                    getDisplayValue(result.value, result.key),
                                                    result.unit,
                                                    result.isCurrency
                                                )}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
