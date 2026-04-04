"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Box, Layers, BarChart3 } from "lucide-react"
export function StorageFeeHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Product Dimensions",
                    description: "Input your product's length, width, and height in inches to automatically compute cubic volume and size tier.",
                    icon: Box
                },
                {
                    title: "Add Inventory Details",
                    description: "Enter the total units stored and storage duration to estimate standard monthly fees and long-term surcharges.",
                    icon: Layers
                },
                {
                    title: "Review Storage Costs",
                    description: "Instantly view your total storage cost, monthly breakdown, and actionable insights to optimize inventory health.",
                    icon: BarChart3
                }
            ]}
        />
    )
}