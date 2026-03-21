"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Users, MousePointerClick, DollarSign, BookOpen, TrendingUp } from "lucide-react"

export function EmailROIGuide() {
    return (
        <ToolGuide
            title="What the Pros Know About Email ROI"
            icon={BookOpen}
            items={[
                {
                    title: "List Quality Beats List Size",
                    description: "Having 100,000 subscribers means nothing if they don't open. In fact, sending to unengaged users actively increases your 'Campaign Cost' while tanking your ROI. Cleaning your list immediately boosts profitability.",
                    icon: Users,
                    stat: "Clean Lists",
                    statLabel: "Higher Profits",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Stop paying email providers to send to inactive addresses.",
                },
                {
                    title: "The True Test is CTOR",
                    description: "Notice how our tool calculates Clicks based on your Opened emails, not Total Sent? This is called Click-To-Open Rate. If this number drops below 10%, your email body or CTA needs an urgent rewrite.",
                    icon: MousePointerClick,
                    stat: "10%+",
                    statLabel: "Target CTOR",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Subject lines get opens. Good copy gets clicks.",
                },
                {
                    title: "Not All Campaigns Are Equal",
                    description: "A general weekly newsletter might only convert at 1%, but an automated 'Abandoned Cart' flow can easily convert at 10%. Run this calculator separately for different email types to find your real money-makers.",
                    icon: TrendingUp,
                    stat: "Segment",
                    statLabel: "By Campaign",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Automated flows always have higher ROI than manual broadcasts.",
                },
            ]}
        />
    )
}
