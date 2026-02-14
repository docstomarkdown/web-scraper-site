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
                    title: "Enter Revenue or Target Return on Ad Spend (ROAS)",
                    description: "Enter your generated revenue to see Return on Ad Spend (ROAS), or your Target Return on Ad Spend (ROAS) to see the revenue needed.",
                    icon: TrendingUp
                },
                {
                    title: "Get Your Results",
                    description: "Instantly see your Return on Ad Spend (ROAS) performance or the revenue target you need to hit to be profitable.",
                    icon: BarChart3
                }
            ]}
        />
    )
}
