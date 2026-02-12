"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react"

export function ROASHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Ad Spend",
                    description: "Input the total amount you spent on your advertising campaigns.",
                    icon: DollarSign
                },
                {
                    title: "Enter Revenue or Target",
                    description: "Enter your generated revenue to see ROAS, or your Target ROAS to see the revenue needed.",
                    icon: TrendingUp
                },
                {
                    title: "Get Your Results",
                    description: "Instantly see your ROAS performance or the revenue target you need to hit to be profitable.",
                    icon: BarChart3
                }
            ]}
        />
    )
}
