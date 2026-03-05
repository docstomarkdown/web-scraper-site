"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, PieChart } from "lucide-react"
export function CouponROIHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Promo Setup",
                    description: "Enter your discount sum, total code redemptions, and average cart size.",
                    icon: DollarSign
                },
                {
                    title: "Baseline Profit",
                    description: "Input your average foundational margins to assess true monetary impact.",
                    icon: Calculator
                },
                {
                    title: "Check Returns",
                    description: "Instantly discover if the marketing coupon brought in incremental gains.",
                    icon: PieChart
                }
            ]}
        />
    )
}