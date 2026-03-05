"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingUp, DollarSign, Calculator, BookOpen } from "lucide-react"
export function NetProfitGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About This Process"
            icon={BookOpen}
            items={[
                {
                    title: "Revenue is Vanity",
                    description: "High revenue figures look great on social media, but they tell you nothing about business health. A $1M business with $990k in costs is far more fragile than a $100k business with $30k in net profit.",
                    icon: TrendingUp,
                    stat: "10-20%",
                    statLabel: "Average Net Margin",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "The typical benchmark for a healthy, sustainable e-commerce brand."
                },
                {
                    title: "The Overhead Creep",
                    description: "Small monthly subscriptions and 'miscellaneous' expenses can quietly eat 5-10% of your margins. If you aren't tracking overhead, you aren't tracking the bottom line.",
                    icon: DollarSign,
                    stat: "-12%",
                    statLabel: "Margin Leakage",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Typical percentage of profit lost to untracked subscriptions and processing fees."
                },
                {
                    title: "The Silent Tax Trap",
                    description: "Many owners confuse 'Cash in Bank' with 'Profit.' Always set aside your estimated tax amount immediately, or you'll find yourself in a cash flow crisis during tax season.",
                    icon: Calculator,
                    stat: "25%+",
                    statLabel: "Tax Allocation",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "Recommended percentage of operating profit to set aside for business taxes."
                }
            ]}
        />
    )
}