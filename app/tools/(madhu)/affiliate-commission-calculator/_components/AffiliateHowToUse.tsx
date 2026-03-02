"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Percent, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react"

export function AffiliateHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Configure Product & Pricing",
                    description: "Select your <strong>preferred currency</strong> and input your <strong>Product Price</strong> and <strong>Product Cost (COGS)</strong>. This sets the foundation for calculating your accurate gross margin per sale.",
                    icon: DollarSign
                },
                {
                    title: "Set Affiliate Performance Settings",
                    description: "Input your target <strong>Commission Rate</strong> and the number of <strong>Active Affiliates</strong> with their <strong>Average Sales</strong>. This helps project your total payout liability.",
                    icon: Percent
                },
                {
                    title: "Factor in Refund Realities",
                    description: "Add your estimated <strong>Refund Rate</strong>. This tool automatically deducts refunded units so you see the <strong>Net Revenue</strong> you actually keep—not just gross numbers.",
                    icon: TrendingUp
                },
                {
                    title: "Analyze Payout Sustainability",
                    description: "Instantly view your <strong>Total Payout</strong> and <strong>Net Profit</strong>. Check the <strong>Profit Safe / Loss Warning</strong> badge to ensures your commissions remain sustainable.",
                    icon: AlertCircle
                }
            ]}
            goal={{
                title: "Build a Profitable Program",
                description: "The goal is to design a commission structure that attracts top-tier talent while remaining mathematically sustainable even after costs and refunds.",
                icon: ShieldCheck
            }}
        />
    )
}
