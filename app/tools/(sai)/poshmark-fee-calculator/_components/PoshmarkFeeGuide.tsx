"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { ShoppingBag, Truck, DollarSign, Gem, ShieldCheck, TrendingUp } from "lucide-react"

export function PoshmarkFeeGuide() {
    return (
        <ToolGuide
            title="Understanding Poshmark Fees & Payouts"
            items={[
                {
                    title: "Optimize Low-Priced Items",
                    description: "Poshmark takes a flat $2.95 fee for any sale under $15. Selling a $10 item means giving away nearly 30% of your revenue in fees. Aim to price items at least $15 or higher to switch back to the more favorable 20% flat commission.",
                    icon: DollarSign,
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-600",
                    stat: "Protect",
                    statColor: "text-rose-700",
                    statLabel: "Your Margins"
                },
                {
                    title: "Utilize Closet Clearout Days",
                    description: "Instead of paying for shipping discounts yourself via 'Offer to Likers,' wait for Closet Clearout events. If you drop your listing price by 10%, Poshmark will cover the shipping discount, retaining your expected net profit.",
                    icon: Truck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "Free",
                    statColor: "text-blue-700",
                    statLabel: "Shipping Promos"
                },
                {
                    title: "Bundle to Improve ROI",
                    description: "Encourage buyers to purchase multiple low-priced items at once. Bundling dramatically protects your ROI by keeping the total order value well above $15, thereby bypassing the harsh $2.95 flat fee on individual cheap listings.",
                    icon: ShoppingBag,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "Scale",
                    statColor: "text-emerald-700",
                    statLabel: "Order Value"
                },
                {
                    title: "Target the '3x Sourcing Rule'",
                    description: "A standard benchmark for successful clothing resellers: list your items for at least 3 times what you paid for them. This provides enough buffer room to absorb the 20% marketplace fee and leaving room to send 20% off offers to likers while staying highly profitable.",
                    icon: TrendingUp,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    stat: "3x",
                    statColor: "text-indigo-700",
                    statLabel: "Sourcing Metric"
                }
            ]}
        />
    )
}