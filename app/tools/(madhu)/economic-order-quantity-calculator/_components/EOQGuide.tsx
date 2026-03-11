"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { DollarSign, Activity, AlertCircle, Lightbulb } from "lucide-react"

export function EOQGuide() {
    return (
        <ToolGuide
            title="About the EOQ Calculator"
            icon={Lightbulb}
            items={[
                {
                    title: "Optimise Your Inventory Spend",
                    description: "This tool calculates your mathematical 'sweet spot' for ordering. It prevents you from tying up too much cash in excess stock while ensuring you don't overspend on shipping and admin fees by ordering too often.",
                    icon: DollarSign,
                    stat: "Cost Saving",
                    statLabel: "Goal",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "The EOQ formula is the industry standard for balancing storage costs with ordering costs."
                },
                {
                    title: "Find Your Perfect Cost Balance",
                    description: "Efficiency happens when your annual storage costs perfectly match your annual ordering costs. This calculator finds that exact equilibrium point so you never have to guess your order size again.",
                    icon: Activity,
                    stat: "1 : 1",
                    statLabel: "Optimal Ratio",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Protect Your Cash Flow",
                    description: "Overordering fills your warehouse, but it also drains your bank account. Use this tool to release frozen capital and reinvest it into growing your business instead of letting it sit on a warehouse shelf.",
                    icon: AlertCircle,
                    stat: "Efficiency",
                    statLabel: "Cash Flow",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                }
            ]}
        />
    )
}