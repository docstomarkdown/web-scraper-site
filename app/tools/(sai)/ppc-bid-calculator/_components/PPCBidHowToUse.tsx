"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Target, MousePointerClick } from "lucide-react"

export function PPCBidHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Data",
                    description: "Input your selling price, conversion rate, and profit margin to define your profitability limits.",
                    icon: DollarSign
                },
                {
                    title: "Define Campaign Goals",
                    description: "Add an optional Target ACoS to refine your bid recommendations based on specific ad spend targets.",
                    icon: Target
                },
                {
                    title: "Receive Recommended Bid",
                    description: "Instantly see your maximum recommended cost-per-click and the exact point where you'll break even.",
                    icon: MousePointerClick
                }
            ]}
        />
    )
}