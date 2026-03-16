"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Hourglass, Gauge, CalendarDays, Warehouse, BookOpen } from "lucide-react"
export function InventoryTurnoverGuide() {
    return (
        <ToolGuide
            title="How This Tool Optimizes Your Inventory"
            icon={BookOpen}
            items={[
                {
                    title: "Measure Your Sales Speed",
                    description: "This calculator helps you understand how quickly your products are moving. By tracking your turnover ratio, you can see if you're selling as fast as you're buying.",
                    icon: Gauge,
                    stat: "Analyze",
                    statLabel: "Sales Flow",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "The ratio shows how many times your stock 'turns over' in a year."
                },
                {
                    title: "Calculate Cash-to-Cash Time",
                    description: "Find out exactly how many days your cash is tied up in physical stock. The 'Days Sales in Inventory' (DSI) result tells you when you can expect that inventory to turn back into cash.",
                    icon: Hourglass,
                    stat: "DSI",
                    statLabel: "Cash Cycle",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Avoid Overstock Costs",
                    description: "Use this tool to identify if you have too much capital sitting in the warehouse. Reducing overstock saves you on storage fees and prevents items from becoming outdated.",
                    icon: Warehouse,
                    stat: "Save",
                    statLabel: "Storage Cap",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "Simplify Stock Planning",
                    description: "By knowing your turnover patterns, you can make smarter decisions on when to reorder and how much to buy, ensuring you always have enough for customers without over-buying.",
                    icon: CalendarDays,
                    stat: "Smart",
                    statLabel: "Planning",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    )
}
