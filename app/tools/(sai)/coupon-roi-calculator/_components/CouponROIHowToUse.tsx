"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, PieChart } from "lucide-react"
export function CouponROIHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Step 1: Input Promo Data",
                    description: "Enter your total media spend, the number of codes redeemed, and your average cart size before applying the discount.",
                    icon: DollarSign
                },
                {
                    title: "Step 2: Add Profit Mechanics",
                    description: "Input the per-order monetary discount and your standard baseline margin percentage to capture true profitability impact.",
                    icon: Calculator
                },
                {
                    title: "Step 3: Review Full ROI",
                    description: "Instantly check your dynamic net profitability breakdown and verify whether the specific campaign achieved its financial target.",
                    icon: PieChart
                }
            ]}
        />
    )
}