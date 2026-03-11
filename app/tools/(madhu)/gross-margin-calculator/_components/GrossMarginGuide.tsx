"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertTriangle, Wallet, TrendingUp, Lightbulb } from "lucide-react"

export function GrossMarginGuide() {
    return (
        <ToolGuide
            title="About the Gross Margin Calculator"
            icon={Lightbulb}
            items={[
                {
                    title: "Protect Your Business Profits",
                    description: "This tool helps you see the actual percentage of revenue you keep after product costs. Knowing your margin ensures you aren't accidentally selling items at a loss or pricing your hard work too cheaply.",
                    icon: AlertTriangle,
                    stat: "Vital Metric",
                    statLabel: "Profit Health",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "Your gross margin is the first line of defense in your business finances."
                },
                {
                    title: "Smart Pricing Strategy",
                    description: "Use the built-in modes to work backward. Tell the calculator what margin you want to hit, and it will tell you exactly what price to charge or how much you can afford to spend on manufacturing.",
                    icon: Wallet,
                    stat: "Flexible",
                    statLabel: "3-in-1 Tool",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Switch between finding your margin, setting a target price, or creating a cost budget."
                },
                {
                    title: "Actionable Revenue Insights",
                    description: "Visualise your store's performance with the revenue breakdown bar. It clearly shows how much of your money goes to costs versus how much stays with you as gross profit from every sale.",
                    icon: TrendingUp,
                    stat: "Visual",
                    statLabel: "Breakdown Bar",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    )
}