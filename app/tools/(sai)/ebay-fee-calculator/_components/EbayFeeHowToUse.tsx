"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, TrendingUp } from "lucide-react"
export function EbayFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Sale Details",
                    description: "Input the item's selling price, the shipping amount charged to the buyer, and your product sourcing cost.",
                    icon: Tag
                },
                {
                    title: "Add Platform Fees",
                    description: "Include the standard Final Value Fee rate, per-order fee, and any Promoted Listings percentage you plan to use.",
                    icon: Percent
                },
                {
                    title: "Analyze Profitability",
                    description: "Instantly view a breakdown of all marketplace deductions to reveal your exact net earnings and true profit margin.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}