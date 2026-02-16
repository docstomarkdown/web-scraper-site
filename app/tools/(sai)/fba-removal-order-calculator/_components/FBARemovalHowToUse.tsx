"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Package, Calculator } from "lucide-react"

export function FBARemovalHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Step 1: Enter Product Details",
                    description: "Input the dimensions (length, width, height) and weight of a single unit.",
                    icon: Scale
                },
                {
                    title: "Step 2: Set Quantity",
                    description: "Enter the total number of units you plan to remove or dispose of.",
                    icon: Package
                },
                {
                    title: "Step 3: Review Fees",
                    description: "See the estimated total cost based on the 2025 FBA Removal & Disposal rate card.",
                    icon: Calculator
                }
            ]}
        />
    )
}
