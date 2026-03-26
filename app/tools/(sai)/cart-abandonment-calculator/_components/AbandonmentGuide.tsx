"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingCart, Ban, CreditCard, Mail } from "lucide-react"

export function AbandonmentGuide() {
    return (
        <ToolGuide
            title="Understanding Your Abandonment Data"
            items={[
                {
                    title: "What is Cart Abandonment?",
                    icon: ShoppingCart,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                    stat: "Lost",
                    statColor: "text-orange-600",
                    statLabel: "Interested but left",
                    tooltip: "Formula: 100 - (Transactions ÷ Carts × 100)",
                    description: "Cart abandonment occurs when a highly-interested customer adds items to a shopping cart to checkout, but leaves your site before successfully processing their payment."
                },
                {
                    title: "Common Friction Points",
                    icon: Ban,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    stat: "Costs",
                    statColor: "text-red-600",
                    statLabel: "Unexpected fees",
                    tooltip: "The highest cause of abandonment is hidden costs at shipping.",
                    description: "The primary killers of checkout flows are: unexpected shipping and tax costs, requiring users to create accounts instead of allowing guest checkout, and complicated or buggy form validations."
                },
                {
                    title: "Industry Baselines",
                    icon: CreditCard,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "70%",
                    statColor: "text-blue-600",
                    statLabel: "Global Average",
                    tooltip: "It is normal for cart abandonment to be high.",
                    description: "If your abandonment rate is under 60%, your checkout is performing highly efficiently. Rates between 65% and 75% are standard across the ecommerce industry. Anything above 75% requires urgent optimization."
                },
                {
                    title: "Effective Recovery",
                    icon: Mail,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Emails",
                    statColor: "text-emerald-600",
                    statLabel: "Recovery Campaigns",
                    tooltip: "A strategic, automated email sequence can win back lost sales.",
                    description: "Cart recovery automations are a must. Send a gentle reminder 1 hour after abandonment, a follow-up offering help 24 hours later, and a final small discount incentive at the 72-hour mark."
                }
            ]}
        />
    )
}