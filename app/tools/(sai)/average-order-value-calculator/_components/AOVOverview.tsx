"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function AOVOverview() {
    return (
        <ToolOverview
            heading="Why Calculate Average Order Value?"
            headingAccent="Average Order Value"
            definition="The primary purpose of the Average Order Value (AOV) Calculator is to instantly reveal how much revenue you generate every time a customer checks out. Built for e-commerce store owners, dropshippers, and marketers, this tool transforms your gross revenue and order counts into a single powerful benchmark. It is your essential tool to track customer spending habits, evaluate pricing strategies, and set goals for bundles or free shipping thresholds."
            facts={[
                {
                    stat: "Instant",
                    label: "Calculation",
                    detail: "Quickly determine your exact average order value by processing your total gross sales revenue against your total transaction volume."
                },
                {
                    stat: "Global",
                    label: "Currencies",
                    detail: "Analyze your metrics accurately in your preferred local market with native support for over 30 different international currencies."
                },
                {
                    stat: "Data",
                    label: "Breakdown",
                    detail: "View a clear, side-by-side dashboard that organizes your total revenue and order volume alongside your primary AOV result for easy benchmarking."
                }
            ]}
        />
    )
}
