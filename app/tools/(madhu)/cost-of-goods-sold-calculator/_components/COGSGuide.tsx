"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { AlertCircle, Scale, CreditCard, BookOpen } from "lucide-react"
export function COGSGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About This Process"
            icon={BookOpen}
            items={[
                {
                    title: "The True Cost of Sourcing",
                    description: "Your supplier might quote a product at $5, but inbound freight, customs duties, and taxes can easily push the real landed cost much higher.",
                    icon: AlertCircle,
                    stat: "+40%",
                    statLabel: "Avg Markup",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Freight and duties often add 30-50% to the base product cost."
                },
                {
                    title: "Packaging Adds Up Quickly",
                    description: "Don't forget the cost of polybags, custom boxes, labels, and inserts. These seemingly small per-unit costs heavily impact margins at scale.",
                    icon: Scale,
                    stat: "Hidden",
                    statLabel: "Extra Cost",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "A premium box can cost as much as $1 per unit depending on size."
                },
                {
                    title: "Fulfillment > Manufacturing",
                    description: "For many low-cost items, the cost to pick, pack, and ship (Fulfillment) is actually higher than the cost to make the product.",
                    icon: CreditCard,
                    stat: "Reality",
                    statLabel: "Check Fees",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600",
                    tooltip: "Common in items under $20 selling price."
                }
            ]}
        />
    )
}
