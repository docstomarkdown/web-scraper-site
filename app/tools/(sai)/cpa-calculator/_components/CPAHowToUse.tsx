"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { MousePointerClick, Calculator, TrendingUp } from "lucide-react"

export function CPAHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Select Calculation Mode",
                    description: "Choose <strong>Campaign Data</strong> if you have realized results (Spend & Conversions), or <strong>Estimation</strong> to plan based on Cost Per Click (CPC) and Conversion Rate.",
                    icon: MousePointerClick
                },
                {
                    title: "Enter Your Metrics",
                    description: "Input your ad spend details or click metrics. Optionally, set a <strong>Target Cost Per Acquisition (CPA)</strong> to see if your performance is on track (Green) or needs improvement (Red).",
                    icon: Calculator
                },
                {
                    title: "Analyze Results",
                    description: "Review your calculated Cost Per Acquisition (CPA). Use this data to optimize your bids, improve landing page conversion rates, or adjust your budget allocation.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
