"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingDown, AlertTriangle, Clock, BookOpen } from "lucide-react"
export function LeadTimeGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Supply Chain Lead Times"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Golden Ratio' Buffer",
                    description: "Successful e-commerce sellers add a 15-20% buffer to their total lead time. If your calculated time is 50 days, plan for 60. This prevents emergency air freight costs.",
                    icon: TrendingDown,
                    stat: "15-20%",
                    statLabel: "Recommended Buffer",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600",
                    tooltip: "Account for holidays like Chinese New Year where production stops for 3 weeks."
                },
                {
                    title: "Hidden 'QC' Delays",
                    description: "Most calculators ignore the 'Repair Time' if a Quality Control (QC) check fails. A failed check can add 7-10 days to your Supplier Time instantly.",
                    icon: AlertTriangle,
                    stat: "+10d",
                    statLabel: "QC Fail Risk",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "The Port Congestion Trap",
                    description: "Sea shipping might be 25 days on water, but 'Port to Door' delivery (getting off the ship) can take an extra 5-7 days at busy ports like LA or Felixstowe.",
                    icon: Clock,
                    stat: "5-7d",
                    statLabel: "Drayage Delay",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
        />
    )
}