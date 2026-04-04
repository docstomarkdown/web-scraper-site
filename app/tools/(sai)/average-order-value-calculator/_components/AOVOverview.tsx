"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function AOVOverview() {
    return (
        <ToolOverview
            heading="What is the AOV Calculator?"
            headingAccent="AOV Calculator"
            definition="The Average Order Value (AOV) Calculator is a free, simple tool that helps online businesses measure how much money they earn on each customer order. Just enter your total revenue and number of orders, and the tool instantly calculates your AOV—showing whether your store is attracting high-value buyers or needs improvement. Used by ecommerce owners, marketers, DTC brands, Shopify/WooCommerce sellers, and analytics teams, it reveals how effectively your store converts traffic into revenue and helps you identify opportunities to grow basket size."
            facts={[
                {
                    stat: "Instant",
                    label: "AOV Calculation",
                    detail: "Quickly see how much revenue you earn per order with just two inputs—no complex formulas or spreadsheets needed."
                },
                {
                    stat: "Clear",
                    label: "Revenue Insights",
                    detail: "Understand your total revenue, order count, and (optional) revenue per customer to spot buying patterns and performance trends."
                },
                {
                    stat: "Actionable",
                    label: "Growth Ideas",
                    detail: "Get smart suggestions—like bundles, upsells, and free-shipping thresholds—to help you increase your store’s average order value."
                }
            ]}
        />
    )
}
