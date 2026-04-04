"use client"
import React from "react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function PackagingCostOverview() {
    return (
        <ToolOverview
            heading="What is the Packaging Cost Calculator?"
            headingAccent="Packaging Cost Calculator"
            definition="The Packaging Cost Calculator is a free online tool that helps sellers quickly calculate the total packaging cost per order, including materials and packing time. It shows your cost per unit and total expense instantly for clear cost understanding.This tool is mainly used by eCommerce sellers, small business owners, and fulfillment teams to know their exact packaging costs. It is commonly used on e-commerce tools and cost calculators for quick and accurate profit planning."
            facts={[
                {
                    stat: "Accurate",
                    label: "Hidden Cost Detection",
                    detail: "Reveals the full per-unit packaging cost — materials plus labor — so no expense goes unaccounted for in your pricing."
                },
                {
                    stat: "Instant",
                    label: "Batch Scaling",
                    detail: "Enter your order quantity to instantly project total packaging spend across your entire fulfillment run."
                },
                {
                    stat: "Smarter",
                    label: "Pricing Decisions",
                    detail: "Know your real fulfillment floor cost so you can set prices that protect your margin — not just cover the product."
                }
            ]}
        />
    )
}
