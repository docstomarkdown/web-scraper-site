"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Scale, TrendingUp } from "lucide-react"

export function BreakEvenHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Fixed Costs",
                    description: "Input your total fixed costs—expenses that stay the same regardless of sales volume (e.g., rent, salaries).",
                    icon: DollarSign
                },
                {
                    title: "Add Unit Details",
                    description: "Enter your selling price per unit and the variable cost to produce each unit.",
                    icon: Scale
                },
                {
                    title: "View Break-Even Point",
                    description: "Instantly see how many units you need to sell to cover your costs and start making a profit.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
