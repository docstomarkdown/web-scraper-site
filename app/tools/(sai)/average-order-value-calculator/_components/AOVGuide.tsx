"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { DollarSign, ShoppingBag, TrendingUp, Package } from "lucide-react"
export function AOVGuide() {
    return (
        <ToolGuide
            title="Understanding Average Order Value (AOV)"
            items={[
                {
                    title: "What is AOV?",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Avg",
                    statColor: "text-blue-600",
                    statLabel: "Revenue per order",
                    tooltip: "AOV = Total Revenue / Total Number of Orders.",
                    description: "Average Order Value (AOV) tracks the average dollar amount spent each time a customer places an order on your website or mobile app."
                },
                {
                    title: "Why it Matters?",
                    icon: TrendingUp,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Profit",
                    statColor: "text-blue-600",
                    statLabel: "Efficiency metric",
                    tooltip: "Higher AOV means more revenue for the same marketing cost.",
                    description: "Improving your AOV directly increases your revenue growth without the added cost of acquiring new customers. It helps you get more value from every transaction."
                },
                {
                    title: "How to Increase AOV?",
                    icon: Package,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Tips",
                    statColor: "text-purple-600",
                    statLabel: "Bundling & Upsells",
                    tooltip: "Common strategies: Product bundling, cross-selling, and free shipping thresholds.",
                    description: "Effective strategies include offering product bundles, suggesting complementary items (cross-selling) at checkout, or setting a free shipping threshold just above your current AOV."
                },
                {
                    title: "Volume vs. Value",
                    icon: ShoppingBag,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Balance",
                    statColor: "text-amber-600",
                    statLabel: "Find the sweet spot",
                    tooltip: "Extremely high prices might lower conversion rate.",
                    description: "Be careful not to just raise prices to increase AOV, as this could hurt your conversion rate. The goal is to encourage customers to buy *more* or *higher value* items willingly."
                }
            ]}
        />
    )
}