"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Percent, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react"
export function AffiliateHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Pricing & Cost",
                    description: "Enter the <strong>Selling Price</strong> and <strong>Product Cost</strong> to define your base profit margin per unit.",
                    icon: DollarSign
                },
                {
                    title: "Affiliate Forecast",
                    description: "Input the <strong>Number of Active Affiliates</strong> and <strong>Average Sales</strong> to project your program's total volume.",
                    icon: Percent
                },
                {
                    title: "Program Expenses",
                    description: "Set your <strong>Commission Rate</strong> and <strong>Refund Rate</strong> to calculate final payouts and net earnings.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
