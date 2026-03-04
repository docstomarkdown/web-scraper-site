"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Search, Calculator, TrendingUp } from "lucide-react"
export function NetProfitHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Total Revenue",
                    description: "Enter complete gross revenue generated from all combined operations.",
                    icon: DollarSign
                },
                {
                    title: "All Expenses",
                    description: "Input all COGS, operating expenses, taxes, interest, and overhead.",
                    icon: Search
                },
                {
                    title: "Net Margin",
                    description: "Instantly see your final net profit percentage and total take-home pay.",
                    icon: Calculator
                }
            ]}
        />
    )
}