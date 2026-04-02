"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, DollarSign, Scale, TrendingUp, Info } from "lucide-react"

export function BreakEvenGuide() {
    return (
        <ToolGuide
            title="Understanding Break-Even Analysis"
            icon={BookOpen}
            items={[
                {
                    title: "Fixed Costs",
                    description: "Expenses that remain constant regardless of your sales volume. Examples include rent, insurance, salaries, and software subscriptions.",
                    icon: DollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Overhead",
                    statColor: "text-blue-600",
                    statLabel: "Costs that don't change",
                    tooltip: "Costs you pay even if you sell nothing."
                },
                {
                    title: "Variable Costs",
                    description: "Costs that increase with every unit you sell. This includes materials, shipping, packaging, and transaction fees.",
                    icon: Scale,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Per Unit",
                    statColor: "text-blue-600",
                    statLabel: "Costs linked to sales",
                    tooltip: "Costs incurred only when a sale is made."
                },
                {
                    title: "Profit per Unit",
                    description: "The amount of money left from each sale after covering variable costs. This amount is used to pay off your fixed costs.",
                    icon: TrendingUp,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Unit Profit",
                    statColor: "text-amber-600",
                    statLabel: "Revenue after variable costs",
                    tooltip: "Price - Variable Cost = Profit per Unit."
                },
                {
                    title: "Break-Even Point",
                    description: "The exact number of units you need to sell to cover all your costs (Fixed + Variable). Sales beyond this point generate pure profit.",
                    icon: Info,
                    iconBg: "bg-violet-50",
                    iconColor: "text-violet-500",
                    stat: "Zero Profit",
                    statColor: "text-violet-600",
                    statLabel: "Where you start making profit",
                    tooltip: "Sales needed to reach $0 profit (no loss)."
                }
            ]}
        />
    )
}
