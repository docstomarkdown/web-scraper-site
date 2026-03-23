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
                    title: "Simple Estimates vs. Deep Analysis",
                    description: "Using the default view is perfect for a quick ROI check. If you want to know exactly where your budget went and see a <strong>Budget Split</strong> pie chart, click 'Add Details'. This lets you separate the impact of cash fees, ad spend, and product costs.",
                    icon: Percent,
                    stat: "ROI Modes",
                    statLabel: "Simple & Deep",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "The advanced 'Add Details' mode automatically sums your granular expenses into a total Campaign Cost."
                },
                {
                    title: "The Silent Cost of Gifting",
                    description: "If you didn't pay a cash fee but sent a <strong>Free Product</strong> instead, you must still track its value. Under 'Add Details', enter the <strong>Product Cost (COGS)</strong> of the gifted item to ensure your ROI reflects the actual replacement value, not an inflated $0 cost.",
                    icon: Box,
                    stat: "COGS matters",
                    statLabel: "Gifted Limits",
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600",
                    statColor: "text-green-700",
                    tooltip: "Tracking product costs ensures you know exactly when a 'Free' shoutout actually becomes profitable."
                },
                {
                    title: "Understanding 'Good' ROI",
                    description: "A positive ROI means you made money, while anything below 0% is a loss. However, even break-even campaigns (0% ROI) can be highly valuable if they provide you with high-quality user-generated content (UGC) for future ad creatives or massive brand awareness.",
                    icon: Target,
                    stat: "100%",
                    statLabel: "Strong Target",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-700",
                    tooltip: "Direct-response marketers typically target 100%+ ROI, but brand-builders often accept break-even for content."
                }
            ]}
        />
    )
}
