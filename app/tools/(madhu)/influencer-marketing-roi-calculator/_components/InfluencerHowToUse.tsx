"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Wallet, Box, ShoppingCart } from "lucide-react"
export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Campaign Success"
            steps={[
                {
                    title: "Campaign Costs",
                    description: "Enter the fixed <strong>Influencer Fee</strong> and any optional <strong>Ad Spend</strong> used to boost the campaign reach.",
                    icon: Wallet
                },
                {
                    title: "Unit Profitability",
                    description: "Add your <strong>Product Cost</strong> and <strong>Shipping</strong> to calculate a true net profit rather than just a gross revenue estimate.",
                    icon: Box
                },
                {
                    title: "Sales Results",
                    description: "Input your <strong>Selling Price</strong> and <strong>Total Orders</strong> to instantly see your <strong>ROI</strong> and <strong>Profit per Order</strong>.",
                    icon: ShoppingCart
                }
            ]}
        />
    )
}
