"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Scale, TrendingUp } from "lucide-react"
export function BreakEvenHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Fixed Costs",
                    description: "Enter firm overhead expenses like building rent, salaries, and systems.",
                    icon: DollarSign
                },
                {
                    title: "Variable Cost",
                    description: "Input the base per-unit financial cost to build or acquire your goods.",
                    icon: Scale
                },
                {
                    title: "Target Check",
                    description: "Instantly project the exact unit sales volume needed to hit zero loss.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}