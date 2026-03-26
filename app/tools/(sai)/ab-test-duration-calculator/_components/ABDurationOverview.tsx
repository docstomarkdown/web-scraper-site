"use client"
import { ToolOverview, ToolSectionHeader } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function ABDurationOverview() {
    return (
        <div className="space-y-8" id="overview">
            {/* Section Header */}
            <ToolSectionHeader
                icon={Lightbulb}
                title="Tool Essential"
                subtitle="Understand what this calculator does and how it helps you run better experiments."
            />

            {/* Tool Overview */}
            <ToolOverview
                heading="Know Exactly When to Stop Your Test"
                headingAccent="When to Stop Your Test"
                definition="The A/B Test Duration Calculator is built for marketers, product managers, and CRO specialists who want data-backed decisions — not gut feeling. Simply enter your current conversion rate, the improvement you're aiming for, and your daily traffic. The tool instantly calculates how many days your test must run, how many users each variant needs, and whether your traffic is enough to get a reliable result."
                facts={[
                    {
                        stat: "Duration",
                        label: "In Days",
                        detail: "See the minimum number of days your test must run before you can trust the results."
                    },
                    {
                        stat: "Sample",
                        label: "Per Variant",
                        detail: "Know exactly how many users Version A and Version B each need before the test is statistically valid."
                    },
                    {
                        stat: "Traffic",
                        label: "Check",
                        detail: "Instantly see if your daily visitor count is enough — or if low traffic will make the test unreliable."
                    }
                ]}
            />
        </div>
    )
}
