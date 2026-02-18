"use client"

import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingCart, Ban, CreditCard, Mail } from "lucide-react"

export function AbandonmentGuide() {
    return (
        <ToolGuide
            title="Understanding Cart Abandonment"
            items={[
                {
                    title: "What is Cart Abandonment?",
                    icon: ShoppingCart,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                    stat: "Lost",
                    statColor: "text-orange-600",
                    statLabel: "Interested but left",
                    tooltip: "Abandonment Rate = (1 - (Transactions / Carts)) * 100.",
                    description: "Cart abandonment happens when a potential customer starts a checkout process for an online order but drops out of the process before completing the purchase."
                },
                {
                    title: "Why it Happens?",
                    icon: Ban,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    stat: "Costs",
                    statColor: "text-red-600",
                    statLabel: "Unexpected fees",
                    tooltip: "Top reason: Extra costs too high (shipping, tax, fees).",
                    description: "The #1 reason for cart abandonment is unexpected costs found at checkout, such as shipping fees, taxes, or service charges. Other reasons include forced account creation and complicated checkout flows."
                },
                {
                    title: "Average rate?",
                    icon: CreditCard,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "70%",
                    statColor: "text-blue-600",
                    statLabel: "Global Average",
                    tooltip: "Average documented online shopping cart abandonment rate is 69.99%.",
                    description: "Don't panic if your rate seems high. The global average is around 70%, meaning only 3 out of 10 shoppers complete their purchase once they add an item to the cart."
                },
                {
                    title: "How to Recover?",
                    icon: Mail,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Email",
                    statColor: "text-emerald-600",
                    statLabel: "Recovery Campaigns",
                    tooltip: "Send automated emails to users who left items in their cart.",
                    description: "Cart recovery emails are highly effective. Sending a reminder email 1 hour, 24 hours, and 72 hours after abandonment can recover a significant portion of lost sales."
                }
            ]}
        />
    )
}
