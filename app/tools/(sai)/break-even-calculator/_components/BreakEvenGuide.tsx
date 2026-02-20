"use client"

import { BookOpen, DollarSign, Scale, TrendingUp, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolSectionHeader } from "@/app/tools/_shared/components"

const insights = [
    {
        icon: DollarSign,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Fixed Costs",
        stat: "Overhead",
        statLabel: "Costs that don't change",
        description: "Expenses that remain constant regardless of your sales volume. Examples include rent, insurance, salaries, and software subscriptions.",
        tooltip: "Costs you pay even if you sell nothing."
    },
    {
        icon: Scale,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Variable Costs",
        stat: "Per Unit",
        statLabel: "Costs linked to sales",
        description: "Costs that increase with every unit you sell. This includes materials, shipping, packaging, and transaction fees.",
        tooltip: "Costs incurred only when a sale is made."
    },
    {
        icon: TrendingUp,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "Contribution Margin",
        stat: "Profit/Unit",
        statLabel: "Revenue after variable costs",
        description: "The amount of money left from each sale after covering variable costs. This amount 'contributes' to paying off your fixed costs.",
        tooltip: "Price - Variable Cost = Contribution Margin."
    },
    {
        icon: Info,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        statColor: "text-violet-600",
        title: "Break-Even Point",
        stat: "Zero Profit",
        statLabel: "Where you start making money",
        description: "The exact number of units you need to sell to cover all your costs (Fixed + Variable). Sales beyond this point generate pure profit.",
        tooltip: "Sales needed to reach $0 profit (no loss)."
    }
]

export function BreakEvenGuide() {
    return (
        <section id="break-even-guide">

            <ToolSectionHeader icon={BookOpen} title="Understanding Break-Even Analysis" />

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
