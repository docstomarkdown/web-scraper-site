"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function ConversionOverview() {
    return (
        <div className="space-y-8" id="overview">
            <ToolOverview
                heading="What is the Conversion Rate Calculator?"
                headingAccent="Conversion Rate Calculator"
                definition="The Conversion Rate Calculator is a free, easy-to-use tool that instantly shows the percentage of your website visitors who complete a desired action, like making a purchase or signing up. Simply enter your total visitors and the number of completed actions, and the tool calculates your conversion rate, helping online store owners, marketers, and small business managers understand how well their website or campaigns turn visitors into customers. This insight allows you to spot bottlenecks, optimize your site, and improve sales without guessing."
                facts={[
                    {
                        stat: "Instant",
                        label: "Calculation",
                        detail: "Quickly see what percentage of your visitors take action, giving you an immediate understanding of website or campaign performance."
                    },
                    {
                        stat: "Clear",
                        label: "Comparison",
                        detail: "Compare total visitors and completed actions to identify gaps in your funnel and spot opportunities to improve conversions."
                    },
                    {
                        stat: "Actionable",
                        label: "Insights",
                        detail: "Use the conversion rate to test changes, optimize your website or marketing, and make smarter decisions to increase revenue."
                    }
                ]}
            />
        </div>
    )
}
