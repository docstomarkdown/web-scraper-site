"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Search, Calculator, TrendingUp } from "lucide-react"
export function NetProfitHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Income Data",
                    description: "Enter your Total Revenue from all sales channels before any deductions.",
                    icon: DollarSign
                },
                {
                    title: "Business Expenses",
                    description: "Input COGS, ad spend, overhead, and your estimated tax rate.",
                    icon: Calculator
                },
                {
                    title: "Profit Allocation",
                    description: "Visualize exactly where your revenue goes with the distribution chart.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
