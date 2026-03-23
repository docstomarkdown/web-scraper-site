"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function InfluencerOverview() {
    return (
        <ToolOverview
            heading="Why Use the Influencer"
            headingAccent="ROI Calculator"
            definition="The primary purpose of the Influencer Marketing ROI Calculator is to accurately measure the true financial success of brand partnerships and eliminate unprofitable marketing spend. Built for eCommerce brands, marketers, and independent creators, this tool instantly processes your campaign expenses and revenue to reveal your exact net profit and return on investment (ROI). Whether you use the simple mode for a quick check or add details to break down your budget, it gives you the clear data needed to predictably scale winning campaigns without wasting budget."
            facts={[
                {
                    stat: "Fast",
                    label: "Instant Results",
                    detail: "Get your true ROI and Profit/Loss instantly by entering just two numbers: Cost and Revenue."
                },
                {
                    stat: "Deep",
                    label: "Detailed Breakdown",
                    detail: "Optionally expand your costs into influencer fees, ad spend, and product COGS for a complete budget analysis."
                },
                {
                    stat: "Accurate",
                    label: "Hidden Costs",
                    detail: "Accounts for product values and shipping costs so you know exactly what actually went into your pocket."
                }
            ]}
            accent="blue"
        />
    )
}
