"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingBag, Truck, RefreshCcw, Wallet } from "lucide-react"

export function DropshippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Costs",
                    description: "Start by entering your selling price and product cost from your supplier. This is the foundation of your margin analysis.",
                    icon: ShoppingBag
                },
                {
                    title: "Add Shipping & Ads",
                    description: "Input your shipping costs and ad spend (CPA). These often overlooked costs are what truly determine your net profitability.",
                    icon: Truck
                },
                {
                    title: "Set RTO Percentage",
                    description: "Factor in your expected Return to Origin (RTO) rate. In COD markets, this is the #1 reason dropshippers lose money.",
                    icon: RefreshCcw
                },
                {
                    title: "View Your Profit",
                    description: "Instantly see your net profit, margins, and the Break-Even CPA you need to hit to stay in the green.",
                    icon: Wallet
                }
            ]}
        />
    )
}
