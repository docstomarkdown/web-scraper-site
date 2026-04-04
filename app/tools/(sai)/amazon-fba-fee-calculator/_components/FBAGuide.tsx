"use client"
import { BookOpen, Box, Truck, Percent } from "lucide-react"
import { ToolGuide } from "@/app/tools/_shared/components"

const insights = [
    {
        icon: Percent,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        title: "Amazon Referral Fee",
        description: "A fee paid to Amazon for selling on their marketplace, typically 15% for most categories with a minimum of $0.30 per item.",
        tooltip: "Referral Fee: A percentage of the total sales price (usually 15%) paid to Amazon for the privilege of selling on their marketplace."
    },
    {
        icon: Box,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        title: "FBA Fulfillment Fee",
        description: "Covers the cost of picking, packing, shipping, and customer service. Fees are determined by your product's size tier and shipping weight—minimize packaging to lower costs.",
        tooltip: "Fulfillment Fee: The cost Amazon charges to pick, pack, and ship your order to the customer, plus handle customer service."
    },
    {
        icon: Truck,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        title: "Inbound Shipping",
        description: "The cost of shipping your inventory to Amazon's warehouses. Prices depend on the carrier and distance.",
        tooltip: "Inbound Shipping: The cost you pay to ship your inventory from your supplier or home to Amazon's fulfillment centers."
    },
]

export function FBAGuide() {
    return (
        <ToolGuide 
            title="Understanding Amazon FBA Fees" 
            items={insights} 
        />
    )
}
