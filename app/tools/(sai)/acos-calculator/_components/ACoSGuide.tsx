"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BarChart, Percent, DollarSign } from "lucide-react"

export function ACoSGuide() {
    return (
        <ToolGuide
            title="Understanding Advertising Cost of Sales (ACoS)"
            icon={BarChart}
            items={[
                {
                    title: "What is ACoS?",
                    description: "Advertising Cost of Sales (ACoS) measures ad efficiency. It shows the percentage of revenue spent on ads.",
                    icon: Percent,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Ad Spend ÷ Ad Revenue",
                    stat: "15-25%",
                    statColor: "text-emerald-500",
                    statLabel: "Healthy Range"
                },
                {
                    title: "The Formula",
                    description: "(Total Ad Spend ÷ Total Ad Revenue) × 100. Lower is generally better.",
                    icon: DollarSign,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Ratio %",
                    statColor: "text-blue-500",
                    statLabel: "Spend vs Sales"
                },
                {
                    title: "Good vs. Bad ACoS",
                    description: "A 'good' ACoS depends on your profit margin. To be profitable, your ACoS must be lower than your product margin.",
                    icon: BarChart,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "< Margin",
                    statColor: "text-amber-500",
                    statLabel: "Profitable Zone"
                }
            ]}
        />
    )
}
