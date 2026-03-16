"use client"
import { BookOpen, ArrowUpRight, Percent, TrendingUp, Target, LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface GuideItem {
    title: string
    description: string
    icon: string // Changed to string (icon name)
    accent?: "blue" | "emerald" | "violet" | "amber" | "rose"
}

// Icon map to resolve icon names to components
const iconMap: Record<string, LucideIcon> = {
    Percent,
    TrendingUp,
    Target,
}

interface PremiumToolGuideProps {
    title: string
    items: GuideItem[]
}

const accentStyles: Record<string, { iconBg: string; iconText: string; hoverBorder: string; topLine: string }> = {
    blue: { iconBg: "bg-gradient-to-br from-blue-500 to-blue-600", iconText: "text-white", hoverBorder: "group-hover:border-blue-200/80", topLine: "from-blue-400 to-blue-200" },
    emerald: { iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600", iconText: "text-white", hoverBorder: "group-hover:border-emerald-200/80", topLine: "from-emerald-400 to-emerald-200" },
    violet: { iconBg: "bg-gradient-to-br from-violet-500 to-violet-600", iconText: "text-white", hoverBorder: "group-hover:border-violet-200/80", topLine: "from-violet-400 to-violet-200" },
    amber: { iconBg: "bg-gradient-to-br from-amber-500 to-amber-600", iconText: "text-white", hoverBorder: "group-hover:border-amber-200/80", topLine: "from-amber-400 to-amber-200" },
    rose: { iconBg: "bg-gradient-to-br from-rose-500 to-rose-600", iconText: "text-white", hoverBorder: "group-hover:border-rose-200/80", topLine: "from-rose-400 to-rose-200" },
}

export function PremiumToolGuide({ title, items }: PremiumToolGuideProps) {
    return (
        <section id="tool-guide">
            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-md" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h2 className="text-[24px] sm:text-[28px] font-bold text-slate-800 tracking-tight">{title}</h2>
                </div>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => {
                    const Icon = iconMap[item.icon] || Percent
                    const style = accentStyles[item.accent || "blue"] || accentStyles.blue
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                            className={cn(
                                "group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden",
                                "shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]",
                                "transition-all duration-300 hover:-translate-y-0.5",
                                style.hoverBorder
                            )}
                        >
                            {/* Top accent line */}
                            <div className={`h-[3px] bg-gradient-to-r ${style.topLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="px-6 sm:px-8 py-5 sm:py-6">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:-rotate-3",
                                            style.iconBg
                                        )}>
                                            <Icon className={cn("w-5 h-5", style.iconText)} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[16px] font-bold text-slate-700 leading-snug group-hover:text-slate-800 transition-colors mb-2">
                                            {item.title}
                                        </h3>
                                        <div
                                            className="text-[14px] text-slate-500 leading-relaxed font-medium [&_strong]:font-semibold [&_strong]:text-slate-600"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </div>

                                    {/* Hover arrow */}
                                    <div className="hidden sm:flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        <ArrowUpRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
