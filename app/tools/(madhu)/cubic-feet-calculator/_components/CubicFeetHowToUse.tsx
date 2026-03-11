"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, Maximize, Target, Warehouse } from "lucide-react"
export function CubicFeetHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Measure Item",
                    description: "Enter length, width, and height using inches, feet, or centimeters.",
                    icon: Ruler
                },
                {
                    title: "Add Quantity",
                    description: "Specify exactly how many units you are shipping or storing overall.",
                    icon: Maximize
                },
                {
                    title: "Get Volume",
                    description: "Instantly calculate total cubic feet and equivalent storage capacity.",
                    icon: Target
                }
            ]}
        />
    )
}