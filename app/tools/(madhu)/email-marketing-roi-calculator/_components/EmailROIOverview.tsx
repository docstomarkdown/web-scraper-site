"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function EmailROIOverview() {
    return (
        <ToolOverview
            heading="Calculate Your Email ROI"
            headingAccent="Email ROI"
            definition="The Email Marketing ROI Calculator is designed for marketers, agency owners, and e-commerce founders who want to instantly measure the profitability of their email campaigns. Instead of guessing your returns, this tool gives you a clear, crisp breakdown of your campaign's performance—from the moment an email is opened to the final conversion, so you can see exactly how much revenue every send generates."
            facts={[
                {
                    stat: "4,000%+",
                    label: "Average Email ROI",
                    detail: "Email marketing remains the highest converting channel when executed with precision and a clear strategy."
                },
                {
                    stat: "Quick Insights",
                    label: "Seamless Tracking",
                    detail: "Instantly see your Total Revenue and Net Profit without wrestling with complex spreadsheets or analytics tools."
                },
                {
                    stat: "Clear Journey",
                    label: "Track Engagement",
                    detail: "See exactly how people interact with your campaign! Easily follow their journey from opening the email to clicking your links and making a purchase."
                }
            ]}
            accent="blue"
        />
    )
}
