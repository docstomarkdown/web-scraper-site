"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"
export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your ROI"
            steps={[
                {
                    title: "Investment Details",
                    description: "Enter the <strong>Influencer Fee</strong> and <strong>Ad Spend</strong> to capture your total upfront campaign investment.",
                    icon: DollarSign
                },
                {
                    title: "Cost Allocation",
                    description: "Add your <strong>Product Cost per Item</strong> and <strong>Shipping Cost</strong> to factor in fulfillment expenses.",
                    icon: Package
                },
                {
                    title: "Performance Analysis",
                    description: "Input the <strong>Average Selling Price</strong> and <strong>Total Orders</strong> to see your net profit and final ROI.",
                    icon: ShoppingCart
                }
            ]}
        />
    )
}
