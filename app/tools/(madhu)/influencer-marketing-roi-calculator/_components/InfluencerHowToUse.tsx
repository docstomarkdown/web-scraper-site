"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Package, TrendingUp } from "lucide-react"
export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your ROI"
            steps={[
                {
                    title: "Campaign Costs",
                    description: "Input your <strong>Influencer Fee</strong> and optional <strong>Ad Spend</strong>. See your <strong>Total Cost</strong> breakdown instantly.",
                    icon: DollarSign
                },
                {
                    title: "Add Sales Data",
                    description: "Enter <strong>Average Selling Price</strong> and <strong>Total Orders</strong>. View your <strong>Total Revenue</strong> and <strong>ROI</strong> percentage.",
                    icon: TrendingUp
                },
                {
                    title: "Product Costs",
                    description: "Add <strong>Product Cost</strong> and <strong>Shipping</strong> for accurate <strong>Net Profit</strong> and <strong>Profit per Order</strong> calculations.",
                    icon: Package
                }
            ]}
        />
    )
}
