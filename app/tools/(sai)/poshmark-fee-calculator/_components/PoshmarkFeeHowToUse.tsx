"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Truck, Calculator } from "lucide-react"

export function PoshmarkFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Sold Price",
                    description: "Input the final price the item sold for.",
                    icon: Tag
                },
                {
                    title: "Account for Discounts",
                    description: "If you offered a shipping discount (e.g. $4.99 or Free Shipping), enter the amount YOU paid.",
                    icon: Truck
                },
                {
                    title: "Review Earnings",
                    description: "See your total payout (Net Earnings) and your Net Profit after deducting the item's cost.",
                    icon: Calculator
                }
            ]}
        />
    )
}
