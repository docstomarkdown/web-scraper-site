"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Box, Calendar, Package } from "lucide-react"
export function StorageFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Item Volume",
                    description: "Enter your specific product dimensions to calculate true cubic footage.",
                    icon: Box
                },
                {
                    title: "Inventory Size",
                    description: "Input the average number of physical units held in Amazon facilities.",
                    icon: Package
                },
                {
                    title: "Check Cost",
                    description: "Instantly see your total monthly storage fee based on current FBA terms.",
                    icon: Calendar
                }
            ]}
        />
    )
}