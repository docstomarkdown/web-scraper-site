"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { MousePointerClick, ShoppingCart, Handshake } from "lucide-react"
export function AffiliateHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Core Campaign Data",
                    description: "Enter your <strong>Affiliate Clicks</strong>, <strong>Average Order Value</strong>, and <strong>Commission Rate</strong> to instantly generate payout estimates.",
                    icon: MousePointerClick
                },
                {
                    title: "Add Costs & Conversion",
                    description: "Add your <strong>Product Cost</strong> to calculate net profit. The <strong>Conversion Rate</strong> is pre-filled at 2.5%, but can be adjusted.",
                    icon: ShoppingCart
                },
                {
                    title: "Analyze Your Results",
                    description: "Instantly view your total <strong>Affiliate Payout</strong>, along with breakdowns for <strong>Revenue</strong>, <strong>Estimated Sales</strong>, and <strong>Net Profit</strong>.",
                    icon: Handshake
                }
            ]}
        />
    )
}
