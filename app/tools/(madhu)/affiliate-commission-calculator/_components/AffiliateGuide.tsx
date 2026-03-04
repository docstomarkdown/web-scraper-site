"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Target, Search, AlertCircle, BookOpen, TrendingUp } from "lucide-react"
export function AffiliateGuide() {
    return (
        <ToolGuide
            title="Strategic Commission Strategy"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Net Sales' Principle",
                    description: "Scaling a program on gross numbers is a common trap. Paying on Net Sales (Total Sales - Refunds - Returns) ensures you're only rewarding affiliates for real, kept revenue. This protects you from 'refund fraud' where an affiliate earns a commission on a purchase that's later returned.",
                    icon: Target,
                    stat: "+12%",
                    statLabel: "Profit Boost",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Recover lost profit by paying on net, not gross."
                },
                {
                    title: "Precision Break-Even Analysis",
                    description: "Stop guessing your max commission rate. By factorizing your COGS (Cost of Goods Sold), you can identify your mathematical ceiling. This allows you to aggressively offer higher rates for top-performing affiliates without ever dipping into a net loss.",
                    icon: Search,
                    stat: "Max Rate",
                    statLabel: "Calculated",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Managing Performance Risk",
                    description: "High refund rates can instantly turn a profitable program into a cash drain. Use the Refund Rate input to stress-test your margins. If your refund rate is typically 5%, check if your business still thrives at 10% to ensure your payouts are resilient.",
                    icon: AlertCircle,
                    stat: "Resilient",
                    statLabel: "Payouts",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Tiered Commission Advantage",
                    description: "Instead of a flat rate, consider tiered payouts. Use this calculator to see how a jump from 15% to 20% affects your net revenue per sale. Incentivize volume while keeping your base rate safe for average performers.",
                    icon: TrendingUp,
                    stat: "Scalable",
                    statLabel: "Growth",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600"
                }
            ]}
        />
    )
}