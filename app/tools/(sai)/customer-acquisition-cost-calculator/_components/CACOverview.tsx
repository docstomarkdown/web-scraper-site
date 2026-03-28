"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function CACOverview() {
    return (
        <ToolOverview
            heading="Why Calculate Customer Acquisition Cost?"
            headingAccent="Customer Acquisition Cost"
            definition="The Customer Acquisition Cost (CAC) Calculator is designed to instantly reveal how much you spend to win each new customer. Built for growth marketers, founders, and operations teams, this tool transforms your total sales and marketing expenses into a single critical benchmark. It is your essential tool to evaluate campaign efficiency, optimize budget allocation, and ensure your business model remains sustainably profitable."
            facts={[
                {
                    stat: "Formula",
                    label: "Total Spend ÷ New Customers",
                    detail: "CAC is calculated by dividing your total sales and marketing expenses by the number of new customers acquired in the same period. Only count new customers — including returning buyers will artificially deflate your true acquisition cost."
                },
                {
                    stat: "CAC ≠ CPA",
                    label: "Know the Difference",
                    detail: "CPA tracks the cost of a single conversion on one ad platform. CAC is a fully loaded business metric that includes salaries, commissions, tools, overhead, and every dollar spent across all channels to win a customer."
                },
                {
                    stat: "3:1",
                    label: "The Golden Ratio",
                    detail: "A sustainable business targets an LTV:CAC ratio of 3:1 — your customer's lifetime value should be three times the cost to acquire them. Below 1:1, you're losing money. Above 5:1, you may be under-investing in growth."
                }
            ]}
        />
    )
}
