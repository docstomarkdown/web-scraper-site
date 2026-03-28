"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function ConversionOverview() {
    return (
        <div className="space-y-8" id="overview">
            <ToolOverview
                heading="Why Use the Conversion Rate Calculator?"
                headingAccent="Conversion Rate Calculator"
                definition="The primary purpose of the Conversion Rate Calculator is to measure exactly what percentage of your actual traffic is taking a desired action on your site. Built for e-commerce marketers, content creators, and growth strategists, this tool instantly highlights the effectiveness of your funnels. It is your essential tool for setting benchmarks, evaluating the quality of your incoming traffic, and optimizing your landing pages for maximum ROI."
                facts={[
                    {
                        stat: "2 Inputs",
                        label: "Instant Result",
                        detail: "Just enter your total visitors and conversions — the tool instantly calculates your exact conversion rate with zero complexity."
                    },
                    {
                        stat: "Know Your",
                        label: "Funnel Health",
                        detail: "See if your rate is Excellent, Average, or Low — with a clear performance badge so you always know where you stand against industry standards."
                    },
                    {
                        stat: "Free to",
                        label: "Optimize",
                        detail: "Use your conversion rate as a baseline. Track changes after every campaign, page update, or CTA tweak to measure real improvement over time."
                    }
                ]}
            />
        </div>
    )
}
