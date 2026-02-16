"use client"

import { BookOpen, LucideIcon, Info } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
                                <div className="flex-1 p-6 order-2 md:order-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-11 h-11 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center border border-slate-100/50 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.title}</h3>
                                            {item.tooltip && (
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                                                <Info className="h-4 w-4" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-sm bg-slate-900 text-white border-slate-800 p-3 rounded-xl shadow-xl">
                                                            {item.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-[15px] text-slate-600 leading-relaxed font-medium opacity-90">
                                        {item.description}
                                    </div>
                                </div>

                                {/* Right: Takeaway Stat Panel (Optional) */}
                                {item.stat && (
                                    <div className="flex md:flex-col items-center justify-center gap-2 p-5 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2 text-center">
                                        <div className={`text-2xl md:text-3xl font-extrabold ${item.statColor || "text-slate-900"} tracking-tight leading-tight text-center px-1`}>
                                            {item.stat}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 bg-white border border-slate-100 px-2.5 py-0.5 rounded-full shadow-sm">
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
