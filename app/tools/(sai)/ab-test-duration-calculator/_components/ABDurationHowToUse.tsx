"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Target, Users, BarChart2 } from "lucide-react"

export function ABDurationHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Your Baseline & Goal",
                    description: "Input your current conversion rate (e.g. 5%) and the expected improvement for Version B (e.g. 10%). The smaller the improvement you want to detect, the longer your test needs to run.",
                    icon: Target
                },
                {
                    title: "Set Your Traffic Details",
                    description: "Enter your average daily visitors and choose your traffic split between A & B (default: 50/50). Unequal splits increase test duration since one variant gets less exposure.",
                    icon: Users
                },
                {
                    title: "Read Your Results",
                    description: "Instantly get the required test duration in days, sample size per variant, total visitors needed, and daily users per variant — everything you need to plan a statistically sound A/B test.",
                    icon: BarChart2
                }
            ]}
        />
    )
}