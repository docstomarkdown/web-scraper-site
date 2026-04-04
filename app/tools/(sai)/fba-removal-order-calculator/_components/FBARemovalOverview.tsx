"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function FBARemovalOverview() {
    return (
        <ToolOverview
            heading="Why Use the FBA Removal Order Calculator?"
            headingAccent="FBA Removal Order Calculator"
            definition="Used by sellers on Amazon FBA to evaluate the true cost of removing or disposing unsold inventory and compare it with potential resale value. Whether you're a private label seller, wholesaler, or experienced FBA merchant, this tool helps you make smarter decisions before placing a removal order. Enter your inventory details, fees, and expected selling price to instantly see your profit or loss and identify the most cost-effective option—so you know exactly what action to take."
            facts={[
                {
                    stat: "Smart",
                    label: "Decision Recommendation",
                    detail: "Instantly recommends the best action—Remove, Dispose, or Hold—so you can maximize profit with zero guesswork."
                },
                {
                    stat: "Transparent",
                    label: "Profit & Loss Clarity",
                    detail: "Clearly shows your expected profit after removal and potential loss from disposal—so you instantly understand the real financial impact of each option."
                },
                {
                    stat: "Actionable",
                    label: "Cost vs Recovery Comparison",
                    detail: "Compares Amazon fees with your resale value to reveal the better option—so you know if recovering inventory is worth it."

                }
            ]}
        />
    )
}
