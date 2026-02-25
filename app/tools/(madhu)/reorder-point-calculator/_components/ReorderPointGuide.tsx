"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertCircle, Timer, Warehouse, BookOpen } from "lucide-react"

export function ReorderPointGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About This Process"
            icon={BookOpen}
            items={[
                {
                    title: "The Marketplace Ranking Tax",
                    description: "Running out of stock doesn't just lose sales today—it destroys your search rank. Markets like Amazon prioritize 'In-Stock' reliability over almost everything else.",
                    icon: AlertCircle,
                    stat: "42%",
                    statLabel: "Rank Recovery Risk",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "Recovering your previous ranking can take 3x longer than the duration of the stock-out."
                },
                {
                    title: "The Lead Time Illusion",
                    description: "Sellers often forget 'Admin Time'. If it takes you 3 days to approve an invoice, your lead time is 3 days longer than the factory says. Factor this into your calculation.",
                    icon: Timer,
                    stat: "+3 Days",
                    statLabel: "Admin Buffer",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Capital Opportunity Cost",
                    description: "Setting an ROP too high wastes cash. Every $1 tied up in excessive safety stock is $1 you can't spend on new product launches or marketing.",
                    icon: Warehouse,
                    stat: "22%",
                    statLabel: "Capital Drag",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
        />
    )
}
