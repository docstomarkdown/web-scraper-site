"use client"
import { LucideIcon, Lightbulb } from "lucide-react"
import { ToolSectionHeader } from "./ToolSectionHeader"
import { cn } from "@/lib/utils"

export interface InfoItem {
    title: string
    description: string
    icon: LucideIcon
    iconBg: string
    iconColor: string
}

interface ToolInfoProps {
    title: string
    subtitle?: string
    icon?: LucideIcon
    items: InfoItem[]
}

export function ToolInfo({ title, subtitle, icon = Lightbulb, items }: ToolInfoProps) {
    return (
        <section id="tool-info" className="space-y-6">
            <ToolSectionHeader icon={icon} title={title} subtitle={subtitle} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
                        >
                            <div className="px-6 py-5 sm:py-6">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={cn(
                                        "flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                                        item.iconBg,
                                        item.iconColor
                                    )}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[15px] font-bold text-slate-700 mb-1.5 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-[13.5px] text-slate-500 leading-relaxed font-medium">
                                            {item.description}
                                        </p>
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
