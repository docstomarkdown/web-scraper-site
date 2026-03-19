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
                    title: "Consolidated Logistics",
                    description: "Your COGS encompasses shipping costs which include both the inbound freight from your supplier and the outbound delivery to your customer. Accurate aggregation here reveals your true overhead.",
                    icon: Globe,
                    stat: "Logistics",
                    statLabel: "True Cost",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Consolidated freight ensures you have a single source of truth for all transit-related costs."
                },
                {
                    title: "Packaging Precision",
                    description: "Small costs like polybags, tissue paper, and custom boxes add up quickly. This calculator ensures these packaging materials are factored precisely into your unit economics.",
                    icon: Box,
                    stat: "Materials",
                    statLabel: "Fixed",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Account for every label and insert to ensure your per-unit cost remains 100% accurate."
                },
                {
                    title: "Total Fulfillment Scale",
                    description: "By including third-party pick-and-pack fulfillment fees (like FBA or a 3PL), you gain a highly actionable 'Total' view of what it costs to actually get products into the hands of your buyers.",
                    icon: Warehouse,
                    stat: "Fulfillment",
                    statLabel: "Per Unit",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600",
                    tooltip: "In e-commerce, fulfillment is often the definitive factor dictating scalable profitability."
                }
            ]}
        />
    )
}

