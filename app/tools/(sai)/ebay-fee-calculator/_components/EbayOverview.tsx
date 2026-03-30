"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function EbayOverview() {
    return (
        <ToolOverview
            heading="What is the eBay Fee Calculator?"
            headingAccent="eBay Fee Calculator"
            definition="Designed to compute the net payout of every sale on eBay's global marketplace, this eBay Fee Calculator is used by online sellers, dropshippers, and small business owners to accurately estimate take-home profit after platform overheads. It provides a real-time, visual breakdown of category-specific final value fees, ad spend, and fulfillment costs, enabling you to set competitive prices and protect your margins before you even list an item."
            facts={[
                {
                    stat: "13.25%",
                    label: "Standard FVF",
                    detail: "Uses the specific Final Value Fee tiers for your product category to ensure surgical margin accuracy."
                },
                {
                    stat: "$0.30",
                    label: "Fixed Fee",
                    detail: "Factors in the standard per-order transaction fee, essential for tracking profitability on low-ticket items."
                },
                {
                    stat: "100%",
                    label: "Accurate Profit",
                    detail: "Breaks down all hidden costs—including Promoted Listings and shipping—to reveal your exact net profit margin before you list."
                }
            ]}
        />
    )
}
