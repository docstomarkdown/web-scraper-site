"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function PoshmarkOverview() {
    return (
        <ToolOverview
            heading="What is Poshmark Fee Calculator?"
            headingAccent="Poshmark Fee Calculator"
            definition="The Poshmark Fee Calculator is a free tool that shows how much money you actually receive after marketplace fees when you sell a product online. Enter your selling price and costs to instantly see your final payout and profit. Used by online sellers and resellers, it helps you price items correctly, understand real earnings, and avoid underpricing—so you know exactly how much you make before selling."
            facts={[
                {
                    stat: "Know Your",
                    label: "Real Earnings",
                    detail: "See exactly how much money you receive after marketplace fees, so there are no surprises after a sale."
                },
                {
                    stat: "Understand Your",
                    label: "Profit per Sale",
                    detail: "Quickly calculate how much you actually earn after costs, helping you decide if a product is worth selling."
                },
                {
                    stat: "Price With",
                    label: "Confidence",
                    detail: "Set the right selling price by understanding fees and profit, so you don't underprice or lose money."
                }
            ]}
            accent="blue"
        />
    )
}
