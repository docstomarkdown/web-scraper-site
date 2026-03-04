"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { DollarSign, Activity, AlertCircle, BookOpen } from "lucide-react"
export function EOQGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Inventory Optimization"
            icon={BookOpen}
            items={[
                {
                    title: "The Silent Cost of Capital",
                    description: "Every dollar sitting on a shelf is a dollar not being spent on growth. EOQ helps you release frozen capital and reinvest it where it matters most.",
                    icon: DollarSign,
                    stat: "12-15%",
                    statLabel: "Capital Leakage",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "The typical 'Cost of Capital' for retail businesses—representing the profit lost by not investing that money elsewhere."
                },
                {
                    title: "The 'Efficiency' Delusion",
                    description: "Ordering less frequently to save time often leads to bloated storage bills. True efficiency is found when your Ordering and Storage costs are equal.",
                    icon: Activity,
                    stat: "1:1",
                    statLabel: "Optimal Ratio",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Inventory Obsolescence",
                    description: "Excess stock doesn't just cost rent; it risks expiring or becoming obsolete. High holding costs are often the first sign of a dangerous inventory surplus.",
                    icon: AlertCircle,
                    stat: "25%",
                    statLabel: "Value Loss",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                }
            ]}
        />
    )
}