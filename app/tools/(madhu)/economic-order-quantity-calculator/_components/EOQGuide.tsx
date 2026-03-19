"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Wallet, Scale, PiggyBank, Lightbulb } from "lucide-react"

export function EOQGuide() {
    return (
        <ToolGuide
            title="About the EOQ Calculator"
            icon={Lightbulb}
            items={[
                {
                    title: "Units to Order Each Time",
                    description: "This tool calculates your clear, mathematical 'sweet spot' for ordering. It prevents you from tying up too much cash in excess stock while ensuring you don’t overspend on shipping by ordering too frequently.",
                    icon: Wallet,
                    stat: "Max",
                    statLabel: "Savings",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "The standard metric balancing storage costs with ordering costs."
                },
                {
                    title: "Order Frequency & Schedule",
                    description: "Instead of guessing when to buy, the calculator provides clear actionable insights: Exactly how many orders to place per year, and the precise number of days between each order so you stay on schedule.",
                    icon: Scale,
                    stat: "Perfect",
                    statLabel: "Timing",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Total Inventory Cost Insight",
                    description: "See a crystal-clear breakdown of your total inventory management costs per year. The tool separates your Annual Ordering Cost from your Annual Holding Cost, giving you total financial visibility.",
                    icon: PiggyBank,
                    stat: "Complete",
                    statLabel: "Visibility",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                }
            ]}
        />
    )
}