"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Clock, BarChart2, Split, Search } from "lucide-react"
export function ABDurationGuide() {
    return (
        <ToolGuide
            title="Understanding A/B Testing"
            items={[
                {
                    title: "Calculate Duration Before Testing",
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
                    title: "Expected Improvement (MDE)",
                    icon: Search,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Uplift",
                    statColor: "text-purple-600",
                    statLabel: "Sensitivity",
                    tooltip: "The minimum improvement you aim to detect.",
                    description: "Also known as Minimum Detectable Effect (MDE), this is the target improvement you expect to see. Smaller improvements require much larger sample sizes and run times. If your expected improvement is large, you can test faster."
                },
                {
                    title: "Statistical Significance",
                    icon: BarChart2,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "95%",
                    statColor: "text-blue-600",
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