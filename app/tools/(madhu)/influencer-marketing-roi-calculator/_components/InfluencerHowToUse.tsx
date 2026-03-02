"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"

export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your Campaign ROI"
            steps={[
                {
                    title: "Enter Your Campaign Costs",
                    description: "Start with your fixed marketing spend. Enter the <strong>Influencer Fee</strong> — the flat fee paid directly to the creator — and any <strong>Ad Spend</strong> used to boost or promote the campaign across paid channels.",
                    icon: DollarSign
                },
                {
                    title: "Add Your Product Costs",
                    description: "Enter the <strong>Product Cost per Item</strong> (your cost to manufacture or purchase each unit) and the <strong>Shipping Cost</strong> per order. These are your per-unit variable costs and are automatically scaled by Total Orders in the calculation.",
                    icon: Package
                },
                {
                    title: "Fill In Your Sales Data",
                    description: "Enter the <strong>Selling Price</strong> per unit (what the customer pays) and the <strong>Total Orders</strong> generated from the campaign. The tool uses these to calculate your Total Revenue automatically.",
                    icon: ShoppingCart
                },
                {
                    title: "Read Your Results",
                    description: "Instantly see your <strong>ROI %</strong>, <strong>Net Profit</strong>, <strong>Total Revenue</strong>, <strong>Total Cost</strong>, and <strong>Profit per Order</strong>. The Cost Breakdown chart shows exactly where your budget was spent across all four cost categories.",
                    icon: TrendingUp
                }
            ]}
            goal={{
                title: "Know Your Numbers, Negotiate Better",
                description: "Stop guessing whether your influencer campaigns are profitable. This tool gives you a clear, data-driven breakdown of every dollar spent and earned — so you can cut underperforming partnerships and double down on what works.",
                icon: TrendingUp
            }}
        />
    )
}
