"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Settings, TrendingUp } from "lucide-react"

export function EtsyFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Sale & Cost Details",
                    description: "Input the item's selling price, any shipping amount charged to the buyer, your product cost, and your actual shipping expense.",
                    icon: Tag
                },
                {
                    title: "Confirm Your Fee Settings",
                    description: "Review the pre-filled Etsy defaults — listing fee, 6.5% transaction rate, and payment processing. Add an Offsite Ads % if applicable.",
                    icon: Settings
                },
                {
                    title: "Analyze Your Profitability",
                    description: "Instantly see your net profit, total fees, and profit margin. Use the breakdown chart to pinpoint which fees are eating into your earnings most.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}