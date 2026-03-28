"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { MousePointerClick, Users, TrendingUp, Target } from "lucide-react"

export function ConversionGuide() {
    return (
        <ToolGuide
            title="Understanding Your Conversion Data"
            items={[
                {
                    title: "Interpreting the Output",
                    icon: MousePointerClick,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Rate",
                    statColor: "text-blue-600",
                    statLabel: "Action per session",
                    tooltip: "Formula: (Conversions ÷ Visitors) × 100",
                    description: "Your conversion rate calculates the exact percentage of your raw traffic that successfully completed your desired, primary objective (like sales, leads, or signups)."
                },
                {
                    title: "Structuring Your Data",
                    icon: Users,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Accuracy",
                    statColor: "text-amber-600",
                    statLabel: "Clean traffic data",
                    tooltip: "For accurate rates, ensure bot and spam traffic are excluded.",
                    description: "For the most precise calculation, exclude bot traffic, internal visits, and known spam from your Total Visitors input. Inflated traffic metrics artificially suppress your real conversion rate."
                },
                {
                    title: "Defining Business Goals",
                    icon: Target,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Goals",
                    statColor: "text-purple-600",
                    statLabel: "Macro vs Micro",
                    tooltip: "Track different rates for different transaction types.",
                    description: "Not all traffic intends to buy on the first visit. It's recommended to calculate separate conversion rates against multiple goal types: from high-friction macro events (checkouts) to low-friction micro events (newsletter signups)."
                },
                {
                    title: "Strategic Optimization",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Growth",
                    statColor: "text-emerald-600",
                    statLabel: "Scaling revenue",
                    tooltip: "Improving conversion rates actively lowers your cost-per-acquisition.",
                    description: "Even a 1% lift in your conversion rate can sustainably multiply your revenue without requiring you to increase your ad spend. Focus strongly on your calls-to-action (CTAs), page speed, and value clarity."
                }
            ]}
        />
    )
}