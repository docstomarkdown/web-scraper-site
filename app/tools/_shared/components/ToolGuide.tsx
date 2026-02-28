"use client"

import { BookOpen, LucideIcon, Info } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface GuideItem {
    title: string
    description: React.ReactNode
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
        <section id="tool-guide">
            <ToolSectionHeader icon={icon} title={title} />

            <div className="space-y-6">
                {items.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Left: Content */}
                                <div className="flex-1 p-5 sm:p-7 order-2 md:order-1">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className={cn(
                                            "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-110",
                                            item.iconBg,
                                            item.iconColor
                                        )}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <div className="text-[15px] text-slate-600 leading-relaxed font-medium opacity-90">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Takeaway Stat Panel (Optional) */}
                                {item.stat && (
                                    <div className="flex md:flex-col items-center justify-center gap-2 p-5 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2 text-center">
                                        <div className={`text-2xl font-extrabold ${item.statColor || "text-slate-900"} tracking-tight leading-tight text-center px-1`}>
                                            {item.stat}
                                        </div>
                                        <div className={cn(
                                            "text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full shadow-sm border",
                                            item.statColor ? `${item.statColor} bg-white border-current/20` : "text-blue-600 bg-blue-50 border-blue-100"
                                        )}>
                                            Takeaway
                                        </div>
                                        {item.statLabel && (
                                            <div className="text-xs font-semibold text-slate-500 leading-snug mt-1 max-w-[140px]">
                                                {item.statLabel}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
