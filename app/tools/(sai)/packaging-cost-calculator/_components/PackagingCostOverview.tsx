"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function PackagingCostOverview() {
    return (
        <ToolOverview
            heading="Why Use the Packaging Cost Calculator?"
            headingAccent="Packaging Cost Calculator"
            definition="Used by eCommerce sellers across platforms like Etsy, Amazon, Shopify, and eBay, this tool helps you quickly understand the true cost of packaging per order so you can avoid hidden expenses eating into your profits. The Packaging Cost Calculator lets you easily enter your packaging materials, packing time, and labor cost to instantly calculate what each shipment actually costs you, helping you make smarter pricing decisions, evaluate bulk packaging choices, and clearly see where your money is going so you can protect your margins and improve profitability."
            facts={[
                {
                    stat: "Accurate",
                    label: "Hidden Cost Detection",
                    detail: "Reveals the full per-unit packaging cost — materials plus labor — so no expense goes unaccounted for in your pricing."
                },
                {
                    stat: "Instant",
                    label: "Batch Scaling",
                    detail: "Enter your order quantity to instantly project total packaging spend across your entire fulfillment run."
                },
                {
                    stat: "Smarter",
                    label: "Pricing Decisions",
                    detail: "Know your real fulfillment floor cost so you can set prices that protect your margin — not just cover the product."
                }
            ]}
        />
    )
}
