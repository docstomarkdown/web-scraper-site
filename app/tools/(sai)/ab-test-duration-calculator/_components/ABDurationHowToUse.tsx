"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { BarChart2, Search, Clock } from "lucide-react"
export function ABDurationHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Current Data",
                    description: "Enter baseline page conversion rate and the minimum detectable outcome.",
                    icon: BarChart2
                },
                {
                    title: "Traffic Volume",
                    description: "Input your average daily total visitors sent to the measured test pages.",
                    icon: Search
                },
                {
                    title: "Check Duration",
                    description: "See exactly how many days the ongoing test must run for clear results.",
                    icon: Clock
                }
            ]}
        />
    )
}