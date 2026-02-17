"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, PieChart } from "lucide-react"

export function CouponROIHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Campaign Costs",
                    description: "Input your total marketing spend (ads, printing) and the number of coupons redeemed.",
                    icon: DollarSign
                },
                {
                    title: "Input Sales Metrics",
                    description: "Add your Average Order Value (AOV), the discount amount per order, and your profit margin.",
                    icon: Calculator
                },
                {
                    title: "Analyze ROI",
                    description: "Review your Net Profit and ROI percentage. Check the break-even point to see if your volume is sufficient.",
                    icon: PieChart
                }
            ]}
        />
    )
}
