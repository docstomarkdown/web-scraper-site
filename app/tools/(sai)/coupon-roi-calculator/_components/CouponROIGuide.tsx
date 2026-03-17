"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Target, TrendingUp, BarChart2, DollarSign } from "lucide-react"
export function CouponROIGuide() {
    return (
        <ToolGuide
            title="Understanding Coupon ROI"
            icon={Target}
            items={[
                {
                    title: "What is Coupon ROI?",
                    description: "Coupon ROI measures the profitability of a discount campaign. It compares the net profit generated from coupon-driven sales against the total cost of the campaign (media spend + discount value).",
                    icon: TrendingUp,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Positive",
                    statLabel: "Target ROI"
                },
                {
                    title: "Break-even Point",
                    description: "The number of redemptions needed to cover your campaign costs. If you don't reach this number, the campaign loses money. It's calculated by dividing Campaign Cost by (Profit per Order - Discount).",
                    icon: BarChart2,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                },
                {
                    title: "True Cost of Discounting",
                    description: "A 20% discount doesn't just reduce revenue by 20% - it reduces profit by much more. If your margin is 30%, a 20% discount slashes your profit by 66%.",
                    icon: DollarSign,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                }
            ]}
        />
    )
}
