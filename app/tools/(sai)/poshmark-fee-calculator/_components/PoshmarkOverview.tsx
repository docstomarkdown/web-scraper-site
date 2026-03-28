"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function PoshmarkOverview() {
    return (
        <ToolOverview
            heading="Why Use Poshmark Fee Calculator?"
            headingAccent="Poshmark Fee Calculator"
            definition="The primary purpose of the Poshmark Fee Calculator is to instantly reveal your exact net payout and true profit margin on any sale. Built for Poshmark sellers, thrifters, and boutique owners, this tool seamlessly processes the platform's tiered fee structure alongside your shipping discounts and item costs. It is your essential tool for pricing items strategically, evaluating 'Offer to Likers' profitability, and ensuring your resale business remains highly lucrative."
            facts={[
                {
                    stat: "Instant",
                    label: "Payout Projection",
                    detail: "Instantly calculate your true earnings after Poshmark's flat $2.95 fee or 20% commission is deducted."
                },
                {
                    stat: "Net",
                    label: "Profit Insights",
                    detail: "Enter your original item cost to immediately discover your actual net profit and precise profit margin percentage."
                },
                {
                    stat: "Discount",
                    label: "Impact Analysis",
                    detail: "Simulate shipping discounts required for 'Offer to Likers' to see exactly how they affect your final take-home pay."
                }
            ]}
            accent="blue"
        />
    )
}
