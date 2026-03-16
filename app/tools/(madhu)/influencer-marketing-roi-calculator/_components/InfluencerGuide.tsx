"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Percent, Box, Target, BookOpen } from "lucide-react"
export function InfluencerGuide() {
    return (
        <ToolGuide
            title="Measuring Influencer Growth & ROI"
            icon={BookOpen}
            items={[
                {
                    title: "Gross ROAS vs. Net Profit ROI",
                    description: "Fill the core fields (<strong>Fee, Price, Orders</strong>) for a quick <strong>ROAS estimate</strong>. Add <strong>Product Costs</strong> to transition into a <strong>Net Profit ROI</strong> calculation—perfect for seeing exactly what you cleared after fulfillment.",
                    icon: Percent,
                    stat: "ROI Modes",
                    statLabel: "Gross or Net",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "Your Profit and ROI results will automatically adjust based on how much data you provide."
                },
                {
                    title: "Scaling with Variable Costs",
                    description: "Unlike the <strong>Influencer Fee</strong> (one-time cost), <strong>Product</strong> and <strong>Shipping</strong> costs scale with every sale. Adding these allows the tool to display your <strong>Profit Per Order</strong>, which is critical for high-volume campaigns.",
                    icon: Box,
                    stat: "Per Order",
                    statLabel: "Unit Economics",
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600",
                    statColor: "text-green-700",
                    tooltip: "Tracking unit economics ensures your campaign remains profitable even as order volume grows exponentially."
                },
                {
                    title: "The Silent Cost of Gifting",
                    description: "If you didn't pay a cash fee but sent a <strong>Free Product</strong> instead, you must still track its value. Enter the <strong>COGS (Product Cost)</strong> of the gifted item into the <strong>Influencer Fee</strong> field. Failing to do this hides your true investment and results in an inflated, inaccurate ROI.",
                    icon: Target,
                    stat: "COGS as Fee",
                    statLabel: "Gifted ROI",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-700",
                    tooltip: "Tracking the replacement cost of gifted products ensures you know exactly when a 'Free' shoutout actually becomes profitable."
                }
            ]}
        />
    )
}
