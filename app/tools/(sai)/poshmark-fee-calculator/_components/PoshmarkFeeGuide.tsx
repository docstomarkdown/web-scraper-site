"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ShoppingBag, Truck, DollarSign } from "lucide-react"

export function PoshmarkFeeGuide() {
    return (
        <ToolGuide
            title="Understanding Poshmark Fees"
            icon={ShoppingBag}
            items={[
                {
                    title: "Flat Fee (< $15)",
                    description: "For sales under $15, Poshmark takes a flat commission of $2.95. This can be a high percentage for very low-priced items.",
                    icon: DollarSign,
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-500",
                },
                {
                    title: "Percentage Fee (20%)",
                    description: "For sales of $15 or more, Poshmark keeps 20% of the commission, and you keep 80%. This fee covers shipping labels and payment processing.",
                    icon: ShoppingBag,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "20%",
                    statLabel: "Commission"
                },
                {
                    title: "Shipping Discounts",
                    description: "When you use 'Offer to Likers' or 'Closet Clearout', you are often required to offer a shipping discount. This difference is deducted from your earnings.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                }
            ]}
        />
    )
}
