"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BarChart2, DollarSign, MousePointerClick, TrendingUp } from "lucide-react"

export function PPCBidGuide() {
    return (
        <ToolGuide
            title="Understanding PPC Bid Strategy"
            icon={BarChart2}
            items={[
                {
                    title: "How PPC Bidding Works",
                    description: "Your PPC bid is the maximum amount you're willing to pay for a single click on your ad. It directly controls ad placement and spend velocity—bid too low and you lose impressions, bid too high and your margins shrink fast.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Max CPC",
                    statColor: "text-blue-600",
                    statLabel: "Your bid ceiling",
                    tooltip: "Controls cost per click and overall ad visibility."
                },
                {
                    title: "The Bid Formula",
                    description: "The optimal bid is Product Price × Conversion Rate × Target ACoS. If you don't have a specific target, using 75% of your profit margin provides a safe, conservative bidding baseline.",
                    icon: MousePointerClick,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Data-Driven",
                    statColor: "text-blue-600",
                    statLabel: "Math over guesswork",
                    tooltip: "Formula-based bidding eliminates arbitrary decisions."
                },
                {
                    title: "Profitability & Scale",
                    description: "Know your break-even point: Price × Conversion Rate × Profit Margin. Bidding above this ceiling will erode your profit and potentially lead to a loss on every sale generated from ads.",
                    icon: TrendingUp,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "ROAS+",
                    statColor: "text-amber-600",
                    statLabel: "Profit-first approach",
                }
            ]}
        />
    )
}