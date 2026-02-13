"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BarChart, DollarSign, MousePointer } from "lucide-react"

export function PPCBidGuide() {
    return (
        <ToolGuide
            title="Understanding PPC Bidding"
            icon={BarChart}
            items={[
                {
                    title: "What is a PPC Bid?",
                    description: "A PPC (Pay-Per-Click) bid is the maximum amount you are willing to pay for a click on your ad. Your bid determines where and how often your ad is shown.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Your max cost per click."
                },
                {
                    title: "The Formula",
                    description: "The formula for the maximum bid is: Max Bid = Product Price × Conversion Rate × Target ACoS.",
                    icon: MousePointer,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                },
                {
                    title: "Why it matters",
                    description: "Setting the right bid ensures you are not overpaying for clicks and that your advertising campaigns remain profitable.",
                    icon: BarChart,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                }
            ]}
        />
    )
}
