"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, MousePointerClick, TrendingUp } from "lucide-react"

export function ConversionHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Input Traffic Data",
                    description: "Enter the total number of unique visitors or sessions to your landing page or website.",
                    icon: Users
                },
                {
                    title: "Input Conversions",
                    description: "Enter the total number of completed goals (purchases, leads, signups) from that same traffic.",
                    icon: MousePointerClick
                },
                {
                    title: "View Rate",
                    description: "Instantly see your conversion percentage. Use this benchmark to test improvements to your page.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
