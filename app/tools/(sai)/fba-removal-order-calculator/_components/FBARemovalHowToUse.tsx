"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, Package, DollarSign } from "lucide-react"
export function FBARemovalHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Dimensions & Weight",
                    description: "Input your product's length, width, height (in inches) and unit weight (in lbs). This determines your size tier and billing weight.",
                    icon: Ruler
                },
                {
                    title: "Set Your Removal Quantity",
                    description: "Enter the number of units you plan to remove or dispose. The calculator multiplies the per-unit fee by this quantity for a total.",
                    icon: Package
                },
                {
                    title: "Review Your Total Removal Cost",
                    description: "Instantly see your per-unit fee, size tier classification, and total estimated removal order cost using Amazon's 2025 rate card.",
                    icon: DollarSign
                }
            ]}
        />
    )
}