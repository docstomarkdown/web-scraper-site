"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Truck, RotateCcw, TrendingUp } from "lucide-react"

export function COGSHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Unit Costs",
                    description: "Input the product cost, shipping, duties, and any packaging fees to calculate your total Landed Cost.",
                    icon: Package
                },
                {
                    title: "Add Fulfillment Details",
                    description: "Include your pick-and-pack fees, outbound shipping, and an estimated return rate buffer.",
                    icon: Truck
                },
                {
                    title: "Calculate Profit Margin",
                    description: "Set your target selling price to see your Gross Profit and Margin after all costs are considered.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}