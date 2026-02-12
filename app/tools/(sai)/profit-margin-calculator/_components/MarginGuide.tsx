"use client"

import { ToolGuide } from "@/app/tools/_shared/components"
import { CircleDollarSign, Percent, Calculator, Info } from "lucide-react"

export function MarginGuide() {
    return (
        <ToolGuide
            title="Understanding Profit Margins"
            items={[
                {
                    title: "Gross Margin",
                    icon: CircleDollarSign,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Keep %",
                    statColor: "text-emerald-600",
                    statLabel: "Percentage of revenue you keep",
                    tooltip: "Gross Margin %: (Revenue - Cost) / Revenue. Shows how much of your sales revenue is actually profit.",
                    description: "Your Gross Margin is the percentage of every dollar of sales that is profit after subtracting the cost of goods sold. A higher margin means more money left for other expenses."
                },
                {
                    title: "Markup",
                    icon: Percent,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Add %",
                    statColor: "text-blue-600",
                    statLabel: "Percentage added to cost",
                    tooltip: "Markup %: (Revenue - Cost) / Cost. The percentage increase over your cost price.",
                    description: "Markup is the percentage amount you add to the cost price to determine your selling price. For example, a 100% markup means you double your cost."
                },
                {
                    title: "Profit per Unit",
                    icon: Calculator,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Cash",
                    statColor: "text-amber-600",
                    statLabel: "Actual cash earned per sale",
                    tooltip: "Profit per Unit: Selling Price - Cost Price. The actual cash profit per item sold.",
                    description: "This is the simple dollar amount you earn from selling a single item. It is calculated by subtracting your unit cost from your unit selling price."
                },
                {
                    title: "Margin vs. Markup",
                    icon: Info,
                    iconBg: "bg-violet-50",
                    iconColor: "text-violet-500",
                    stat: "≠",
                    statColor: "text-violet-600",
                    statLabel: "They are not the same",
                    tooltip: "Margin is based on revenue (selling price), while markup is based on cost. The same profit gives different percentages depending on which base you use.",
                    description: "A common mistake is treating margin and markup as interchangeable. A 50% markup does not equal a 50% margin. For example, if your cost is $50 and you add a 100% markup, your selling price is $100 — but your margin is only 50%. Always know which metric you are using when setting prices."
                }
            ]}
        />
    )
}
