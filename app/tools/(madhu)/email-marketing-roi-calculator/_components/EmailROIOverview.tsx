"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function EmailROIOverview() {
    return (
        <ToolOverview
            heading="Why Use Email ROI Calculator?"
            headingAccent="Email ROI Calculator"
            definition="The primary purpose of the Email ROI Calculator is to instantly measure the true profitability of your email campaigns. Built for marketers, agency owners, and e-commerce founders, this tool breaks down your campaign's performance from the initial open to the final conversion. It is your essential tool for tracking engagement, calculating exactly how much revenue every send generates, and optimizing your future marketing strategies."
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
