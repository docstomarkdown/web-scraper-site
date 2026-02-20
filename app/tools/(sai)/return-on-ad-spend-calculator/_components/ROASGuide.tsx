"use client"

import { BookOpen, TrendingUp, DollarSign, Percent, Info, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolSectionHeader } from "@/app/tools/_shared/components"

const insights = [
    {
        icon: DollarSign,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Ad Spend",
        stat: "Cost",
        statLabel: "Total budget used",
        description: "The total amount of money spent on your advertising campaign. This is your investment that you need to recover and exceed to be profitable.",
        tooltip: "Total cost of your ads."
    },
    {
        icon: TrendingUp,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Revenue",
        stat: "Sales",
        statLabel: "Total income generated",
        description: "The total revenue generated directly from your advertising efforts. This is the gross sales figure before any deductions.",
        tooltip: "Total sales from ads."
    },
    {
        icon: Percent,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "Return on Ad Spend (ROAS)",
        stat: "ROAS",
        statLabel: "Efficiency metric",
        description: "Calculated as Revenue / Ad Spend. A Return on Ad Spend (ROAS) of 4.0 means you earn $4 for every $1 spent. It measures the effectiveness of your advertising campaigns.",
        tooltip: "Revenue divided by Ad Spend."
    },
    {
        icon: Info,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        statColor: "text-violet-600",
        title: "Net Profit (Ads)",
        stat: "Profit",
        statLabel: "Revenue minus spend",
        description: "The actual profit generated from your ads after subtracting the ad spend. Note that this doesn't include product costs or other expenses.",
        tooltip: "Revenue - Ad Spend."
    }
]

export function ROASGuide() {
    return (
        <section id="roas-guide">

            <ToolSectionHeader icon={BookOpen} title="Understanding Return on Ad Spend (ROAS)" />

            <div className="space-y-6">
                {insights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Left: Content */}
                                <div className="flex-1 p-6 order-2 md:order-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-9 h-9 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center border border-slate-100/50`}>
                                            <Icon className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900">{insight.title}</h3>
                                            {'tooltip' in insight && (
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                            {insight.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {insight.description}
                                    </p>
                                </div>

                                {/* Right: Takeaway Stat Panel */}
                                <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                    <div className={`text-3xl font-bold ${insight.statColor} tracking-tight`}>{insight.stat}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-full">
                                        Metric
                                    </div>
                                    <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px]">
                                        {insight.statLabel}
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
