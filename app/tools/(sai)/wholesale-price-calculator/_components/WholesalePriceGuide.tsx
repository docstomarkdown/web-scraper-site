"use client"

import { BookOpen, Tag, Percent, TrendingUp, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolSectionHeader } from "@/app/tools/_shared/components"

const insights = [
    {
        icon: Tag,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Wholesale Price",
        stat: "Price",
        statLabel: "The selling price",
        description: "The price at which you sell your goods in bulk to retailers or distributors. It must cover your costs and desired profit margin while remaining competitive for retailers to mark up.",
        tooltip: "The price retailers pay you."
    },
    {
        icon: Percent,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Profit Margin",
        stat: "Margin",
        statLabel: "% of price that is profit",
        description: "The percentage of the selling price that is pure profit. Unlike markup (which is based on cost), margin is based on the final price. A 50% margin means half of the revenue is profit.",
        tooltip: "Profit divided by Price."
    },
    {
        icon: TrendingUp,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "Markup",
        stat: "Markup",
        statLabel: "% added to cost",
        description: "The percentage added to the cost price to determine the selling price. A 100% markup (doubling the cost) results in a 50% profit margin.",
        tooltip: "Profit divided by Cost."
    },
    {
        icon: Info,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        statColor: "text-violet-600",
        title: "Effective Cost",
        stat: "Cost",
        statLabel: "Total base cost per unit",
        description: "The comprehensive cost base for calculation, including the original Cost of Goods plus any applicable taxes, duties, or inbound shipping fees derived from the Tax/Duty Rate input.",
        tooltip: "COGS + Taxes/Duties."
    }
]

export function WholesalePriceGuide() {
    return (
        <section id="wholesale-guide">

            <ToolSectionHeader icon={BookOpen} title="Understanding Wholesale Pricing" />

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
                                        Takeaway
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
