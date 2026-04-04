"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function CouponROIOverview() {
    return (
        <ToolOverview
            heading="Why Use the Coupon ROI Calculator?"
            headingAccent="Coupon ROI Calculator"
            definition="The Coupon ROI Calculator is a tool for e-commerce marketers and business owners to measure the true profitability of their coupon and discount campaigns. It calculates return on investment by comparing campaign costs, discount amounts, redemption rates, and sales generated, helping users quickly see whether their promotions are profitable or resulting in losses. It is commonly used for seasonal sales, flash deals, and promotional campaigns across platforms like Shopify, Amazon, and Etsy to evaluate performance and make data-driven decisions for better marketing results."
            facts={[
                {
                    stat: "Accurate",
                    label: "Profit Tracking",
                    detail: "Get a true picture of your campaign profitability by factoring in cost, redemptions, AOV, discounts, and profit margin.No guesswork—just precise financial clarity."
                },
                {
                    stat: "Instant",
                    label: "ROI & Profit Insights",
                    detail: "See your ROI, net profit, or loss immediately after entering your data.Quickly understand if your coupon campaign is actually making money or not."
                },
                {
                    stat: "Smarter",
                    label: "Discount Decisions",
                    detail: "Know whether to scale, optimize, or stop your coupon strategy.Helps you avoid unprofitable discounts and improve future campaign performance."
                }
            ]}
        />
    )
}
