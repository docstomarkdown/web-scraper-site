"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function PODProfitOverview() {
    return (
        <ToolOverview
            heading="Why Use the POD Profit Calculator?"
            headingAccent="POD Profit Calculator"
            definition="Designed to calculate the exact profit margins, total revenue, and underlying hidden costs of selling custom-printed merchandise online. This calculator is built specifically for ecommerce sellers, dropshippers, and creative designers running Print on Demand businesses on platforms like Etsy, Shopify, or eBay. Our tool eliminates the guesswork from your pricing strategy—simply input your item price alongside supplier costs, dual-shipping expenses, and marketplace transaction fees to instantly receive a crystal-clear, real-time breakdown of your true net profit down to the cent."
            facts={[
                {
                    label: "Margin Accuracy",
                    stat: "Real-time",
                    detail: "Instantly pinpoint your exact net profit and margin percentages."
                },
                {
                    label: "Cost Tracking",
                    stat: "Comprehensive",
                    detail: "Accounts for supplier costs, dual-shipping, and processing fees."
                },
                {
                    label: "Fee Breakdown",
                    stat: "Dynamic",
                    detail: "Visualize how marketplace fees and ad rates impact your bottom line."
                }
            ]}
        />
    )
}
