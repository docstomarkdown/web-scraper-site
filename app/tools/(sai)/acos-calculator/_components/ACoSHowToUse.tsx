"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, TrendingUp, PieChart } from "lucide-react"

export function ACoSHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Ad Spend",
                    description: "Input the total monetary amount spent directly on your advertising campaigns.",
                    icon: CircleDollarSign
                },
                {
                    title: "Add Ad Revenue",
                    description: "Enter the total sales generated exclusively from those advertising efforts.",
                    icon: TrendingUp
                },
                {
                    title: "Check Net Profit",
                    description: "Instantly view your ACoS percentage and see your exact net profit or loss after ad costs.",
                    icon: PieChart
                }
            ]}
        />
    )
}