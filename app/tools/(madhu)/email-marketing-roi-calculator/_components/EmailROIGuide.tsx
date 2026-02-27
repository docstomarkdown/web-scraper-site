"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Target, DollarSign, TrendingUp, BookOpen } from "lucide-react"

export function EmailROIGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Email Marketing ROI"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Vanity Metric' Trap",
                    description:
                        "High open rates feel good, but they don't pay the bills. A campaign with 15% opens and 5% clicks is often far more profitable than 30% opens and 1% clicks. Always optimize for the action closest to the sale — clicks and conversions, not opens.",
                    icon: Target,
                    stat: "Profit",
                    statLabel: "Over Popularity",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Don't optimize for opens at the expense of clearer, sales-focused subject lines.",
                },
                {
                    title: "The $1 Subscriber Rule",
                    description:
                        "A healthy, engaged email list should generate roughly $1 per subscriber per month. If your <strong>Revenue per Subscriber</strong> is significantly lower (e.g., $0.10), your list may be 'cold' or your offers aren't resonating. Use segmentation and re-engagement campaigns to fix this.",
                    icon: DollarSign,
                    stat: "$1.00",
                    statLabel: "Target Rev/Sub",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Revenue per Subscriber is a key health metric for your email program.",
                },
                {
                    title: "CPA vs. LTV Context",
                    description:
                        "Don't panic if your Cost Per Acquisition (CPA) seems high on a single email. If your Customer Lifetime Value (LTV) is high, you can afford more to acquire a customer because they'll buy again later without additional ad spend — making the first campaign ROI misleading.",
                    icon: TrendingUp,
                    stat: "LTV",
                    statLabel: "Wins Long Term",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Consider the long-term value of a customer, not just the revenue from the first sale.",
                },
            ]}
        />
    )
}
