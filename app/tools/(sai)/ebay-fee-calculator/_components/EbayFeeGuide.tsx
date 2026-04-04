"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ShoppingCart, Percent, DollarSign, TrendingUp } from "lucide-react"
export function EbayFeeGuide() {
    return (
        <ToolGuide
            title="Understanding eBay Fees"
            icon={ShoppingCart}
            items={[
                {
                    title: "Final Value Fees (FVF)",
                    description: "eBay takes a percentage of the total sale amount, which includes the item price and the shipping cost charged to the buyer. The standard rate is 13.25% for most categories.",
                    icon: Percent,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "13.25%",
                    statLabel: "Standard FVF"
                },
                {
                    title: "The Fixed Order Fee",
                    description: "In addition to the percentage, eBay charges a flat $0.30 fee for every completed order. For low-cost items, this seemingly small fee can significantly impact your margin.",
                    icon: DollarSign,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "$0.30",
                    statLabel: "Per Order"
                },
                {
                    title: "Promoted Listings Costs",
                    description: "To boost visibility, sellers can opt into Promoted Listings Standard, paying an additional percentage. This ad fee is charged *only* if a buyer clicks your promoted listing and buys.",
                    icon: TrendingUp,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-500",
                }
            ]}
        />
    )
}