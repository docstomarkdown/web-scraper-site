"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, ShoppingCart, Package } from "lucide-react"

export function EOQHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Annual Demand",
                    description: "Input the total units you expect to sell or use over a full year. If you only have monthly data, just multiply it by 12.",
                    icon: TrendingUp
                },
                {
                    title: "Add Your Costs",
                    description: "Enter your fixed Cost Per Order (like shipping or admin fees) and the annual Holding Cost to store a single unit.",
                    icon: ShoppingCart
                },
                {
                    title: "Apply Your EOQ",
                    description: "Order exactly the recommended number of units each time. This hits the lowest possible annual cost for your inventory.",
                    icon: Package
                }
            ]}
        />
    )
}