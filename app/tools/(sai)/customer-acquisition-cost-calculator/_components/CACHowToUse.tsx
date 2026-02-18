"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, TrendingUp } from "lucide-react"

export function CACHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Gather Expenses",
                    description: "Sum up all sales and marketing expenses for a specific period (e.g., last month). Include ad spend, salaries, and software costs.",
                    icon: DollarSign
                },
                {
                    title: "Count New Customers",
                    description: "Determine the total number of NEW customers acquired during that same time period.",
                    icon: Calculator
                },
                {
                    title: "Analyze Result",
                    description: "Review your CAC. Compare it against your Customer Lifetime Value (LTV) to ensure your acquisition strategy is profitable.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
