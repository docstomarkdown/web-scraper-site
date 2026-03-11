"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"
export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your ROI"
            steps={[
                {
                    title: "Campaign Costs",
                    description: "Start by entering your <strong>Influencer Fee</strong>. You can also optionally include any extra paid <strong>Ad Spend</strong> used to boost the campaign.",
                    icon: DollarSign
                },
                {
                    title: "Sales Metrics",
                    description: "Input your <strong>Average Selling Price</strong> and the <strong>Total Orders</strong> driven by the influencer to instantly generate your Gross ROI.",
                    icon: ShoppingCart
                },
                {
                    title: "Product Costs",
                    description: "For the most precise final ROI, input your <strong>Product Cost per Item</strong> and <strong>Shipping</strong>. This transforms your primary result from a Gross Estimate into your <strong>True Net Profit</strong>.",
                    icon: Package
                }
            ]}
        />
    )
}
