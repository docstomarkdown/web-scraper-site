"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Target, Search, AlertCircle, BookOpen } from "lucide-react"

export function AffiliateGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Commission Structures"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Net Sales' Rule",
                    description: "Many programs mistakenly pay commission on gross sales. This calculator uses the 'Net Sales' standard—deducting the refund rate *before* calculating the payout. This single adjustment can save you 10–15% in payouts annually.",
                    icon: Target,
                    stat: "-15%",
                    statLabel: "Payout Savings",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Recover lost profit by paying on net, not gross."
                },
                {
                    title: "Break-Even Blindness",
                    description: "Most sellers guess their max rate. By entering your COGS, this tool calculates your exact mathematical ceiling. Knowing you can afford 40% (when competitors offer 20%) gives you a massive recruiting advantage.",
                    icon: Search,
                    stat: "Recruiting",
                    statLabel: "Advantage",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "The Refund Double-Whammy",
                    description: "If you pay a commission on a refunded item, you lose the product cost AND the commission cash. Always align your payout schedule (e.g., Net-30) to be longer than your refund window.",
                    icon: AlertCircle,
                    stat: "CRITICAL",
                    statLabel: "Risk Alert",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                }
            ]}
        />
    )
}
