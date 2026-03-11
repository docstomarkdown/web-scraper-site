"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, ShoppingCart, Warehouse, Scale } from "lucide-react"
export function EOQHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Annual Demand",
                    description: "Enter the overall number of units you expect to sell in a full year.",
                    icon: TrendingUp
                },
                {
                    title: "Order Costs",
                    description: "Input the fixed setup and processing fees incurred per order placed.",
                    icon: ShoppingCart
                },
                {
                    title: "Calculate EOQ",
                    description: "Discover the absolute optimal order size to lower your holding costs.",
                    icon: Warehouse
                }
            ]}
        />
    )
}