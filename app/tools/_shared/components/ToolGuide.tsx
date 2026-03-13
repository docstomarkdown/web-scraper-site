"use client"
import { BookOpen, LucideIcon } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { cn } from "@/lib/utils"
export interface GuideItem {
    title: string
    description: string
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
                            className="bg-white rounded-2xl border border-slate-200/60 px-6 sm:px-8 py-5 sm:py-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
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
                                        dangerouslySetInnerHTML={{ __html: item.description.replace(/<strong>(.*?)<\/strong>/gi, '$1') }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
