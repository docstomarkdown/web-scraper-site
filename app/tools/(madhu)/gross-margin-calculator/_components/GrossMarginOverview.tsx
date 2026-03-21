"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function GrossMarginOverview() {
    return (
        <ToolOverview
            heading="Why Use Gross Margin Calculator?"
            headingAccent="Gross Margin Calculator"
            definition="The primary purpose of the Gross Margin Calculator is to protect your profitability by identifying exactly how much money you keep from every sale. Built for e-commerce sellers and brand owners, this tool calculates the critical percentage left over after covering your product costs (COGS). Whether you are setting new prices, negotiating with suppliers, or auditing your current margins—this tool ensures you never list a product that doesn't hit your profit goals."
            facts={[
                {
                    stat: "Profit Protection",
                    label: "Know Your Margin",
                    detail: "The tool's most important job is showing you your 'Real Profit' per unit, so you know exactly how many dollars you have left to cover overhead."
                },
                {
                    stat: "Reverse Pricing",
                    label: "Target Profits",
                    detail: "Don't guess your prices. Set your target margin and product cost to instantly see the exact selling price you need to charge."
                },
                {
                    stat: "COGS Ceiling",
                    label: "Supplier Limits",
                    detail: "Know your limit. Calculate the maximum you can afford to pay a supplier while still hitting your required profit margin."
                }
            ]}
            accent="blue"
        />
    )
}
