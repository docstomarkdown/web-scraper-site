"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function COGSOverview() {
    return (
        <ToolOverview
            heading="Why Use COGS Calculator?"
            headingAccent="COGS Calculator"
            definition="The primary purpose of the COGS (Cost of Goods Sold) Calculator is to pinpoint the exact cost of a single unit before you ever set a price. Built for Amazon sellers and product brands, this tool consolidates multiple expenses—product cost, freight, packaging, and fulfillment—into one clear number. It is your most important tool for ensuring that your pricing strategy is grounded in factual costs, not guesses, protecting your gross margin from the start."
            facts={[
                {
                    stat: "Full Cost",
                    label: "True Unit Cost",
                    detail: "Consolidates every hidden expense (freight, packaging, fees) into one single 'True Cost' per unit, providing the foundation for all your pricing decisions."
                },
                {
                    stat: "Hidden Fees",
                    label: "Profit Protection",
                    detail: "Surfaces small, quiet costs that usually chip away at your profit margins unnoticed, giving you complete financial visibility."
                },
                {
                    stat: "Capital Lock",
                    label: "Inventory Value",
                    detail: "Instantly calculates the total capital you have locked inside your batches, which is essential for accurate cash flow and reinvestment planning."
                }
            ]}
            accent="blue"
        />
    )
}
