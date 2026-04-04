"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertTriangle, TrendingDown, RefreshCw, Lightbulb } from "lucide-react"

export function EOQGuide() {
    return (
        <ToolGuide
            title="What Most Inventory Buyers Get Wrong"
            icon={Lightbulb}
            items={[
                {
                    title: "Demand Changes — Recalculate Seasonally",
                    description: "EOQ assumes steady annual demand, but your best-sellers spike during peak season. Recalculate with your Q4 or holiday demand separately to avoid stockouts right when sales are highest.",
                    icon: RefreshCw,
                    stat: "Recalculate",
                    statLabel: "Seasonally",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Run EOQ with seasonal demand figures, not just annual averages."
                },
                {
                    title: "Holding Cost is Often Underestimated",
                    description: "Most buyers only count warehouse rent. But holding cost also includes insurance, product depreciation, the risk of it going unsold, and the cash tied up that could be invested elsewhere. The true rate is typically 20–30% of unit value per year.",
                    icon: TrendingDown,
                    stat: "20–30%",
                    statLabel: "True Hold Rate",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Underestimating holding cost skews your EOQ and inflates order sizes."
                },
                {
                    title: "EOQ is a Floor, Not a Ceiling",
                    description: "The EOQ result is the minimum-cost quantity — not a hard rule. If your supplier has a better price at a slightly larger MOQ, use this tool to compare the two costs. The difference is often smaller than the discount gained.",
                    icon: AlertTriangle,
                    stat: "Compare",
                    statLabel: "With MOQ Deals",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "Supplier discounts at higher quantities can beat your calculated EOQ."
                }
            ]}
        />
    )
}