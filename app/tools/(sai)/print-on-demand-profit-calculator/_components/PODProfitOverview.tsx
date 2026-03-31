"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function PODProfitOverview() {
    return (
        <ToolOverview
            heading="Why Use the POD Profit Calculator?"
            headingAccent="POD Profit Calculator"
            definition="Used by sellers on Amazon FBA, this tool helps you decide what to do with unsold inventory stored in Amazon’s warehouses. Whether you're a beginner, private label seller, or experienced FBA seller, it provides a quick way to compare removal and disposal costs with your expected resale value. Simply enter your units, fees, and selling price to instantly see your profit or loss, understand the true cost of each option, and identify the most cost-effective action—so you can avoid unnecessary losses and make smarter inventory decisions"
            facts={[
                {
                    stat: "Accurate",
                    label: "Profit Calculation",
                    detail: "Factor in costs, fees, and shipping to see your actual earnings per sale instead of rough estimates."
                },
                {
                    stat: "Smarter",
                    label: "Pricing Strategy",
                    detail: "Set competitive prices that protect your margins while avoiding hidden expenses and underpricing."
                },
                {
                    stat: "Complete",
                    label: "Cost Transparency",
                    detail: "Visualize every cost from production to fees, uncovering ways to cut expenses and boost profit."
                }
            ]}
        />
    )
}
