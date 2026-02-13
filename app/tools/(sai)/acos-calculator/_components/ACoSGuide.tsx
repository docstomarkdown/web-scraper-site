"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BarChart, Percent, DollarSign } from "lucide-react"

export function ACoSGuide() {
    return (
        <ToolGuide
            title="Understanding ACoS"
            icon={BarChart}
            items={[
                {
                    title: "What is ACoS?",
                    description: "ACoS (Advertising Cost of Sales) measures the efficiency of your ad campaign. It shows how much you spend on ads for every dollar of revenue generated.",
                    icon: Percent,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Ad Spend ÷ Ad Revenue"
                },
                {
                    title: "The Formula",
                    description: "ACoS = (Total Ad Spend ÷ Total Ad Revenue) × 100. Lower is generally better.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                },
                {
                    title: "Good vs. Bad ACoS",
                    description: "A 'good' ACoS depends on your profit margin. If your profit margin is 30%, you generally want your ACoS to be below 30% to remain profitable.",
                    icon: BarChart,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                }
            ]}
        />
    )
}
