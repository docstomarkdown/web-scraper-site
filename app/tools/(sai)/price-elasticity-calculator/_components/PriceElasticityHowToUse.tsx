"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, BarChart3, TrendingUp } from "lucide-react"
export function PriceElasticityHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Old Data",
                    description: "Enter specific past original market listed prices alongside known rigid exact sales history.",
                    icon: DollarSign
                },
                {
                    title: "New Data",
                    description: "Input actively tested modern replacement pricing parameters paired with related sales count.",
                    icon: BarChart3
                },
                {
                    title: "Check Curve",
                    description: "Instantly measure exactly if demand is totally elastic and how rate changes manipulate growth.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}