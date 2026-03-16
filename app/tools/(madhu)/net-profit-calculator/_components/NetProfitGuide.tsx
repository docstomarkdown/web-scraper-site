"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Activity, CreditCard, Landmark, BookOpen } from "lucide-react"
export function NetProfitGuide() {
    return (
        <ToolGuide
            title="Strategies for Sustainable Profit"
            icon={BookOpen}
            items={[
                {
                    title: "The Vanity of Revenue",
                    description: "High revenue looks great on paper but tells you nothing about stability. A $1M business with a 1% margin is riskier than a $100k business with a 30% Net Profit. Focus on your bottom line, not just the top.",
                    icon: Activity,
                    stat: "10-20%",
                    statLabel: "Target Margin",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "A 15% net margin is generally considered the benchmark for a healthy, profitable e-commerce brand."
                },
                {
                    title: "Eliminating Overhead Creep",
                    description: "Small subscriptions and 'miscellaneous' fees can quietly consume 5-10% of your total revenue. Regular audits of your recurring expenses are the fastest way to instantly boost your net profit.",
                    icon: CreditCard,
                    stat: "-12%",
                    statLabel: "Average Leakage",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Business owners often underestimate their overhead by 25% or more before doing a formal calculation."
                },
                {
                    title: "Navigating the Tax Trap",
                    description: "Cash in the bank is not the same as Profit. Always allocate your tax percentage immediately to avoid a cash flow crisis. This tool helps you see your 'True Take-Home' after the government takes its share.",
                    icon: Landmark,
                    stat: "25%+",
                    statLabel: "Tax Allocation",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-700",
                    tooltip: "Setting aside 25-30% of your operating profit for taxes ensures you never have to scramble during tax season."
                }
            ]}
        />
    )
}
