"use client"

import { ToolGuide } from "@/app/tools/_shared/components"
import { Clock, BarChart2, Split, Search } from "lucide-react"

export function ABDurationGuide() {
    return (
        <ToolGuide
            title="Understanding A/B Testing"
            items={[
                {
                    title: "Why Calculator Duration?",
                    icon: Clock,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Time",
                    statColor: "text-blue-600",
                    statLabel: "Avoid early stopping",
                    tooltip: "Stopping a test too early leads to false positives.",
                    description: "Calculating duration beforehand prevents 'peeking'—stopping a statistically significant test too early, which often results in false positives. Stick to the calculated sample size."
                },
                {
                    title: "Minimum Detectable Effect (MDE)",
                    icon: Search,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "MDE",
                    statColor: "text-purple-600",
                    statLabel: "Sensitivity",
                    tooltip: "The smallest improvement you care about detecting.",
                    description: "MDE is the minimum improvement you want to be able to detect. Smaller MDEs require much larger sample sizes. If you only care about big wins, you can test faster."
                },
                {
                    title: "Statistical Significance",
                    icon: BarChart2,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "95%",
                    statColor: "text-emerald-600",
                    statLabel: "Confidence Level",
                    tooltip: "Standard significance level is 95%.",
                    description: "This calculator assumes a 95% confidence level, meaning there's only a 5% chance that a 'winning' result is actually due to random chance."
                },
                {
                    title: "Business Cycles",
                    icon: Split,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "7 Days",
                    statColor: "text-amber-600",
                    statLabel: "Minimum run time",
                    tooltip: "Always capture at least one full business cycle (week).",
                    description: "Even if the calculator says 2 days, you should run a test for at least one full week to account for differences in user behavior between weekdays and weekends."
                }
            ]}
        />
    )
}
