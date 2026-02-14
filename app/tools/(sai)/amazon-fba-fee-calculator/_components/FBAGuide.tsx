"use client"

import { BookOpen, Box, Truck, Percent, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const insights = [
    {
        icon: Percent,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Amazon Referral Fee",
        stat: "15%",
        statLabel: "Typical Platform Fee",
        description: "A fee paid to Amazon for selling on their marketplace, typically 15% for most categories with a minimum of $0.30 per item.",
        tooltip: "Referral Fee: A percentage of the total sales price (usually 15%) paid to Amazon for the privilege of selling on their marketplace."
    },
    {
        icon: Box,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "FBA Fulfillment Fee",
        stat: "Size",
        statLabel: "Determined by Tier",
        description: "Covers the cost of picking, packing, shipping, and customer service. Fees are determined by your product's size tier and shipping weight—minimize packaging to lower costs.",
        tooltip: "Fulfillment Fee: The cost Amazon charges to pick, pack, and ship your order to the customer, plus handle customer service."
    },
    {
        icon: Truck,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        statColor: "text-emerald-600",
        title: "Inbound Shipping",
        stat: "Ship",
        statLabel: "Cost to Warehouse",
        description: "The cost of shipping your inventory to Amazon's warehouses. Prices depend on the carrier and distance.",
        tooltip: "Inbound Shipping: The cost you pay to ship your inventory from your supplier or home to Amazon's fulfillment centers."
    },
]

export function FBAGuide() {
    return (
        <section id="fba-guide">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Understanding Amazon FBA Fees</h2>
            </div>

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

                                {/* Right: Takeaway Stat Panel (Neutral Background) */}
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
