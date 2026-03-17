"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { SlidersHorizontal, Calculator, BarChart3 } from "lucide-react"

export function GrossMarginHowToUse() {
    return (
        <ToolSteps
            title="Optimizing Your Profit Margins"
            steps={[
                {
                    title: "Strategic Mode Selection",
                    description: "Select <strong>Find Margin</strong> to analyze current deals, or use <strong>Find Revenue</strong> to calculate your ideal selling price.",
                    icon: SlidersHorizontal
                },
                {
                    title: "Cost & Revenue Input",
                    description: "Enter your <strong>COGS</strong> and <strong>Total Revenue</strong>. Our precision engine handles the multi-mode math instantly.",
                    icon: Calculator
                },
                {
                    title: "Performance Analysis",
                    description: "Review your <strong>Gross Profit</strong> and <strong>Margin %</strong>. Use these insights to negotiate better supply costs or adjust prices.",
                    icon: BarChart3
                }
            ]}
        />
    )
}