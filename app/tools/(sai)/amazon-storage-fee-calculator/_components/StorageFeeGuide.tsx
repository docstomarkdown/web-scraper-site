"use client"

import { ToolGuide } from "@/app/tools/_shared/components"
import { Box, Calendar, AlertTriangle, TrendingUp } from "lucide-react"

export function StorageFeeGuide() {
    return (
        <ToolGuide
            title="Understanding FBA Storage Fees"
            items={[
                {
                    title: "How it's Calculated",
                    icon: Box,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Volume",
                    statColor: "text-blue-600",
                    statLabel: "Cubic Feet",
                    tooltip: "Fee = Avg Daily Volume * Rate.",
                    description: "Amazon charges monthly inventory storage fees based on the daily average volume (measured in cubic feet) for the space your inventory occupies in fulfillment centers."
                },
                {
                    title: "Seasonality Matters",
                    icon: Calendar,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Q4",
                    statColor: "text-amber-600",
                    statLabel: "Peak Prices",
                    tooltip: "Prices jump in Oct-Dec.",
                    description: "From January to September, rates are standard. However, during the holiday season (October–December), storage fees increase dramatically—sometimes by more than 200%—to account for high demand."
                },
                {
                    title: "Oversize vs Standard",
                    icon: AlertTriangle,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Size",
                    statColor: "text-purple-600",
                    statLabel: "Tier Classification",
                    tooltip: "Different rates for Oversize items.",
                    description: "Oversize items actually have a *lower* cost per cubic foot than standard items, but because they are so large, the total fee per unit is often much higher."
                },
                {
                    title: "Long-Term Fees",
                    icon: TrendingUp,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    stat: "Aged",
                    statColor: "text-red-600",
                    statLabel: "Extra Surcharges",
                    tooltip: "Items stored > 180 days incur surcharges.",
                    description: "This calculator covers standard monthly fees. If your inventory sits for more than 180 days, Amazon applies additional 'Aged Inventory Surcharges' (formerly Long-Term Storage Fees)."
                }
            ]}
        />
    )
}
