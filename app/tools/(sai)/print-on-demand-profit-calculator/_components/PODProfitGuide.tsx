"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Shirt, Truck, DollarSign } from "lucide-react"
export function PODProfitGuide() {
    return (
        <ToolGuide
            title="Understanding POD Profitability"
            icon={Shirt}
            items={[
                {
                    title: "Base vs. Retail Price",
                    description: "Your profit starts with the difference between what your provider charges (Base Cost) and what your customer pays (Retail Price). Don't forget to markup enough to cover fees.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "30%+",
                    statLabel: "Ideal Margin"
                },
                {
                    title: "Double Shipping Impact",
                    description: "In POD, you pay shipping to the provider, and you charge shipping to the customer. If you offer free shipping, that cost comes directly out of your profit.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "2x",
                    statLabel: "Shipping Costs"
                },
                {
                    title: "Platform Fees",
                    description: "Marketplaces like Etsy or Amazon take a cut of the TOTAL transaction (item price + shipping). Always calculate fees on the gross revenue.",
                    icon: DollarSign,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Gross",
                    statLabel: "Fee Basis"
                }
            ]}
        />
    )
}