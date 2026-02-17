"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BarChart, DollarSign, MousePointer } from "lucide-react"

export function PPCBidGuide() {
    return (
        <ToolGuide
            title="Understanding Pay-Per-Click (PPC) Bidding"
            icon={BarChart}
            items={[
                {
                    title: "What is a PPC Bid?",
                    description: "A Pay-Per-Click (PPC) bid is the maximum amount you are willing to pay for a click on your ad. Your bid determines where and how often your ad is shown.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Max CPC",
                    statColor: "text-blue-600",
                    statLabel: "Bid Control",
                    tooltip: "The ceiling for your ad spend per click."
                },
                {
                    title: "Optimal Bid Logic",
                    description: "The formula (Price × CR × Target ACoS) ensures your bids remain perfectly aligned with your business goals and conversion efficiency.",
                    icon: MousePointer,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Calculated",
                    statColor: "text-emerald-600",
                    statLabel: "Data Driven",
                    tooltip: "Math over guesswork."
                },
                {
                    title: "Strategic Impact",
                    description: "Winning the right bids at the right price balances visibility and profit. Higher bids increase traffic, but optimized bids increase ROAS.",
                    icon: BarChart,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "ROAS+",
                    statColor: "text-amber-600",
                    statLabel: "Profit Focus",
                }
            ]}
        />
    )
}
