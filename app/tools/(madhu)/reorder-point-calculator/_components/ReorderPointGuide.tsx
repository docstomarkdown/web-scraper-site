"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertCircle, Timer, Warehouse, BookOpen } from "lucide-react"
export function ReorderPointGuide() {
    return (
        <ToolGuide
            title="Best Practices for Reordering Inventory"
            icon={BookOpen}
            items={[
                {
                    title: "Maintaining Search Rankings",
                    description: "Staying in stock ensures you don't lose your hard-earned search rankings on marketplaces like Amazon. Consistent availability is key to visibility.",
                    icon: AlertCircle,
                    stat: "Higher",
                    statLabel: "Search Visibility",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Consistent stock levels prevent ranking drops."
                },
                {
                    title: "Accounting for Buffer Time",
                    description: "Don't forget to include administrative time along with your supplier's lead time. Processing invoices and arranging freight often adds a few extra days.",
                    icon: Timer,
                    stat: "+3 Days",
                    statLabel: "Average Buffer",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600"
                },
                {
                    title: "Optimizing Your Capital",
                    description: "Calculating an accurate reorder point prevents excess inventory buildup, freeing up your cash flow for marketing and launching new products.",
                    icon: Warehouse,
                    stat: "Better",
                    statLabel: "Cash Flow",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    )
}
