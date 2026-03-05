"use client"
import { BookOpen, LucideIcon } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
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
        <section id="tool-guide" className="space-y-6">
            <ToolSectionHeader icon={icon} title={title} />
            <div className="space-y-4">
                {items.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
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
                                    <h3 className="text-[18px] font-bold text-slate-600 mb-1 leading-snug transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="text-[14.5px] text-slate-500 leading-relaxed font-medium">
                                        {item.description}
                                    </div>
                                </div>
                                {/* Stat / Takeaway Section */}
                                {item.stat && (
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center sm:min-w-[160px] pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 sm:border-l sm:border-slate-100/80 gap-2 sm:pl-6">
                                        <div className={cn(
                                            "text-3xl font-extrabold tracking-tight",
                                            item.statColor || "text-slate-900"
                                        )}>
                                            {item.stat}
                                        </div>
                                        {/* Takeaway Badge */}
                                        <div className="bg-blue-50/50 text-blue-400/80 px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-[0.12em] border border-blue-100/30">
                                            TAKEAWAY
                                        </div>
                                        {item.statLabel && (
                                            <div className="text-[13px] font-bold text-slate-500 text-center leading-snug mt-1 max-w-[140px]">
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
