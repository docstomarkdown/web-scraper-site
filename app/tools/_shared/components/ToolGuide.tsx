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
                                        <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center border border-slate-100/50`}>
                                            <Icon className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                                            {item.tooltip && (
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                            {item.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-600 leading-relaxed">
                                        {item.description}
                                    </div>
                                </div>

                                {/* Right: Takeaway Stat Panel (Optional) */}
                                {item.stat && (
                                    <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                        <div className={`text-3xl font-bold ${item.statColor || "text-slate-700"} tracking-tight`}>
                                            {item.stat}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-full">
                                            Takeaway
                                        </div>
                                        {item.statLabel && (
                                            <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px]">
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
