"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Target, Timer, RotateCw } from "lucide-react"
export function InventoryTurnoverHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Sales Data",
                    description: "Input your total Cost of Goods Sold for the evaluated market period.",
                    icon: Target
                },
                {
                    title: "Stock Value",
                    description: "Enter your average inventory dollar value over the exact timeframe.",
                    icon: Timer
                },
                {
                    title: "Check Turns",
                    description: "View your inventory turnover ratio to explicitly evaluate efficiency.",
                    icon: RotateCw
                }
            ]}
        />
    )
}