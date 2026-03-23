"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function DaysOfInventoryOverview() {
    return (
        <ToolOverview
            heading="Days of Inventory"
            headingAccent="Remaining Calculator"
            definition="Designed to accurately forecast stock runway and prevent costly stockouts, this calculator is an essential tool for eCommerce brands, inventory managers, and retail operators. Simply enter your current stock levels and sales velocity, and the tool will automatically calculate your exact zero-out date—giving you the perfect timeline to reorder without overextending your cash flow."
            facts={[
                {
                    stat: "Actionable Timeline",
                    label: "Stock Runway",
                    detail: "Know exactly how many days of stock you have left before hitting 0.",
                },
                {
                    stat: "Prevent Stockouts",
                    label: "Smart Forecasting",
                    detail: "Accurately predict your zero-out date so you can reorder proactively.",
                },
                {
                    stat: "Optimize Cash Flow",
                    label: "Avoid Overstock",
                    detail: "Identify items that are sitting on shelves too long and tying up capital.",
                }
            ]}
        />
    )
}
