"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertTriangle, Wallet, TrendingUp, BookOpen } from "lucide-react"

export function GrossMarginGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Gross Margin Profitability"
            icon={BookOpen}
            items={[
                {
                    title: "Margin is NOT Markup",
                    description: "This is the #1 mistake. Markup is % added to Cost. Margin is % of Revenue. If you buy for $50 and markup 50% to sell at $75, your Margin is only 33% ($25/$75).",
                    icon: AlertTriangle,
                    stat: "33% vs 50%",
                    statLabel: "Margin vs Markup",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "Confusing these two can lead to underpricing by 17% or more."
                },
                {
                    title: "The Operating Expense Gap",
                    description: "Gross Margin is not your take-home pay. It must be high enough to cover all Operating Expenses (OpEx) like rent, marketing, and salaries before you see Net Profit.",
                    icon: Wallet,
                    stat: "Gross > OpEx",
                    statLabel: "Profit Formula",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "If Gross Margin < OpEx, you are losing money operationally."
                },
                {
                    title: "Volume vs. Margin",
                    description: "A lower margin product with high velocity (volume) often generates more total cash profit than a high-margin product that rarely sells. Balance is key.",
                    icon: TrendingUp,
                    stat: "Cash Flow",
                    statLabel: "King of Business",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    )
}
