"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingBag, Truck, PieChart } from "lucide-react"

export function PODProfitGuide() {
    return (
        <ToolGuide
            title="Understanding POD Profitability"
            icon={PieChart}
            items={[
                {
                    title: "Double Shipping Consideration",
                    description: "In POD, you pay shipping to the provider, but you decide what to charge the customer. If you offer free shipping, that cost must be fully absorbed into your retail price.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Impact",
                    statLabel: "Logistics Cost"
                },
                {
                    title: "Platform & Processing Fees",
                    description: "Marketplaces like Etsy take a cut of the TOTAL transaction (item price + shipping). Always calculate your payment processing and platform fees on your gross revenue, not just the base price.",
                    icon: PieChart,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Gross",
                    statLabel: "Fee Calculation"
                },
                {
                    title: "Targeting Healthy Margins",
                    description: "A net margin of 20-30% is generally a healthy target for Print on Demand. Anything lower makes your business vulnerable if you encounter unexpected returns, damages, or need to run ad campaigns.",
                    icon: ShoppingBag,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "20-30%",
                    statLabel: "Ideal Margin"
                }
            ]}
        />
    )
}