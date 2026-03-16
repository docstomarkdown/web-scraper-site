"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Globe, Box, Warehouse, BookOpen } from "lucide-react"
export function COGSGuide() {
    return (
        <ToolGuide
            title="Mastering Your Cost of Goods Sold"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Landed' Reality",
                    description: "Your COGS starts with the 'Landed Cost'—the total price of a product once it arrives at your warehouse, including inbound freight, customs duties, and taxes.",
                    icon: Globe,
                    stat: "Landed",
                    statLabel: "True Cost",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "The Landed Cost is the only accurate way to determine your starting point for wholesale or retail pricing."
                },
                {
                    title: "Direct Material Accuracy",
                    description: "Small costs like polybags, tissue paper, and custom boxes add up quickly. This calculator ensures these direct materials are factored into your unit economics.",
                    icon: Box,
                    stat: "Fixed",
                    statLabel: "Materials",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Account for every label and insert to ensure your per-unit cost is 100% accurate."
                },
                {
                    title: "Full-Cycle Visibility",
                    description: "By including pick-and-pack fees and outbound shipping, you gain a 'Total COGS' view, revealing the actual expense of getting a product into your customer's hands.",
                    icon: Warehouse,
                    stat: "Total",
                    statLabel: "Per Unit",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600",
                    tooltip: "In e-commerce, this total view is essential for identifying which products are actually scalable."
                }
            ]}
        />
    )
}
