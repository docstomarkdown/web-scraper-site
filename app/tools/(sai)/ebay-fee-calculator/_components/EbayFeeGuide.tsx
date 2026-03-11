"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ShoppingCart, Percent, DollarSign, Truck } from "lucide-react"
export function EbayFeeGuide() {
    return (
        <ToolGuide
            title="Understanding eBay Fees"
            icon={ShoppingCart}
            items={[
                {
                    title: "Final Value Fee (13.25%)",
                    description: "eBay charges a percentage of the total amount of the sale (item price + shipping + sales tax) + $0.30 per order.",
                    icon: Percent,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "13.25%",
                    statLabel: "Standard Rate"
                },
                {
                    title: "Fees on Shipping",
                    description: "Yes, eBay charges fees on the shipping cost you charge the buyer. This prevents sellers from avoiding fees by listing items for $0.01 with $50 shipping.",
                    icon: Truck,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-500",
                },
                {
                    title: "Promoted Listings",
                    description: "If you promote your item, you pay an extra ad fee percentage based on the final sale price. This is optional but common for visibility.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                }
            ]}
        />
    )
}