"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BookOpen, TrendingUp, TrendingDown, RefreshCcw } from "lucide-react"

export function PriceElasticityGuide() {
    return (
        <ToolGuide
            title="Understanding Price Elasticity"
            icon={BookOpen}
            items={[
                {
                    title: "Elastic Demand",
                    description: "When PED > 1, consumers are very sensitive to price. A small change in price leads to a large change in quantity demanded. Luxury goods often have elastic demand.",
                    icon: TrendingDown,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                    stat: "> 1.0",
                    statLabel: "PED",
                },
                {
                    title: "Inelastic Demand",
                    description: "When PED < 1, consumers are not very sensitive to price. Price changes have little impact on quantity. Essential goods like food and fuel are typically inelastic.",
                    icon: TrendingUp,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "< 1.0",
                    statLabel: "PED",
                },
                {
                    title: "Unitary Elasticity",
                    description: "When PED = 1, the percentage change in quantity demanded is exactly equal to the percentage change in price, keeping total revenue constant.",
                    icon: RefreshCcw,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "1.0",
                    statLabel: "PED",
                },
                {
                    title: "Perfectly Inelastic",
                    description: "When PED = 0, quantity demanded does not change at all, regardless of the price. This occurs in rare cases like life-saving medication or extreme monopolies.",
                    icon: TrendingUp,
                    iconBg: "bg-slate-50",
                    iconColor: "text-slate-500",
                    stat: "0.0",
                    statLabel: "PED",
                },
                {
                    title: "The Substitute Rule",
                    description: "The most important factor! Goods with many close substitutes (like different brands of soda) are more elastic than those with few or no alternatives.",
                    icon: BookOpen,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Key",
                    statLabel: "Factor",
                },
            ]}
        />
    )
}
