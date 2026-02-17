"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { BookOpen, Info, Trash2, Truck } from "lucide-react"

export function FBARemovalGuide() {
    return (
        <ToolGuide
            title="Understanding Removal & Disposal Fees"
            icon={BookOpen}
            items={[
                {
                    title: "Removal vs. Disposal",
                    description: "Removal orders ship inventory back to you (or a 3rd party). Disposal orders instruct Amazon to destroy or donate the inventory. The fees are typically identical per unit.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600"
                },
                {
                    title: "2025 Fee Changes",
                    description: "Fees are now more granular for standard size items. Costs have generally increased to discourage long-term storage of slow-moving inventory.",
                    icon: Info,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    stat: "Feb 1",
                    statLabel: "Effective Date",
                    tooltip: "New rates effective from Feb 1, 2025"
                },
                {
                    title: "Liquidation Option",
                    description: "Instead of paying to dispose, use FBA Liquidations. You might recover a small portion of value (5-10% of ASP) and avoid removal fees.",
                    icon: Trash2,
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600"
                }
            ]}
        />
    )
}
