"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Percent, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react"

export function AffiliateHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Product Details",
                    description: "Input your retail **Price** and **Product Cost (COGS)**. This is the foundation for calculating your true net profit margin.",
                    icon: DollarSign
                },
                {
                    title: "Set Commission & Refunds",
                    description: "Add your **Commission Rate** and estimated **Refund Rate**. The tool automatically deducts refunds so you see the real payout liability.",
                    icon: Percent
                },
                {
                    title: "Scale the Numbers",
                    description: "Use the **Active Affiliates** inputs to simulate bulk payouts. See exactly how much cash you need to pay 10, 50, or 100 partners.",
                    icon: TrendingUp
                },
                {
                    title: "Monitor the 'Loss Warning'",
                    description: "Watch the **Profit Safe / Loss Warning** alert in the results card. It will turn red instantly if your commission rate exceeds your break-even point.",
                    icon: AlertCircle
                }
            ]}
            goal={{
                title: "Eliminate Payout Leaks",
                description: "The goal is to design a commission structure that is competitive for affiliates but rigorously protects your bottom line against refunds and low margins.",
                icon: ShieldCheck
            }}
        />
    )
}
