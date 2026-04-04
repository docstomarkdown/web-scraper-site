"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, PieChart, Calculator } from "lucide-react"
export function NetProfitHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Revenue",
                    description: "Input your <strong>Total Revenue</strong> and <strong>COGS</strong> in the sticky left panel to instantly populate your dashboard baseline.",
                    icon: DollarSign
                },
                {
                    title: "Add Expenses",
                    description: "Log your marketing spend, overhead, and tax percentage to calculate what it truly costs to run your ongoing business operations.",
                    icon: Calculator
                },
                {
                    title: "View Results",
                    description: "Analyze your <strong>Net Profit</strong> immediately, then click the new <strong>View Income & Expense Breakdown</strong> dropdown in the result card to natively visualize every detailed expense block.",
                    icon: PieChart
                }
            ]}
        />
    )
}
