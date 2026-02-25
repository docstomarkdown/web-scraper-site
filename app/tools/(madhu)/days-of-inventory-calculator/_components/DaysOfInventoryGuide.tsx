"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ShieldCheck, Activity, Timer, BookOpen } from "lucide-react"

export function DaysOfInventoryGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About This Process"
            icon={BookOpen}
            items={[
                {
                    title: "The Safety Stock Illusion",
                    description: "Many businesses confuse 'safety stock' with 'buffer stock.' Safety stock is a statistical calculation based on demand variability and lead time uncertainty—not just an arbitrary number you feel comfortable with.",
                    icon: ShieldCheck,
                    stat: "2.5x",
                    statLabel: "Standard Deviation",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Proper safety stock should cover 2-3 standard deviations of demand variability during lead time."
                },
                {
                    title: "The Timeframe Trap",
                    description: "Using monthly velocity data can mask critical daily or weekly fluctuations. A product averaging 300 units/month might sell 5/day for 3 weeks, then 50/day during week 4—leading to hidden stockouts.",
                    icon: Activity,
                    stat: "73%",
                    statLabel: "Forecast Error",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "The Lead Time Blindspot",
                    description: "Your runway calculation tells you when stock hits zero—but you need to reorder when stock equals your safety buffer PLUS lead time demand. Waiting too long means guaranteed stockouts.",
                    icon: Timer,
                    stat: "Runway - Lead Time",
                    statLabel: "Reorder Trigger",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
        />
    )
}
