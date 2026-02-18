"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { BarChart2, Search, Clock } from "lucide-react"

export function ABDurationHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Set Baseline Rate",
                    description: "Enter your current conversion rate for the page or element you are testing.",
                    icon: BarChart2
                },
                {
                    title: "Define MDE",
                    description: "Enter the Minimum Detectable Effect. This is the % lift you hope to see (e.g., improve from 5% to 6% is a 20% MDE).",
                    icon: Search
                },
                {
                    title: "Input Traffic",
                    description: "Enter the total daily visitors that will be part of the test (Control + Variation).",
                    icon: Clock
                }
            ]}
        />
    )
}
