"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, BarChart3, Target } from "lucide-react"
export function GrossMarginHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Total Revenue",
                    description: "Enter the gross sales amount generated from your specific products.",
                    icon: Calculator
                },
                {
                    title: "Direct Costs",
                    description: "Input the precise Cost of Goods Sold connected directly to those sales.",
                    icon: DollarSign
                },
                {
                    title: "View Margin",
                    description: "Instantly see your exact Gross Profit amount and percentage margin.",
                    icon: BarChart3
                }
            ]}
        />
    )
}