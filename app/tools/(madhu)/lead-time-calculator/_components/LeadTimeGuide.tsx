"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Factory, Ship, Clock, BookOpen } from "lucide-react"
export function LeadTimeGuide() {
    return (
        <ToolGuide
            title="Understanding Your Lead Time Components"
            icon={BookOpen}
            items={[
                {
                    title: "Supplier Production Time",
                    description: "This is the 'In-Factory' duration. It covers everything from raw material sourcing to final assembly. Even a 1-day delay here cascades through your entire supply chain.",
                    icon: Factory,
                    stat: "Core",
                    statLabel: "Manf. Pillar",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Includes quality checks and packaging before the goods leave the factory."
                },
                {
                    title: "Transit & Logistics",
                    description: "Calculates the time spent on water, air, or road. Includes customs clearance and port drayage—often the most unpredictable part of your lead time.",
                    icon: Ship,
                    stat: "Global",
                    statLabel: "Freight Path",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600"
                },
                {
                    title: "The Critical Safety Buffer",
                    description: "A 15-20% buffer is industry standard. While optional in this tool, including it ensures your 'Est. Delivery Date' accounts for unexpected delays.",
                    icon: Clock,
                    stat: "Optional",
                    statLabel: "Safety Margin",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600"
                }
            ]}
        />
    )
}