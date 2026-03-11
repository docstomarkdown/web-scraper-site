"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { SlidersHorizontal, Calculator, BarChart3 } from "lucide-react"

export function GrossMarginHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Choose a Mode",
                    description: "Pick Find Margin to check profitability, Find Revenue to set a target price, or Find COGS to stick to a maximum spend limit.",
                    icon: SlidersHorizontal
                },
                {
                    title: "Enter Your Numbers",
                    description: "Fill in the active fields. Results update live as you type. Use the dropdown to set your local currency.",
                    icon: Calculator
                },
                {
                    title: "Read & Act",
                    description: "Check your Gross Margin, Gross Profit, and the Revenue Breakdown bar to price your products with absolute confidence.",
                    icon: BarChart3
                }
            ]}
        />
    )
}