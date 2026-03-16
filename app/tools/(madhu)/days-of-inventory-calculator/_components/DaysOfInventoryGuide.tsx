"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ShieldCheck, Clock, Bell, BookOpen } from "lucide-react"
export function DaysOfInventoryGuide() {
    return (
        <ToolGuide
            title="Understanding Your Inventory Runway"
            icon={BookOpen}
            items={[
                {
                    title: "What is Safety Stock?",
                    description: "Safety stock acts as an emergency buffer against unexpected shipping delays or sudden spikes in demand. It ensures you never run completely out of product unexpectedly.",
                    icon: ShieldCheck,
                    stat: "Buffer",
                    statLabel: "Emergency Units",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Your baseline stock kept purely for emergencies."
                },
                {
                    title: "Choosing the Right Timeframe",
                    description: "While monthly data provides a good high-level overview, tracking your average sales speed on a daily or weekly basis captures sudden fluctuations earlier and more accurately.",
                    icon: Clock,
                    stat: "Daily",
                    statLabel: "Best Precision",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Timing Your Reorders",
                    description: "Your Actionable Stock Runway tells you exactly how many days of inventory you have left before hitting your safety buffer. Aim to reorder right before this number hits zero!",
                    icon: Bell,
                    stat: "Actionable",
                    statLabel: "Remaining Days",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
        />
    )
}
