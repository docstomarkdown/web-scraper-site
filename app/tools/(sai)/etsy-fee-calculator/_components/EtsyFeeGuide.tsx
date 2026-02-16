"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Store, Megaphone, CreditCard } from "lucide-react"

export function EtsyFeeGuide() {
    return (
        <ToolGuide
            title="Understanding Etsy Fees"
            icon={Store}
            items={[
                {
                    title: "Transaction Fee (6.5%)",
                    description: "Etsy charges 6.5% of the total order value, including shipping and gift wrapping. This is unavoidable.",
                    icon: Store,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                },
                {
                    title: "Payment Processing",
                    description: <>This varies by country. In the US, it&apos;s 3% + $0.25. This covers the cost of handling the credit card transaction.</>,
                    icon: CreditCard,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                },
                {
                    title: "Offsite Ads (15% vs 12%)",
                    description: "If you sell under $10k/year, you can opt-out. If you opt-in, you pay 15% only on sales from ads. Sellers over $10k pay 12% mandatory.",
                    icon: Megaphone,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    tooltip: "Only charged if a sale results from an ad."
                }
            ]}
        />
    )
}
