"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function CouponROIOverview() {
    return (
        <ToolOverview
            heading="Why Use the Coupon ROI Calculator?"
            headingAccent="Coupon ROI Calculator"
            definition="Used by e-commerce and retail marketers to determine the true profitability of discount campaigns. This tool helps you see beyond surface-level sales spikes and understand exactly how discounts impact your bottom line. Simply input your campaign costs, discounts, and margins to accurately calculate your return on investment, net profit, and the hidden costs of discounting—empowering you to make smarter promotional decisions."
            facts={[
                {
                    stat: "Accurate",
                    label: "Profit Tracking",
                    detail: "Calculate exact net profit by factoring in hidden costs like campaign spend and COGS."
                },
                {
                    stat: "Actionable",
                    label: "Insights",
                    detail: "Instantly see if a campaign is profitable or operating at a loss."
                },
                {
                    stat: "Strategic",
                    label: "Planning",
                    detail: "Determine the exact break-even point required for future discounts to succeed."
                }
            ]}
        />
    )
}
