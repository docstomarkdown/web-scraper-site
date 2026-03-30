"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BookOpen, Truck, AlertTriangle, Lightbulb } from "lucide-react"
export function FBARemovalGuide() {
    return (
        <ToolGuide
            title="Understanding FBA Removal & Disposal Fees"
            icon={BookOpen}
            items={[
                {
                    title: "Removal vs. Disposal — Know the Difference",
                    description: "A removal order ships your inventory back to you or a 3rd-party address. A disposal order has Amazon destroy or donate the units. Both charge the same per-unit fee, so choose based on the resale value of your goods.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "Same Fee",
                    statLabel: "Removal & Disposal",
                    tooltip: "Amazon charges identical fees for both removal and disposal orders per unit."
                },
                {
                    title: "2025 Rate Card — What's New",
                    description: "Starting Feb 1, 2025, Amazon introduced more granular fee tiers for standard-size items and increased rates across all tiers to discourage long-term storage of slow-moving inventory. Standard items now have 4 weight brackets instead of 2.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "Feb 2025",
                    statLabel: "Rate Effective Date",
                    tooltip: "Always verify the current rate card on Amazon Seller Central before placing large removal orders."
                },
                {
                    title: "Consider FBA Liquidations Instead",
                    description: "Before paying removal fees, explore FBA Liquidations. Amazon will sell your unsold inventory to liquidators at 5–10% of the estimated sale price, returning that net recovery to you—potentially turning a cost into partial revenue.",
                    icon: Lightbulb,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "5–10%",
                    statLabel: "Recovery via Liquidation",
                    tooltip: "Liquidation recovery varies by product category and condition."
                }
            ]}
        />
    )
}
