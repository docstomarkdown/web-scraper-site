"use client"
import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview"

export function NetProfitOverview() {
    return (
        <ToolOverview
            heading="Why Use Net Profit Calculator?"
            headingAccent="Net Profit Calculator"
            definition="The primary purpose of the Net Profit Calculator is to find your business's true take-home pay after absolutely every cost is deducted. Built for e-commerce owners and service founders, this tool moves beyond 'Revenue' to show you the real cash left in your pocket. It is your essential tool for understanding the distribution of every dollar—from product costs and ad spend to overhead and taxes—so you never mistake sales for income."
            facts={[
                {
                    stat: "True Income",
                    label: "Know Your Profit",
                    detail: "The tool's most important job is revealing your final 'Take-Home' dollar amount after COGS, ads, overhead, and taxes are all accounted for."
                },
                {
                    stat: "Expense Data",
                    label: "Cost Breakdown",
                    detail: "Instantly visualize how your revenue is distributed. The tool breaks down every category so you see exactly where your profit is leaking."
                },
                {
                    stat: "Tax Aware",
                    label: "Cash Flow Safety",
                    detail: "Factors in your estimated tax rate automatically, ensuring you never spend money that belongs to the government, protecting your future cash flow."
                }
            ]}
            accent="blue"
        />
    )
}
