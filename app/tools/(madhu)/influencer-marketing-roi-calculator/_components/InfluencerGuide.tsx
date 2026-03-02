"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingUp, ShoppingCart, DollarSign, BookOpen } from "lucide-react"

export function InfluencerGuide() {
    return (
        <ToolGuide
            title="What Your ROI Numbers Actually Mean"
            icon={BookOpen}
            items={[
                {
                    title: "Product Cost Dominates at Scale",
                    description: "The Influencer Fee is a one-time fixed cost, but Product Cost and Shipping are multiplied by every order. On a campaign with 500 orders, a $10 shipping cost adds $5,000 to your total spend. Always check the Cost Breakdown chart to see which category is eating your margin.",
                    icon: TrendingUp,
                    stat: "Per Order",
                    statLabel: "Variable Cost",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Product Cost and Shipping scale with every order, making them the biggest margin risk on high-volume campaigns."
                },
                {
                    title: "Selling Price vs. Cost per Order",
                    description: "Your <strong>Profit per Order</strong> is your most actionable metric. It tells you how much you earn after covering product cost and shipping on each sale. If Profit per Order is negative, no amount of extra orders will save the campaign — you must either raise the selling price or cut unit costs.",
                    icon: ShoppingCart,
                    stat: "Key Metric",
                    statLabel: "Profit/Order",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Profit per Order = (Selling Price − Product Cost − Shipping) minus a share of campaign fixed costs."
                },
                {
                    title: "When a Negative ROI is Still Worth It",
                    description: "A negative ROI does not always mean failure. If the influencer campaign generated significant UGC content, grew your email list, or drove brand search volume, the long-term customer lifetime value (LTV) can easily justify a short-term loss. Use this tool to quantify the direct return, then consider LTV separately.",
                    icon: DollarSign,
                    stat: "LTV",
                    statLabel: "Long-Term Value",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Direct ROI measures only immediate sales. Factor in customer retention and repeat purchases for the full picture."
                }
            ]}
        />
    )
}
