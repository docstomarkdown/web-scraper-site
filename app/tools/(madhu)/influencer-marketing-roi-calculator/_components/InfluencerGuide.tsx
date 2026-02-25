"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingUp, Target, Gift, BookOpen } from "lucide-react"

export function InfluencerGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Influencer Marketing ROI"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Halo Effect' Lag",
                    description: "Influencer campaigns rarely pay off on Day 1. Data shows that 40% of sales occur 7-30 days *after* the post goes live. Judging a campaign's ROI in the first 48 hours will almost always result in a false negative.",
                    icon: TrendingUp,
                    stat: "30 Days",
                    statLabel: "Attribution Win.",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "The standard window needed to capture the full tail of influencer-driven conversions."
                },
                {
                    title: "The Whitelisting Standard",
                    description: "Organic reach is dying. The most profitable brands now budget an additional 30-50% of the influencer fee specifically for 'Whitelisting' (boosting the creator's post as an ad), which typically doubles the ROAS.",
                    icon: Target,
                    stat: "+120%",
                    statLabel: "ROAS Lift",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Average increase in return on ad spend when organic posts are boosted with paid media."
                },
                {
                    title: "Content Decoupling",
                    description: "Smart brands view the 'Influencer Fee' as a 'Content Production Fee'. Even if the post drives zero sales, acquiring high-quality UGC for $500 is often cheaper than hiring a professional studio (avg $2,500/day).",
                    icon: Gift,
                    stat: "$2k",
                    statLabel: "Studio Savings",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Money saved by using influencer-generated content instead of booking a professional photo shoot."
                }
            ]}
        />
    )
}
