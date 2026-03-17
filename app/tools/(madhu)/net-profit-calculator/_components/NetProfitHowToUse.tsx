"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, PieChart, Calculator } from "lucide-react"
export function NetProfitHowToUse() {
    return (
        <ToolSteps
            title="Master Your Bottom Line"
            steps={[
                {
                    title: "Revenue Capture",
                    description: "Input your <strong>Total Revenue</strong> before any deductions to establish your baseline income.",
                    icon: DollarSign
                },
                {
                    title: "Operational Costs",
                    description: "Log your <strong>COGS</strong>, marketing spend, and overhead to see what it truly costs to run your business.",
                    icon: Calculator
                },
                {
                    title: "Profit Strategy",
                    description: "Evaluate your <strong>Net Profit</strong> and use the margin breakdown to identify your biggest saving opportunities.",
                    icon: PieChart
                }
            ]}
        />
    )
}
