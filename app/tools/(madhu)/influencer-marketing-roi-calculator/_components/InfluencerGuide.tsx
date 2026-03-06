"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingUp, ShoppingCart, DollarSign, BookOpen } from "lucide-react"
export function InfluencerGuide() {
    return (
        <ToolGuide
            title="What Your ROI Numbers Actually Mean"
            icon={BookOpen}
            items={[
                {
                    title: "Gross ROI vs. Net Profit ROI",
                    description: "If you only fill out the mandatory fields (<strong>Fee</strong>, <strong>Selling Price</strong>, <strong>Orders</strong>), you are calculating a <strong>Gross ROI</strong> (or <strong>ROAS</strong>). This tells you the pure marketing efficiency of the campaign. If you fill out the optional <strong>Product</strong> and <strong>Shipping</strong> costs, you are calculating a <strong>True Net Profit ROI</strong>. Both are incredibly valuable metrics depending on what you are optimizing.",
                    icon: TrendingUp,
                    stat: "Accuracy",
                    statLabel: "Calculation Mode",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Your Profit and ROI dials will auto-adjust based on whether you want a quick Gross estimate or a deep Net Profit breakdown."
                },
                {
                    title: "Why Variable Costs Matter at Scale",
                    description: "Optional fields like <strong>Product Cost</strong> and <strong>Shipping</strong> are <strong>Variable Costs</strong>. Unlike the <strong>Influencer Fee</strong> (which is a one-time fixed cost), variable costs scale with every single order. On a campaign with 1,000 orders, leaving out a $5 shipping cost means your estimated profit is artificially inflated by $5,000. Add it to the 'Product Costs' section to see the real impact.",
                    icon: ShoppingCart,
                    stat: "Per Order",
                    statLabel: "Scale Economics",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Inputting Product and Shipping Costs allows the calculator to show you your exact 'Profit Per Order' margin."
                },
                {
                    title: "When a Negative ROI is Still a 'Win'",
                    description: "Sometimes a calculated ROI of <strong>-10%</strong> isn't actually a failure. If you ran a campaign where the primary goal was acquiring high-quality User Generated Content (UGC) for your own ads, or growing your brand following, you must consider those secondary assets. If the UGC lowers your facebook ad <strong>CPA</strong> next week, the influencer campaign was a success.",
                    icon: DollarSign,
                    stat: "Brand Value",
                    statLabel: "Beyond the Math",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Use this tool to track direct response math, but always weigh it against the qualitative branding assets obtained."
                }
            ]}
        />
    )
}
