"use client"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

import { ReactNode } from "react"

export interface OverviewFact {
    stat: string
    label: string
    detail: string
}

interface ToolOverviewProps {
    heading: string
    headingAccent?: string
    definition: ReactNode
    facts: OverviewFact[]
    accent?: "blue" | "indigo" | "violet" | "rose" | "emerald" | "amber" | "red"
}

const accentStyles = {
    blue: {
        headingAccent: "text-blue-600",
        sectionBg: "bg-gradient-to-br from-blue-50/80 via-slate-50/60 to-white",
        border: "border-blue-100/80",
        columnDivider: "bg-blue-100/60",
        statColor: "text-blue-600",
        cardBorder: "border-blue-100/50",
        cardBg: "bg-white/70",
    },
    indigo: {
        headingAccent: "text-indigo-600",
        sectionBg: "bg-gradient-to-br from-indigo-50/80 via-slate-50/60 to-white",
        border: "border-indigo-100/80",
        columnDivider: "bg-indigo-100/60",
        statColor: "text-indigo-600",
        cardBorder: "border-indigo-100/50",
        cardBg: "bg-white/70",
    },
    violet: {
        headingAccent: "text-violet-600",
        sectionBg: "bg-gradient-to-br from-violet-50/80 via-slate-50/60 to-white",
        border: "border-violet-100/80",
        columnDivider: "bg-violet-100/60",
        statColor: "text-violet-600",
        cardBorder: "border-violet-100/50",
        cardBg: "bg-white/70",
    },
    rose: {
        headingAccent: "text-rose-600",
        sectionBg: "bg-gradient-to-br from-rose-50/80 via-slate-50/60 to-white",
        border: "border-rose-100/80",
        columnDivider: "bg-rose-100/60",
        statColor: "text-rose-600",
        cardBorder: "border-rose-100/50",
        cardBg: "bg-white/70",
    },
    red: {
        headingAccent: "text-red-600",
        sectionBg: "bg-gradient-to-br from-red-50/80 via-slate-50/60 to-white",
        border: "border-red-100/80",
        columnDivider: "bg-red-100/60",
        statColor: "text-red-600",
        cardBorder: "border-red-100/50",
        cardBg: "bg-white/70",
    },
    emerald: {
        headingAccent: "text-emerald-600",
        sectionBg: "bg-gradient-to-br from-emerald-50/80 via-slate-50/60 to-white",
        border: "border-emerald-100/80",
        columnDivider: "bg-emerald-100/60",
        statColor: "text-emerald-600",
        cardBorder: "border-emerald-100/50",
        cardBg: "bg-white/70",
    },
    amber: {
        headingAccent: "text-amber-600",
        sectionBg: "bg-gradient-to-br from-amber-50/80 via-slate-50/60 to-white",
        border: "border-amber-100/80",
        columnDivider: "bg-amber-100/60",
        statColor: "text-amber-600",
        cardBorder: "border-amber-100/50",
        cardBg: "bg-white/70",
    },
}

export function ToolOverview({
    heading,
    headingAccent,
    definition,
    facts,
    accent = "blue",
}: ToolOverviewProps) {
    const s = accentStyles[accent]

    const renderHeading = () => {
        if (!headingAccent) return <>{heading}</>
        const parts = heading.split(headingAccent)
        const trailing = parts[1] ?? ""
        return (
            <>
                {parts[0]}
                <span className={cn("relative inline-flex items-center", s.headingAccent)}>
                    <span className="relative z-10">{headingAccent}{trailing}</span>
                </span>
            </>
        )
    }

    return (
        <motion.section
            id="tool-overview"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "relative w-full rounded-2xl border overflow-hidden",
                "px-8 py-10 sm:px-12 sm:py-12",
                s.sectionBg,
                s.border,
            )}
        >
            <div className="flex flex-col lg:flex-row gap-0 items-stretch relative z-10">
                {/* ── Left: heading + definition ── */}
                <div className="lg:w-[42%] flex-shrink-0 flex flex-col justify-center pr-0 lg:pr-10 pb-8 lg:pb-0">
                    <h2 className="text-[21px] sm:text-[23px] font-extrabold tracking-tight leading-snug text-slate-800 mb-3">
                        {renderHeading()}
                    </h2>
                    <p className="text-[13.5px] sm:text-[14px] text-slate-500 font-medium leading-relaxed text-left hyphens-none">
                        {definition}
                    </p>
                </div>

                {/* ── Column divider (desktop only) ── */}
                {facts.length > 0 && (
                    <div className={cn("hidden lg:block w-px flex-shrink-0 self-stretch mx-3 rounded-full", s.columnDivider)} />
                )}

                {/* ── Right: fact cards ── */}
                {facts.length > 0 && (
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 pl-0 lg:pl-8">
                        {facts.map((fact, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.35, delay: idx * 0.08 }}
                                className={cn(
                                    "rounded-xl border px-4 py-3.5",
                                    "transition-all duration-200",
                                    s.cardBg,
                                    s.cardBorder,
                                )}
                            >
                                <div className="flex items-baseline gap-2.5 mb-1">
                                    <span className={cn("text-[18px] font-extrabold leading-none tracking-tight", s.statColor)}>
                                        {fact.stat}
                                    </span>
                                    <span className="text-[13px] font-bold text-slate-600 leading-snug">
                                        {fact.label}
                                    </span>
                                </div>
                                <p className="text-[12.5px] text-slate-500 font-medium leading-relaxed">
                                    {fact.detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    )
}
