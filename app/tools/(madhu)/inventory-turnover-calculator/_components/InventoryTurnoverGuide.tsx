"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Activity, AlertCircle, Calendar, Warehouse, BookOpen } from "lucide-react"
export function InventoryTurnoverGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Inventory Optimization"
            icon={BookOpen}
            items={[
                {
                    title: "The 90-Day Liquidity Wall",
                    description: "In e-commerce, stock that doesn't move within 90 days often requires aggressive discounting to recover capital, destroying margins.",
                    icon: Activity,
                    stat: "90 Days",
                    statLabel: "The Danger Zone",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600",
                    tooltip: "Any index over 90 DSI is usually considered inefficient for high-growth brands."
                },
                {
                    title: "Velocity vs. Availability",
                    description: "A turnover ratio above 12x looks efficient but often hides frequent stock-outs. Don't starve your growth for 'perfect' ratios.",
                    icon: AlertCircle,
                    stat: "4-8x",
                    statLabel: "Target Range",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "The Seasonal Distortion",
                    description: "Calculating annual turnover during peak season (Q4) gives a false positive. Always compare Q4 ratios against Q4 of the previous year.",
                    icon: Calendar,
                    stat: "Q4",
                    statLabel: "Skew Risk",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Storage Cost Multiplier",
                    description: "Low turnover metrics (under 4x) don't just trap cash—they actively consume it through long-term storage fees, especially with 3PLs.",
                    icon: Warehouse,
                    stat: "+15%",
                    statLabel: "Cost Increase",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600"
                }
            ]}
        />
    )
}
