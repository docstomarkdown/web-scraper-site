"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, BarChart3, Target } from "lucide-react"

export function GrossMarginHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Select Calculation Mode",
                    description: "Choose from <strong>Find Margin</strong> (to get margin %), <strong>Find Revenue</strong> (to get required price), or <strong>Find COGS Cost</strong> (to get max allowable cost).",
                    icon: Calculator
                },
                {
                    title: "Input Financial Data",
                    description: "Enter your values in the <strong>Configurations</strong> card. For COGS, include all direct costs per unit. For Revenue, use your total sales price.",
                    icon: DollarSign
                },
                {
                    title: "Analyze &amp; Export",
                    description: "View your <strong>Gross Margin</strong>, <strong>Gross Profit</strong>, and <strong>Markup</strong> in the live results. Use the <strong>Copy Results</strong> button to save your calculation.",
                    icon: BarChart3
                }
            ]}
            goal={{
                title: "Master Your Unit Economics",
                description: "To protect your profitability by understanding the exact relationship between your revenue and costs, ensuring you never sell at a loss and always maintain healthy margins.",
                icon: Target
            }}
        />
    )
}
