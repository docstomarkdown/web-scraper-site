"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function FBARemovalOverview() {
    return (
        <ToolOverview
            heading="Why Use the FBA Removal Order Calculator?"
            headingAccent="FBA Removal Order Calculator"
            definition="Used by Amazon FBA sellers to instantly estimate the cost of retrieving or disposing of unsold inventory stored in Amazon's fulfillment centers. Whether you're a private label brand, wholesale seller, or seasoned FBA merchant, this tool helps you make smarter decisions before submitting a removal or disposal order. Enter your product dimensions, weight, and unit quantity to get an instant, 2025-accurate cost breakdown—so you know exactly what Amazon will charge before you commit."
            facts={[
                {
                    label: "Rate Accuracy",
                    stat: "2025 Rates",
                    detail: "Reflects Amazon's latest Feb 2025 removal and disposal fee schedule."
                },
                {
                    label: "Size Detection",
                    stat: "Auto-Detect",
                    detail: "Automatically classifies your item as Standard or Large/Bulky size tier."
                },
                {
                    label: "Cost Clarity",
                    stat: "Per-Unit & Total",
                    detail: "See both the per-unit fee and total order cost side by side."
                }
            ]}
        />
    )
}
