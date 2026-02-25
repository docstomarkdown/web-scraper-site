"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Truck, RotateCcw, TrendingUp } from "lucide-react"

export function COGSHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Acquisition Costs",
                    description: "Input the unit cost from your supplier, plus inbound shipping and duties. This gives you your 'Landed Cost'—the price to get the product to your warehouse.",
                    icon: Package
                },
                {
                    title: "Add Fulfillment Fees",
                    description: "Include the cost to pick, pack, and ship the product to the customer. Don't forget platform fees (like FBA) and packaging materials.",
                    icon: Truck
                },
                {
                    title: "Factor in Returns",
                    description: "Enter your estimated return rate %. The calculator adds a 'Return Risk' cost to ensure your profit margin accounts for refunded items.",
                    icon: RotateCcw
                }
            ]}
            goal={{
                title: "Find Your True Profit",
                description: "Most sellers underestimate costs. This tool reveals your 'True COGS' and actual Gross Margin so you can price your products profitably.",
                icon: TrendingUp
            }}
        />
    )
}
