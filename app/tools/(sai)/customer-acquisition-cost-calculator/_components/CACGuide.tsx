"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { DollarSign, PieChart, Target, Users } from "lucide-react"

export function CACGuide() {
    return (
        <ToolGuide
            title="About Customer Acquisition Cost Calculator"
            items={[
                {
                    title: "Fully Loaded Cost Method",
                    icon: PieChart,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "All-In",
                    statColor: "text-blue-700",
                    statLabel: "Expenses",
                    tooltip: "Include ad spend, salaries, commissions, bonuses, overhead, and tools used for marketing and sales.",
                    description: "CAC is not just your ad spend — that is CPA. A true CAC calculation uses the fully loaded method: include every dollar your sales and marketing teams cost, from salaries and commissions to software subscriptions and creative production."
                },
                {
                    title: "Count Only New Customers",
                    icon: Users,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "New",
                    statColor: "text-emerald-700",
                    statLabel: "Acquisitions Only",
                    tooltip: "Only divide by the number of NEW customers acquired in the period.",
                    description: "Always divide your total spend by newly acquired customers only. Including returning or repeat buyers will artificially lower your CAC and mask the true cost of customer acquisition, leading to poor budget decisions."
                },
                {
                    title: "The 3:1 Golden Benchmark",
                    icon: Target,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    stat: "3:1",
                    statColor: "text-indigo-700",
                    statLabel: "LTV:CAC Target",
                    tooltip: "Lifetime Value (LTV) should ideally be 3x your CAC.",
                    description: "The industry standard for sustainable growth is an LTV:CAC ratio of 3:1. At 1:1 you are breaking even and losing money on overhead. At 5:1 or above, you may be under-investing in growth and missing market share."
                },
                {
                    title: "Optimize Your Payback Period",
                    icon: DollarSign,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "< 12 mo",
                    statColor: "text-amber-700",
                    statLabel: "Ideal Payback",
                    tooltip: "Track how many months it takes to recoup your acquisition cost from a customer.",
                    description: "Beyond the ratio, track your CAC payback period — how long it takes for a customer's revenue to cover their acquisition cost. Top-performing SaaS and e-commerce businesses aim to recover CAC within 12 months or less."
                }
            ]}
        />
    )
}