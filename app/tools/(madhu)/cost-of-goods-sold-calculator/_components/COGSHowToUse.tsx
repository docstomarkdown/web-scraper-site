"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Truck, PieChart } from "lucide-react"

export function COGSHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Product Details",
                    description: "Input your baseline product cost and the quantity of units you are analyzing to set the foundation for your calculations.",
                    icon: Package
                },
                {
                    title: "Add Logistics Costs",
                    description: "Include consolidated shipping costs (inbound and outbound), along with packaging materials and direct fulfillment fees.",
                    icon: Truck
                },
                {
                    title: "Analyze Breakdown",
                    description: "Instantly view your Total COGS and drop down the interactive Cost Breakdown panel to isolate exactly where your capital is going.",
                    icon: PieChart
                }
            ]}
        />
    )
}