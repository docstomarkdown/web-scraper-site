"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { LineChart, Hourglass, Coins, BookOpen } from "lucide-react"
export function ReorderPointGuide() {
    return (
        <ToolGuide
            title="Best Practices for Reordering Inventory"
            icon={BookOpen}
            items={[
                {
                    title: "Protect Your Rankings",
                    description: "Going out of stock (OOS) is the #1 reason for search rank drops. A correctly calculated reorder point ensures you stay live 24/7.",
                    icon: LineChart,
                    stat: "Essential",
                    statLabel: "Rank Protection",
                    iconBg: "bg-blue-50/50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Admin Lead Time",
                    description: "Suppliers often quote production time. Don't forget to add a 2-3 day buffer for shipping prep and receiving at your warehouse.",
                    icon: Hourglass,
                    stat: "+3 Days",
                    statLabel: "Receiving Buffer",
                    iconBg: "bg-purple-50/50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600"
                },
                {
                    title: "Inventory Turnover",
                    description: "Higher reorder points increase your available inventory. Balancing this with Sales Velocity is key to maximizing cash flow efficiency.",
                    icon: Coins,
                    stat: "Optimized",
                    statLabel: "Cash Flow",
                    iconBg: "bg-emerald-50/50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    )
}
