"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Package, Calculator } from "lucide-react"
export function FBARemovalHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Unit Type",
                    description: "Enter accurate dimensions and physical weight to label standard vs oversized.",
                    icon: Scale
                },
                {
                    title: "Remove Quota",
                    description: "Input exactly how many warehoused units you formally requested to dump or clear.",
                    icon: Package
                },
                {
                    title: "Check Debt",
                    description: "Instantly price your total estimated Amazon network warehouse extraction penalties.",
                    icon: Calculator
                }
            ]}
        />
    )
}