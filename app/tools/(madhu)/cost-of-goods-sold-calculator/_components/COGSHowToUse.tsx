"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Truck, RotateCcw, TrendingUp } from "lucide-react"
export function COGSHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Start Inventory",
                    description: "Enter the exact monetary value of stock at the beginning of the period.",
                    icon: Package
                },
                {
                    title: "Add Purchases",
                    description: "Input raw materials, direct labor, and precise manufacturing overhead.",
                    icon: Truck
                },
                {
                    title: "Review COGS",
                    description: "Subtract ending inventory to reveal your true Cost of Goods Sold.",
                    icon: RotateCcw
                }
            ]}
        />
    )
}