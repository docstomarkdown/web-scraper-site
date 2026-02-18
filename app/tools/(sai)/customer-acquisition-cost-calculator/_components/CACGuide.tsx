"use client"

import { ToolGuide } from "@/app/tools/_shared/components"
import { DollarSign, Users, PieChart, Target } from "lucide-react"

export function CACGuide() {
    return (
        <ToolGuide
            title="Understanding Customer Acquisition Cost (CAC)"
            items={[
                {
                    title: "What is CAC?",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Cost",
                    statColor: "text-blue-600",
                    statLabel: "Cost per new customer",
                    tooltip: "CAC = Total Sales & Marketing Expenses / Number of New Customers Acquired.",
                    description: "Customer Acquisition Cost (CAC) is the total cost of winning a customer to purchase a product or service. It is an important metric to determine the profitability of your business model."
                },
                {
                    title: "What to Include?",
                    icon: PieChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "All",
                    statColor: "text-purple-600",
                    statLabel: "Comprehensive costs",
                    tooltip: "Include ad spend, salaries, commissions, bonuses, overhead, and tools used for marketing and sales.",
                    description: "CAC isn't just ad spend (that's CPA). Using the 'Fully Loaded' CAC method means including salaries, commissions, bonuses, overhead, and software tools related to sales and marketing."
                },
                {
                    title: "LTV:CAC Ratio",
                    icon: Target,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "3:1",
                    statColor: "text-emerald-600",
                    statLabel: "Ideal Ratio",
                    tooltip: "Lifetime Value (LTV) should ideally be 3x your CAC.",
                    description: "The golden rule for business sustainability is an LTV:CAC ratio of 3:1. If your ratio is 1:1, you are spending too much. If it's 5:1, you might be under-spending and missing growth opportunities."
                },
                {
                    title: "New Customers Only",
                    icon: Users,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "New",
                    statColor: "text-amber-600",
                    statLabel: "Don't count returning",
                    tooltip: "Only divide by the number of NEW customers acquired in the period.",
                    description: "Ensure you are dividing your costs only by the number of *new* customers acquired. Including returning customers will artificially lower your CAC and give you misleading data."
                }
            ]}
        />
    )
}
