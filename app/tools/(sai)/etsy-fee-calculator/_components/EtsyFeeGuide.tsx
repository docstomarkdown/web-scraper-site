"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Store, CreditCard, Megaphone, Tag } from "lucide-react"

export function EtsyFeeGuide() {
    return (
        <ToolGuide
            title="Understanding Etsy Fees"
            icon={Store}
            items={[
                {
                    title: "Listing Fee ($0.20)",
                    description: "Every time you publish or renew a listing on Etsy, you are charged a flat $0.20. This fee is paid upfront regardless of whether the item sells, and it renews automatically every four months.",
                    icon: Tag,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "$0.20",
                    statLabel: "Per Listing"
                },
                {
                    title: "Transaction Fee (6.5%)",
                    description: "Etsy charges 6.5% of the total order value — including the item price, the shipping you charge the buyer, and any gift wrapping fees. This is Etsy's primary revenue fee and is unavoidable for all sellers.",
                    icon: Store,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                    stat: "6.5%",
                    statLabel: "Of Total Order"
                },
                {
                    title: "Payment Processing",
                    description: "Etsy Payments charges a percentage plus a small fixed fee per transaction to cover credit card and payment gateway costs. In the US the rate is 3% + $0.25. Rates vary by country.",
                    icon: CreditCard,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "3% + $0.25",
                    statLabel: "US Standard"
                },
                {
                    title: "Offsite Ads (15% or 12%)",
                    description: "When Etsy promotes your listings on external platforms (Google, Facebook, etc.) and a sale results, an Offsite Ads fee applies. Sellers under $10k/year can opt out (15%); sellers over $10k/year cannot opt out and pay a reduced 12%.",
                    icon: Megaphone,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                }
            ]}
        />
    )
}