"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingBag, Truck, DollarSign, Gem, ShieldCheck, TrendingUp } from "lucide-react"

export function PoshmarkFeeGuide() {
    return (
        <ToolGuide
            title="Understanding Poshmark Fees & Payouts"
            items={[
                {
                    title: "Tiered Commission Structure",
                    description: "Poshmark takes a flat $2.95 commission for items priced below $15. For items $15 and above, they take a 20% commission, and you keep 80%.",
                    icon: DollarSign,
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-600",
                    stat: "80%",
                    statColor: "text-rose-700",
                    statLabel: "Seller Portion"
                },
                {
                    title: "Shipping Discount Impacts",
                    description: "When using 'Offer to Likers,' Poshmark requires you to provide a shipping discount. This discount comes directly out of your 80% earnings.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "Varies",
                    statColor: "text-blue-700",
                    statLabel: "Discount Amount"
                },
                {
                    title: "Poshmark Selling ROI",
                    description: "True ROI (Return on Investment) depends on your original cost of goods. By subtracting your cost, you can see if your time and effort on Poshmark is profitable.",
                    icon: TrendingUp,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "ROI",
                    statColor: "text-emerald-700",
                    statLabel: "Target Metric"
                },
                {
                    title: "Seller Protections Included",
                    description: "Poshmark's commission covers payment processing, customer service, and their 'Posh Protect' seller insurance, ensuring you get paid even if items are lost in transit.",
                    icon: ShieldCheck,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    stat: "Secure",
                    statColor: "text-indigo-700",
                    statLabel: "Protection Status"
                }
            ]}
        />
    )
}