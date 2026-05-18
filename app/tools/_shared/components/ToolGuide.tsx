"use client"
import { BookOpen, LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { cn } from "@/lib/utils"

const accentBarMap: Record<string, string> = {
    blue: "from-blue-400 to-blue-200",
    indigo: "from-indigo-400 to-indigo-200",
    purple: "from-purple-400 to-purple-200",
    violet: "from-violet-400 to-violet-200",
    emerald: "from-emerald-400 to-emerald-200",
    green: "from-green-400 to-green-200",
    amber: "from-amber-400 to-amber-200",
    orange: "from-orange-400 to-orange-200",
    red: "from-red-400 to-red-200",
    rose: "from-rose-400 to-rose-200",
    cyan: "from-cyan-400 to-cyan-200",
    slate: "from-slate-400 to-slate-200",
}

function getAccentGradient(iconBg: string): string {
    const match = iconBg.match(/bg-(\w+)-/)
    const color = match?.[1] || "blue"
    return accentBarMap[color] || accentBarMap.blue
}

export interface GuideItem {
    title: string
    description: string | ReactNode
    icon: LucideIcon
    iconBg: string
    iconColor: string
    stat?: string
    statColor?: string
    statLabel?: string
    tooltip?: string
}
interface ToolGuideProps {
    title: string
    icon?: LucideIcon
    items: GuideItem[]
}
export function ToolGuide({ title, icon = BookOpen, items }: ToolGuideProps) {
    return (
        <section id="tool-guide" className="space-y-6">
            <ToolSectionHeader icon={icon} title={title} />
            <div className="space-y-4">
                {items.map((item, index) => {
                    const Icon = item.icon
                    const accentGradient = getAccentGradient(item.iconBg)
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
                        >
                            {/* Accent bar on hover — color matches item icon */}
                            <div className={`h-[3px] bg-gradient-to-r ${accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            <div className="px-6 sm:px-8 py-5 sm:py-6">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                {/* Icon */}
                                <div className={cn(
                                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                                    item.iconBg,
                                    item.iconColor
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[16px] font-bold text-slate-600 mb-1 leading-snug transition-colors">
                                        {item.title}
                                    </h3>
                                    <div
                                        className="text-[14.5px] text-slate-500 leading-relaxed font-medium [&_em]:not-italic [&_em]:font-semibold [&_em]:text-slate-500"
                                        dangerouslySetInnerHTML={{ __html: (item.description ?? '').replace(/<strong>(.*?)<\/strong>/gi, '$1') }}
                                    />
                                </div>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
