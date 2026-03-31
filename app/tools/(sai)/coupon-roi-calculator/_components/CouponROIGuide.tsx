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
                    title: "Analyze Coupon ROI",
                    description: "Coupon ROI measures the **true profitability** of your discount campaign. It effectively compares the net profit generated from coupon sales against the **total variable costs** like media spend and discount deductions.",
                    icon: TrendingUp,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Net",
                    statLabel: "Profitability"
                },
                {
                    title: "Find Your Break-even",
                    description: "Discover the specific **number of redemptions** required to offset your campaign investments. Falling short of this metric means your campaign is operating at a **monetary loss**.",
                    icon: Target,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                },
                {
                    title: "The True Cost of Discounts",
                    description: "Discounts disproportionately impact net profit, not just top-line revenue. For instance, an aggressive **20% discount** on a standard 30% margin realistically slashes your exact net profit by **66%**.",
                    icon: DollarSign,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                }
            ]}
        />
    )
}
