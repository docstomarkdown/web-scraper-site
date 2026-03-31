"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Anchor, ShieldAlert, ArrowRightLeft, HandCoins } from "lucide-react"

export function FBARemovalGuide() {
    return (
        <ToolGuide
            title="Understanding FBA Inventory Options"
            icon={ArrowRightLeft}
            items={[
                {
                    title: "Removal vs. Disposal Options",
                    description: "A removal order returns inventory back to you, which incurs shipping but enables you to resell locally or on another channel. Disposal means Amazon destroys or donates the item. Choose removal only if the resale value covers the removal fees + extra prep costs.",
                    icon: ShieldAlert,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "Strategy",
                    statLabel: "Compare Net Value",
                    tooltip: "Ensure profit after removal fee justifies keeping the physical items."
                },
                {
                    title: "When to 'Hold' Inventory",
                    description: "If both removing and disposing generate a strict net loss, and long-term storage fees aren't punishing your margins yet, it may be better to Hold the inventory. During this period, consider running promotions, adjusting your PPC bids, or dropping the price slightly to increase sell-through rate.",
                    icon: Anchor,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "Patience",
                    statLabel: "Wait and Optimise",
                    tooltip: "A temporary hold might allow time for better market conditions."
                },
                {
                    title: "Selling on Other Channels",
                    description: "Expected selling price is key when you opt to Remove. Many sellers use multi-channel fulfillment, eBay, or their own Shopify store to offload removed items. Factoring in 'Other Costs' like shipping and prep helps predict the actual net profit correctly.",
                    icon: HandCoins,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "Sales",
                    statLabel: "Alternative Channels",
                    tooltip: "Include external operational costs to get a true representation of removal profit."
                }
            ]}
        />
    )
}
