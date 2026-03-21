"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { SlidersHorizontal, Calculator, BarChart3 } from "lucide-react"

export function GrossMarginHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Pick Your Mode",
                    description: "Choose <strong>Find Margin</strong>, <strong>Find Revenue</strong>, or <strong>Find COGS</strong> depending on the variable you need to calculate.",
                    icon: SlidersHorizontal
                },
                {
                    title: "Enter Data",
                    description: "Enter your values into the sticky left panel. Watch the right-hand dashboard update instantly without breaking scroll focus.",
                    icon: Calculator
                },
                {
                    title: "View Results",
                    description: "Review your calculated metric. Use these precise figures instantly to negotiate better vendor costs or adjust your retail sales prices.",
                    icon: BarChart3
                }
            ]}
        />
    )
}