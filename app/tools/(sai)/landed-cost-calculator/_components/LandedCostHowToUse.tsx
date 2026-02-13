"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Ship, Calculator } from "lucide-react"

export function LandedCostHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Details",
                    description: "Input your product cost per unit and the total number of units in your shipment.",
                    icon: Package
                },
                {
                    title: "Add Import Costs",
                    description: "Enter international shipping, customs duty rate, insurance, and any additional fees like brokerage or handling.",
                    icon: Ship
                },
                {
                    title: "View Landed Cost",
                    description: "See your total landed cost, per-unit landed cost, duty amount, and cost uplift percentage instantly.",
                    icon: Calculator
                }
            ]}
        />
    )
}
