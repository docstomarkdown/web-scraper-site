"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, ShoppingCart, Warehouse, Scale } from "lucide-react"

export function EOQHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Define Annual Demand",
                    description: "Input the total units you anticipate selling or using in one year. Use historical data or future forecasts for precise results.",
                    icon: TrendingUp
                },
                {
                    title: "Calculate Ordering Costs",
                    description: "Enter the fixed cost per purchase order—including administrative labor, shipping fees, and quality inspections.",
                    icon: ShoppingCart
                },
                {
                    title: "Estimate Storage Burden",
                    description: "Input the annual cost to carry one unit. Include warehouse rent, insurance, and the interest on tied-up capital.",
                    icon: Warehouse
                },
                {
                    title: "Find Daily Equilibrium",
                    description: "Review the Cost Balance Analysis to identify where your ordering and storage costs meet for minimum total spend.",
                    icon: Scale
                }
            ]}
        />
    )
}
