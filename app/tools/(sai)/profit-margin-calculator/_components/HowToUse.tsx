"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, Calculator, TrendingUp } from "lucide-react"

export function HowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Cost & Price",
                    description: "Input your buying price (Cost) and your selling price (Revenue). This is the foundation of your margin analysis.",
                    icon: CircleDollarSign
                },
                {
                    title: "View Margins",
                    description: "The calculator instantly shows your Gross Margin % and Markup %. Understanding the difference is key to profitability.",
                    icon: Calculator
                },
                {
                    title: "Analyze Profit",
                    description: "See your exact profit per unit. Use this to determine if your pricing strategy covers your overhead and desired profit.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
