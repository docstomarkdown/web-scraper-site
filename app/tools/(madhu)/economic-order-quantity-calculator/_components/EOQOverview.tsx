"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function EOQOverview() {
    return (
        <ToolOverview
            heading="Why Use EOQ Calculator?"
            headingAccent="EOQ Calculator"
            definition="The primary purpose of the EOQ Calculator is to find the mathematically perfect balance between your ordering costs and storage costs. Used by e-commerce brands and inventory planners, this tool identifies the exact order size that minimizes your total annual spending. Instead of guessing, you get a data-driven strategy to stop overstocking, reduce shipping frequency, and keep your cash flow healthy."
            facts={[
                {
                    stat: "Cost Balance",
                    label: "Minimize Spending",
                    detail: "The tool's most important job is finding the 'sweet spot' where your combined shipping fees and storage rent are at their lowest."
                },
                {
                    stat: "Actionable Data",
                    label: "Order Frequency",
                    detail: "Instantly know exactly how many times a year to reorder and the precise number of days to wait between every shipment."
                },
                {
                    stat: "Cash Efficiency",
                    label: "Inventory ROI",
                    detail: "Stop tying up thousands in excess stock. Use these calculations to keep your inventory lean while ensuring you never miss a sale."
                }
            ]}
            accent="indigo"
        />
    )
}
