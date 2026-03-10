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
                    description: "Input your product cost, inbound shipping, duties, and packaging fees to determine the direct acquisition cost per unit.",
                    icon: Package
                },
                {
                    title: "Add Fulfillment Details",
                    description: "Include the fulfillment fee (like pick-and-pack) and outbound shipping to calculate your complete COGS per unit.",
                    icon: Truck
                },
                {
                    title: "Calculate Total COGS - Optional",
                    description: "Enter the number of units sold to instantly calculate your Total Cost of Goods Sold across your entire inventory.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}