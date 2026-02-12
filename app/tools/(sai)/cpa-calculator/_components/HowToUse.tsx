"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { MousePointerClick, Calculator, TrendingUp } from "lucide-react"

export function HowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Select Calculation Mode",
                    description: "Choose <strong>Campaign Data</strong> if you have realized results (Spend & Conversions), or <strong>Estimation</strong> to plan based on CPC and Conversion Rate.",
                    icon: MousePointerClick
                },
                {
                    title: "Enter Your Metrics",
                    description: "Input your ad spend details or click metrics. Optionally, set a <strong>Target CPA</strong> to see if your performance is on track (Green) or needs improvement (Red).",
                    icon: Calculator
                },
                {
                    title: "Analyze Results",
                    description: "Review your calculated CPA. Use this data to optimize your bids, improve landing page conversion rates, or adjust your budget allocation.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
