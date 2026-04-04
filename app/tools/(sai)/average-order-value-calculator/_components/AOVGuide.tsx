"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { DollarSign, ShoppingBag, TrendingUp, Package } from "lucide-react"
export function AOVGuide() {
    return (
        <ToolGuide
            title="About Average Order Value Calculator"
            items={[
                {
                    title: "Set Strategic Shipping Thresholds",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "+20%",
                    statColor: "text-blue-700",
                    statLabel: "Above Target",
                    tooltip: "Push customers to add one more item.",
                    description: "Use your computed AOV to set an intelligent free shipping threshold. A proven strategy is setting your free shipping minimum 15% to 20% higher than your current Average Order Value to consistently bump up order sizes."
                },
                {
                    title: "Optimize Ad Spend Targets",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "CPA",
                    statColor: "text-emerald-700",
                    statLabel: "Cost Per Acquisition",
                    tooltip: "Higher AOV means you can afford higher acquisition costs.",
                    description: "Connect your raw calculation directly to profitability. By establishing your baseline average order value, you can immediately determine your maximum allowable Cost Per Acquisition (CPA) for Facebook and Google Ads."
                },
                {
                    title: "Design Smart Product Bundles",
                    icon: Package,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    stat: "Bundles",
                    statColor: "text-indigo-700",
                    statLabel: "Higher Value",
                    tooltip: "Combine popular items at a slight discount.",
                    description: "Use your resulting number to accurately determine the best price points for product kits. If your AOV is $40, create logical, bundled packages priced at $55 and $75 to capture high-intent buyers."
                },
                {
                    title: "Balance Conversion Rates",
                    icon: ShoppingBag,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "Safe",
                    statColor: "text-amber-700",
                    statLabel: "Pricing",
                    tooltip: "Balance higher prices with conversion health.",
                    description: "Monitor your store's baseline to keep pricing strategies secure. Pushing aggressively for a higher AOV can sometimes negatively impact your overall conversion rate, so track both metrics side-by-side to ensure total revenue grows."
                }
            ]}
        />
    )
}
