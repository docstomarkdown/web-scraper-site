"use client"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface OverviewFact {
    icon: LucideIcon
    label: string
    detail: string
}

interface ToolOverviewProps {
    heading: string
    headingAccent?: string
    definition: string
    factsHeading?: string
    facts: OverviewFact[]
    accent?: "blue" | "indigo" | "violet"
}

const accentStyles = {
    blue: {
        headingAccent: "text-blue-600",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        sectionBg: "bg-gradient-to-br from-blue-50/80 via-slate-50/60 to-white",
        border: "border-blue-100/80",
        innerDivider: "divide-blue-100/50",
        columnDivider: "bg-blue-100/60",
    },
    indigo: {
        headingAccent: "text-indigo-600",
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-500",
        sectionBg: "bg-gradient-to-br from-indigo-50/80 via-slate-50/60 to-white",
        border: "border-indigo-100/80",
        innerDivider: "divide-indigo-100/50",
        columnDivider: "bg-indigo-100/60",
    },
    violet: {
        headingAccent: "text-violet-600",
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        sectionBg: "bg-gradient-to-br from-violet-50/80 via-slate-50/60 to-white",
        border: "border-violet-100/80",
        innerDivider: "divide-violet-100/50",
        columnDivider: "bg-violet-100/60",
    },
}

export function ToolOverview({
    heading, headingAccent, definition, facts, accent = "blue",
}: ToolOverviewProps) {
    const s = accentStyles[accent]

    const renderHeading = () => {
        if (!headingAccent) return <>{heading}</>
        const parts = heading.split(headingAccent)
        return (
            <>
                {parts[0]}
                <span className={s.headingAccent}>{headingAccent}</span>
                {parts[1] ?? ""}
            </>
        )
    }

    return (
        <section
            id="tool-overview"
            className={cn(
                "w-full rounded-2xl border",
                "px-8 py-10 sm:px-12 sm:py-12",
                s.sectionBg, s.border
            )}
        >
            <div className="flex flex-col sm:flex-row gap-0 items-stretch">

                {/* ── Left: heading + definition ── */}
                <div className="sm:w-[42%] flex-shrink-0 flex flex-col justify-center pr-0 sm:pr-10 pb-8 sm:pb-0">
                    <h2 className="text-[21px] sm:text-[23px] font-extrabold tracking-tight leading-snug text-slate-800 mb-3">
                        {renderHeading()}
                    </h2>
                    <p className="text-[13.5px] sm:text-[14px] text-slate-500 font-medium leading-relaxed">
                        {definition}
                    </p>
                </div>

                {/* ── Column divider (desktop only) ── */}
                {facts.length > 0 && (
                    <div className={cn("hidden sm:block w-px flex-shrink-0 self-stretch mx-2 rounded-full", s.columnDivider)} />
                )}

                {/* ── Right: stacked facts ── */}
                {facts.length > 0 && (
                    <div className={cn(
                        "flex-1 flex flex-col divide-y pl-0 sm:pl-10",
                        s.innerDivider
                    )}>
                        {facts.map((fact, idx) => {
                            const Icon = fact.icon
                            return (
                                <div
                                    key={idx}
                                    className="flex items-start gap-4 py-[14px] first:pt-0 last:pb-0 group"
                                >
                                    <div className={cn(
                                        "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5",
                                        "transition-transform duration-200 group-hover:-translate-y-0.5",
                                        s.iconBg, s.iconColor
                                    )}>
                                        <Icon className="w-[17px] h-[17px]" />
                                    </div>
                                    <div>
                                        <p className="text-[13.5px] font-bold text-slate-700 mb-0.5 leading-snug">
                                            {fact.label}
                                        </p>
                                        <p className="text-[12.5px] text-slate-500 font-medium leading-relaxed">
                                            {fact.detail}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}
