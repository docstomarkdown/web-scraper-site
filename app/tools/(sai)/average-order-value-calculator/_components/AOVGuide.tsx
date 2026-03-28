"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { DollarSign, ShoppingBag, TrendingUp, Package } from "lucide-react"
export function AOVGuide() {
    return (
        <ToolGuide
            title="About Average Order Value Calculator"
            items={[
                {
                    title: "Instant Revenue Processing",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "Live",
                    statColor: "text-blue-700",
                    statLabel: "Calculation",
                    tooltip: "Instantly process the Revenue ÷ Orders equation.",
                    description: "Dynamically process your total gross revenue against your exact order count. The calculator instantly reveals the average amount of money generated every time a customer checks out."
                },
                {
                    title: "Profitability Alignment",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "Zero",
                    statColor: "text-emerald-700",
                    statLabel: "Ad Spend required",
                    tooltip: "A higher calculated AOV means more profit per visitor.",
                    description: "Connect your raw calculation directly to profitability. By establishing your baseline average order value, you can immediately identify paths to scale revenue without paying to acquire new customers."
                },
                {
                    title: "Strategic Action Tiers",
                    icon: Package,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    stat: "Growth",
                    statColor: "text-indigo-700",
                    statLabel: "Tactics",
                    tooltip: "Use your baseline to create intelligent promotion thresholds.",
                    description: "Use your computed metrics to drive confident store updates. Your resulting number helps you accurately determine the best price points for creating product bundles or setting free shipping thresholds."
                },
                {
                    title: "Volume & Conversion Optimization",
                    icon: ShoppingBag,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "Safe",
                    statColor: "text-amber-700",
                    statLabel: "Balance",
                    tooltip: "Balance higher prices with conversion health.",
                    description: "Monitor your store's baseline to balance pricing strategies securely. Consistently checking your average order value ensures that pushing for higher revenue doesn't accidentally damage your overall checkout volume."
                }
            ]}
        />
    )
}
