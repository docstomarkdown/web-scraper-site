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
                heading="Know Exactly How Long to Run Your Test"
                headingAccent="How Long to Run Your Test"
                definition="The A/B Test Duration Calculator helps you know how many days you should run a test when comparing two versions of a webpage, ad, or app screen. Just enter your daily visitors and conversion details, and the tool instantly tells you how long to run the test to get trustworthy results. It’s made for anyone who wants to improve performance — website owners, marketers, sellers, designers, or app teams — and works for any kind of experiment where you’re testing Version A vs Version B."
                facts={[
                    {
                        stat: "Know",
                        label: "How Long to Run Your Test",
                        detail: "Instantly get the exact number of days needed to run a reliable A/B test — no guessing, no confusion."
                    },
                    {
                        stat: "Get",
                        label: "Accurate Sample Size",
                        detail: "See how many total visitors (and per variant) you need to get trustworthy, statistically valid results."
                    },
                    {
                        stat: "Improve",
                        label: "Your Decisions",
                        detail: "Avoid stopping tests too early or wasting time running them too long — run smarter, more confident experiments."
                    }
                ]}
            />
        </div>
    )
}
