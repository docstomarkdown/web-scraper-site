"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertCircle, Scale, CreditCard, BookOpen } from "lucide-react"

export function COGSGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About This Process"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Return Risk' Trap",
                    description: "If you have a 10% return rate on a $50 item, you lose $5.00 per sale in revenue, plus shipping costs. Most calculators ignore this, leading to inflated profit estimates.",
                    icon: AlertCircle,
                    stat: "Hidden Cost",
                    statLabel: "Profit Killer",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Your margin isn't real until the return window closes."
                },
                {
                    title: "Landed vs. Product Cost",
                    description: "Your product cost is $5, but after shipping and taxes, it's $7. Pricing based on $5 guarantees you lose money on every sale.",
                    icon: Scale,
                    stat: "+40%",
                    statLabel: "Avg Markup",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Freight and duties often add 30-50% to the base product cost."
                },
                {
                    title: "Fulfillment > Manufacturing",
                    description: "For many low-cost items, the cost to pick, pack, and ship (Fulfillment) is actually higher than the cost to make the product.",
                    icon: CreditCard,
                    stat: "Reality",
                    statLabel: "Check Fees",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600",
                    tooltip: "Common in items under $20 selling price."
                }
            ]}
        />
    )
}
