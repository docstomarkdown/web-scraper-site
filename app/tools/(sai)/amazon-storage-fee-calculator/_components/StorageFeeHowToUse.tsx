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
                    description: "Input your product's <strong>Length</strong>, <strong>Width</strong>, and <strong>Height</strong> in inches. The calculator uses these to compute cubic volume and automatically detect your size tier (Standard vs Oversize).",
                    icon: Box
                },
                {
                    title: "Add Inventory Details",
                    description: "Enter the total <strong>Units Stored</strong> in Amazon's warehouses and how many <strong>Months</strong> they will sit. Anything beyond 6 months triggers long-term storage surcharges.",
                    icon: Layers
                },
                {
                    title: "Review Storage Costs",
                    description: "Instantly see your <strong>Total Storage Cost</strong>, <strong>Monthly Fee</strong>, and any <strong>Long-Term Surcharges</strong>. A smart insight message tells you if your storage costs are efficient or need attention.",
                    icon: BarChart3
                }
            ]}
        />
    )
}