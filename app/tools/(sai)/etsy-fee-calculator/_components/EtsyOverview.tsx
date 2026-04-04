"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"


export function EtsyOverview() {
    return (
        <ToolOverview
            heading="What is the Etsy Fee & Profit Calculator?"
            headingAccent="Etsy Fee & Profit Calculator"
            definition="The most intuitive way for Etsy sellers to master their marketplace math. Whether you're a side-hustler launching your first listing or a pro-shop owner scaling production, our tool gives you instant clarity on your bottom line. Stop guessing your margins—simply enter your item price, and our profit-first engine handles the 6.5% transaction fees, listing costs, and Offsite Ads in real-time. Designed to help you price your products with total confidence, so you focus on creating while we handle the calculations."
            facts={[
                {
                    label: "Profit Transparency",
                    stat: "Instant",
                    detail: "See your exact net earnings after all Etsy fees are subtracted automatically."
                },
                {
                    label: "Margin Analysis",
                    stat: "Real-time",
                    detail: "Watch your profit margin react instantly as you test different price points."
                },
                {
                    label: "Fee Breakdown",
                    stat: "Dynamic",
                    detail: "Unlock deep-dive accounting of listing, transaction, and processing fees."
                }
            ]}
        />
    )
}
