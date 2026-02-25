"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Search, Calculator, TrendingUp } from "lucide-react"

export function NetProfitHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Log Your Gross Revenue",
                    description: "Start by entering your total sales receipts before any deductions. This is the baseline from which all expenses will be subtracted.",
                    icon: DollarSign
                },
                {
                    title: "Deduct Product & Fulfillment Costs",
                    description: "Enter your total <strong>COGS</strong>. This includes manufacturing, shipping to your warehouse, customs, and packaging fees.",
                    icon: Search
                },
                {
                    title: "Account for Marketing & Overhead",
                    description: "Add your advertising spend and operational costs like software subscriptions, rent, and salaries to see your operating profit.",
                    icon: Calculator
                },
                {
                    title: "Calculate After-Tax Earnings",
                    description: "Apply your estimated local tax rate. The final figure is your <strong>Real Net Profit</strong>—the money that actually goes into your bank account.",
                    icon: TrendingUp
                }
            ]}
            goal={{
                title: "Achieve Financial Transparency",
                description: "Moving from 'I think we're profitable' to 'I know we're profitable.' This tool helps you identify exactly where your money is leaking so you can fix your margins.",
                icon: Search
            }}
        />
    )
}
