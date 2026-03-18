"use client"
import { BookOpen, CircleDollarSign, ShieldCheck, Ship, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolSectionHeader } from "@/app/tools/_shared/components"
const insights = [
    {
        icon: CircleDollarSign,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Product Cost",
        stat: "Base",
        statLabel: "Your starting unit price",
        description: "The ex-works (EXW) or FOB price from your supplier. This is the base cost before any shipping, duties, or additional fees are applied. Negotiating this price is your first lever for better margins.",
        tooltip: "The price you pay your supplier per unit, excluding any logistics costs."
    },
    {
        icon: ShieldCheck,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "Customs & Duties",
        stat: "Duty",
        statLabel: "Import tariff on goods",
        description: "Customs duties are taxes imposed by the destination country on imported goods. The rate depends on your product's HS (Harmonized System) code. Duties are typically calculated as a percentage of the product's declared value (CIF or FOB).",
        tooltip: "The tax percentage applied to your goods when they enter the destination country."
    },
    {
        icon: Ship,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Shipping & Insurance",
        stat: "Freight",
        statLabel: "Getting goods to your door",
        description: "International freight costs (sea, air, or express courier) plus cargo insurance. Shipping method dramatically affects your landed cost — sea freight is cheapest but slowest, while air freight is fast but expensive. Insurance protects against loss or damage in transit.",
        tooltip: "Total cost of transporting and insuring your shipment internationally."
    },
    {
        icon: Info,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        statColor: "text-violet-600",
        title: "Landed Cost Per Unit",
        stat: "Total",
        statLabel: "True cost to your warehouse",
        description: "The complete cost of getting one unit to your warehouse, including product cost, a proportional share of shipping, duties, insurance, and all other fees. This is the number you need for accurate pricing, margin calculations, and profitability analysis.",
        tooltip: "The all-in cost per unit — the real number to use when setting your selling price."
    }
]
export function LandedCostGuide() {
    return (
        <section id="landed-cost-guide">
            <ToolSectionHeader icon={BookOpen} title="Understanding Landed Cost" />
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
