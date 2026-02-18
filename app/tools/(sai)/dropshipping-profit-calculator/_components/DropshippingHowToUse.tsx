"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingBag, Truck, RefreshCcw, Wallet } from "lucide-react"

export function DropshippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Costs",
                    description: "First, enter your selling price and the product cost from your supplier. This is the starting point for calculating your profit.",
                    icon: ShoppingBag
                },
                {
                    title: "Add Shipping & Ads",
                    description: "Input your shipping costs and ad spend (CPA). These are critical expenses that directly impact your final profit.",
                    icon: Truck
                },
                {
                    title: "Set RTO Percentage",
                    description: "Enter your expected Return to Origin (RTO) rate. Returned orders are a major cost in dropshipping, so it's important to factor this in.",
                    icon: RefreshCcw
                },
                {
                    title: "View Your Profit",
                    description: "Instantly see your net profit, margins, and the Break-Even CPA needed to ensure your business stays profitable.",
                    icon: Wallet
                }
            ]}
        />
    )
}
