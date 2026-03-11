"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, TrendingUp, Calendar } from "lucide-react"
export function DaysOfInventoryHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Total Current Stock",
                    description: "Enter the total number of units physically available in your warehouse today.",
                    icon: Package
                },
                {
                    title: "Average Sales Speed",
                    description: "Input how many units you typically sell per day, week, or month.",
                    icon: TrendingUp
                },
                {
                    title: "View Your Runway",
                    description: "Instantly see how many days of inventory you have left and your expected stock-out date.",
                    icon: Calendar
                }
            ]}
        />
    )
}