"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, BarChart3, TrendingUp } from "lucide-react"

export function PriceElasticityHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Price Changes",
                    description: "Input the original price and the new price of your product to calculate the percentage change.",
                    icon: DollarSign,
                },
                {
                    title: "Enter Volume Changes",
                    description: "Input the sales volume (quantity) at the original price and the volume at the new price.",
                    icon: BarChart3,
                },
                {
                    title: "Analyze Elasticity",
                    description: "Review the elasticity score to understand if your customers are sensitive to price changes and how it impacts total revenue.",
                    icon: TrendingUp,
                },
            ]}
        />
    )
}
